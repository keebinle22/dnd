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
    useEffect(() => getCharInfo, []);

    return (
        <>
        <h2>Characters</h2>
        <table>
            <thead>
                <tr>
                    <td>Name</td>
                </tr>
            </thead>
            <tbody>
                {charInfos.map((c, i) => (
                    c.userID !== null ? 
                        <tr key={i}>
                        <td>{c.userID}</td>
                        <td>
                            <button onClick={() => navigate(`/char/${c.userID}`)}>View</button>
                        </td>
                        </tr> 
                        : 
                        <></>
                ))}
            </tbody>
        </table>
        <div>
            <button onClick={() => navigate("/createchar")}>Create</button>
            <button onClick={() => navigate("/home")}>Home</button>
        </div>
        </>
    )
}
export default GetListOfChar;