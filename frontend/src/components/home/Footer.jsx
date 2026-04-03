import { MdToken } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { IoMdSend } from "react-icons/io";
import axiosInstance from "../../services/axiosInstance";
import API_PATHS from "../../constants/apiPaths";
import { toast } from "sonner";
import { COMPANY_LINKS, FOOTER_LINKS, PRODUCT_LINKS } from "../../utils/data";

const Footer = () => {

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email.trim()) return toast.error("Email is required");
    try {
      setLoading(true);
      const response = await axiosInstance.post(API_PATHS.SUBSCRIBE, { email });
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/10 py-20">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
              <MdToken className="text-on-primary text-2xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold authority-text text-on-surface">
                SmartVetan
              </h2>
              <p className="text-xs uppercase label-spacing text-primary-dim">
                Enterprise HRMS
              </p>
            </div>
          </div>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            The future of payroll is intelligent, automated, and human-centric.
          </p>
        </div>

        <div className="space-y-4 md:hidden lg:block">
          <h4 className="text-on-surface font-bold text-sm uppercase tracking-widest">
            Product
          </h4>
          <ul className="space-y-2 text-on-surface-variant text-sm">
            {PRODUCT_LINKS.map(({ title, url }, index) => (
              <li id={index}>
                <Link
                  className="hover:text-primary transition-colors"
                  to={url}
                  target="_blank"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-on-surface font-bold text-sm uppercase tracking-widest">
            Company
          </h4>
          <ul className="space-y-2 text-on-surface-variant text-sm">
            {COMPANY_LINKS.map(({ title, url }, index) => (
              <li id={index}>
                <Link
                  to={url}
                  target="_blank"
                  className="hover:text-primary transition-colors"
                  href="#"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-on-surface font-bold text-sm uppercase tracking-widest">
            Subscribe
          </h4>
          <div className="flex">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full bg-surface-container-high border border-outline-variant/10 focus:border-primary/50 focus:ring-0 rounded-l-sm px-4 py-3.5 text-on-surface placeholder:text-on-surface-variant/30 transition-all text-sm"
            />
            <button
              className={`bg-primary text-on-primary-container p-3.5 rounded-r-sm hover:bg-primary-dim transition-colors cursor-pointer ${loading && "cursor-not-allowed opacity-80"}`}
              onClick={handleSubscribe}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin size-5" />
              ) : (
                <IoMdSend className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-on-surface-variant">
        <p>
          © {new Date().getFullYear()} SmartVetan Technologies Inc. All rights
          reserved.
        </p>
        <div className="flex gap-6">
          {FOOTER_LINKS.map(({ title, url }, index) => (
            <Link
              id={index}
              to={url}
              target="_blank"
              className="hover:text-on-surface transition-colors"
            >
              {title}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
