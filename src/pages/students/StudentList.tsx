import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Query } from "appwrite";
import toast from "react-hot-toast";

import {
  databases,
  DATABASE_ID,
  COLLECTION_ID,
} from "../../services/appwrite";

import type { Student } from "../../types/student";

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.orderDesc("$createdAt")]
      );

      setStudents(response.documents as unknown as Student[]);
    } catch (error) {
      toast.error("Failed to fetch students");
      console.log(error);
    }
  };

  const deleteStudent = async (id: string) => {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );

      toast.success("Student Deleted");

      fetchStudents();
    } catch (error) {
      toast.error("Delete Failed");
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Students
        </h1>

        <Link
          to="/students/add"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Add Student
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Course</th>
              <th className="p-4 text-left">Age</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr
                key={student.$id}
                className="border-b"
              >
                <td className="p-4">
                  {student.name}
                </td>

                <td className="p-4">
                  {student.email}
                </td>

                <td className="p-4">
                  {student.course}
                </td>

                <td className="p-4">
                  {student.age}
                </td>

                <td className="p-4 flex gap-3">
                  <Link
                    to={`/students/${student.$id}`}
                    className="text-blue-600"
                  >
                    View
                  </Link>

                  <Link
                    to={`/students/edit/${student.$id}`}
                    className="text-green-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() =>
                      deleteStudent(student.$id!)
                    }
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentList;