import mongoose from "mongoose";
import Advance from "../models/advance.model.js";
import SalaryRecord from '../models/salary.record.model.js'
import Employee from "../models/employee.model.js";

// ─── GET /api/advance?month=YYYY-MM ──────────────────────────────────────────
export const getAdvances = async (req, res) => {
    try {
        const employerId = req.employer._id;
        const { month } = req.query;

        let query = { employerId };

        if (month) {
            const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
            if (!monthRegex.test(month)) {
                return res.status(400).json({ message: "Month must be in YYYY-MM format" });
            }
            const [year, monthNum] = month.split('-').map(Number);
            const start = new Date(Date.UTC(year, monthNum - 1, 1));
            const end = new Date(Date.UTC(year, monthNum, 1));
            query.date = { $gte: start, $lt: end };
        }

        const advances = await Advance.find(query)
            .populate('employeeId', 'name profilePic designation')
            .sort({ date: -1 });

        return res.status(200).json({ advances: advances.map(a => a.toObject()) });

    } catch (error) {
        console.log("Error in getAdvances controller : ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// ─── GET /api/advance/stats?month=YYYY-MM ────────────────────────────────────
export const getAdvanceStats = async (req, res) => {
    try {
        const employerId = req.employer._id;
        const { month } = req.query;

        if (!month) return res.status(400).json({ message: "Month is required" });

        const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
        if (!monthRegex.test(month)) {
            return res.status(400).json({ message: "Month must be in YYYY-MM format" });
        }

        const [year, monthNum] = month.split('-').map(Number);
        const start = new Date(Date.UTC(year, monthNum - 1, 1));
        const end = new Date(Date.UTC(year, monthNum, 1));

        const [advanceAgg, salaryRecordAgg, currentSalaryAgg] = await Promise.all([
            Advance.aggregate([
                {
                    $match: {
                        employerId,
                        date: { $gte: start, $lt: end }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalAdvance: { $sum: "$amount" },
                        uniqueEmployees: { $addToSet: "$employeeId" }
                    }
                },
                {
                    $project: {
                        totalAdvance: 1,
                        employeesWithAdvance: { $size: "$uniqueEmployees" }
                    }
                }
            ]),
            // Use actual salary from SalaryRecord for the selected month
            SalaryRecord.aggregate([
                { $match: { employerId, month } },
                { $group: { _id: null, totalSalary: { $sum: "$baseSalary" } } }
            ]),
            // Fallback: current employee salaries (used when no salary records exist yet)
            Employee.aggregate([
                { $match: { employerId, isActive: true } },
                { $group: { _id: null, totalSalary: { $sum: "$salary" } } }
            ])
        ]);

        const totalAdvance = advanceAgg[0]?.totalAdvance || 0;
        const employeesWithAdvance = advanceAgg[0]?.employeesWithAdvance || 0;

        // For current month, use dynamic sum of active employee salaries.
        // For previous months, use recorded salaries from SalaryRecord.
        const now = new Date();
        const currentMonthStr = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;

        const totalSalary = month === currentMonthStr
            ? (currentSalaryAgg[0]?.totalSalary || 0)
            : (salaryRecordAgg[0]?.totalSalary || 0);

        const totalSalaryToBePaid = totalSalary - totalAdvance;

        return res.status(200).json({
            stats: {
                totalAdvance,
                employeesWithAdvance,
                totalSalaryToBePaid
            }
        });
    } catch (error) {
        console.log("Error in getAdvanceStats controller : ", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// ─── GET /api/employee/:employeeId/advance ───────────────────────────────────
export const getEmployeeAdvances = async (req, res) => {
    try {
        const employerId = req.employer._id;
        const employeeId = req.params.employeeId;

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid employee id" });
        }

        const advances = await Advance.find({ employeeId, employerId })
            .populate('employeeId', 'name profilePic designation')
            .sort({ date: -1 });

        return res.status(200).json({ advances })

    } catch (error) {
        console.log("Error in getEmployeeAdvances controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// ─── POST /api/employee/:employeeId/advance ───────────────────────────────────
export const addAdvance = async (req, res) => {
    try {
        const employerId = req.employer._id
        const employeeId = req.params.employeeId

        const { amount, reason, date } = req.body

        if (!mongoose.Types.ObjectId.isValid(employeeId)) {
            return res.status(400).json({ message: "Invalid employee id" });
        }

        if (!amount || !employeeId || !employerId) {
            return res.status(400).json({
                message: "Amount, employeeId or employerId are required"
            })
        }

        // Reject future dates — compare against start of today (UTC)
        if (date) {
            const advanceDate = new Date(date)
            const todayStart = new Date()
            todayStart.setUTCHours(0, 0, 0, 0)
            if (advanceDate > todayStart) {
                return res.status(400).json({
                    message: "Advance date cannot be in the future"
                })
            }
        }

        let advance = await Advance.create({
            employerId, employeeId, amount, reason, date
        })

        advance = await advance.populate('employeeId', 'name profilePic designation')

        return res.status(201).json({
            advance, message: "Advance added successfully"
        })

    } catch (error) {
        console.log("Error in addAdvance controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// ─── PATCH /api/advance/:advanceId ───────────────────────────────────────────
export const updateAdvance = async (req, res) => {
    try {
        const id = req.params.advanceId
        const employerId = req.employer._id
        const { amount, reason, date } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid advance id" });
        }

        const advance = await Advance.findOne({ _id: id, employerId })

        if (!advance) {
            return res.status(404).json({ message: "Advance not exists" })
        }

        const month = advance.date.toISOString().substring(0, 7)

        const isSalaryGenerated = await SalaryRecord.findOne(
            { employeeId: advance.employeeId, employerId, month }
        )

        if (isSalaryGenerated) {
            return res.status(400).json({
                message: "Cannot update advance. Salary already generated for this month"
            })
        }

        const updates = {}
        if (amount) updates.amount = amount
        if (reason) updates.reason = reason
        if (date) updates.date = date

        const updatedAdvance = await Advance.findOneAndUpdate(
            { _id: id, employerId },
            updates,
            { runValidators: true, new: true }
        ).populate('employeeId', 'name profilePic designation')

        return res.status(200).json({
            updatedAdvance, message: "Advance updated successfully"
        })

    } catch (error) {
        console.log("Error in updateAdvance controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

// ─── DELETE /api/advance/:advanceId ──────────────────────────────────────────
export const deleteAdvance = async (req, res) => {
    try {
        const id = req.params.advanceId
        const employerId = req.employer._id

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid advance id" });
        }
        const advance = await Advance.findOne({ _id: id, employerId })

        if (!advance) {
            return res.status(404).json({ message: "Advance not exists" })
        }

        const month = advance.date.toISOString().substring(0, 7)

        const isSalaryGenerated = await SalaryRecord.findOne(
            { employeeId: advance.employeeId, employerId, month }
        )

        if (isSalaryGenerated) {
            return res.status(400).json({
                message: "Cannot delete advance. Salary already generated for this month"
            })
        }

        await advance.deleteOne()
        return res.status(200).json({ message: "Advance deleted successfully" })

    } catch (error) {
        console.log("Error in deleteAdvance controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}