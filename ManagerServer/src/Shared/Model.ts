import { Account } from '../Server/Model';

export enum AccessRight{
    CREATE,
    READ,
    UPDATE,
    DELETE
}
export interface UserCredentials extends Account{
    accessRight: AccessRight[]
}

export enum HTTP_CODES{
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401
}

export enum HTTP_METHODS{
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
    PUT = 'PUT',
    OPTIONS = 'OPTIONS'
}

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

