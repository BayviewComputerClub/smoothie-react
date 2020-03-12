import axios from "axios";

const SMOOTHIE_WEB_API_URL = "http://localhost:8080/api/v1/";
export async function getAPI(endpoint) {
    try {
        return await axios.get(SMOOTHIE_WEB_API_URL + endpoint);
    } catch (e) {
        alert("Could not load smoothie 😢 \nTry Again Later... ⏰");
        console.error(e);
        return false;
    }
}
export async function postAPI(endpoint, data) {
    try {
        return await axios.post(SMOOTHIE_WEB_API_URL + endpoint, data);
    } catch (e) {
        alert("Could not load smoothie 😢 \nTry Again Later... ⏰");
        console.log(e);
        return false;
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export async function getHomeContents() {
    return await getAPI("home");
}
