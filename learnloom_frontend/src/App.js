import { BrowserRouter, Routes, Route } from "react-router-dom";
import InitialPage from "./pages/InitialPage";
import HomePage from "./pages/HomePage";
import PrivateRoutes from "./utils/auth/PrivateRoutes";
import Navbar from "./components/Header/Navbar";
import CoursesPage from "./pages/CoursesPage";
import Lessons from "./pages/Lessons"; // Import the Lessons component
import CourseDetailsPage from "./pages/CourseDetailsPage";
import MyCourses from "./pages/MyCourses";
import Lessonscheck from "./pages/Lessonscheck";
import Payment from "./pages/payment";

import "./utils/styles/App.css";
import MycoursesforIns from "./pages/MycoursesforIns";
import LessonPage from "./components/Ins-Course/LessonPage";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";

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
              <Route path="/home" element={<HomePage />} exact />
              <Route path="/login" element={<InitialPage />} exact />
              <Route path="/about" element={<AboutUs />} exact />
              <Route path="/contact" element={<ContactUs />} exact />
              <Route path="/services" element={<HomePage />} exact />

              <Route path="/payment" element={<Payment />} exact />
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<HomePage />} exact />
                <Route path="/my-courses" element={<HomePage />} exact />
                <Route path="/CoursesPage" element={<CoursesPage />} exact />
                <Route path="/MyCourses" element={<MyCourses />} exact />
                <Route
                  path="/Lessonscheck/:id"
                  element={<Lessonscheck />}
                  exact
                />
                <Route path="/courses/:id" element={<Lessons />} />
                <Route
                  path="/coursedetails/:id"
                  element={<CourseDetailsPage />}
                />
                {/* sarindu */}
                <Route path="/inscourse" element={<MycoursesforIns />} exact />
                <Route path="/inslesson/:id" element={<LessonPage />} exact />
              </Route>
            </Routes>
          </BrowserRouter>
        </div>
      </body>
    </div>
  );
}

export default App;
