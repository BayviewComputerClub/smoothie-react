export default interface IContest {
    id: string,
    name: string,
    prettyName: string,
    description: string,
    renderedDescription: string,
    timeStart: number,
    timeEnd: number,
    submissionPeriod: number,
    timeCreated: number,
    enabled: boolean,
    visibleToPublic: boolean,
    timeMatters: boolean,
    hiddenLeaderBoard: boolean
}
