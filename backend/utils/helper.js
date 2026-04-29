import Advance from "../models/advance.model.js";
import Employee from "../models/employee.model.js";
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

export const getStatsByMonth = async (month, employerId) => {

    const [year, monthNumber] = month.split('-').map(Number);
    const start = new Date(Date.UTC(year, monthNumber - 1, 1));
    const end = new Date(Date.UTC(year, monthNumber, 1));

    const [employeeStats, advances, salaryRecord] = await Promise.all([
        Employee.aggregate([
            { $match: { employerId } },
            {
                $group: {
                    _id: null,
                    count: { $sum: 1 },
                    totalSalary: { $sum: "$salary" }
                }
            }
        ]),
        getTotalAdvance(start, end, employerId),
        SalaryRecord.aggregate([
            { $match: { employerId, month } },
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: "$baseSalary" },
                    finalPayable: { $sum: "$finalPayable" },
                    paidAmount: { $sum: { $cond: [{ $eq: ["$status", "Paid"] }, "$finalPayable", 0] } },
                    pendingAmount: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, "$finalPayable", 0] } },
                    paidStaff: { $sum: { $cond: [{ $eq: ["$status", "Paid"] }, 1, 0] } },
                    pendingStaff: { $sum: { $cond: [{ $eq: ["$status", "Pending"] }, 1, 0] } }
                }
            }
        ])
    ]);
    const stats = salaryRecord[0] || {};
    const employees = employeeStats[0]?.count || 0;

    const now = new Date();
    const currentMonthStr = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;

    const totalSalary = month === currentMonthStr
        ? (employeeStats[0]?.totalSalary || 0)
        : (stats.totalSalary || 0);

    const advance = advances[0]?.totalAdvance || 0;
    const payable = totalSalary - advance;

    return {
        month,
        employees,
        advance,
        totalSalary,
        payable,
        paidAmount: stats.paidAmount || 0,
        pendingAmount: stats.pendingAmount || 0,
        paidStaff: stats.paidStaff || 0,
        pendingStaff: stats.pendingStaff || 0
    };
};

export const getRecentAdvances = async (employerId) => {

    return await Advance.aggregate([

        { $match: { employerId } },
        { $sort: { createdAt: -1 } },
        {
            $group: {
                _id: "$employeeId",
                totalAdvance: { $sum: "$amount" },
                latestAdvance: { $first: "$$ROOT" }
            }
        },
        { $limit: 15 },
        {
            $lookup: {
                from: "employees",
                localField: "_id",
                foreignField: "_id",
                as: "employee"
            }
        },
        { $unwind: "$employee" },
        {
            $project: {
                _id: 0,
                empId: "$_id",
                empName: "$employee.name",
                empProfilePic: "$employee.profilePic",
                designation: "$employee.designation",
                empSalary: "$employee.salary",
                totalAdvance: 1,
                latestAdvance: "$latestAdvance.amount",
                date: "$latestAdvance.date",
                netPayable: {
                    $subtract: ["$employee.salary", "$totalAdvance"]
                }

            }
        }
    ]);

}

export const getDailyAdvancesForMonth = async (month, employerId) => {
    const [year, monthNumber] = month.split('-').map(Number);
    const start = new Date(Date.UTC(year, monthNumber - 1, 1));
    const end = new Date(Date.UTC(year, monthNumber, 1));

    const dailyAdvances = await Advance.aggregate([
        {
            $match: {
                employerId,
                date: { $gte: start, $lt: end }
            }
        },
        {
            $group: {
                _id: { $dayOfMonth: "$date" },
                amount: { $sum: "$amount" }
            }
        },
        { $sort: { "_id": 1 } }
    ]);

    // Format into an array from day 1 to current day (or end of month)
    const now = new Date();
    // If it's the current month, fill up to today. If historical, fill up to end of month.
    let lastDay = new Date(year, monthNumber, 0).getDate();
    if (now.getUTCFullYear() === year && (now.getUTCMonth() + 1) === monthNumber) {
        lastDay = now.getUTCDate();
    }

    const chartData = [];
    let advanceMap = {};
    dailyAdvances.forEach(item => {
        advanceMap[item._id] = item.amount;
    });

    for (let i = 1; i <= lastDay; i++) {
        chartData.push({
            day: i,
            amount: advanceMap[i] || 0
        });
    }

    return chartData;
};