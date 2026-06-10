import axios from "axios";

const urlBase = "http://localhost:8080/api/empleados/";

export const listarEmpleados = () => axios.get(urlBase);

export const agregarEmpleado = (empleado) => axios.post(urlBase, empleado);

export const buscarEmpleado = (id) => axios.get(`${urlBase}${id}/`);

export const editarEmpleado = (id, empleado) =>
  axios.put(`${urlBase}${id}/`, empleado);

export const eliminarEmpleado = (id) => axios.delete(`${urlBase}${id}/`);
