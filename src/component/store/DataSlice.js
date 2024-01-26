import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice(
    {
        name:"dataSlice",
        initialState:{
            isLoged:false,
            data:[],
            infirmityData:[],
        },
        reducers:{
            setLogin(s,p){
                s.isLoged=true;
            },
            setLogOut(s,p){
                s.isLoged=false;
                s.data=[]
            },
            setData(s,p){
                if(s.data.length===0){
                    s.data.push(...p.payload);
                }
            },
            setInfirmityData(s,p){
                if(s.infirmityData.length===0){
                    s.infirmityData.push(...p.payload)
                }
            },
            changeParada(s,p){
                const index= s.data.findIndex(f=>f.matricule===p.payload.matricule);
                console.log(index);
                if(index!==-1){
                    s.data[index]={...s.data[index], parada:p.payload.parada};
                }
            }
        }
    }
);

export const dataSliceAction= DataSlice.actions;
export default DataSlice;