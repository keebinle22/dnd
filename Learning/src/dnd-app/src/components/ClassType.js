export async function getClass(userID){
    const init = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${window.localStorage.getItem("token")}`
        }
    };
    const result = await fetch(`${process.env.REACT_APP_URL}/charinfo/class/${userID}`, init)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            }
            return Promise.reject("Something went wrong here");
        })

        .catch(err => {
            console.error(err);
        });
    return result; 
}