import {Club} from "../../model/club/Club";
import {inject, injectable} from "inversify";
import {REPOSITORY_TYPES} from "../../../inject_types/diConfig/repisoty_types";
import {IClubRepository} from "../../model/club/IClubRepository";
import {ISaveClubUseCase} from "../../../usecase/club/ISaveClubUseCase";

@injectable()
export class SaveClubInteractor implements ISaveClubUseCase {
    private _repository: IClubRepository

    constructor(
        @inject<IClubRepository>(REPOSITORY_TYPES.ClubRepository) repository
    ) {
        this._repository = repository
    }

    public async handle(club: Club): Promise<void> {
        await this._repository.save(club)
    }
}