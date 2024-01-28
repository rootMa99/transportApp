import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    isLoged: { login: false, role: "" },
    data: [],
    dataRoot:[],
    datac: { data: [], status: "", name: "" },
  },
  reducers: {
    setLogin(s, p) {
      s.isLoged.login = true;
      s.isLoged.role = p.payload
    },
    setLogOut(s, p) {
      s.isLoged = false;
      s.data = [];
    },
    setData(s, p) {
      if (s.data.length === 0) {
        s.data.push(...p.payload);
      }
    },
    setDataRoot(s, p) {
      if (s.dataRoot.length === 0) {
        s.data.push(...p.payload);
      }
    },
    setDatac(s, p) {
      if (p.payload.changeParada) {
        const index = s.datac.data.findIndex(
          (f) => f.matricule === p.payload.matricule
        );
        console.log(index);
        if (index !== -1) {
          s.datac.data[index] = {
            ...s.datac.data[index],
            parada: p.payload.parada,
          };
        }
      } else {
        s.datac.data = p.payload.data;
        s.datac.status = p.payload.status;
        s.name = p.payload.name;
      }
    },
    changeParada(s, p) {
      const index = s.data.findIndex(
        (f) => f.matricule === p.payload.matricule
      );
      console.log(index);
      if (index !== -1) {
        s.data[index] = { ...s.data[index], parada: p.payload.parada };
      }
    },
  },
});

export const dataSliceAction = DataSlice.actions;
export default DataSlice;
