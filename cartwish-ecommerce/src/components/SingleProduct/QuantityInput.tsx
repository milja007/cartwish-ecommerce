import { useState } from "react";
import "./QuantityInput.css";
// Zagreb intid doo fiskalizacija za aparate i ostali poslovi evo doma 22:35 vrijeme za spavanac sutra jako ili nikako
// obavljao sastanke i ponude za hugos loyalty progr i realestate i trening zakazao opet sutra cijeli dan na kompu 
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
