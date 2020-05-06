import {AxiosResponse} from "axios";
import {getAPI} from "./Main";
import IContest from "./interfaces/IContest";

export async function getContests(): Promise<AxiosResponse<IContest[]>> {
    return await getAPI<IContest[]>("contests");
}
