import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="navbar bg-base-100 p-4 shadow-sm">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Home
        </Link>
      </div>

      <div className="navbar-end">
        <Link to="/availability">Availability</Link>
      </div>
    </div>
  );
}
