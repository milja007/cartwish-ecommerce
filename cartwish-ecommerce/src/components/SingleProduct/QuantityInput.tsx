import "./QuantityInput.css";

type QuantityInputProps =
  | {
      quantity: number;
      setQuantity: (quantity: number) => void;
      stock: number;
      cartPage?: false;
      productId?: never;
    }
  | {
      quantity: number;
      setQuantity: (
        type: "increase" | "decrease",
        productId: string | number
      ) => void;
      stock: number;
      cartPage: true;
      productId: string | number;
    };

const QuantityInput = ({
  quantity,
  setQuantity,
  stock,
  cartPage,
  productId,
}: QuantityInputProps) => {
  return (
    <>
      <button
        onClick={() => {
          if (cartPage) {
            (
              setQuantity as (
                type: "increase" | "decrease",
                productId: string | number
              ) => void
            )("decrease", productId!);
          } else {
            (setQuantity as (quantity: number) => void)(quantity - 1);
          }
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
          if (cartPage) {
            (
              setQuantity as (
                type: "increase" | "decrease",
                productId: string | number
              ) => void
            )("increase", productId!);
          } else {
            (setQuantity as (quantity: number) => void)(quantity + 1);
          }
        }}
        className="quantity_input_button"
      >
        +
      </button>
    </>
  );
};

export default QuantityInput;
