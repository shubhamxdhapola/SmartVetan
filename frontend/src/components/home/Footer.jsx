const Footer = () => {
  return (
<footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-sm"></div>
            <span className="text-lg font-bold text-on-surface tracking-widest font-headline">
              SmartVetan
            </span>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            The future of payroll is intelligent, automated, and human-centric.
          </p>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-on-surface font-bold text-sm uppercase tracking-widest">
            Product
          </h4>
          <ul className="space-y-2 text-on-surface-variant text-sm">
            <li><a className="hover:text-primary transition-colors" href="#">Features</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Integrations</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">API Docs</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Roadmap</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-on-surface font-bold text-sm uppercase tracking-widest">
            Company
          </h4>
          <ul className="space-y-2 text-on-surface-variant text-sm">
            <li><a className="hover:text-primary transition-colors" href="#">About Us</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Security</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Legal</a></li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h4 className="text-on-surface font-bold text-sm uppercase tracking-widest">
            Subscribe
          </h4>
          <div className="flex">
            <input
              className="bg-surface-container-highest border-none focus:ring-1 focus:ring-primary text-sm p-3 w-full rounded-l-sm"
              placeholder="Email address"
              type="email"
            />
            <button className="bg-primary text-on-primary-container p-3 rounded-r-sm hover:bg-primary-dim transition-colors">
              <span className="material-symbols-outlined text-sm" data-icon="send">
                send
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
        <p>© 2024 SmartVetan Technologies Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a className="hover:text-on-surface transition-colors" href="#">Privacy Policy</a>
          <a className="hover:text-on-surface transition-colors" href="#">Terms of Service</a>
          <a className="hover:text-on-surface transition-colors" href="#">Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;