import "./LoginPage.css";
import { useForm, type FieldValues } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z
    .string()
    .email("Please enter a valid email adress")
    .min(3, "Email adress must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (formData: FieldValues) => console.log(formData);

  return (
    <section className="align-center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form_text_input"
              placeholder="Enter your email"
              {...register("email")}
            />
            {errors.email && (
              <em className="form_error">{errors.email.message}</em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors.password && (
              <em className="form_error">{errors.password.message}</em>
            )}
          </div>
          <button className="search_button form_submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
