import React from "react";

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-8 flex min-h-[calc(100vh-20px)] gap-12 items-center justify-center">
      <div className="lg:col-span-7 space-y-8 w/12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high border border-outline-variant/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
          </span>
          <span className="text-xs font-label uppercase tracking-widest text-tertiary">
            Now powering 500+ Enterprises
          </span>
        </div>

        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-on-surface">
          Master Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Payroll
          </span>{" "}
          with Precision.
        </h1>

        <p className="text-xl text-on-surface-variant max-w-2xl leading-relaxed">
          Automate salary disbursement, tax compliance, and employee benefits
          through a single, intelligent ledger designed for the modern digital
          workspace.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button className="bg-gradient-to-r from-primary-dim to-primary text-on-primary-container font-bold px-10 py-4 rounded-sm transition-all">
            Get Started
          </button>
          <button className="border border-outline-variant/30 text-on-surface font-bold px-10 py-4 rounded-sm hover:bg-surface-bright transition-colors">
            Book a Demo
          </button>
        </div>

        <div className="pt-8 flex items-center gap-6 opacity-60">
          <div className="flex gap-8 items-center grayscale invert">
            <div className="w-12 h-6 bg-on-surface/20 rounded-sm"></div>
            <div className="w-16 h-4 bg-on-surface/20 rounded-sm"></div>
            <div className="w-14 h-5 bg-on-surface/20 rounded-sm"></div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 relative w-1/2">
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full"></div>

        <div className="relative">
          <div className="bg-surface-container-low rounded-xl p-4 shadow-2xl shadow-black/50 border border-outline-variant/10 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-high p-6 rounded-lg space-y-2">
                <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">
                  Total Payouts
                </span>
                <div className="text-3xl font-bold font-['Manrope']">$1.2M</div>
                <div className="text-secondary text-xs flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    trending_up
                  </span>
                  +12% this month
                </div>
              </div>

              <div className="bg-surface-container-high p-6 rounded-lg space-y-2 relative overflow-hidden">
                <span className="text-on-surface-variant text-xs font-medium uppercase tracking-widest">
                  Active Staff
                </span>
                <div className="text-3xl font-bold font-['Manrope']">248</div>
                <div className="absolute -right-2 -bottom-2 opacity-10">
                  <span className="material-symbols-outlined text-6xl">
                    group
                  </span>
                </div>
              </div>

              <div className="col-span-2 bg-surface-container-high p-6 rounded-lg">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm font-semibold">
                    Salary Distribution
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant cursor-pointer">
                    more_horiz
                  </span>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full w-[70%] bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-gradient-to-r from-secondary to-tertiary rounded-full"></div>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-gradient-to-r from-tertiary to-primary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-6 -left-10 hidden md:block bg-surface-bright/80 backdrop-blur-xl p-5 rounded-lg shadow-2xl border border-outline-variant/20 max-w-[200px]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-tertiary/20 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-tertiary text-sm"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  verified
                </span>
              </div>
              <div>
                <p className="text-xs font-bold">Compliance Met</p>
                <p className="text-[10px] text-on-surface-variant">
                  Tax forms generated
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
