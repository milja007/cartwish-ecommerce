import "./LoginPage.css";
import { useState } from "react";
const LoginPage = () => {
  const [user, setUser] = useState({
    name: "",
    phone: 0,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(user);
  };
  return (
    <section className="align-center form_page">
      <form className="authentication_form" onSubmit={handleSubmit}>
        <h2>Login form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="form_text_input"
              placeholder="Enter your name"
              onChange={(e) => setUser({ ...user, name: e.target.value })}
              value={user.name}
            />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input
              id="phone"
              type="number"
              className="form_text_input"
              placeholder="Enter your phone number"
              onChange={(e) =>
                setUser({ ...user, phone: parseInt(e.target.value) })
              }
              value={user.phone}
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
