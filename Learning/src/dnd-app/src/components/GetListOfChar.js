import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function GetListOfChar(){

    const [charInfos, setCharInfos] = useState([]);
    const navigate = useNavigate();
    const getCharInfo = () => {
        const init = {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        };
        fetch("http://localhost:8080/charinfo", init)
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                }
                return Promise.reject("Something went wrong here");
            })
            .then(body => {
                setCharInfos(body)
            })
            .catch(err => console.error(err));
        }
    useEffect(() => getCharInfo, [charInfos]);

    const handleDelete = (userID) => {
        deleteChar(userID);
    }
    return (
        <>
        <div className="col-container">
            <div className="header-text">Character Selection</div>
            <div id="selection-action">
                <button className="actionbutton" onClick={() => navigate("/createchar")}>Create</button>
                <button className="actionbutton" onClick={() => navigate("/home")}>Home</button>
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
                    {charInfos.map((c, i) => (
                        c.userID !== null ? 
                            <tr key={i}>
                            <td className="name">{c.userID}</td>
                            <td className="level">Level</td>
                            <td className="class">Class</td>
                            <td className="action">
                                <button className="actionbutton" onClick={() => navigate(`/char/${c.userID}`)}>View</button>
                                <button className="actionbutton" onClick={() => handleDelete(c.userID)}>Delete</button>
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
            "Content-Type": "application/json"
        }
    };
    fetch(`http://localhost:8080/charinfo/delete/${userID}`, init)
        .then(response => {
            if (response.status === 204) {
                return null;
            }
            return Promise.reject("Something went wrong here");
        })
        .catch(err => console.error(err));
}