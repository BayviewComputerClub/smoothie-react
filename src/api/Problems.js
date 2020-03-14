import {getAPI, postAPI} from "./Main";

export async function getProblems() {
    return await getAPI("problems");
}

export async function getProblem(name) {
    return await getAPI("problems/" + name);
}
