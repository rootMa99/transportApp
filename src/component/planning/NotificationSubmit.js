import c from "./Notification.module.css";

const NotificationSubmit = (p) => {

    const sbmitH=e=>{
        p.click();
    }
    const cancel=e=>{
        p.cancelSubmit();
    }

  return (
    <div className={`${c.notify} ${c.anim}`}>
      <p>Do you want to submit your planning?</p>
      <div className={c.btnHolderS}>
        <button onClick={cancel}><span>cancel</span></button>
        <button onClick={sbmitH}><span>submit anyway</span></button>
      </div>
    </div>
  );
};

export default NotificationSubmit;
