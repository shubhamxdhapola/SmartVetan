const HistoricalDataStatsCard = ({ label, color, value }) => {
  return (
    <div className="bg-surface-container-low p-4 mt-1 rounded-lg border border-outline-variant/10">
      <p className="text-on-surface-variant text-xs uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className={`text-xl font-bold ${color || ""}`}>{value}</p>
    </div>
  );
};

export default HistoricalDataStatsCard;
