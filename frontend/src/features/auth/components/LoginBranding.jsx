import { MdToken } from "react-icons/md";
import { ShieldCheck } from "lucide-react";

const BrandingPanel = () => {
  return (
    <section className="hidden lg:flex flex-1 relative bg-surface-container-lowest overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/80 to-transparent"></div>
      </div>

      {/* Content Overlay */}
      <div className="relative z-20 w-full h-full p-16 gap-15 lg:px-24 py-14 flex flex-col justify-between">
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

        <div className="max-w-xl">
          <div className="glass-card p-10 rounded-sm border border-outline-variant/10 mb-12 shadow-2xl relative">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 blur-[80px] rounded-full"></div>
            <span>
              <ShieldCheck className="text-primary size-7 mb-8" />
            </span>
            <h3 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface mb-6 font-headline leading-tight">
              The new standard for modern{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
                payroll
              </span>
              .
            </h3>
            <p className="text-lg text-on-surface-variant leading-relaxed font-body">
              Experience a seamless integration of employee management,
              automated taxation, and precision salary disbursement in one
              unified platform.
            </p>
          </div>

          <div className="flex gap-16 pl-2">
            <div>
              <p className="text-3xl font-bold text-primary font-headline">
                99.9%
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">
                Uptime SLA
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-secondary font-headline">
                1.2M+
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">
                Employees
              </p>
            </div>
            <div>
              <p className="text-3xl font-bold text-tertiary font-headline">
                AES-256
              </p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mt-1">
                Encrypted
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center gap-8  border-t border-outline-variant/10 pt-8">
          <p className="text-xs text-on-surface-variant/50 font-medium tracking-wide">
            © {new Date().getFullYear()} SmartVetan Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
              href="#"
            >
              Support
            </a>
          </div>
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-secondary/5 blur-[140px] rounded-full"></div>
    </section>
  );
};

export default BrandingPanel;
