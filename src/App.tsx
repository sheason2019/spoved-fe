import { RouterProvider } from "react-router-dom";
import router from "./routes";

import "./App.css";
import GlobalProvider from "./common/components/global-provider";

function App() {
  return (
    <GlobalProvider>
      <RouterProvider router={router} />
    </GlobalProvider>
  );
}

export default App;
