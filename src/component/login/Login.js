import { useDispatch } from "react-redux";
import c from "./Login.module.css";
import { dataSliceAction } from "../store/DataSlice";
import { DEMO_DATA, PLANNEDDATA } from "../../DEMO_DATA";
import { USER } from "../../DEMO_DATA";
import { useState } from "react";

const Login = (p) => {
  const dispatch = useDispatch();
  const [cred, setCred] = useState({ name: "", pwd: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    const index = USER.findIndex((f) => f.name === cred.name);

    console.log(cred, index, USER);
    if (index === -1) {
      alert("no user found");
    } else {
      if (USER[index].password === cred.pwd) {
        dispatch(dataSliceAction.setLogin(USER[index].role));

        USER[index].role !== "root"
          ? dispatch(dataSliceAction.setData(DEMO_DATA))
          : dispatch(dataSliceAction.setPlannedData(PLANNEDDATA));
      } else {
        alert("passWord incorrect");
      }
    }
  };
  const userChange = (e) => {
    setCred((prev) => ({ ...prev, name: e.target.value }));
  };
  const pwdChange = (e) => {
    setCred((prev) => ({ ...prev, pwd: e.target.value }));
  };

  return (
    <form className={c["Form-container"]} onSubmit={submitHandler}>
      <h2 className={c["login-title"]}> Login </h2>

      <div>
        <div id="error" className={c["error-message"]}></div>
      </div>
      <div className={c["user-container"]}>
        <input
          type="text"
          name="matricule"
          placeholder="User Name"
          className={c["username"]}
          onChange={userChange}
        />
      </div>

      <div className={c["password-container"]}>
        <input
          type="password"
          name="password"
          placeholder="User Password"
          className={c["userpassword"]}
          onChange={pwdChange}
        />
      </div>

      <button className={c["Login"]}>Submmit</button>
    </form>
  );
};

export default Login;
