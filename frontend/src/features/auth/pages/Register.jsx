import { useState } from "react";
import Input from "../../../components/common/Input";
import { validateRegisterForm } from "../../../utils/helper";
import {
  googleSignin,
  registerEmployer,
} from "../../../store/slices/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";

const Register = () => {
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
    <div>
      <h1>Create an account</h1>
      <form onSubmit={handleOnSubmit}>
        <Input
          type="text"
          name="name"
          value={formData?.name}
          onChange={handleOnChange}
          placeholder="e.g. Shubham Dhapola"
          label="Enter name"
        />
        <Input
          type="email"
          name="email"
          value={formData?.email}
          onChange={handleOnChange}
          placeholder="e.g. shubhamdhapola@gmail.com"
          label="Enter email"
        />
        <Input
          type="password"
          name="password"
          value={formData?.password}
          onChange={handleOnChange}
          placeholder="Create a strong password"
          label="Enter password"
        />
        <Input
          type="text"
          name="organization"
          value={formData?.organization}
          onChange={handleOnChange}
          placeholder="Your organization name"
          label="Enter Oraganization"
        />
        <button type="submit">Register</button>
      </form>
      <br />
      <button onClick={handleGoogleSignin}>Google</button>
      <div>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Register;
