import {getCSRFToken} from "./CSRF";
import {getAPI, postAPI} from "./Main";
import {AxiosResponse} from "axios";

export async function login(username: string, password: string): Promise<boolean> {
    let authObj = {
        username,
        password,
        _csrf: await getCSRFToken("login")
    };
    let query = new URLSearchParams(authObj);
    console.log(query.toString());
    let res = await postAPI("login", query.toString());
    console.log(res);

    if(res.status === 200) {
        console.log("Successfully logged in " + authObj.username);
        return true;
    } else {
        console.log("Incorrect username or password for " + authObj.username);
        console.log("Error code: " + res.status);
        return false;
    }

}

export async function isAuth(): Promise<boolean> {
    return ( await getAPI<AxiosResponse<boolean>>("auth-status") ).data
}
export async function authInfo(): Promise<boolean> {
    return ( await getAPI<AxiosResponse<boolean>>("auth-info") ).data
}
