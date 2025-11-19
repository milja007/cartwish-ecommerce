import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "../../services/userServices";
import { AxiosError } from "axios";
import { useState } from "react";

const schema = z.object({
  email: z
    .string()
    .email("Please enter a valid email adress")
    .min(3, "Email adress must be at least 3 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormData = z.infer<typeof schema>;

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (formData: LoginFormData) => {
    try {
      await login(formData);
      window.location.href = "/";
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 400) {
        setFormError(err.response.data.message);
      }
    }
  };

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
          {formError && <em className="form_error">{formError}</em>}
          <button className="search_button form_submit" type="submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
