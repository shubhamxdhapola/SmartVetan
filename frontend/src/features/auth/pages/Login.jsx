import LoginForm from "../components/LoginForm";
import BrandingPanel from "../components/LoginBranding";

const Login = () => {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-primary selection:text-on-primary antialiased overflow-x-hidden">
      <main className="min-h-screen flex flex-col lg:flex-row">
        <LoginForm />
        <BrandingPanel />
      </main>
    </div>
  );
};

export default Login;
