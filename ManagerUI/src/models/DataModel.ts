export interface User{
    id: string,
    name: string,
    age: number,
    email:string,
    workerPosition: WorkingPosition
}

export enum WorkingPosition{
    JUNIOR,
    PROGRAMMER,
    ENGINEER,
    EXPERT,
    MANAGER
}