import React, { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";
import "./ItemCard.css";

const ItemCard = React.memo(({ item }) => {
  const {
    removeFromAdded,
    isInLikes,
    addToLikes,
    removeFromLikes,
    isInAdded,
    addToAdded,
  } = useContext(AppContext);

  return (
    <>
      <div className="card">
        <div className="card-foto">
          <img
            src={item.imageUrl}
            alt="кроссовки"
            style={{ width: 133, height: 112 }}
          />

          <button
            className={isInLikes(item.id) ? "like-active" : "like-in-active"}
            onClick={
              isInLikes(item.id)
                ? () => removeFromLikes(item.id)
                : () => addToLikes(item)
            }
          />

          <p>{item.title}</p>
        </div>

        <div className="card-price">
          <div>
            <p>ЦЕНА:</p>
            <h5>
              {new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: "RUB",
              }).format(item.price)}
            </h5>
          </div>
          <button
            className={isInAdded(item.id) ? "btn-is-added" : "btn-non-added"}
            onClick={
              isInAdded(item.id)
                ? () => removeFromAdded(item.id)
                : () => addToAdded(item)
            }
          />
        </div>
      </div>
    </>
  );
});

export default ItemCard;
