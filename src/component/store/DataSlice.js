import { createSlice } from "@reduxjs/toolkit";

const DataSlice = createSlice(
    {
        name:"dataSlice",
        initialState:{
            isLoged:false,
            data:[],
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
            }
        }
    }
);

export const dataSliceAction= DataSlice.actions;
export default DataSlice;