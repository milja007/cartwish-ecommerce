import "./App.css";
import Navbar from "./components/navbar/Navbar";
import HomePage from "./components/navbar/Home/HomePage";
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main>
        <HomePage />
      </main>
    </div>
  );
};

export default App;
