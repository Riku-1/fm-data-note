import {Player} from "../package/domain/model/player/Player";

export interface IElectronAPI {
  update: (count: number) => void
  loadPlayersFile: () => Promise<Player[]>
}

declare global {
  interface Window {
    exposedAPI: IElectronAPI
  }
}
