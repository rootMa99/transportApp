import { useDispatch } from "react-redux";
import c from "./Login.module.css";
import { dataSliceAction } from "../store/DataSlice";
import { DEMO_DATA } from "../../DEMO_DATA";


const Login=p=>{

    const dispatch=useDispatch();



    const submitHandler=e=>{
        e.preventDefault();

        dispatch(dataSliceAction.setLogin());
        dispatch(dataSliceAction.setData(DEMO_DATA));
    }


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
            />
          </div>
    
          <div className={c["password-container"]}>
            <input
              type="password"
              name="password"
              placeholder="User Password"
              className={c["userpassword"]}

            />
          </div>
    
          <button className={c["Login"]}>Submmit</button>
        </form>
      );
}

export default Login;