import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";
import { NavLink, useNavigate } from "react-router-dom";
import "./Header.css";

import logo from "./../../img/logo.png";
import cart from "./../../img/cart.svg";
import follows from "./../../img/follows.svg";
import profile from "./../../img/profile.svg";
import CartPortal from "../Portal/CartPortal";
import Cart from "../Cart/Cart";

export default function Header() {
  const { isOpen, setOpen, totalPrice } = useContext(AppContext);

  const openCart = (e) => {
    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const navigate = useNavigate();

  return (
    <div className="header-content">
      <div className="header-info" onClick={() => navigate("/")}>
        <div className="header-logo">
          <img width={40} height={40} src={logo} alt="logo" />
        </div>
        <div className="logo-text">
          <h3 style={{ textTransform: "uppercase" }}>react sneakers</h3>
          <p>Магазин лучших кроссовок</p>
        </div>
      </div>

      <ul className="header-right">
        <a
          href="#modal"
          onClick={openCart}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
        >
          <li className="right-item">
            <img
              src={cart}
              alt="корзина"
              style={{ width: 18, height: 17.18 }}
            />
            <span>{totalPrice > 0 ? totalPrice : "Корзина"}</span>
          </li>
        </a>
        <li className="right-item">
          <img
            src={follows}
            alt="корзина"
            style={{ width: 18, height: 16.3 }}
          />
          <NavLink to="/follows">Закладки</NavLink>
        </li>

        <li className="right-item">
          <img src={profile} alt="профиль" style={{ width: 18, height: 18 }} />
          <a href="/profile">Профиль</a>
        </li>
      </ul>
      {isOpen && (
        <CartPortal>
          <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div onClick={(e) => e.stopPropagation()}>
              <Cart />
            </div>
          </div>
        </CartPortal>
      )}
    </div>
  );
}
