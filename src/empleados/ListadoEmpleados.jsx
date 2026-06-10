import { useEffect } from "react";
import { useState } from "react";
import {
  listarEmpleados,
  eliminarEmpleado,
} from "../servicios/empleadoServicio";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";

function ListadoEmpleados() {
  const [empleados, setEmpleados] = useState([]); // Estado para almacenar la lista de empleados, cuando cambia setEmpleados se vuelve a renderizar el componente y muestra la nueva lista de empleados

  useEffect(() => {
    // Cargar la lista de empleados al montar el componente
    cargarEmpleados(); // Llamada a la función para cargar los empleados
  }, []);

  const cargarEmpleados = async () => {
    try {
      const resultado = await listarEmpleados(); // Llamada a la función para listar empleados
      setEmpleados(resultado.data);
    } catch (error) {
      console.error(error);
    }
  };

  const eliminar = async (id) => {
    const confirmar = window.confirm("¿Eliminar empleado?");

    if (!confirmar) {
      // Si el usuario cancela la eliminación, se detiene la ejecución de la función y no se realiza ninguna acción, evitando que se elimine el empleado sin confirmación
      return;
    }

    try {
      await eliminarEmpleado(id); // Llamada a la función para eliminar el empleado, se envía el id del empleado a eliminar al backend para que lo procese y lo elimine de la base de datos, devuelve una promesa con la respuesta del servidor
      cargarEmpleados(); // Después de eliminar el empleado, se vuelve a cargar la lista de empleados para actualizar la vista y mostrar la lista actualizada sin el empleado eliminado, esto se hace llamando a la función cargarEmpleados que obtiene la lista actualizada desde el backend y actualiza el estado con setEmpleados, lo que provoca que el componente se vuelva a renderizar y muestre la nueva lista de empleados
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Sistema Recursos Humanos</h2>

      <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th>ID</th>

            <th>Nombre</th>

            <th>Departamento</th>

            <th>Sueldo</th>

            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.idEmpleado}>
              <td>{empleado.idEmpleado}</td>

              <td>{empleado.nombre}</td>

              <td>{empleado.departamento}</td>

              <td>
                <NumericFormat
                  value={empleado.sueldo}
                  displayType="text"
                  thousandSeparator
                  prefix="$ "
                  decimalScale={2}
                />
              </td>

              <td>
                <Link
                  to={`/editar/${empleado.idEmpleado}`}
                  className="btn btn-warning btn-sm me-2"
                >
                  {" "}
                  Editar{" "}
                </Link>

                <button
                  onClick={() => eliminar(empleado.idEmpleado)}
                  className="btn btn-danger btn-sm"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListadoEmpleados;
