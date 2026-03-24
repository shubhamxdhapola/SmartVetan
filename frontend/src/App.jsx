import { RouterProvider } from "react-router-dom";
import {Toaster} from 'sonner'
import router from "./router/router";

function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
