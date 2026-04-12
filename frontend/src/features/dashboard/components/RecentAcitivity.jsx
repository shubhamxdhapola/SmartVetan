import { useSelector } from "react-redux";
import Pagination from "../../../components/common/Pagination";
import Skeleton from "react-loading-skeleton";

const TABLE_HEADINGS = [
  "Employee",
  "Designation",
  "Base Salary",
  "Total Salary",
  "Latest Advance",
  "Net Payable",
];

const RecentAcitivity = () => {
  const { recentAdvances, loading } = useSelector((state) => state.dashboard);
  const { currentPage } = useSelector((state) => state.pagination);
  const itemsPerPage = 3;
  const startIndex = currentPage * itemsPerPage - itemsPerPage;
  const endIndex = currentPage * itemsPerPage;

  return (
    <section>
      <div className="bg-surface-container-low rounded-lg overflow-x-auto no-scrollbar mb-12 md:mb-0">
        <div className="p-6 border-b border-outline-variant/10 flex items-center justify-between">
          <h3 className="text-lg font-bold">Recent Payroll Entries</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-high/50">
                {TABLE_HEADINGS.map((heading) => (
                  <th
                    key={heading}
                    className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider whitespace-nowrap"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/5">
              {loading
                ? [...Array(3)].map((_, i) => (
                    <tr
                      key={`row-${i}`}
                      className="hover:bg-surface-bright/30 transition-colors space-x-4"
                    >
                      {[...Array(6)].map((_, j) => (
                        <td className="px-4 py-4">
                          <Skeleton
                            key={`cell-${j}`}
                            height="20px"
                            borderRadius={3}
                            baseColor="#141f38"
                            highlightColor="#1f2b49"
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                : recentAdvances?.slice(startIndex, endIndex)?.map((item) => (
                    <tr
                      key={item?.empId}
                      className="hover:bg-surface-bright/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-9 w-9 rounded-full flex items-center justify-center text-xs font-bold border border-primary/30 overflow-hidden bg-surface-container-highest`}
                          >
                            {item?.empProfilePic ? (
                              <img
                                alt="User profile avatar"
                                className="w-full h-full object-cover"
                                src={item?.empProfilePic}
                              />
                            ) : (
                              item?.empName.split("")[0]
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold whitespace-nowrap">
                              {item.empName}
                            </p>
                            <p className="text-xs text-on-surface-variant">
                              SV-{item.empId.slice(-3).toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap">
                        {item?.designation || " N/A "}{" "}
                      </td>
                      <td className="px-6 py-4 text-sm font-['Manrope'] whitespace-nowrap">
                        ₹ {item.empSalary.toLocaleString("en-IN")}
                      </td>
                      <td
                        className={`px-6 py-4 text-sm font-['Manrope'] whitespace-nowrap ${item.advance !== "₹ 0" ? "text-error" : "text-on-surface-variant"}`}
                      >
                        ₹ {item.totalAdvance.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold font-['Manrope'] whitespace-nowrap">
                        ₹ {item.latestAdvance.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold font-['Manrope'] whitespace-nowrap">
                        ₹ {item?.netPayable.toLocaleString("en-IN")}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={recentAdvances?.length}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </section>
  );
};

export default RecentAcitivity;
