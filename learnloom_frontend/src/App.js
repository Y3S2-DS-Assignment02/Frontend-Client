import { BrowserRouter, Routes, Route } from "react-router-dom";

import InitialPage from "./pages/InitialPage";
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./utils/auth/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <body style={{ display: "flex", flexDirection: "column" }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/login" element={<InitialPage />} exact />
            <Route element={<PrivateRoutes />}>
              <Route path="/dashboard" element={<HomePage />} exact />
            </Route>
          </Routes>
        </BrowserRouter>
      </body>
    </div>
  );
}

export default App;
