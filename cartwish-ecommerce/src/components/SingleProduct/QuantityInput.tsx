import "./QuantityInput.css";

interface QuantityInputProps {
  quantity: number;
  setQuantity: (value: number | ((prev: number) => number)) => void;
  stock: number;
}

const QuantityInput = ({ quantity, setQuantity, stock }: QuantityInputProps) => {
  return (
    <>
      <button
        onClick={() => {
          setQuantity((prev) => prev - 1);
        }}
        className="quantity_input_button"
        disabled={quantity <= 1}
      >
        {" "}
        -{" "}
      </button>
      <p className="quantity_input_count">{quantity}</p>
      <button
        disabled={quantity >= stock}
        onClick={() => {
          setQuantity((prev) => prev + 1);
        }}
        className="quantity_input_button"
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
