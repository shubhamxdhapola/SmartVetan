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

    const [employees, advances, salaryRecord] = await Promise.all([
        Employee.countDocuments({ employerId }),
        getTotalAdvance(start, end, employerId),
        SalaryRecord.aggregate([
            { $match: { employerId, month } },
            {
                $group: {
                    _id: null,
                    totalSalary: { $sum: "$totalSalary" },
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

    return {
        month,
        employees,
        advance: advances[0]?.totalAdvance || 0,
        totalSalary: stats.totalSalary || 0,
        payable: stats.finalPayable || 0,
        paidAmount: stats.paidAmount || 0,
        pendingAmount: stats.pendingAmount || 0,
        paidStaff: stats.paidStaff || 0,
        pendingStaff: stats.pendingStaff || 0
    };
};

export const getRecentAdvances = async (employerId) => {

    const advances = await Advance.find({ employerId })
        .select('amount')
        .populate('employeeId', '_id name profilePic salary')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean();

    const result = advances.map(item => ({
        _id: item._id,
        advance: item.amount,
        empId: item?.employeeId?._id,
        empName: item?.employeeId?.name,
        empSalary: item?.employeeId?.salary,
        profilePic: item?.employeeId?.profilePic
    }))

    return result

}