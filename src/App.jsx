import './App.css'
import Header from './components/Header'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Edit from './pages/Edit'
function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/:uid/edit' element={<Edit/>} />
    </Routes>
    </>
  )
}

export default App
