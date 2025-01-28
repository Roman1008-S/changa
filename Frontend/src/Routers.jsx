import { Routes, Route } from 'react-router-dom'
import Pages from './pages'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Pages.Home />} />
      <Route path='/home' element={<Pages.Home />} />
      <Route path='/login' element={<Pages.Login />} />
      <Route path='/register' element={<Pages.Register />} />
    </Routes>
  )
}

export default Routers