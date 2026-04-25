import mongoose, { mongo } from "mongoose";
import Advance from "../models/advance.model.js";
import Employee from "../models/employee.model.js";
import SalaryRecord from "../models/salary.record.model.js";

export const getEmployees = async (req, res) => {
    try {
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const endOfMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0);

        const employees = await Employee.aggregate([
            {
                $match: {
                    employerId: new mongoose.Types.ObjectId(req.employer._id)
                }
            },
            { $sort: { _id: -1 } },
            {
                $lookup: {
                    from: "advances",
                    let: { empId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$employeeId", "$$empId"] },
                                        { $gte: ["$date", startOfMonth] },
                                        { $lte: ["$date", endOfMonth] }
                                    ]
                                }
                            }
                        }
                    ],
                    as: "monthlyAdvances"
                }
            },
            {
                $addFields: {
                    totalMonthlyAdvance: { $sum: "$monthlyAdvances.amount" }
                }
            },
            {
                $project: {
                    monthlyAdvances: 0 // hide details if not needed
                }
            }
        ]);

        return res.status(200).json({ employees });
    } catch (error) {
        console.log("Error in getEmployees controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getEmployee = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const employerId = new mongoose.Types.ObjectId(req.employer._id);

        const employee = await Employee.findOne({
            _id: employeeId, employerId
        }).lean();

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        const salaryHistory = await SalaryRecord.find({
            employeeId,
            employerId
        })
            .sort({ createdAt: -1 })
            .lean();

        const advanceHistory = await Advance.aggregate([
            {
                $match: {
                    employeeId: new mongoose.Types.ObjectId(employeeId),
                    employerId: new mongoose.Types.ObjectId(employerId)
                }
            },

            {
                $sort: { date: -1 }
            },


            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m", date: "$date" } // e.g. 2024-10
                    },
                    advances: { $push: "$$ROOT" }, // will preserve sorted order
                    totalAmount: { $sum: "$amount" }
                }
            },


            {
                $addFields: {
                    month: {
                        $dateToString: {
                            format: "%b, %Y", // Oct, 2024
                            date: { $toDate: { $concat: ["$_id", "-01"] } }
                        }
                    }
                }
            },
            {
                $sort: { _id: -1 }
            },
            {
                $project: {
                    _id: 0,
                    month: 1,
                    advances: 1,
                    totalAmount: 1
                }
            },
        ]);
        return res.status(200).json({
            employee,
            salaryHistory,
            advanceHistory
        });
    } catch (error) {
        console.log("Error in getEmployee controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const addEmployee = async (req, res) => {
    try {
        const { name, phone, email, address, aadhar, salary, designation, profilePic, joiningDate } = req.body;

        if (!name || !phone || !aadhar) {
            return res.status(400).json({ message: "Name, phone and aadhar are required" });
        }

        const conditions = [{ phone }, { aadhar }];
        if (email) conditions.push({ email });

        let employee = await Employee.findOne({
            employerId: req.employer._id,
            $or: conditions
        })

        if (employee) {
            if (employee.phone === phone) {
                return res.status(400).json({ message: "Phone number already registered" })
            }
            if (employee.email === email) {
                return res.status(400).json({ message: "Email already registered" })
            }
            if (employee.aadhar === aadhar) {
                return res.status(400).json({ message: "Aadhar number already registered" })
            }
        }

        const newEmployee = await Employee.create({
            employerId: req.employer._id,
            name, phone, email, address, aadhar, designation, salary, profilePic, joiningDate
        })

        return res.status(201).json({
            newEmployee, message: "Employee created successfully"
        })
    } catch (error) {
        console.log("Error in addEmployee controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateEmployee = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;
        const { name, phone, email, address, salary, profilePic, designation, joiningDate, isActive } = req.body;

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid employee id" });
        }

        const updates = {}

        let employee = await Employee.findOne({
            employerId: req.employer._id,
            _id: { $ne: employeeId },
            $or: [
                { phone },
                { email },
            ]
        })

        if (employee) {
            if (employee.phone === phone) {
                return res.status(400).json({ message: "Phone number already registered" })
            }
            if (employee.email === email) {
                return res.status(400).json({ message: "Email already registered" })
            }
        }

        if (name) updates.name = name;
        if (phone) updates.phone = phone
        if (email) updates.email = email
        if (address) updates.address = address
        if (salary) updates.salary = salary
        if (joiningDate) updates.joiningDate = joiningDate
        if (designation) updates.designation = designation
        if (profilePic || profilePic == null) updates.profilePic = profilePic
        if (isActive !== undefined) updates.isActive = isActive;

        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: employeeId, employerId: req.employer._id },
            updates,
            { runValidators: true, returnDocument: 'after' }
        )

        return res.status(200).json({
            updatedEmployee, message: "Employee updated successfully"
        })
    } catch (error) {
        console.log("Error in updateEmployee controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteEmployee = async (req, res) => {
    try {
        const employeeId = req.params.employeeId;

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid employee id" });
        }

        const employee = await Employee.findOneAndDelete({
            _id: employeeId, employerId: req.employer._id
        })
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" })
        }
        return res.status(200).json({ message: "Employee deleted successfully" })
    } catch (error) {
        console.log("Error in deleteEmployee controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const searchEmployee = async (req, res) => {
    try {

        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }
        const employees = await Employee.find({
            employerId: new mongoose.Types.ObjectId(req.employer._id),
            name: { $regex: query, $options: "i" },
        }).select({ name: 1, designation: 1, profilePic: 1 }).limit(6);

        return res.status(200).json({ employees });
    } catch (error) {
        console.log("Error in searchEmployee controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}