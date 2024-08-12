import './App.css';
import './styles/Skill.css';
import './styles/BattleStat.css';
import './styles/CharInfo.css';
import './styles/Health.css';
import React from 'react';
import { BrowserRouter, createBrowserRouter, Outlet, Route, RouterProvider, Routes, useNavigate} from 'react-router-dom';
import GetSkill from './components/GetSkill';
import CharSheet from './components/CharSheet';
import GetListOfChar from './components/GetListOfChar';
import CreateChar from './components/CreateChar';
import AddCharInfo, { action as addCharAction, loader as addCharLoader } from './components/add/AddCharInfo';
import AddSkill, { action as addSkillAction, loader as addSKillLoader } from './components/add/AddSkill';
import AddHealth, { action as addHealthAction, loader as addHealthLoader } from './components/add/AddHealth';
import ErrorPage from './components/ErrorPage';
import AddUser, { action as addUserAction } from './components/add/AddUser';
import ReviewAdd, { action as reviewAction, loader as reviewLoader } from './components/add/ReviewAdd';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
      errorElement: <ErrorPage/>
    },
    {
      path: "/charinfo",
      element: <GetListOfChar/>,
      errorElement: <ErrorPage />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path: "/char/:id",
      element: <CharSheet/>
    },
    {
      path: "/createchar",
      element: <CreateChar/>,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/createchar/user",
          element: <AddUser/>,
          action: addUserAction
        },
        {
          path: "/createchar/:userID",
          element: <AddCharInfo/>,
          loader: addCharLoader,
          action: addCharAction
        },
        {
          path: "/createchar/:userID/scores",
          element: <AddSkill/>,
          loader: addSKillLoader,
          action: addSkillAction
        },
        {
          path: "/createchar/:userID/health",
          element: <AddHealth />,
          loader: addHealthLoader,
          action: addHealthAction
        },
        {
          path: "/createchar/:userID/review",
          element: <ReviewAdd/>,
          loader: reviewLoader,
          action: reviewAction
        }
      ]
    }
  ])
return(
  <div>
    <RouterProvider router={router}/>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/charinfo" element={<GetListOfChar />}/>
        <Route path="/view" element={<GetSkill/>} />
        <Route path="/home" element={<Home />}/>
        <Route path="/char/:id" element={<CharSheet />}/>
        <Route path="/createchar" element={<CreateChar/>}/>
        <Route path="/createchar/user" element={<AddCharInfo />} />
        <Route path="/createchar/scores" element={<AddSkill />} />
        <Route path="/createchar/health" element={<AddHealth />} />
      </Routes>
    </BrowserRouter> */}
  </div>
)
  function Home(){

    const navigate = useNavigate();
    const handleViewClick = () => {
      navigate("/view");
    }
    const handleCharClick = () => {
      navigate("/charinfo");
    }
    return (
      <>
      <div>
        <h2>DND</h2>
        <div>
          <button type="button" className="btn btn-info" id="homePage" onClick={handleViewClick}>View</button>
          <button type="button" className="btn btn-info" id="homePage" onClick={handleCharClick}>Char</button>
        </div>
      </div>

      </>
    )
  }

  function Root(){
    return(
      <>
        <h2>DND</h2>
        <Outlet/>
      </>
    )
  }
}
export default App;
