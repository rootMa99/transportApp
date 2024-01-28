import c from "./Notification.module.css";

const Notification = (p) => {

    const morning=(e)=>{
        p.click(e, "morning", p.data);
    }
    const evening=(e)=>{
        p.click(e, "evening", p.data);
        
    }
    const inactive=(e)=>{
        p.click(e, "inactive", p.data);
    }


  return (
    <div className={`${c.notify} ${c.anim}`}>
      <p>
        <span>
          {p.data.name} {p.data.lastName}
        </span>
        , matricule <span>{p.data.matricule}</span> cannot work the night shift.
      </p>
      <p>Which shift might work best for him?</p>
      <div className={c.btnHolder}>
        <button onClick={morning}><span>morning</span></button>
        <button onClick={evening}><span>evening</span></button>
        <button onClick={inactive}><span>inactive</span></button>
      </div>
    </div>
  );
};

export default Notification;
