import { useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const CartPortal = ({ children }) => {
  const elRef = useRef(null);

  // Создаем элемент только один раз при монтировании
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const modalCart = document.getElementById("modal-cart");
    if (!modalCart) return;

    const currentEl = elRef.current;
    modalCart.appendChild(currentEl);

    return () => {
      // Проверяем существует ли элемент перед удалением
      if (currentEl && currentEl.parentNode === modalCart) {
        modalCart.removeChild(currentEl);
      }
    };
  }, []);

  return ReactDOM.createPortal(children, elRef.current);
};

export default CartPortal;
