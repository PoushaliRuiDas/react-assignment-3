import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../../components/StudentForm";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID,
} from "../../services/appwrite";
import type { Student } from "../../types/student";
import toast from "react-hot-toast";

const EditStudent = () => {
  const { id } = useParams();

  const [student, setStudent] = useState<Student | null>(null);

  const navigate = useNavigate();

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
        toast.error("Failed to Fetch Student");
      }
    };

    fetchStudent();
  }, [id]);

  const updateStudent = async (data: Student) => {
    try {
      await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id!,
        data
      );

      toast.success("Student Updated Successfully");
      navigate("/students");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  if (!student) return <h1 className="p-6">Loading...</h1>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Student</h1>

      <StudentForm
        initialData={student}
        onSubmit={updateStudent}
      />
    </div>
  );
};

export default EditStudent;