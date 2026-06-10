import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { buscarEmpleado, editarEmpleado } from "../servicios/empleadoServicio";

function EditarEmpleado() {
  const navigate = useNavigate();
  const { id } = useParams(); // Hook para obtener el parámetro "id" de la URL, que se utiliza para identificar el empleado que se va a editar, esta viene de la ruta definida en App.jsx para la edición de empleados, donde se especifica que el id del empleado se pasa como parte de la URL (/editar/:id), lo que permite acceder a ese id dentro del componente EditarEmpleado para cargar los datos del empleado a editar y luego enviar los cambios al backend utilizando ese mismo id
  const [empleado, setEmpleado] = useState({
    nombre: "",
    departamento: "",
    sueldo: "",
  });

  useEffect(() => {
    // Cargar los datos del empleado al montar el componente, se llama a la función cargarEmpleado para obtener los datos del empleado desde el backend utilizando el id obtenido de la URL, y luego se actualiza el estado del empleado con los datos obtenidos para mostrarlo en el formulario de edición
    cargarEmpleado();
  }, []);

  const cargarEmpleado = async () => {
    try {
      const resultado = await buscarEmpleado(id);
      setEmpleado(resultado.data);
    } catch (error) {
      console.error(error);
    }
  };

  const actualizarCampo = (e) => {
    setEmpleado({
      ...empleado,

      [e.target.name]: e.target.value,
    });
  };

  const guardar = async (e) => {
    e.preventDefault();
    try {
      await editarEmpleado(
        // Llamada a la función para editar el empleado, se envía el id del empleado a editar y el objeto empleado con los nuevos datos al backend para que lo procese y actualice la información del empleado en la base de datos, devuelve una promesa con la respuesta del servidor - interno axios
        id,
        empleado,
      );
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Editar Empleado</h3>

      <form onSubmit={guardar}>
        <div className="mb-3">
          <label>Nombre</label>

          <input
            type="text"
            name="nombre"
            className="form-control"
            required
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
            required
            min="1"
            name="sueldo"
            className="form-control"
            value={empleado.sueldo}
            onChange={actualizarCampo}
          />
        </div>

        <button className="btn btn-success me-2">Guardar</button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-secondary"
        >
          Regresar
        </button>
      </form>
    </div>
  );
}

export default EditarEmpleado;
