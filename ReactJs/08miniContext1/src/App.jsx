import Login from './Components/Login'
import './App.css'
import UserContextProvider from './context/UserContextProvider'
import Profile from './Components/Profile'

function App() {
  

  return (
    <UserContextProvider >
      <h1>react and Context API</h1>
      <Login/>
      <Profile/>
    </UserContextProvider>
  )
}

export default App
