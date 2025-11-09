import { useState } from "react";
import "./QuantityInput.css";
// rodendan jbg nemam vremena gulas i planinarenje
// nikin tata rucak gabrek,repete gulasa,druzenje sa starcima i dorom i njenim deckom
const QuantityInput = ({quantity, setQuantity ,stock}) => {
  const [count, setCount] = useState(1);
  return (
    <>
      <button
        onClick={() => {
          setCount((prev) => prev - 1);
        }}
        className="quantity_input_button"
        disabled={count <= 1}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">{count}</p>
      <button
      disabled={quantity>=stock}
        onClick={() => {
          setCount((prev) => prev + 1);
        }}

        className="quantity_input_button"
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
