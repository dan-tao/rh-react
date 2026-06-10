import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agregarEmpleado } from "../servicios/empleadoServicio";

function AgregarEmpleado() {
  const navigate = useNavigate();

  const [empleado, setEmpleado] = useState({
    // Estado para almacenar los datos del nuevo empleado a agregar, cada vez que se actualiza el estado con setEmpleado se vuelve a renderizar el componente y muestra los nuevos datos del empleado
    nombre: "",
    departamento: "",
    sueldo: "",
  });

  const actualizarCampo = (e) => {
    setEmpleado({
      // Actualiza el estado del empleado con los nuevos datos ingresados en el formulario, e.target.name es el nombre del campo que se está actualizando (nombre, departamento o sueldo) y e.target.value es el nuevo valor ingresado por el usuario
      ...empleado,

      [e.target.name]: e.target.value,
    });
  };

  const guardarEmpleado = async (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional y recargue la página, en su lugar se ejecuta la función para guardar el empleado

    try {
      await agregarEmpleado(empleado); // Llamada a la función para agregar el empleado, se envía el objeto empleado con los datos del nuevo empleado al backend para que lo procese y lo agregue a la base de datos, devuelve una promesa con la respuesta del servidor
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Agregar Empleado</h3>

      <form onSubmit={guardarEmpleado}>
        <div className="mb-3">
          <label>Nombre</label>

          <input
            type="text"
            name="nombre"
            required
            className="form-control"
            value={empleado.nombre}
            onChange={actualizarCampo}
          />
        </div>

        <div className="mb-3">
          <label>Departamento</label>

          <input
            type="text"
            name="departamento"
            required
            className="form-control"
            value={empleado.departamento}
            onChange={actualizarCampo}
          />
        </div>

        <div className="mb-3">
          <label>Sueldo</label>

          <input
            type="number"
            name="sueldo"
            required
            min="1"
            className="form-control"
            value={empleado.sueldo}
            onChange={actualizarCampo}
          />
        </div>

        <button className="btn btn-primary">Guardar</button>
      </form>
    </div>
  );
}

export default AgregarEmpleado;
