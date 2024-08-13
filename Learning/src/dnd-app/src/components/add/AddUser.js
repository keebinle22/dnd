import { useEffect, useState } from "react";
import { Form, redirect, useActionData, useFetcher } from "react-router-dom";

function AddUser(){
    const [userID, setUserID] = useState("");
    const error = useActionData();
    const handleNameChange = (evt) => {
        setUserID(evt.target.value === undefined ? userID : evt.target.value)
    }
    return(
        <>
        <Form method="post">
            <div>{error === undefined ? "" : error.format}</div>
            <span>Username: </span>
            <input className="create-input" type="text" name="userID" onChange={handleNameChange} value={userID} />
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
    const result = await fetch("http://localhost:8080/charinfo", init)
        .then(response => {
            switch(response.status){
                case 201:
                    return null;
                case 400:
                    return response.json();
                default:
                    return Promise.reject("Something went wrong here");
               
            }
        })
        // .then(body => {
        //     setCharInfo(body)
        // })
        // .catch(err => console.error(err));
    return result;
}

export async function action({request}){
    const errors = {};
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    console.log(updates.userID)
    if (!updates.userID){
        errors.format = "User cannot be blank.";
        return errors
    }
    const result = await newChar(updates.userID); //adds empty charinfo w/username
    if (result){
        return errors.result = result;
    }
    return redirect("/createchar/" + updates.userID);

}