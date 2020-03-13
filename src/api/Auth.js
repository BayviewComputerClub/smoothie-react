import {postAPI} from "./Main";
import {getCSRFToken} from "./CSRF";
import axios from "axios";

export async function login(username, password) {
    let authObj = {
        username,
        password,
        _csrf: await getCSRFToken()
    };
    let query = new URLSearchParams(authObj);
    console.log(query.toString());
    let res = await axios.post("http://localhost:8080/api/v1/login", query.toString());
    console.log(res);

    // this is sketch...
    if(res.status == 200) {
        console.log("Successfully logged in " + authObj.username);
        return true;
    } else {
        console.log("Incorrect username or password for " + authObj.username);
        console.log("Error code: " + res.status);
        return false;
    }

}
