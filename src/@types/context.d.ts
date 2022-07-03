import {Player} from "../package/domain/model/player/Player";

export interface IElectronAPI {
  loadPlayersFile: () => Promise<Player[]>
  savePlayers: (players: Player[]) => Promise<void>
  getClubsPlayers: (club: string, savedAt: Date) => Promise<Player[]>
}

declare global {
  interface Window {
    exposedAPI: IElectronAPI
  }
}
