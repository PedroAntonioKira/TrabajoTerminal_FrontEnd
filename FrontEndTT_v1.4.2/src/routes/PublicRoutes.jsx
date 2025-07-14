// src/routes/PublicRoutes.jsx
import { Routes, Route } from "react-router-dom";
import SignIn from "../access/Sign_In";
import SignUp from "../access/Sign_Up";
import ConfirmationEmail from "../access/Confirmation_Email";
import ResendConfirmation from '../access/ResendConfirmation';
import ForgotPassword from "../access/ForgotPassword";
import ConfirmPassword from "../access/ConfirmPassword";

const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<SignIn />} />
    <Route path="/registro" element={<SignUp />} />
    <Route path="/verificar-correo" element={<ConfirmationEmail />} />
    <Route path="/reenviar-confirmacion" element={<ResendConfirmation />} />
    <Route path="/olvide-password" element={<ForgotPassword />} />
    <Route path="/olvide-password/confirmar-password-olvidada" element={<ConfirmPassword />} />
  </Routes>
);

export default PublicRoutes;
