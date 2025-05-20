import { Outlet } from "react-router-dom";
import SimpleForm from "../pages/form/SimpleForm";
import MediumForm from "../pages/form/MediumForm";
import AdvanceForm from "../pages/form/AdvancedForm/AdvanceForm";

const simpleFormRoute = {
  path: "simple-form",
  element:<SimpleForm/> ,

};
const mediumFormRoute = {
  path: "medium-form",
  element:<MediumForm/> ,
};

const advanceFormRoute = {
  path: "advance-form",
  element:<AdvanceForm/> ,
};


export const formsRoute = {
  path: "forms",
  element: <Outlet/>,
  children: [
    simpleFormRoute,
    mediumFormRoute,
    advanceFormRoute,
  ],
};
