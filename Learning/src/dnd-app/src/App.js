import './App.css';
import './styles/Skill.css';
import './styles/BattleStat.css';
import './styles/CharInfo.css';
import './styles/Health.css';
import './styles/CharSelection.css';
import React from 'react';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, Routes, useNavigate} from 'react-router-dom';
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
  const router = 
  createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route element={<Credit/>}>
        <Route path="/" element={<Home/>} errorElement={<ErrorPage/>}/>
        <Route path="/charinfo" element={<GetListOfChar/>} errorElement={<ErrorPage />}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/char/:id" element={<CharSheet/>}/>
        <Route path="/createchar" element={<CreateChar/>}>
          <Route path="/createchar/user" element={<AddUser/>} action={addUserAction}/>
          <Route path="/createchar/:userID" element={<AddCharInfo/>} loader={addCharLoader} action={addCharAction}/>
          <Route path="/createchar/:userID/scores" element={<AddSkill/>} loader={addSKillLoader} action={addSkillAction}/>
          <Route path="/createchar/:userID/health" element={<AddHealth />} loader={addHealthLoader} action={addHealthAction}/>
          <Route path="/createchar/:userID/review" element={<ReviewAdd/>} loader={reviewLoader} action={reviewAction}/>
        </Route>
      </Route>
      </>
    )
  )
  
  return(
    <RouterProvider router={router}/>
  )
}
export default App;

function Home(){
  const navigate = useNavigate();
  const handleCharClick = () => {
    navigate("/charinfo");
  }
  return (
    <>
    <div id='homepage'>
      <div id='title'>Dungeon & Dragon</div>
      <div className="home-container">
        <button type="button" id="viewall" onClick={handleCharClick}>Start</button>
      </div>
    </div>
    </>
  )
}

function Credit(){
  return(
    <>
    <Outlet/>
    <footer>
      <div>Made by Kevin Le</div>
      <div>v1.4.0</div>
    </footer>
    </>
  )
}
