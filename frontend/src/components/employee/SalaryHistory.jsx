import React from "react";
import { useSelector } from "react-redux";
import { getFormattedMonth } from "../../utils/helper";
import dayjs from "dayjs";

const SalaryHistory = () => {
  const { salaryHistory } = useSelector((state) => state.employee);

  if (!salaryHistory || salaryHistory.length === 0) {
    return (
      <div className="p-8 text-center bg-surface-container/50 border border-outline-variant/10 rounded-xl my-4 mx-8">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>
          receipt_long
        </span>
        <h3 className="text-on-surface font-bold text-lg">No Salary History</h3>
        <p className="text-on-surface-variant text-sm mt-1">This employee hasn't received any salary payments yet.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead>
            <tr className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              <th className="pb-4 px-4">Month</th>
              <th className="pb-4 px-4 text-right">Base Salary</th>
              <th className="pb-4 px-4 text-right">Advance</th>
              <th className="pb-4 px-4 text-right">Net Amount</th>
              <th className="pb-4 px-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {salaryHistory?.map((item) => (
              <tr className="bg-surface-container/50 hover:bg-surface-bright transition-colors rounded-xl overflow-hidden">
                <td className="py-5 px-4 first:rounded-l-xl">
                  <div className="font-bold text-on-surface text-lg">
                    {getFormattedMonth(item?.month)}
                  </div>
                  <div className="text-xs text-on-surface-variant">
                    {item.paidDate
                      ? ` Paid on ${dayjs(item?.paidDate).format("DD MMM, YYYY")}`
                      : "Yet to be paid"}
                  </div>
                </td>

                <td className="py-5 px-4 text-right font-medium text-on-surface text-lg">
                  ₹ {item?.totalSalary?.toLocaleString("en-IN")}
                </td>
                <td className="py-5 px-4 text-right font-medium text-error text-lg">
                  - ₹ {item?.totalAdvance?.toLocaleString("en-IN")}
                </td>
                <td className="py-5 px-4 text-right font-black text-primary text-xl">
                  ₹ {item?.finalPayable?.toLocaleString("en-IN")}
                </td>
                <td className="py-5 px-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${item?.status === "Paid" ? "bg-tertiary/10 text-tertiary" : "bg-error/10 text-error"} text-[10px] font-bold uppercase tracking-wider`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${item?.status === "Paid" ? "bg-tertiary" : "bg-error "}`}
                    ></span>{" "}
                    {item?.status === "Paid" ? "Settled" : "Pending"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalaryHistory;
