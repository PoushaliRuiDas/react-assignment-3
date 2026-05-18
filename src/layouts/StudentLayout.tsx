import {  Link,  Outlet,  useNavigate } from "react-router-dom";

import { account } from "../services/appwrite";

const StudentLayout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await account.deleteSession("current");

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen">

      <aside className="w-64 bg-blue-700 text-white p-6 flex flex-col justify-between">
        
        <div>
          <h1 className="text-2xl font-bold mb-8">
            Student Dashboard
          </h1>

          <div className="flex flex-col gap-4">
            <Link to="/students">
              Student List
            </Link>

            <Link to="/students/add">
              Add Student
            </Link>
          </div>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 transition px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;