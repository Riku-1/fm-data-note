import {Player} from "../package/domain/model/player/Player";
import {CurrentPlayer} from "../package/domain/application/player/CurrentPlayer";
import {Club} from "../package/domain/model/club/Club";

export interface IElectronAPI {
  loadPlayersFile: () => Promise<CurrentPlayer[]>
  saveCurrentPlayerAttributesList: (players: CurrentPlayer[], savedAt: Date) => Promise<void>
  getClubsPlayers: (club: string, savedAt: Date) => Promise<Player[]>

  getClubs: () => Promise<Club[]>
  saveClub: (club: Club) => Promise<void>
}

declare global {
  interface Window {
    exposedAPI: IElectronAPI
  }
}
