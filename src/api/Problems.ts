import {getAPI, postAPI, SMOOTHIE_WEB} from "./Main";
import IProblem from "./interfaces/IProblem";
import {AxiosResponse} from "axios";

export async function getProblems(): Promise<AxiosResponse<IProblem[]>> {
    return await getAPI<IProblem[]>("problems");
}

export async function getProblem(name: string): Promise<AxiosResponse<IProblem>> {
    return await getAPI<IProblem>("problems/" + name);
}

export async function submitProblemSolution(name: string, code: string): Promise<void> {
    console.log("~ Sending Problem Submission/Solution ~");
    let data = {
        //_csrf: await getCSRFToken("problem/" + name + "/submit"),
        lang: "c++11",
        code
    };
    let res = await postAPI("problem/" + name + "/submit", data, false);
    console.log(res);

    if(res.status !== 202) {
        alert("An error has occurred :(");
    }

    console.log("Submission ID: " + res.data);
    return res.data;
}

export async function getProblemWS() {
    console.log("Connecting to WebSocket...");

    return new WebSocket("ws://" + SMOOTHIE_WEB + "/ws/live-submission");
}
