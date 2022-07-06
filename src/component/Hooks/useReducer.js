import React, { useEffect, UseReducer } from 'react'
import "./style.css"

const reducer = (state, action)  =>{ 
  if(action.type ==='INCR'){
    state = state + 1;
  }
  if(state > 0 && action.type ==='DECR'){
    state = state - 1;
  }
  return state; 
};

const useReducer = () => {
const initialdata = 10;
const [state,dispatch] = useReducer(reducer,initialdata);

// useEffect(() =>{
//     document.title = `Chats(${myNum})`
// });



  return (
    <>
        <div className="center_div">
            <p>{reducer}</p>
            <div className="button2" onClick={() => dispatch ({type:"INCR"})} >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                INCR
            </div> 

            <div className="button2" onClick={() => dispatch ({type:"DECR"})} >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                DECR
            </div>
           
        </div>
    </>
  )
}

export default UseReducer