import "./Skeleton.css";

export default function Skeleton() {
  return (
    <div className="skeleton">
      <div className="img-container">
        <div className="img-back" />

        <div className="name-back-first" />
        <div className="name-back-second" />
      </div>

      <div className="price-container">
        <div className="price-back" />

        <div className="btn-back" />
      </div>
    </div>
  );
}
