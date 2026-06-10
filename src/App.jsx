import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navegacion from "./components/Navegacion";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";

function App() {
  return (
    <BrowserRouter>
      <Navegacion />
      <div className="container">
        <Routes>
          <Route path="/" element={<ListadoEmpleados />} />

          <Route path="/agregar" element={<AgregarEmpleado />} />
          <Route path="/editar/:id" element={<EditarEmpleado />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
