import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-high border border-outline-variant/10 p-3 rounded-lg shadow-xl">
        <p className="text-on-surface font-bold text-sm mb-1">{label}</p>
        <p className="text-primary font-black">
          ₹ {payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

const DashboardCharts = () => {
  const { customMonth, customMonthLoading, loading } = useSelector((state) => state.dashboard);

  if (loading || customMonthLoading || !customMonth) {
    return null; // Or a skeleton loader
  }

  const formattedMonth = dayjs(customMonth.month).format('MMMM YYYY');

  const barData = [
    { name: "Total Salary", amount: customMonth?.totalSalary || 0 },
    { name: "Advance", amount: customMonth?.advance || 0 },
    { name: "Paid", amount: customMonth?.paidAmount || 0 },
    { name: "Pending", amount: customMonth?.pendingAmount || 0 },
  ];

  const pieData = [
    { name: "Paid Staff", value: customMonth?.paidStaff || 0 },
    { name: "Pending Staff", value: customMonth?.pendingStaff || 0 },
  ];

  const PIE_COLORS = ['#4ade80', '#ef4444'];

  return (
    <section className="mb-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Bar Chart Section */}
      <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-outline-variant/10">
        <h3 className="text-lg font-bold text-on-surface mb-6">Financials ({formattedMonth})</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a3aac4', fontSize: 12 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a3aac4', fontSize: 12 }}
                tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
              />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: '#ffffff05' }} />
              <Bar dataKey="amount" fill="#ba9eff" radius={[4, 4, 0, 0]} maxBarSize={60} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart Section */}
      <div className="glass-card rounded-xl p-6 border border-outline-variant/10 flex flex-col">
        <h3 className="text-lg font-bold text-on-surface mb-2">Staff Payroll Status ({formattedMonth})</h3>
        <p className="text-sm text-on-surface-variant mb-6">Distribution of settled vs pending salaries.</p>
        <div className="flex-1 w-full flex items-center justify-center min-h-[200px]">
          {pieData[0].value === 0 && pieData[1].value === 0 ? (
             <div className="text-on-surface-variant text-sm text-center">No staff data available for current month.</div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#141f38', borderColor: '#ffffff10', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  iconType="circle"
                  formatter={(value) => <span className="text-on-surface-variant text-sm font-medium">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </section>
  );
};

export default DashboardCharts;
