import React from 'react'
// import Crud from './component/CRUD/crud'
import Redux from './component/Reduxlogin/redux'
import Todo from './component/Reduxlogin/Todo'
import { selectUser } from './Feature/Slice'
import { useSelector } from 'react-redux/es/hooks/useSelector'
// import Todo from './component/Todoreact/Todo'
// import Temp from "./component/weather/Temp"

const App = () => {
  const user = useSelector(selectUser)
  return (
    <>
    {/* <Temp /> */}
    {/* <Crud /> */}
    {/* <Todo /> */}
    {/* <Redux /> */}
    {user ? <Todo /> : <Redux />}
    </>
  )
}

export default App
