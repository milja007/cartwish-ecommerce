import "./QuantityInput.css";
// unoos only commita jer sam delal sa starim od 6 do 8 navecer zivot je tezak
const QuantityInput = () => {
  return (
    <>
      <button className="quantity_input_button" disabled>
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">1</p>
      <button className="quantity_input_button"> + </button>;
    </>
  );
};

export default QuantityInput;
