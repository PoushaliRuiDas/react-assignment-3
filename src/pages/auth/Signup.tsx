import { useState } from "react";
import { account, ID } from "../../services/appwrite";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
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

  const handleSignup = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await account.create(
        ID.unique(),
        user.email,
        user.password,
        user.name
      );

      toast.success("Signup Successful");

      navigate("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Signup
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

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
          Signup
        </button>

        <Link
          to="/login"
          className="text-center text-blue-600"
        >
          Already have an account?
        </Link>
      </form>
    </div>
  );
};

export default Signup;