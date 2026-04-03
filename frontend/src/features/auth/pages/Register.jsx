import RegisterBranding from "../components/RegisterBranding";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  return (
    <div className="bg-surface text-on-surface font-body min-h-screen selection:bg-primary-dim selection:text-white relative">
      <main className="flex min-h-screen w-full relative z-10">
        <RegisterBranding />
        <RegisterForm />
      </main>
    </div>
  );
};

export default Register;
