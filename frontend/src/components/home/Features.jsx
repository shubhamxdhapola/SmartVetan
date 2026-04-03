const featuresData = [
    {
      icon: "auto_awesome",
      iconColor: "text-primary",
      title: "Smart Automation",
      description: "Let AI handle the repetitive calculations for taxes, deductions, and bonuses with 99.9% accuracy.",
      bgClass: "bg-surface-container",
    },
    {
      icon: "verified_user",
      iconColor: "text-secondary",
      title: "Bank-Grade Security",
      description: "End-to-end encryption with multi-factor authentication and SOC2 Type II compliance standards.",
      bgClass: "bg-surface-container-low",
    },
    {
      icon: "query_stats",
      iconColor: "text-tertiary",
      title: "Real-time Analytics",
      description: "Live visualization of payroll trends, employee costs, and budget forecasts in an editorial layout.",
      bgClass: "bg-surface-container",
    },
    {
      icon: "account_tree",
      iconColor: "text-error",
      title: "Global Payouts",
      description: "Distribute salaries in 40+ currencies across 150 countries with local compliance automation.",
      bgClass: "bg-surface-container-low",
    },
    {
      icon: "integration_instructions",
      iconColor: "text-primary-fixed",
      title: "Seamless API",
      description: "A developer-first API that plugs directly into your existing HRMS, ERP, or accounting software.",
      bgClass: "bg-surface-container",
    },
    {
      icon: "history_edu",
      iconColor: "text-secondary-fixed",
      title: "Compliance Audit",
      description: "Automatic generation of statutory reports and tax filings to ensure you're always audit-ready.",
      bgClass: "bg-surface-container-low",
    },
  ];

const Features = () => {
  return (
  <section className="max-w-7xl mx-auto px-8 mt-40">
      <div className="mb-20 text-center space-y-4">
        <h2 className="text-3xl font-bold text-on-surface">
          Engineered for Scalability
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto"></div>
        <p className="text-on-surface-variant max-w-xl mx-auto">
          The infrastructure to handle thousands of employees with microsecond
          latency and absolute accuracy.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {featuresData.map((feature, index) => (
          <div
            key={index}
            className={`p-10 ${feature.bgClass} border border-outline-variant/10 hover:bg-surface-container-high transition-colors group`}
          >
            <span
              className={`material-symbols-outlined ${feature.iconColor} text-4xl mb-6 block group-hover:scale-110 transition-transform`}
              data-icon={feature.icon}
            >
              {feature.icon}
            </span>
            <h3 className="text-xl font-bold mb-4 text-on-surface">
              {feature.title}
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;