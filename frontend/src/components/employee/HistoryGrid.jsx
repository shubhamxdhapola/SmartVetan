import React from "react";
import { useSelector } from "react-redux";
import { getFormattedMonth } from "../../utils/helper";

const HistoryGrid = () => {
  const { salaryHistory } = useSelector((state) => state.employee);
  const { advanceHistory } = useSelector((state) => state.employee);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
      {/* Salary History */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 min-h-[280px] flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-headline flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary-dim"
              data-icon="history"
            >
              history
            </span>
            Salary History
          </h3>
          <button className="text-xs font-bold text-primary hover:underline underline-offset-4">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-on-surface-variant border-b border-outline-variant/10">
                <th className="pb-3 font-semibold">Month</th>
                <th className="pb-3 font-semibold">Salary</th>
                <th className="pb-3 font-semibold">Advance</th>
                <th className="pb-3 font-semibold text-right">Net Payable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {salaryHistory?.map((item, index) => (
                <tr
                  className="hover:bg-surface-bright/50 transition-colors"
                  key={item?._id}
                >
                  <td className="py-4 font-medium">
                    {getFormattedMonth(item?.month)}
                  </td>
                  <td className="py-4 text-on-surface-variant">
                    ₹{item?.salary.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 text-error-dim">
                    ₹{item?.totalAdvance.toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 text-right font-bold text-primary">
                    ₹{item?.netPayable.toLocaleString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Advance History */}
      <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 min-h-[280px] flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-headline flex items-center gap-2">
            <span
              className="material-symbols-outlined text-secondary"
              data-icon="account_balance"
            >
              account_balance
            </span>
            Advance History
          </h3>
          <button className="text-xs font-bold text-secondary hover:underline underline-offset-4">
            Create New
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-on-surface-variant border-b border-outline-variant/10">
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Amount</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              <tr className="hover:bg-surface-bright/50 transition-colors">
                <td className="py-4 font-medium">15 Sep 2023</td>
                <td className="py-4">₹5,000</td>
                <td className="py-4 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                    Recovered
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-bright/50 transition-colors">
                <td className="py-4 font-medium">02 Jul 2023</td>
                <td className="py-4">₹12,000</td>
                <td className="py-4 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                    Recovered
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-surface-bright/50 transition-colors">
                <td className="py-4 font-medium">10 May 2023</td>
                <td className="py-4">₹2,500</td>
                <td className="py-4 text-right">
                  <span className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary text-[10px] font-bold uppercase tracking-wider">
                    Recovered
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-auto pt-4 flex justify-center">
          <p className="text-[10px] text-on-surface-variant flex items-center gap-1 italic">
            <span
              className="material-symbols-outlined text-[12px]"
              data-icon="info"
            >
              info
            </span>
            Advances are deducted from the next month's payout
          </p>
        </div>
      </div>
    </section>
  );
};

export default HistoryGrid;
