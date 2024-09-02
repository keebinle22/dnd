import { useFetcher } from "react-router-dom";

function EditCharinfo({ ci }){
    const fetcher = useFetcher({key: "charinfo"});
    return(
        <>
        <div className="popup">
            <fetcher.Form method="put" className="popup-form">
                <div className="errormessage" hidden={!fetcher.data}>
                {fetcher.data ? 
                    fetcher.data.map((e,idx) =>
                    <div key={idx}>{e}</div>)
                :
                    <></>}

                </div>
                {/* <div>
                    <label className="label-form">Class Type: </label>
                    <input type="text" className="ci-text" name="classType" value={classType} onChange={handleClassTypeChange}/>
                </div> */}
                {/* <div>
                    <label className="label-form">Level: </label>
                    <input type="number" className="ci-text" name="level" value={level} onChange={handleLevelChange} />
                </div> */}
                <div className="form-container">
                    <label className="label-form">Race: </label>
                    <input type="text" className="ci-text" name="race" defaultValue={ci.race}/>
                </div>
                <div className="form-container">
                    <label className="label-form">Background: </label>
                    <input type="text" className="ci-text" name="background" defaultValue={ci.background}/>
                </div>
                <div className="form-container">
                    <label className="label-form">Experience: </label>
                    <input type="number" className="ci-text" name="exp" defaultValue={ci.exp}/>
                </div>
                <div className="add-action">
                    <button className="actionbutton" name="name" value="ci">Save</button>
                    <button className="actionbutton" name="name" value="cancel">Cancel</button>
                </div>
            </fetcher.Form>
        </div>
        </>
    )
}
export default EditCharinfo;

export async function editCharInfo(editCI){
    const start = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        },
        body: JSON.stringify(editCI)
    };
    const result = await fetch(`${process.env.REACT_APP_URL}/charinfo/update/${editCI.userID}`, start)
        .then(response => {
            switch (response.status) {
                case 204:
                    return null;
                case 400:
                    return response.json();
                default:
                    return Promise.reject(response);
            };
        })
        .catch(err => console.error(err));
    return result;
}