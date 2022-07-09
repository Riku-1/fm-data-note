export const HomeGrownStatus = {
    None: 'None',
    Nation: 'Nation',
    Club: 'Club'
} as const

export type HomeGrownStatus = typeof HomeGrownStatus[keyof  typeof HomeGrownStatus]
