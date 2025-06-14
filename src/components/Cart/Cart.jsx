import { useContext, useEffect } from "react";
import { AppContext } from "../../AppContext/AppContext";
import "./Cart.css";
import MiniCard from "../ItemCard/MiniCard/MiniCard";
import emptyCart from "./../../img/emptyCart.png";

export default function Cart() {
  const { isAdded, totalPrice, setOpen } = useContext(AppContext);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className={isAdded <= 0 ? "cart-content-empty" : "cart-content"}>
      <h2>Корзина</h2>

      {isAdded.length <= 0 ? (
        <div className="empty-cart">
          <img
            src={emptyCart}
            alt="cart-is-empty"
            style={{ width: 120, height: 120 }}
          />
          <h2>Корзина пустая</h2>
          <div>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</div>
          <button className="btn-order" onClick={() => setOpen(false)}>
            ← Вернуться назад
          </button>
        </div>
      ) : (
        <>
          <div className="cart-container">
            {isAdded.map((item) => (
              <MiniCard key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-bottom">
            <div style={{ marginBottom: 19 }}>
              Итого: <span>{totalPrice}</span>
            </div>
            <div style={{ marginBottom: 20 }}>
              Налог 5%: <span>{(totalPrice * 0.05).toFixed(2)}</span>
            </div>

            <button className="btn-order">Оформить заказ →</button>
          </div>
        </>
      )}
    </div>
  );
}
