import dayjs from "dayjs";
import React from "react";
import { useSelector } from "react-redux";

const AdvanceHistory = () => {
  const { advanceHistory } = useSelector((state) => state.employee);

  if (!advanceHistory || advanceHistory.length === 0) {
    return (
      <div className="p-8 text-center bg-surface-container/50 border border-outline-variant/10 rounded-xl my-4 mx-8">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>
          account_balance_wallet
        </span>
        <h3 className="text-on-surface font-bold text-lg">No Advance History</h3>
        <p className="text-on-surface-variant text-sm mt-1">This employee hasn't taken any advance payments yet.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="space-y-10">
        {advanceHistory?.map((item, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-on-surface-variant text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4">
                {item.month}
              </h3>
              <p className="text-xs font-bold text-error uppercase tracking-wider">
                Total: ₹ {item.totalAmount?.toLocaleString('en-IN') || 0}
              </p>
            </div>
            <div className="space-y-4">
              {item?.advances?.map((adv, idx) => (
                <div key={idx} className="flex items-center justify-between p-5 bg-surface-container rounded-xl hover:bg-surface-bright transition-all group">
                  <div className="flex items-center gap-5">
                    <div>
                      <p className="text-on-surface font-bold text-lg">
                        {adv?.reason}
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
