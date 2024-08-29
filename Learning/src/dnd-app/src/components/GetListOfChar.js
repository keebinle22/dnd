import { useRef } from "react";
import { Form, useLoaderData } from "react-router-dom";
import Popup from "reactjs-popup";

function GetListOfChar(){
    const chars = useLoaderData();
    const ref = useRef();
    const openPopup = () => ref.current.open();
    const closePopup = () => ref.current.close();
    return (
        <>
        <div className="col-container">
            <div className="header-text">Character Selection</div>
            <div id="selection-action">
                <Form action="/user/createchar">
                    <button className="actionbutton">Create</button>
                </Form>
                <Form action="/user/home">
                    <button className="actionbutton">Home</button>
                </Form>
                <button className="actionbutton" onClick={openPopup}>Delete All</button>
                <Popup ref={ref} closeOnDocumentClick={false} modal>
                    <DeleteConfirmation closePopup={closePopup} />
                </Popup>
            </div>
            <table id="char-table">
                <thead>
                    <tr className="tr-head">
                        <td>Name</td>
                        <td>Level</td>
                        <td>Class</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {chars.map((c, i) => (
                        c.userID !== null ? 
                            <tr key={i}>
                                <td className="name" >{c.userID}</td>
                                <td className="level">{c.level}</td>
                                <td className="class">{c.classType}</td>
                                <td className="action">
                                <Form action={`/user/char/${c.userID}`}>
                                    <button className="actionbutton">View</button>
                                </Form>
                                <Form method="delete">
                                    <button className="actionbutton" name="name" value={c.userID}>Delete</button>
                                </Form>
                                </td>
                            </tr> 
                            : 
                            <></>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    )
}
export default GetListOfChar;

export async function deleteChar(userID){
    const init = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    };
    await fetch(`http://localhost:8080/charinfo/delete/${userID}`, init)
        .then(response => {
            if (response.status === 204) {
                return null;
            }
            return Promise.reject("Something went wrong here");
        })
        .catch(err => console.error(err));
}

export function getAllChar(){
    const init = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`,
            "Accept": "application/json"
        }
    };
    return fetch("http://localhost:8080/charinfo", init)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return Promise.reject("Something went wrong here");
        })
        .catch(err => console.error(err));
}

export async function getAllCharLoader({request}){
    const allChar = await getAllChar();
    return allChar;
}

export async function getAllCharAction({request}){
    let formData = await request.formData();
    const btn = formData.get("name");
    await deleteChar(btn);
    return null;
}

function DeleteConfirmation({closePopup}){
    const handleDelete = () => {
        deleteAll();
        closePopup();
    }
    return(
        <>
        <div>
            <h2>Delete Confirmation</h2>
            <div>Are you sure you want to delete ALL?</div>
            <div>
                <button className="actionbutton" onClick={closePopup}>Cancel</button>
                <button className="actionbutton" onClick={handleDelete} name="name" value="deleteall">I am sure</button>
            </div>
        </div>
        </>
    )
}

async function deleteAll(){
    const init = {
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    };
    const result = fetch(`${process.env.REACT_APP_URL}/charinfo/delete/all`, init)
        .then(response => {
            if (response.status === 200) {
                return null;
            }
            return Promise.reject("Something went wrong here");
        })
        .catch(err => console.error(err));
    return result;
}