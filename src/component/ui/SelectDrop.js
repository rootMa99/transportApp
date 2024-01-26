import Select from "react-select";
import c from "./SelectDrop.module.css";
import { PARADA_DATA } from "../../DEMO_DATA";
import { useDispatch } from "react-redux";
import { dataSliceAction } from "../store/DataSlice";
import { useState } from "react";
const customStyles = {
  control: (provided, state) => ({
    ...provided,
    width: "100%",
    height: "3rem",
    fontWeight: "600",
    textTransform: "uppercase",
    borderRadius: "5px",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol"`,
    letterSpacing: "2px",
    textAlign: "center",
    outline: "none",
    border: "2px solid #8b1f04",
    backgroundColor: "rgba(24, 13, 13, 0.37)",
    boxShadow: "none",
    "&:hover": {
      border: "2px solid #f84018",
      backgroundColor: "rgba(100, 98, 98, 0.37)",
      cursor: "pointer",
    },
  }),
  option: (provided, state) => ({
    width: "100%",
    padding: "0.5rem",
    color: state.isFocused ? "#f3f3f3" : "#8b1f04",
    backgroundColor: state.isFocused && "#474b4d",
    fontFamily: `Formular, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
                "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
                "Segoe UI Symbol"`,
    textTransform: "uppercase",
    outline: "none",
    "&:hover": {
      cursor: "pointer",
    },
  }),
  input: (provided) => ({
    ...provided,
    color: "#f3f3f3",
  }),
  singleValue: (p) => ({
    ...p,
    color: "#f3f3f3",
  }),
  menuList: (provided) => ({
    maxHeight: "350px",
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "thin",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
      width: "9px",
      backgroundColor: "#535151",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#8a0101",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  }),
};

const SelectDrop = (p) => {
  const dispatch=useDispatch();
  const [parada, setParada]=useState();
  const optionData = [];
  if(optionData.length===0){
    PARADA_DATA.map(m=>(
      optionData.push({ value: m.Adresse, label: m.Adresse })
    ))
  }

  const changeHandler = (e) => {
    setParada(e.value);

  };
  
  const closeHandler = (e) => {
    p.closeParada();
  };
  
  const clickHandler=e=>{
    dispatch(dataSliceAction.changeParada({parada:parada, matricule:p.matricule}));
    p.closeParada();
  }
  return (
    <div className={c.changeParadaStatus}>
      <div className={c.cancel}>
        <button className={c["menu__icon"]} onClick={closeHandler}></button>
      </div>
      <h1 className={c.title}>choose parada</h1>
      <div className={c.selectContainer}>
        <Select
          options={optionData}
          id="multiSelect"
          inputId="shiftleader1"
          onChange={changeHandler}
          styles={customStyles}
          defaultValue={" "}
        />
      </div>
      <div className={c.btnHolder}>
        <button
          onClick={clickHandler}
        >
          <span>submit</span>
        </button>
      </div>
    </div>
  );
};

export default SelectDrop;
