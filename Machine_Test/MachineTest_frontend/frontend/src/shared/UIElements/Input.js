import React, { useReducer, useState, useEffect } from "react";
import './Input.css';
import { validate } from "../UTIL/Validators";




// crete inputReducer Function
const inputReducer = (state,action)=>{

    switch(action.type){
        case 'CHANGE':
            return {                //return a new state
                ...state,           //copies all the keys and
                // values of the old state to new object
                value: action.val,
                // isvalid : true                 ----hard coded
                isvalid : validate(action.val, action.validators)
            };

        case 'TOUCH':
            return{
                ...state,
                isTouch:true
            }

        default:
            return state;         //existing state
    }

}

const Input = props=>{

                    
    /* its basically a function that receives an action and can dispatch the action. It receives the current state and update the current statebased on the action received and return the new state.
    useReducer will take the new state and give it back to the component and rerender the component */
    const [inputState,dispatch] = useReducer(inputReducer,
        {value: props.value ||'',isvalid:props.isvalid  || false , isTouch:false});     

    // to transfer value from child input to parent 
    // we cant directly use props to achive this
    // instead we use a call back function

    // here id and onInput is extracted from props
    const {id,onInput} = props;
    // value and isvalid is extracted from inputState
    const {value, isvalid} = inputState;
    // using the useEffect function to pass the values
    useEffect(()=>{
        onInput(id,value,isvalid)
    },[id,value,isvalid,onInput])

    const changeHandler = (event)=>{
        console.log("input has been changed")
        dispatch({type:'CHANGE', val:event.target.value, validators:props.validators})
        // now here i want to do 2 things store the value and validate it.
        // so here we need to handle the state u can use useReducer or useState
        // lets implement use Reducer
    }
    const touchHandler=()=>{
        dispatch({type:'TOUCH'})
    }


    const element = props.element === 'input'? (
        <input id={props.id} type={props.type} placeholder={props.placeholder} onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}></input>
    ) : (
        <textarea id={props.id} rows={props.row || 3} onChange={changeHandler}  onBlur={touchHandler}
        value={inputState.value}></textarea>
    )



    return(
        <div className={`form-control  ${!inputState.isvalid && inputState.isTouch && 'form-control--invalid'}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {element}
            {!inputState.isvalid && inputState.isTouch && <p>{props.errorText}</p>}
        </div>
    )
}

export default Input;