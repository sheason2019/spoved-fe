import { RouterProvider } from "react-router-dom";
import router from "./routes";
import RouterLayout from "./common/components/router-layout";

import "./App.css";
import GlobalProvider from "./common/components/global-provider";

function App() {
  return (
    <RouterLayout>
      <GlobalProvider>
        <RouterProvider router={router} />
      </GlobalProvider>
    </RouterLayout>
  );
}

export default App;
