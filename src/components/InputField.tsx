import React from "react";

interface Props {
  label: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const InputField = React.memo(
  ({ label, name, value, onChange, type = "text" }: Props) => {
    console.log(`${name} rendered`);

    return (
      <div className="flex flex-col gap-2">
        <label className="font-medium">{label}</label>

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className="border p-3 rounded-lg outline-none"
        />
      </div>
    );
  }
);

export default InputField;