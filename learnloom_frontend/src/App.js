import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import RegistrationPage from "./pages/RegistrationPage";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<InitialPage />} />
            <Route path="/login" element={<InitialPage />} />
            <Route path="/create-account" element={<RegistrationPage />} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
