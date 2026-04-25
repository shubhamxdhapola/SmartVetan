import Employee from "../models/employee.model.js";
import { getRecentAdvances, getStatsByMonth, getDailyAdvancesForMonth } from "../utils/helper.js";

export const getDashboardData = async (req, res) => {
    try {
        const employerId = req.employer._id;
        const now = new Date();

        // Format: YYYY-MM
        const currentMonth = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, "0")}`;

        // Calculate Previous Month
        const prevDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
        const previousMonth = `${prevDate.getUTCFullYear()}-${String(prevDate.getUTCMonth() + 1).padStart(2, "0")}`;

        const [
            currentMonthStats,
            prevMonthStats,
            crrMnthTotalSal,
            recentAdvances,
            dailyAdvances
        ] = await Promise.all([
            getStatsByMonth(currentMonth, employerId),
            getStatsByMonth(previousMonth, employerId),
            Employee.aggregate([
                { $match: { employerId } },
                {
                    $group: {
                        _id: null,
                        totalSalary: { $sum: "$salary" }
                    }
                }
            ]),
            getRecentAdvances(employerId),
            getDailyAdvancesForMonth(currentMonth, employerId)
        ]);


        const totalSalary = crrMnthTotalSal[0]?.totalSalary || {};

        return res.status(200).json({
            recentAdvances,
            prevMonthStats,
            dailyAdvances,
            currentMonthStats: { ...currentMonthStats, totalSalary },
        });
    } catch (error) {
        console.error("Error in getDashboardData controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getHistoricalData = async (req, res) => {
    try {
        const { month } = req.query;
        const employerId = req.employer._id;

        if (!month) return res.status(400).json({ message: "Month is required" });

        const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;
        if (!monthRegex.test(month)) {
            return res.status(400).json({
                message: "Month must be in YYYY-MM format"
            });
        }

        const stats = await getStatsByMonth(month, employerId);

        return res.status(200).json({ stats });
    } catch (error) {
        console.error("Error in getHistoricalData controller:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
