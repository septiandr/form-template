// ... existing code ...
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SimpleForm from "../pages/form/SimpleForm";
import MediumForm from "../pages/form/MediumForm";
import AdvanceForm from "../pages/form/AdvanceForm";
import App from "../App";


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/simple-form" element={<SimpleForm />} />
        <Route path="/medium-form" element={<MediumForm />} />
        <Route path="/advance-form" element={<AdvanceForm />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
// ... existing code ...