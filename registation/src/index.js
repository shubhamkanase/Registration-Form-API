import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RegistrationForm from "./components/RegistrationForm";
import SucessPage from "./components/SucessPage";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/success" element={<SucessPage />} />
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
