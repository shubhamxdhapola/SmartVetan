import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

const AdvanceHistory = () => {
  const { advanceHistory } = useSelector((state) => state.employee);
  console.log(advanceHistory);
  return (
    <div className="p-8">
      <div className="space-y-10">
        {advanceHistory?.map((item) => (
          <div>
            <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-4">
              {item.month}
              <span className="h-px flex-1 bg-outline-variant/10"></span>
            </h3>
            <div className="space-y-4">
              {item?.advances?.map((adv) => (
                <div className="flex items-center justify-between p-5 bg-surface-container rounded-xl hover:bg-surface-bright transition-all group">
                  <div className="flex items-center gap-5">
                    <div>
                      <p className="text-on-surface font-bold text-lg">
                        {adv?.note}
                      </p>
                      <p className="text-on-surface-variant text-sm">
                        {dayjs(adv?.date).format("DD MMM YYYY")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-on-surface font-black ">
                      ₹ {adv?.amount?.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvanceHistory;
