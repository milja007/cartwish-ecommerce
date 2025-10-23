import "./LoginPage.css";
import { useForm, type FieldValues } from "react-hook-form";
const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: FieldValues) => console.log(formData);

  return (
    <section className="align-center form_page">
      <form className="authentication_form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Login form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form_text_input"
              placeholder="Enter your name"
              {...register("name", {
                required: true,
                minLength: 3,
              })}
            />
            {errors.name?.type === "required" && (
              <em className="form_error">Please enter your name</em>
            )}
            {errors.name?.type === "minLength" && (
              <em className="form_error">Please enter at least 3 characters</em>
            )}
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="number"
              className="form_text_input"
              placeholder="Enter your phone number"
              {...register("phone", { valueAsNumber: true })}
            />
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
