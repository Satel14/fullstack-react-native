import * as Yup from "yup";

export interface ITodo extends Document {
    title: string;
    description: string;
    year: number;
    completed: boolean;
    public: boolean;
   };
export const TodoSchema = Yup.object().shape({
  title: Yup.string().min(3, "Min 3 symbols").max(50, "Max 50 symbols")
      .required("Required"),
  year: Yup.number().integer().min(1900, "Min 1900 year")
      .max(2022, "Max 2022 year").required("Required"),
  description: Yup.string().min(3, "Min 3 symbols").max(100, "Max 100 symbols")
      .required("Required"),
});
