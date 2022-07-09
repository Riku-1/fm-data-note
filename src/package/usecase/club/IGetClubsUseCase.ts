import {Club} from "../../domain/model/club/Club";

export interface IGetClubsUseCase {
    handle(): Promise<Club[]>
}