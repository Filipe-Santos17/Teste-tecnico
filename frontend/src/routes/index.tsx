import { BrowserRouter, Route, Routes } from 'react-router-dom'

import HomePage from '@/pages/Home'

import LoginUser from '@/pages/login/Login'
import CreateUser from '@/pages/login/CreateUser'
import ForgetUser from '@/pages/login/ForgetUser'

export default function ProjectRoutes(){
    return (
        <BrowserRouter>
          <>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/login'>
                <Route index element={<LoginUser />} />
                <Route path='create/' element={<CreateUser />} />
                <Route path='forget/' element={<ForgetUser />} />
              </Route>
              {/* <Route path='view/:id' element={
                <ProtectedRouter>
                  <ViewPoll setModal={setModalCreate} />
                </ProtectedRouter>
              } />
              <Route path='/user' element={
                <ProtectedRouter>
                  <UserHome setModal={setModalCreate} />
                </ProtectedRouter>
              } />
              <Route path='/view-data/:id' element={
                <ProtectedRouter>
                  <ViewDataPoll setModal={setModalCreate}/>
                </ProtectedRouter>
              }/> */}
            </Routes>
            {/* {modalCreate && <CreateNewPoll setModal={setModalCreate} />} */}
          </>
        {/* </UserStorage> */}
      </BrowserRouter>
    )
}