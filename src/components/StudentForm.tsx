import { useState } from "react";
import type { Student } from "../types/student";

interface Props {
  initialData?: Student;
  onSubmit: (data: Student) => void;
}

const StudentForm = ({ initialData, onSubmit }: Props) => {
  const [student, setStudent] = useState<Student>(
    initialData || {
      name: "",
      email: "",
      course: "",
      age: 0,
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setStudent((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(student);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-4"
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={student.name}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={student.email}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="text"
        name="course"
        placeholder="Course"
        value={student.course}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={student.age}
        onChange={handleChange}
        className="border p-3 rounded-lg"
      />

      <button className="bg-blue-600 text-white py-3 rounded-lg">
        Submit
      </button>
    </form>
  );
};

export default StudentForm;