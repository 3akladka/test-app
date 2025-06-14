import React, { useContext } from "react";
import { AppContext } from "../../AppContext/AppContext";
import "./Main.css";
import ItemCard from "../ItemCard/ItemCard";
import Skeleton from "../Skeleton/Skeleton";

export default function Main() {
  const { isLiked, isAdded, loading, data, setLiked, setAdded } =
    useContext(AppContext);

  return (
    <div className="main-content">
      <h1>Все кроссовки</h1>
      <div className="card-list">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)
          : data.map((item) => {
              return (
                <ItemCard
                  key={item.id}
                  isLiked={isLiked}
                  setLiked={setLiked}
                  item={item}
                  isAdded={isAdded}
                  setAdded={setAdded}
                />
              );
            })}
      </div>
    </div>
  );
}
