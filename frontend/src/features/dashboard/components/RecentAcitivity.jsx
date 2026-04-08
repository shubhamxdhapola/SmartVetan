import React from "react";
import { useSelector } from "react-redux";

const RecentAcitivity = () => {
  const { recentAdvances } = useSelector((state) => state.dashboard);
  console.log(recentAdvances)
  const tableData = [
    {
      initial: "JD",
      name: "John Doe",
      empId: "EMP-2045",
      bgClass: "bg-primary/20",
      textClass: "text-primary",
      dept: "Engineering",
      base: "₹ 85,000",
      advance: "₹ 5,000",
      net: "₹ 80,000",
      status: "Paid",
      statusColor: "text-primary border-primary/20 bg-primary/10",
    },
    {
      initial: "AS",
      name: "Anita Sharma",
      empId: "EMP-2089",
      bgClass: "bg-secondary/20",
      textClass: "text-secondary",
      dept: "Marketing",
      base: "₹ 62,000",
      advance: "₹ 0",
      net: "₹ 62,000",
      status: "Pending",
      statusColor: "text-tertiary border-tertiary/20 bg-tertiary/10",
    },
    {
      initial: "RK",
      name: "Rajesh Kumar",
      empId: "EMP-2101",
      bgClass: "bg-error/20",
      textClass: "text-error",
      dept: "Operations",
      base: "₹ 45,000",
      advance: "₹ 12,500",
      net: "₹ 32,500",
      status: "Paid",
      statusColor: "text-primary border-primary/20 bg-primary/10",
    },
  ];

  return (
    <section>
      <div className="bg-surface-container-low rounded-lg overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
          <h3 className="text-lg font-bold">Recent Payroll Entries</h3>
          <div className="flex gap-2">
            <div className="relative">
              <input
                className="bg-surface-container-high border-none text-sm rounded-lg pl-10 pr-4 py-2 w-64 focus:ring-1 focus:ring-primary"
                placeholder="Search entries..."
                type="text"
              />
              <span
                className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm"
                data-icon="search"
              >
                search
              </span>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Base Salary
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Advance Taken
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Net Payable
                </th>
                {/* <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Status
                </th>  */}
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {recentAdvances?.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-surface-bright/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center  text-xs font-bold`}
                      >
                        {item.profilePic}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.empName}</p>
                        <p className="text-xs text-on-surface-variant">
                          {item.empId.slice(-3).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">Human Resource</td>
                  <td className="px-6 py-4 text-sm font-['Manrope']">
                    {item.empSalary}
                  </td>
                  <td
                    className={`px-6 py-4 text-sm font-['Manrope'] ${item.advance !== "₹ 0" ? "text-error" : "text-on-surface-variant"}`}
                  >
                    {item.advance}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold font-['Manrope']">
                    {item.empSalary - item.advance}
                  </td>
                  {/* <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${row.statusColor}`}
                    >
                      {row.status}
                    </span>
                  </td> */}
                  <td className="px-6 py-4">
                    <button className="text-on-surface-variant hover:text-primary transition-colors">
                      <span
                        className="material-symbols-outlined text-lg"
                        data-icon="more_vert"
                      >
                        more_vert
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-outline-variant/10 flex items-center justify-between">
          <p className="text-xs text-on-surface-variant">
            Showing 3 of 482 entries
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded border border-outline-variant/20 text-xs hover:bg-surface-container-high transition-colors">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-primary/10 border border-primary/20 text-xs text-primary font-bold">
              1
            </button>
            <button className="px-3 py-1 rounded border border-outline-variant/20 text-xs hover:bg-surface-container-high transition-colors">
              2
            </button>
            <button className="px-3 py-1 rounded border border-outline-variant/20 text-xs hover:bg-surface-container-high transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentAcitivity;
