import {Club} from "./Club";

export interface IClubRepository {
    save(club: Club): Promise<void>

    findAll(): Promise<Club[]>
}