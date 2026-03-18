import Advance from "../models/advance.model.js";
import Employee from "../models/employee.model.js"
import SalaryRecord from "../models/salary.record.model.js";

const getTotalAdvance = (start, end, employerId) => {
    return Advance.aggregate([
        {
            $match: {
                employerId,
                date: {
                    $gte: start, $lt: end
                }
            }
        }, {
            $group: {
                _id: null,
                totalAdvance: { $sum: "$amount" }
            }
        }
    ])
}

export const getDashboardData = async (req, res) => {
    try {

        const month = req.query.month;
        const employerId = req.employer._id;

        if (!month) {
            return res.status(400).json({ message: "Month is required" })
        }

        const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;

        if (!monthRegex.test(month)) {
            return res.status(400).json({
                message: "Month must be in YYYY-MM format"
            });
        }

        const [year, monthNumber] = month.split('-').map(Number)

        const startOfPreviousMonth = new Date(Date.UTC(year, monthNumber - 2, 1))
        const startOfCurrentMonth = new Date(Date.UTC(year, monthNumber - 1, 1))
        const startOfNextMonth = new Date(Date.UTC(year, monthNumber, 1))

        const previousMonth = startOfPreviousMonth.getUTCFullYear() +
            "-" +
            String(startOfPreviousMonth.getUTCMonth() + 1).padStart(2, "0");

        const [
            totalEmployees,
            totalAdvanceResult,
            totalSalaryResult,
            totalAdvanceResultPrevMonth,
            totalSalaryRecordPrevMonth
        ] = await Promise.all([

            Employee.countDocuments({ employerId }),

            getTotalAdvance(startOfCurrentMonth, startOfNextMonth, employerId),

            Employee.aggregate([
                { $match: { employerId } },
                {
                    $group: {
                        _id: null,
                        totalSalary: { $sum: "$salary" }
                    }
                }
            ]),

            getTotalAdvance(startOfPreviousMonth, startOfCurrentMonth, employerId),

            SalaryRecord.aggregate([
                {
                    $match: {
                        employerId,
                        month: previousMonth
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalSalary: { $sum: '$totalSalary' },
                        totalAdvance: { $sum: "$totalAdvance" },
                        finalPayable: { $sum: "$finalPayable" },
                        pendingSalary: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "Pending"] }, "$finalPayable", 0]
                            }
                        },
                        paidSalary: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "Paid"] }, "$finalPayable", 0]
                            }
                        },
                        pendingEmployees: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "Pending"] }, 1, 0]
                            }
                        },
                        paidEmployees: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "Paid"] }, 1, 0]
                            }
                        },
                    }
                }
            ])
        ])

        // Current month advance
        const totalAdvance = totalAdvanceResult[0]?.totalAdvance ?? 0;

        // Current month salary
        const totalSalary = totalSalaryResult[0]?.totalSalary ?? 0;

        // Previous month advance
        const totalAdvancePrevMonth = totalAdvanceResultPrevMonth[0]?.totalAdvance ?? 0;

        // Previous month salary
        const salaryRecord = totalSalaryRecordPrevMonth[0] ?? {}

        return res.status(200).json({
            currentMonth: {
                month,
                totalEmployees,
                totalAdvance,
                totalSalary
            },
            previousMonth: {
                month: previousMonth,
                totalEmployees: totalEmployees ?? 0,
                totalAdvance: totalAdvancePrevMonth ?? 0,
                totalSalary: salaryRecord.totalSalary ?? 0,
                totalPayable: salaryRecord.finalPayable ?? 0,
                totalPaid: salaryRecord.paidSalary ?? 0,
                totalPending: salaryRecord.pendingSalary ?? 0,
                paidEmployees: salaryRecord.paidEmployees ?? 0,
                pendingEmployees: salaryRecord.pendingEmployees ?? 0
            }
        })
    } catch (error) {
        console.log("Error in getDashboardData controller : ", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}