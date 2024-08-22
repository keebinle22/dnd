import './App.css';
import './styles/Skill.css';
import './styles/BattleStat.css';
import './styles/CharInfo.css';
import './styles/Health.css';
import './styles/CharSelection.css';
import './styles/ReviewAdd.css';
import './styles/SignUp.css';
import React, { useCallback, useMemo, useState } from 'react';
import { BrowserRouter, createBrowserRouter, createRoutesFromElements, defer, Outlet, Route, RouterProvider, Routes, useNavigate} from 'react-router-dom';
import GetSkill from './components/GetSkill';
import CharSheet from './components/CharSheet';
import GetListOfChar, { getAllCharAction, getAllCharLoader } from './components/GetListOfChar';
import CreateChar from './components/CreateChar';
import AddCharInfo, { action as addCharAction, loader as addCharLoader } from './components/add/AddCharInfo';
import AddSkill, { action as addSkillAction, loader as addSKillLoader } from './components/add/AddSkill';
import AddHealth, { action as addHealthAction, loader as addHealthLoader } from './components/add/AddHealth';
import ErrorPage from './components/ErrorPage';
import AddUser, { action as addUserAction } from './components/add/AddUser';
import ReviewAdd, { action as reviewAction, loader as reviewLoader } from './components/add/ReviewAdd';
import Login, { AuthContext, loginAction } from './components/auth/Login';
import AuthProvider, { useAuth } from './components/auth/AuthProvider';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthLayout } from './components/auth/AuthLayout';
import { HomeLayout } from './components/HomeLayout';
import SignUp, { signupAction } from './components/auth/SignUp';

export const url = "http://localhost:8080";
export const curToken = window.localStorage.getItem("token");

function App() {
  
  const getUser = () => {
    const user = window.localStorage.getItem("token");
    if (!user){
      return null;
    }
    console.log(user)
    const init = {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${user}`,
        "Content-Type": "application/json"
      }
    };
    const acct = fetch(`${url}/users/me`, init)
      .then(resp => {
        console.log(resp)
        switch (resp.status) {
          case 200:
            return resp.json();
          case 403:
            return Promise.reject();
          default:
            return Promise.reject("Something went wrong here");
        }
      })
      // .then(body => {
      //   console.log("GET USER")
      //   console.log(body)
      // })
      .catch(err => console.error(err));
    // if (acct.username) {
    //   setUser(acct.username);
    //   setRole(acct.type);
    // }
    //how to display error if 403 (& more)?
    console.log(acct);
    return acct;
  }
  console.log(window.localStorage.getItem("token"))
  const router = 
  createBrowserRouter(
    createRoutesFromElements(
      <>
      {/* <Route element={<AuthLayout/>} loader={() => defer({userPromise: getUser()})}> */}
      <Route element={<AuthLayout />}>
        <Route element={<HomeLayout/>}>
          <Route path="/" element={<Home/>} errorElement={<ErrorPage/>}/>
          <Route path="signup" element={<SignUp/>} action={signupAction}/>
          <Route path="/login" id={"login"} element={<Login/>} />
        </Route>
        <Route path="/user" element={<PrivateRoute/>}>
          <Route path="home" element={<Home/>}/>
          <Route path="charinfo" element={<GetListOfChar/>} action={getAllCharAction} loader={ getAllCharLoader} errorElement={<ErrorPage />}/>
          <Route path="char/:id" element={<CharSheet/>}/>
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
      <div>v1.6.0</div>
    </footer>
    </>
  )
}
