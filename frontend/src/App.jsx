import { RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import router from "./router/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployerInfo } from "./store/slices/auth.slice";
import { Loader2 } from "lucide-react";

function App() {
  const dispatch = useDispatch();
  const { authenticating } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getEmployerInfo());
  }, [dispatch]);

  if (authenticating) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster
        // position=""
        toastOptions={{
          style: {
            background: "#0f1930",
            color: "#dee5ff",
            border: "0.5px solid #40485d66 ",
            // fontFamily : "var(--font-headline)",
            borderRadius: "5px",
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
