import {getAPI, postAPI, SMOOTHIE_WEB, SMOOTHIE_WEB_API} from "./Main";
import IProblem from "./interfaces/IProblem";
import {AxiosResponse} from "axios";
import {getCSRFToken} from "./CSRF";

export async function getProblems(): Promise<AxiosResponse<IProblem[]>> {
    return await getAPI<IProblem[]>("problems");
}

export async function getProblem(name: string): Promise<AxiosResponse<IProblem>> {
    return await getAPI<IProblem>("problems/" + name);
}


export async function submitProblemSolution(name: string): Promise<void> {
    console.log("~ Sending Problem Submission/Solution ~");
    let data = {
        //_csrf: await getCSRFToken("problem/" + name + "/submit"),
        lang: "c11",
        code: `
#include <stdio.h>

int main() {
    int N;
    scanf("%d\\n", &N);

    for (int i = 0; i < N; i++) {
        int a, b;
        scanf("%d %d\\n", &a, &b);
        printf("%d\\n", a + b);
    }
}
        `
    };
    let res = await postAPI("problem/" + name + "/submit", data, false);
    console.log(res);

    if(res.status !== 202) {
        alert("An error has occurred :(");
    }

    console.log("Submission ID: " + res.data);

    console.log("Connecting to WebSocket...");
    let socket = new WebSocket("ws://"+SMOOTHIE_WEB +"/ws/live-submission");
    socket.addEventListener('open', e => {
        console.log('Connected to websocket.');
        socket.send(res.data);
    });
    socket.addEventListener('close', e => {
        console.log('Disconnected from websocket.');
    });

    socket.addEventListener('message', e => {
        console.log("Got WS Data:");
        console.log(e.data);
    });
}
