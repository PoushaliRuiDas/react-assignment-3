import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID,
} from "../../services/appwrite";
import type { Student } from "../../types/student";
import toast from "react-hot-toast";

const StudentDetails = () => {
  const { id } = useParams();

  const [student, setStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await databases.getDocument(
          DATABASE_ID,
          COLLECTION_ID,
          id!
        );

        setStudent(response as unknown as Student);
      } catch (error) {
        toast.error("Failed to Load Student");
      }
    };

    fetchStudent();
  }, [id]);

  if (!student) return <h1 className="p-6">Loading...</h1>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6">Student Details</h1>

        <div className="space-y-4 text-lg">
          <p>
            <strong>Name:</strong> {student.name}
          </p>

          <p>
            <strong>Email:</strong> {student.email}
          </p>

          <p>
            <strong>Course:</strong> {student.course}
          </p>

          <p>
            <strong>Age:</strong> {student.age}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;