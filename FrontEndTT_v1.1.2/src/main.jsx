import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppRoutes from "./routes/AppRoutes";  // Importamos las rutas
import { AuthProvider } from "./context/AuthContext"; // Importamos el AuthProvider
import { BrowserRouter } from "react-router-dom"; // 🟢 Agregamos BrowserRouter

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*<App />*/}

    {/*AuthProvider envuelve <AppRoutes /> para que todos los componentes tengan acceso al usuario autenticado. */}
    {/* Ahora podremos usar user, login y logout en cualquier parte de la app. */}
    <AuthProvider> {/* Envolvemos la app con el contexto */}
      <BrowserRouter> {/* 🟢 Agregamos BrowserRouter */}
        <AppRoutes />  {/* Usamos las rutas en lugar de App */}
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
