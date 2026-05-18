import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex gap-6 shadow-md">
      <Link to="/">Large Form</Link>
      <Link to="/stopwatch">Stopwatch</Link>
      <Link to="/students">Students</Link>
    </nav>
  );
};

export default Navbar;