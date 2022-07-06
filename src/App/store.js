import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "../Feature/Slice";

export default configureStore({
    reducer:{
        user:userReducer,
    },
})