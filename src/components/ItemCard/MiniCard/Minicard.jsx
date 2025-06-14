import { useContext } from "react";
import { AppContext } from "../../../AppContext/AppContext";
import "./MiniCard.css";

export default function MiniCard({ item }) {
  const { isAdded, setAdded } = useContext(AppContext);

  const removeItem = (id) => {
    setAdded(
      isAdded.filter((item) => {
        return item.id !== id;
      })
    );
  };

  return (
    <div className="mini-card" key={item.id}>
      <div className="mini-card-content">
        <img
          src={item.imageUrl}
          alt={item.title}
          style={{ width: 70, height: 70 }}
        />
        <div className="mini-card-info">
          <div>{item.title}</div>
          <h5>
            {new Intl.NumberFormat("ru-RU", {
              style: "currency",
              currency: "RUB",
            }).format(item.price)}
          </h5>
        </div>
      </div>
      <button className="btn-remove" onClick={() => removeItem(item.id)} />
    </div>
  );
}
