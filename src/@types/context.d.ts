export interface IElectronAPI {
  update: (count: number) => void
  foo: () => Promise<string>
}

declare global {
  interface Window {
    myAPI: IElectronAPI
  }
}
