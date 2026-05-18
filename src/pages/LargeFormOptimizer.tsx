import { useCallback,  useEffect,  useMemo,  useState } from "react";
import InputField from "../components/InputField";

const LargeFormOptimizer = () => {
  const [formData, setFormData] = useState(() => {
    const savedData =
      localStorage.getItem("largeFormData");

    return savedData
      ? JSON.parse(savedData)
      : {
          name: "",
          email: "",
          quantity: 0,
          price: 0,
          tax: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem(
      "largeFormData",
      JSON.stringify(formData)
    );
  }, [formData]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      setFormData((prev: any) => ({
        ...prev,
        [name]:
          name === "name" || name === "email"
            ? value
            : Number(value),
      }));
    },
    []
  );

  const totalCost = useMemo(() => {
    console.log("Calculating Total...");

    const subtotal =
      formData.quantity * formData.price;

    const taxAmount =
      (subtotal * formData.tax) / 100;

    return subtotal + taxAmount;
  }, [
    formData.quantity,
    formData.price,
    formData.tax,
  ]);

  const handleSubmit = useCallback(
  (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem(
      "largeFormData",
      JSON.stringify(formData)
    );

    alert("Form Saved Successfully");

    const emptyForm = {
      name: "",
      email: "",
      quantity: 0,
      price: 0,
      tax: 0,
    };

    setFormData(emptyForm);

    localStorage.removeItem("largeFormData");
  },
  [formData]
);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Large Form Optimizer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        <InputField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
        />

        <InputField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
        />

        <InputField
          label="Tax %"
          name="tax"
          type="number"
          value={formData.tax}
          onChange={handleChange}
        />

        <div className="col-span-full bg-blue-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">
            Total Cost: ₹{totalCost}
          </h2>
        </div>

        <button className="bg-blue-600 text-white py-3 rounded-lg col-span-full hover:bg-blue-700 transition">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LargeFormOptimizer;