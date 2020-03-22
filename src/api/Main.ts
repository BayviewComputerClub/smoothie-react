import axios, {AxiosResponse} from "axios";

import IGeneralSettings from "./interfaces/IGeneralSettings";
import IUser from "./interfaces/IUser";

export const SMOOTHIE_WEB = "localhost:8080";
export const SMOOTHIE_WEB_API = "http://" + SMOOTHIE_WEB + "/";
export const SMOOTHIE_WEB_API_URL = SMOOTHIE_WEB_API + "api/v1/";

export async function getAPI<T>(endpoint: string, rawRequest?: boolean): Promise<AxiosResponse> {
    try {
        if(rawRequest) {
            return await axios.get<T>(SMOOTHIE_WEB_API + endpoint);
        } else {
            return await axios.get<T>(SMOOTHIE_WEB_API_URL + endpoint);
        }
    } catch (e) {
        alert("Could not load smoothie 😢 \nTry Again Later... ⏰");
        console.error(e);
        return e;
    }
}
export async function postAPI<T>(endpoint: string, data: any, rawRequest?: boolean): Promise<AxiosResponse> {
    try {
        if(rawRequest) {
            console.log("Making a request to URL ROOT (bad)");
            return await axios.post<T>(SMOOTHIE_WEB_API + endpoint, data);
        } else {
            return await axios.post<T>(SMOOTHIE_WEB_API_URL + endpoint, data);
        }
    } catch (e) {
        alert("Could not load smoothie 😢 \nTry Again Later... ⏰");
        console.log(e);
        return e;
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export async function getHomeContents(): Promise<AxiosResponse<IGeneralSettings>> {
    return await getAPI<IGeneralSettings>("home");
}

export async function getAllUsers(): Promise<AxiosResponse<IUser[]>> {
    return await getAPI<IUser[]>("ranking");
}
