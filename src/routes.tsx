import { createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages/index";
import LoginPage from "./pages/login";
import RegistPage from "./pages/regist";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/regist",
    element: <RegistPage />,
  },
]);

export default router;
