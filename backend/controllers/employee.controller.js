import Employee from "../models/employee.model.js";

export const getEmployees = async (req, res) => {
    try {
        let employees = await Employee.find({
            employerId: req.employer._id
        })
        return res.status(200).json({ employees })
    } catch (error) {
        console.log("Error in getEmployees controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const addEmployee = async (req, res) => {
    try {
        const { name, phone, email, address, aadhar, salary, profilePic } = req.body;

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
            name, phone, email, address, aadhar, salary, profilePic
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
        const { name, phone, email, address, salary, profilePic } = req.body;

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
        if (profilePic || profilePic == null) updates.profilePic = profilePic

        const updatedEmployee = await Employee.findOneAndUpdate(
            { _id: employeeId, employerId: req.employer._id },
            updates,
            { runValidators: true, new: true }
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