import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from '@/pages/Home'

import LoginLayout from '@/layouts/LoginLayout'
import LoginUser from '@/pages/login/Login'
import CreateUser from '@/pages/login/CreateUser'
import ForgetUser from '@/pages/login/ForgetUser'
import ProtectedRouter from '@/auth/protectedRouter'

import UserHome from '@/pages/UserHome'

import { UserStorage } from '@/components/Context'

export default function ProjectRoutes() {
  return (
    <BrowserRouter>
      <UserStorage>
        <Routes>
          <Route path='/' element={<HomePage />} />

          <Route path='/login' element={<LoginLayout />}>
            <Route index element={<LoginUser />} />
            <Route path='create/' element={<CreateUser />} />
            <Route path='forget/' element={<ForgetUser />} />
          </Route>

          <Route path='/user' element={
            <ProtectedRouter>
              <UserHome />
            </ProtectedRouter>
          } />

        </Routes>
      </UserStorage>
    </BrowserRouter>
  )
}