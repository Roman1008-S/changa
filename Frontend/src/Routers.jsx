import { Routes, Route } from 'react-router-dom'
import Pages from './pages'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Pages.Home />} />
      <Route path='/home' element={<Pages.Home />} />
      <Route path='/login' element={<Pages.Login />} />
      <Route path='/register' element={<Pages.Register />} />
      <Route path='/contact' element={<Pages.Contact />} />
      <Route path='/services' element={<Pages.Services />} />
      <Route path='/facilitator' element={<Pages.Fac.Facil />} />
      <Route path='/facilitator/:id' element={<Pages.Fac.Details />} />
      <Route path='/profile' element={<Pages.Profile />} />

    </Routes>
  )
}

export default Routers