import React, { useState } from 'react'
import "./style.css"
import Menu from "./menuApi.js"
import MenuCard from './MenuCard';
import Navbar from './Navbar';

// 
const uniqueList = [
  ...new Set(Menu.map((curElem) => {
    return curElem.category;
  })
  ),
  "All",
];
console.log(uniqueList)   ///// agar undefined catagory ko show karna ho to kar saekte hai
// 

const Resturant = () => {
  const [menuData, setMenuData] = useState(Menu);
  const [menuList,setMenuList] = useState(uniqueList);

  const filterItem = (category) => {
    // for all button
    if(category==="All"){
      setMenuData(Menu);
      return;
    }
    // // ends here 

    // navbar mein jab click karenge to wohi menu show ho uske liye hai ye wala code
    const updatedList = Menu.filter((curElem) => {
      return curElem.category === category;
    });
    setMenuData(updatedList)
  }
  // code ends


  return (
    <>
      <Navbar filterItem={filterItem} menuList={menuList} />
      <MenuCard menuData={menuData} />
    </>
  )
};
export default Resturant 

