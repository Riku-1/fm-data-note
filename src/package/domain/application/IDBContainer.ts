export interface IDBContainer {
    initialize(): Promise<void>
}

export const TYPE_DBContainer = 'DBContainer'