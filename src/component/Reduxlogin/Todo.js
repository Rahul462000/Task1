import React, { useState, useEffect } from "react";
import { logout, selectUser } from "../../Feature/Slice";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useSelector } from "react-redux/es/hooks/useSelector";
import "./login.css";

// get the localStorage data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist");

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
};


const Todo = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleLogout = (e) =>{
        e.preventDefault();
        dispatch(logout())
    }
    
    const [inputdata, setInputData] = useState("");
    const [items, setItems] = useState(getLocalData());
    const [isEditItem, setIsEditItem] = useState("");
    const [toggleButton, setToggleButton] = useState(false);

    // add the items when plus sign is clicked in input field
    const addItem = () => {
        if (!inputdata) { /// jab khali hai to kuch mat karo
            alert("plz fill the data");
        } else if (inputdata && toggleButton) { //jab koi bhi input data ko edit kiya aur usi ki positino mein store karwane kiye
            setItems(
                items.map((curElem) => {
                    if (curElem.id === isEditItem) {
                        return { ...curElem, name: inputdata };
                    }
                    return curElem;
                })
            );
            // // jab edit kar diya tab mujhe waha per koi bhi icon nahi chaye 
            setInputData("");
            setIsEditItem(null);
            setToggleButton(false);
        } else {
            const myNewInputData = { // delete buton ko operte kaerne ke liye id ki need hoti hai to ye new object kiya hai
                id: new Date().getTime().toString(),
                name: inputdata, // yaha per inputdata attribute pass kar diya
            };
            setItems([...items, myNewInputData]);// items is old data usko rakho aur new data i.e myNewInputData ko add karte chalo
            setInputData(""); // jo bhi data change kiya use phir new tarike se blank karne ke liye
        }
    };

    //edit the items means jab edit button per click karenge tab kya hoga
    const editItem = (index) => {
        // // .find ek javascript mein method hota hai
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputData(item_todo_edited.name);
        // // ya per ek new state variable liya hao jisme jo id mile hai wo pass kari hai
        setIsEditItem(index);
        // // jab id match karli aur data bhi aagaya to cursor bhi toggle karwana hai uske liye new state variable liya hai
        setToggleButton(true);
    };

    // how to delete items section
    ///// 
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            // // ye return karega in form of array meand ki index jab id match ho jayegi use chodakar baki ko return karega in form of array
            return curElem.id !== index;
        });
        /// data array ki form mein a
        setItems(updatedItems);
    };

    // remove all the elements
    const removeAll = () => {       
        setItems([]);
    };

    // adding localStorage yaha per sirf local storage in data set hua hai
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items));
    }, [items]);

    return (
        <>

            <div className="main-div">
                <div className="child-div">
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here </figcaption>
                        <h1>welcome <span>{user.name}</span></h1>
                    </figure>
                    <div className="addItems">
                        <input
                            type="text"
                            placeholder="📝Add Item"
                            className="form-control"
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}
                        />
                        {/* // ternery operator use kiya hai matlab ki konsa button use kar hai mean true or false */}
                        {toggleButton ? (
                            <i className="far fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}
                    </div>
                    {/* show our items  */}
                    <div className="showItems">
                        {items.map((curElem) => {  /// loop mein chlane ke liye
                            return (
                                // ek error ati hai unique is not defined use tackle karne ke liye
                                <div className="eachItem" key={curElem.id}>
                                    {/* /// isse new item add ho jayenge */}
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i
                                            className="far fa-edit add-btn"
                                            onClick={() => editItem(curElem.id)}></i>
                                        <i
                                            className="far fa-trash-alt add-btn"
                                            /////// items ko delete kare liye fat arroe function use karte hai taki operation loop mein work kaeke ek click paer kare jab click kara jaye
                                            onClick={() => deleteItem(curElem.id)}></i>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* remove all the items in the list button*/} 
                    <div className="showItems">
                        <button
                            className="btn effect04"
                            data-sm-link-text="Remove All"
                            onClick={removeAll}>
                            <span> CHECK LIST</span>
                        </button>
                    </div>


                    <div className="logout">
                        <button
                            className="btn effect04"
                            data-sm-link-text="logout"
                            onClick={(e) =>handleLogout(e)}
                            >
                            <span>LogOut</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Todo;