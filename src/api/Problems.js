import {getAPI, postAPI} from "./Main";

export async function getProblems() {
    return await getAPI("problems");
}
