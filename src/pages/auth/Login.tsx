import { useState } from "react";
import { account } from "../../services/appwrite";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await account.createEmailPasswordSession(
        user.email,
        user.password
      );

      toast.success("Login Successful");

      navigate("/students");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-xl shadow-md w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <button className="bg-blue-600 text-white py-3 rounded-lg">
          Login
        </button>

        <Link
          to="/signup"
          className="text-center text-blue-600"
        >
          Create Account
        </Link>
      </form>
    </div>
  );
};

export default Login;