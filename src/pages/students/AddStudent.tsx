import { useNavigate } from "react-router-dom";
import StudentForm from "../../components/StudentForm";
import {
  databases,
  DATABASE_ID,
  COLLECTION_ID,
  ID,
} from "../../services/appwrite";
import type { Student } from "../../types/student";
import toast from "react-hot-toast";

const AddStudent = () => {
  const navigate = useNavigate();

  const addStudent = async (student: Student) => {
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        student
      );

      toast.success("Student Added Successfully");
      navigate("/students");
    } catch (error: any) {
  console.log(error);
  toast.error(error.message);
}
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Student</h1>

      <StudentForm onSubmit={addStudent} />
    </div>
  );
};

export default AddStudent;