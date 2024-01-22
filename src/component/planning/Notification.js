import c from "./Notification.module.css";

const Notification = (p) => {
  return (
    <div className={c.notify}>
      <p>
        <span>
          {p.data.name} {p.data.lastName}
        </span>
        , matricule<span>{p.data.matricule}</span> cannot work the night shift.
      </p>
      <p>Which shift might work best for him?</p>
      <div className={c.btnHolder}>
        <button>morning</button>
        <button>evening</button>
        <button>ctp</button>
      </div>
    </div>
  );
};

export default Notification;
