import { ChangeEvent, useState } from "react";

const useInput = (initialValue: number) => {
  const [value, setValue] = useState<number>(initialValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(Number(newValue));
  };

  return {
    value,
    onChange: handleChange,
    setValue,
  };
};

export default useInput;
