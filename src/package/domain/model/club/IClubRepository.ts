import {Club} from "./Club";

export interface IClubRepository {
    save(club: Club): Promise<void>

    find(id: number): Promise<Club|null>

    findAll(): Promise<Club[]>
}