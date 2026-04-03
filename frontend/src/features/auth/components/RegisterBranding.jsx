import { MdToken } from "react-icons/md";

const RegisterBranding = () => {
  return (
    <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-surface-container-low border-r border-outline-variant/10">
      {/* Decorative Elements */}
      <div className="absolute inset-0 mesh-gradient"></div>
      <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-primary-dim/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-100 h-100 bg-secondary/5 blur-[100px] rounded-full"></div>

      <div className="relative z-10 flex flex-col justify-between p-16 w-full">
        {/* Brand Logo (Unified) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 primary-gradient rounded-xl flex items-center justify-center shadow-2xl shadow-primary/20">
              <MdToken className="text-3xl text-on-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold authority-text text-on-surface leading-tight">
                SmartVetan
              </h2>
              <p className="text-xs font-bold uppercase label-spacing text-primary-dim">
                Enterprise HRMS
              </p>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-xl">
          <h1 className="font-headline text-5xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Empower your workforce with the{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              next generation
            </span>{" "}
            of HR technology.
          </h1>
          <p className="text-on-surface-variant text-lg leading-relaxed mb-12">
            Move beyond legacy payroll. SmartVetan combines algorithmic
            precision with an editorial user experience to redefine
            institutional capital management.
          </p>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-headline font-bold text-primary">
                15k+
              </span>
              <span className="text-sm font-label uppercase tracking-widest text-on-surface-variant">
                Enterprises
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-3xl font-headline font-bold text-secondary">
                ISO 27001
              </span>
              <span className="text-sm font-label uppercase tracking-widest text-on-surface-variant">
                Certified Security
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="flex items-center gap-4 text-xs font-label text-on-surface-variant/60">
          <span>The Digital Concierge for modern payroll.</span>
          <span className="w-1 h-1 bg-outline-variant/30 rounded-full"></span>
          <span>v4.2.0-Luminous</span>
        </div>
      </div>
    </section>
  );
};

export default RegisterBranding;
