import {getAPI} from "./Main";
import IProblem from "./interfaces/IProblem";
import {AxiosResponse} from "axios";

export async function getProblems(): Promise<AxiosResponse<IProblem[]>> {
    return await getAPI<IProblem[]>("problems");
}

export async function getProblem(name: string): Promise<AxiosResponse<IProblem>> {
    return await getAPI<IProblem>("problems/" + name);
}
