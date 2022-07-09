import {Club} from "../../domain/model/club/Club";

export interface ISaveClubUseCase {
    handle(club: Club): Promise<void>
}