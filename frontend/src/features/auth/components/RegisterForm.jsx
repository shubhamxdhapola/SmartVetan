import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../config/firebase";
import {
  googleSignin,
  registerEmployer,
} from "../../../store/slices/auth.slice";
import { toast } from "sonner";
import { validateRegisterForm } from "../../../utils/helper";
import Input from "../../../components/common/Input";
import { Loader2 } from "lucide-react";
import { MdToken } from "react-icons/md";

const RegisterForm = () => {
  const defaultFormData = {
    name: "",
    email: "",
    password: "",
    organization: "",
  };

  const [formData, setFormData] = useState(defaultFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const handleGoogleSignin = async () => {
    const response = await signInWithPopup(auth, googleProvider);
    const token = await response?.user?.getIdToken();
    dispatch(googleSignin(token))
      .unwrap()
      .then((res) => {
        toast.success(res?.message);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const isFormValid = validateRegisterForm(
      formData?.name,
      formData?.email,
      formData?.password,
    );
    if (isFormValid === true) {
      dispatch(registerEmployer(formData))
        .unwrap()
        .then((res) => {
          toast.success(res?.message);
          navigate("/dashboard", { replace: true });
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    }
  };

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="w-full lg:w-1/2 flex items-start lg:items-center flex-col justify-start bg-surface p-6 md:p-8 lg:p-20">

      {/* Header Mobile Logo */}
      <div className="lg:hidden flex items-center gap-3 mb-15 justify-start">
        <div className="w-10 h-10 primary-gradient rounded-lg flex items-center justify-center">
          <MdToken className="text-on-primary text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-extrabold authority-text text-on-surface">
            SmartVetan
          </h2>
          <p className="text-xs font-bold uppercase label-spacing text-primary-dim">
            Enterprise HRMS
          </p>
        </div>
      </div>

      <div className="w-full max-w-md space-y-10 mx-auto lg:mx-0">
        <header className="space-y-2">
          <h2 className="font-headline text-3xl font-bold text-on-surface">
            Get Started
          </h2>
          <p className="text-on-surface-variant">
            Create your organization account to begin.
          </p>
        </header>

        <div className="space-y-6">
          {/* Social Register */}
          <button
            className="w-full flex items-center justify-center gap-3 py-3.5 px-4 bg-surface-container border border-outline-variant/20 hover:bg-surface-bright transition-all duration-300 rounded-sm group cursor-pointer"
            onClick={handleGoogleSignin}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M12 5.04c1.9 0 3.61.66 4.94 1.91l3.7-3.7C18.4 1.17 15.42 0 12 0 7.31 0 3.25 2.69 1.28 6.6l4.27 3.3C6.51 7.15 9.01 5.04 12 5.04z"
                fill="#EA4335"
              ></path>
              <path
                d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58l3.7 3.3c2.16-2 3.42-4.93 3.42-8.32z"
                fill="#4285F4"
              ></path>
              <path
                d="M5.55 14.1c-.24-.71-.38-1.47-.38-2.27s.14-1.56.38-2.27L1.28 6.6C.47 8.23 0 10.06 0 12s.47 3.77 1.28 5.4l4.27-3.3z"
                fill="#FBBC05"
              ></path>
              <path
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.7-3.3c-1.1.74-2.5 1.18-4.23 1.18-3 0-5.51-2.03-6.42-4.76l-4.27 3.3C3.25 21.31 7.31 24 12 24z"
                fill="#34A853"
              ></path>
            </svg>
            <span className="text-on-surface text-xs font-bold uppercase tracking-widest">
              Sign in with Google
            </span>
          </button>

          <div className="relative flex items-center py-2">
            <div className="grow border-t border-outline-variant/20"></div>
            <span className="shrink mx-4 text-xs font-label uppercase tracking-widest text-on-surface-variant/60">
              or use email
            </span>
            <div className="grow border-t border-outline-variant/20"></div>
          </div>

          {/* Registration Form */}
          <form className="space-y-5" onSubmit={handleOnSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-4">
                <Input
                  type="text"
                  name="name"
                  value={formData?.name}
                  onChange={handleOnChange}
                  placeholder="Navneet Sharma"
                  label="Full Name"
                />
              </div>
              <div className="space-y-4">
                <Input
                  type="text"
                  name="organization"
                  value={formData?.organization}
                  onChange={handleOnChange}
                  placeholder="Acme Corp"
                  label="Oraganization"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Input
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleOnChange}
                placeholder="name@company.com"
                label="Email Address"
              />
            </div>

            <div className="space-y-4 relative">
              <Input
                type="password"
                name="password"
                value={formData?.password}
                onChange={handleOnChange}
                placeholder="Create a strong password"
                label="Password"
              />
            </div>

            <button
              className={`w-full font-bold py-4 rounded-sm transition-all active:scale-[0.98] text-sm uppercase tracking-widest bg-linear-to-r from-primary-dim to-primary text-on-primary-container shadow-lg shadow-primary/10 hover:shadow-primary/20 text-center 
              ${
                loading
                  ? "cursor-not-allowed bg-primary/40 text-on-primary-container/50 opacity-80"
                  : "cursor-pointer"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin mx-auto size-5" />
              ) : (
                "Initialize Account"
              )}
            </button>
          </form>
        </div>

        <footer className="text-left">
          <p className="text-on-surface-variant text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default RegisterForm;
