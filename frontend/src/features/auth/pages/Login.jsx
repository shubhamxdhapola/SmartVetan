import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../../utils/helper";
import { googleSignin, loginEmployer } from "../../../store/slices/auth.slice";
import { toast } from "sonner";
import Input from "../../../components/common/Input";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../../config/firebase";

const Login = () => {
  const defaultFormData = {
    email: "",
    password: "",
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
    const isFormValid = validateLoginForm(formData?.email, formData?.password);
    if (isFormValid === true) {
      dispatch(loginEmployer(formData))
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
      <h1>Login into your account</h1>
      <form onSubmit={handleOnSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <br />
      <button onClick={handleGoogleSignin}>Google</button>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
