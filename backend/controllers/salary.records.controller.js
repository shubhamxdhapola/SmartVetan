import Advance from '../models/advance.model.js';
import Employee from '../models/employee.model.js'
import SalaryRecord from '../models/salary.records.model.js';
import mongoose from 'mongoose';

export const generateSalary = async (req, res) => {
    try {

        const employeeId = req.params.employeeId;
        const employerId = req.employer._id;

        const { month } = req.body;

        if (!month) {
            return res.status(400).json({ message: "Month is required" });
        }

        const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;

        if (!monthRegex.test(month)) {
            return res.status(400).json({
                message: "Month must be in YYYY-MM format"
            });
        }

        const currentMonth = new Date().toISOString().slice(0, 7);

        if (month > currentMonth) {
            return res.status(400).json({
                message: "Cannot generate salary for future month"
            });
        }

        const employee = await Employee.findOne({ _id: employeeId, employerId })

        if (!employee) {
            return res.status(404).json({ message: "Employee not found" })
        }

        let isSalaryGenerated = await SalaryRecord.findOne({ employeeId, employerId, month })

        if (isSalaryGenerated) {
            return res.status(400).json({ message: "Salary already generated" })
        }

        const [year, monthNumber] = month.split('-')

        const startOfMonth = new Date(year, monthNumber - 1, 1);
        const endOfMonth = new Date(year, monthNumber, 0, 23, 59, 59);

        const result = await Advance.aggregate([
            {
                $match: { // Filtering the advance for a employee
                    employeeId: new mongoose.Types.ObjectId(employeeId),
                    employerId: new mongoose.Types.ObjectId(employerId),
                    date: {
                        $gte: startOfMonth,
                        $lte: endOfMonth,
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalAdvance: { $sum: '$amount' }
                }
            }
        ])

        const totalSalary = employee.salary;

        const totalAdvance = result.length > 0
            ? result[0].totalAdvance
            : 0;

        const finalPayable = totalSalary - totalAdvance;

        const salaryRecord = await SalaryRecord.create({
            employeeId, employerId, month, totalSalary, totalAdvance, finalPayable,
        })

        return res.status(201).json({
            salaryRecord, message: "Salary generated"
        })

    } catch (error) {
        console.log("Error in generateSalary controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}