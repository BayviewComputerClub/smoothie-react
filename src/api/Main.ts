import axios, {AxiosResponse} from "axios";

import IGeneralSettings from "./interfaces/IGeneralSettings";

export const SMOOTHIE_WEB_API = "https://smoothie.bayview.club/";
export const SMOOTHIE_WEB_API_URL = SMOOTHIE_WEB_API + "api/v1/";

export async function getAPI<T>(endpoint: string): Promise<AxiosResponse> {
    try {
        return await axios.get<T>(SMOOTHIE_WEB_API_URL + endpoint);
    } catch (e) {
        alert("Could not load smoothie 😢 \nTry Again Later... ⏰");
        console.error(e);
        return e;
    }
}
export async function postAPI<T>(endpoint: string, data: any): Promise<AxiosResponse> {
    try {
        return await axios.post<T>(SMOOTHIE_WEB_API_URL + endpoint, data);
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
