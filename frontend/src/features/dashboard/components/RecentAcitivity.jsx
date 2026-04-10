import dayjs from "dayjs";
import { useSelector } from "react-redux";

const RecentAcitivity = () => {
  const { recentAdvances } = useSelector((state) => state.dashboard);
  

  return (
    <section>
      <div className="bg-surface-container-low rounded-lg overflow-hidden">
        <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
          <h3 className="text-lg font-bold">Recent Payroll Entries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/50">
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Designation
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
                <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Date
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
                  <td className="px-6 py-4 text-sm">{item?.designation}</td>
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
                  <td className="px-6 py-4 text-sm font-bold font-['Manrope']">
                    {dayjs(item?.date).format("DD MMM YY")}
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
