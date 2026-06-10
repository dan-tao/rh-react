import { Link } from "react-router-dom";

function Navegacion() {
  return (
    <nav className="navbar navbar-expand-lg bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand text-white">
          RH App
        </Link>

        <div>
          <Link to="/agregar" className="btn btn-outline-light">
            Agregar Empleado
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navegacion;
