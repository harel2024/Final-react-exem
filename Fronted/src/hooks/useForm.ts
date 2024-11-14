import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IUser } from "../types/types";

function useForm(initialValues: IUser) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState<IUser>(initialValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
//   const handleSubmit = (e: React.FormEvent) => {
//     // e.preventDefault();
//     // if(!formData.username || !formData.password) return
    
    
//   };
  return { formData, handleChange };
}
export { useForm };