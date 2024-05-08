import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./utils/auth/PrivateRoutes";
import Navbar from "./components/Header/Navbar";
import PaymentPage from "./pages/PaymentPage";

import "./utils/styles/App.css";

function App() {
  return (
    <div className="App">
      <body>
        <div className="App-header">
          <Navbar />
        </div>
        <div className="App-body">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<InitialPage />} />
              <Route path="/courses" element={<HomePage />} exact />
              <Route path="/login" element={<InitialPage />} exact />
              <Route path="/about" element={<HomePage />} exact />
              <Route path="/contact" element={<HomePage />} exact />
              <Route path="/services" element={<HomePage />} exact />
              {/* <Route element={<PrivateRoutes />}> */}
                <Route path="/dashboard" element={<HomePage />} exact />
                <Route path="/my-courses" element={<HomePage />} exact />
                <Route path="/payments" element={<PaymentPage />} exact />
              {/* </Route> */}
            </Routes>
          </BrowserRouter>
        </div>
      </body>
    </div>
  );
}

export default App;
