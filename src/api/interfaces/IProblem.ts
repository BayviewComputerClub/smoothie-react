import IProblemLimits from "./IProblemLimits";

export default interface IProblem {
    name: string,
    prettyName: string,
    limits: IProblemLimits[],
    problemStatement: string,
    allowPartial: boolean,
    totalPointsWorth: number,
    rateOfAC: number,
    usersSolved: number,
    editorIds: string[],
    timeCreated: number
}
