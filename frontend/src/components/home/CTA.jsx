const statsData = [
  { value: "80%", label: "Time Saved", colorClass: "text-primary" },
  { value: "100%", label: "Compliance", colorClass: "text-secondary" },
  { value: "24/7", label: "Active Support", colorClass: "text-tertiary" },
  { value: "0%", label: "Disbursement Error", colorClass: "text-error" },
];
const CTA = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 pb-20 mt-40">
      <div className="bg-gradient-to-br from-surface-container-high to-surface p-12 lg:p-20 relative overflow-hidden border border-outline-variant/10">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <div className="grid grid-cols-6 gap-2">
            <div className="h-40 bg-primary"></div>
            <div className="h-20 bg-secondary"></div>
            <div className="h-60 bg-tertiary"></div>
            <div className="h-30 bg-primary"></div>
            <div className="h-50 bg-secondary"></div>
            <div className="h-20 bg-tertiary"></div>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-on-surface">
              Ready to evolve your payroll?
            </h2>
            <p className="text-on-surface-variant text-lg">
              Join forward-thinking companies that have reduced their payroll
              processing time by over 80%.
            </p>
            <div className="flex gap-4">
              <button className="bg-primary text-on-primary-container font-bold px-8 py-3 rounded-sm active:scale-95 transition-transform">
                Create Account
              </button>
              <button className="text-on-surface font-bold px-8 py-3 rounded-sm border border-outline-variant hover:bg-surface-bright transition-colors">
                Contact Sales
              </button>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {statsData.map((stat, index) => (
                <div
                  key={index}
                  className="glass-card p-6 border border-outline-variant/20 rounded-sm"
                >
                  <div className={`text-3xl font-bold ${stat.colorClass} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-on-surface-variant">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
