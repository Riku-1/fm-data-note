import {Player} from "../package/domain/model/player/Player";
import {CurrentPlayer} from "../package/domain/application/player/CurrentPlayer";
import {Club} from "../package/domain/model/club/Club";
import {MyCustomDate} from "../package/domain/model/shared/MyCustomDate";

export interface IElectronAPI {
  loadPlayersFile: () => Promise<CurrentPlayer[]>
  saveCurrentPlayerAttributesList: (players: CurrentPlayer[], savedAt: MyCustomDate) => Promise<void>
  getCurrentPlayer: (playerId: number, savedAt: MyCustomDate) => Promise<CurrentPlayer|null>
  getClubsPlayers: (clubId: number) => Promise<Player[]>

  getClubs: () => Promise<Club[]>
  saveClub: (club: Club) => Promise<void>
}

declare global {
  interface Window {
    exposedAPI: IElectronAPI
  }
}
