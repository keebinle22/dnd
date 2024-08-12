import { useState } from "react";
import { Form, redirect } from "react-router-dom";

function AddUser(){
    const [userID, setUserID] = useState("");
    const handleNameChange = (evt) => {
        setUserID(evt.target.value === undefined ? userID : evt.target.value)
    }
    return(
        <>
        <Form method="post">
            <span>Username: </span>
            <input className="create-input" type="text" name="userID" required onChange={handleNameChange} value={userID} />
            <button type="submit">Next</button>
        </Form>
        </>
    )
}
export default AddUser;

export async function newChar(userID){
    const user = {
        userID: userID,
        classType: "",
        level: 0,
        race: "",
        background: "",
        exp: 0
    }
    const init = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    };
    await fetch("http://localhost:8080/charinfo", init)
        .then(response => {
            switch(response.status){
                case 201:
                    return response.json();
                case 404:
                    console.log("newChar error");
                    return null;
                default:
                    return Promise.reject("Something went wrong here");
               
            }
        })
        // .then(body => {
        //     setCharInfo(body)
        // })
        .catch(err => console.error(err));
}

export async function action({request}){
    const formData = await request.formData();
//TODO ERROR CHECK
    const updates = Object.fromEntries(formData);
    const result = await newChar(updates.userID); //add empty charinfo w/username
    return redirect("/createchar/" + updates.userID);
}