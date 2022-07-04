import {IGetClubsUseCase} from "../../../usecase/club/IGetClubsUseCase";
import {Club} from "../../model/club/Club";
import {IClubRepository} from "../../model/club/IClubRepository";
import {inject, injectable} from "inversify";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";

@injectable()
export class GetClubsInteractor implements IGetClubsUseCase {
    private _repository: IClubRepository

    constructor(
        @inject<IClubRepository>(REPOSITORY_TYPES.ClubRepository) repository
    ) {
        this._repository = repository
    }

    async handle(): Promise<Club[]> {
        return this._repository.findAll()
    }
}