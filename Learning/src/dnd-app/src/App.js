import React, { useEffect } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useNavigate } from 'react-router-dom';
import './App.css';
import AddCharInfo, { action as addCharAction, loader as addCharLoader } from './components/add/AddCharInfo';
import AddHealth, { action as addHealthAction, loader as addHealthLoader } from './components/add/AddHealth';
import AddSkill, { action as addSkillAction, loader as addSKillLoader } from './components/add/AddSkill';
import AddUser, { action as addUserAction } from './components/add/AddUser';
import ReviewAdd, { action as reviewAction, loader as reviewLoader } from './components/add/ReviewAdd';
import { AuthLayout } from './components/auth/AuthLayout';
import { useAuth } from './components/auth/AuthProvider';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import SignUp, { signupAction } from './components/auth/SignUp';
import CharSheet, { charSheetLoader } from './components/CharSheet';
import CreateChar from './components/CreateChar';
import ErrorPage from './components/ErrorPage';
import GetListOfChar, { getAllCharAction, getAllCharLoader } from './components/GetListOfChar';
import { HomeLayout } from './components/HomeLayout';
import LevelUp, { levelupLoader } from './components/LevelUp';
import './styles/BattleStat.css';
import './styles/CharInfo.css';
import './styles/CharSelection.css';
import './styles/CharSheet.css';
import './styles/Health.css';
import './styles/ReviewAdd.css';
import './styles/SignUp.css';
import './styles/Skill.css';

export const url = "http://localhost:8080";
export const curToken = window.localStorage.getItem("token");

function App() {
  const router = 
  createBrowserRouter(
    createRoutesFromElements(
      <>
      {/* <Route element={<AuthLayout/>} loader={() => defer({userPromise: getUser()})}> */}
      <Route element={<AuthLayout />} errorElement={<ErrorPage/>}>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home/>} />
          <Route path="signup" element={<SignUp/>} action={signupAction}/>
          <Route path="/login" id={"login"} element={<Login/>} />
        </Route>
        <Route path="/user" element={<PrivateRoute/>}>
          <Route path="home" element={<Home/>}/>
          <Route path="charinfo" element={<GetListOfChar/>} action={getAllCharAction} loader={ getAllCharLoader}/>
          <Route path="char/:id" element={<CharSheet/>} loader={charSheetLoader}/>
          <Route path="char/:id/levelup" element={<LevelUp />} loader={levelupLoader}/>
          <Route path="createchar" element={<CreateChar/>}>
            <Route path="user" element={<AddUser/>} action={addUserAction}/>
            <Route path=":userID" element={<AddCharInfo/>} loader={addCharLoader} action={addCharAction}/>
            <Route path=":userID/scores" element={<AddSkill/>} loader={addSKillLoader} action={addSkillAction}/>
            <Route path=":userID/health" element={<AddHealth />} loader={addHealthLoader} action={addHealthAction}/>
            <Route path=":userID/review" element={<ReviewAdd/>} loader={reviewLoader} action={reviewAction}/>
          </Route>
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

export function Home(){
  const auth = useAuth();
  const navigate = useNavigate();
  const handleCharClick = () => {
    navigate("/user/charinfo");
  }
  return (
    <>
    <div id='homepage'>
     <div id='title'>Dungeon & Dragon</div>
      <div className="home-container">
        {auth.user ? 
        <button className="actionbutton" type="button" id="viewall" onClick={handleCharClick}>Start</button>
        :
        <div>
          <button className="actionbutton" type="button" onClick={() => navigate("/signup")}>Sign Up</button>
          <button className="actionbutton" type="button" onClick={() => navigate("/login")}>Login</button>
        </div>
        }
      </div>
    </div>
    </>
  )
}

export function Credit(){
  return(
    <>
    <footer>
      <div>Made by Kevin Le</div>
      <div>v1.7.0</div>
    </footer>
    </>
  )
}
