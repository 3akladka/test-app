import { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";
import { useNavigate } from "react-router-dom";
import "./Follows.css";
import ItemCard from "../ItemCard/ItemCard";
import emoji from "./../../img/emoji.png";

export default function Follows() {
  const { isLiked } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div
      className={
        isLiked.length <= 0 ? "follows-content-empty" : "follows-content"
      }
    >
      {isLiked.length <= 0 ? (
        <div className="follows-empty">
          <img
            src={emoji}
            alt="follows-are-empty"
            style={{ width: 70, height: 70 }}
          />
          <h2> Закладок нет </h2>
          <div> Вы ничего не добавляли в закладки </div>

          <button className="btn-order" onClick={() => navigate("/")}>
            ← Вернуться назад
          </button>
        </div>
      ) : (
        <>
          <div className="follows-top">
            <button className="btn-back" onClick={() => navigate("/")} />
            <h1>Мои закладки</h1>
          </div>
          <div className="card-list">
            {isLiked.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
