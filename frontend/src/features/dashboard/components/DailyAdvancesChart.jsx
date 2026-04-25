import React from 'react';
import { useSelector } from 'react-redux';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-high border border-outline-variant/10 p-3 rounded-lg shadow-xl">
        <p className="text-on-surface-variant font-bold text-xs mb-1 uppercase tracking-widest">Day {label}</p>
        <p className="text-error font-black text-lg">
          ₹ {payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

const DailyAdvancesChart = () => {
  const { dailyAdvances, loading } = useSelector((state) => state.dashboard);

  if (loading || !dailyAdvances) {
    return null; // Or a skeleton loader
  }

  // Calculate total advance for the month so far
  const totalAdvances = dailyAdvances.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section className="mb-12">
      <div className="glass-card rounded-xl p-6 border border-outline-variant/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div>
                <h3 className="text-xl font-bold text-on-surface">Daily Advance Trend</h3>
                <p className="text-sm text-on-surface-variant mt-1">Advances taken over the course of the current month</p>
            </div>
            <div className="bg-surface-container-low px-4 py-2 rounded-lg border border-error/10">
                <p className="text-[10px] text-error/80 uppercase tracking-widest font-bold">Total Till Now</p>
                <p className="text-xl font-black text-error">₹ {totalAdvances.toLocaleString('en-IN')}</p>
            </div>
        </div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dailyAdvances} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a3aac4', fontSize: 12 }} 
                dy={10}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#a3aac4', fontSize: 12 }}
                tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#ef4444" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorAmount)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#ef4444' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};

export default DailyAdvancesChart;
