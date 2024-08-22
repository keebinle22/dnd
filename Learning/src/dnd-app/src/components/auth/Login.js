import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { url } from "../../App";
import { createContext, useState } from "react";
import { useAuth } from "./AuthProvider";

export default function Login(){
    // const errors = useActionData();
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const handleInput = (evt) => {
        const {name, value} = evt.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }))
    }
    const auth = useAuth();
    const handleCancel = (evt) => {
        evt.preventDefault();
        navigate("/")
    }
    const handleSubmit = async (evt) => {
        evt.preventDefault();
        console.log(input);
        const result = await login(input);
        if (result.message){
            setErrors(result);
            return;
        }
        console.log(result)
        window.localStorage.setItem("token", result.token);
        auth.loginAction();
        navigate("/");
        return;
    }
    return(
        <>
        <div className="col-container form">
            <div className="errormessage" id="health-error" hidden={!errors?.message}>
                {errors?.message && errors.message}
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <label className="label-form">Username</label>
                    <input className="add-form" type="text" name="username" onChange={handleInput}/>
                </div>
                <div className="form-container">
                    <label className="label-form">Password</label>
                    <input className="add-form" type="text" name="password" onChange={handleInput} />
                </div>
                <div className="add-action">
                    <button className="actionbutton" onClick={handleCancel}>Cancel</button>
                    <button className="actionbutton">Submit</button>
                </div>
            </form>
        </div>
        </>
    )
};

// export const AuthContext = async (data) => {
//     console.log(data);
//     const init = {
//         method: "GET",
//         headers: {
//             "Authorization": `Bearer ${data.token}`,
//             "Accept": "application/json"
//         }
//     };
//     const result = await fetch(`${url}/users/me`, init)
//         .then(resp => {
//             switch (resp.status) {
//                 case 200:
//                     return resp.json();
//                 case 403:
//                     return null;
//                 default:
//                     return Promise.reject("Something went wrong here");
//             }
//         })
//         .catch(err => console.error(err));
//     return createContext(result);
// }

export function loginLoader(){

}


export async function loginAction({request}){
    const errors = {};
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    const result = await login({username: updates.username, password: updates.password});
    if (result.message){
        return result;
    }
    window.localStorage.setItem("token", result.token);
    return redirect("/")
}

async function login(user){
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };
    const result = await fetch(`${url}/auth/login`, init)
        .then(resp => {
            switch(resp.status){
                case 200:
                    return resp.json();
                case 401:
                    return resp.json()
                case 403:
                    return resp.json()
                default:
                    return Promise.reject("Something went wrong here");
            }
        })
        .catch (err => console.error(err));
    return result;

    
}