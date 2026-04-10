const CurrentMonthStatsCard = ({ label, value, Icon }) => {
  return (
    <div>
      <div className="bg-surface-container-high mt-1 p-6 rounded-lg relative overflow-hidden group hover:bg-surface-bright transition-all duration-300">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Icon className="text-5xl" />
        </div>
        <p className="text-on-surface-variant text-sm font-medium mb-2">
          {label}
        </p>
        <h3 className="text-4xl font-extrabold text-[#dee5ff] tracking-tight mb-4">
          {value?.toLocaleString("en-IN")}
        </h3>
      </div>
    </div>
  );
};

export default CurrentMonthStatsCard;
