export interface GameMode {
  id: number
  name: string
  image: string
}

export interface GameModesResponse {
  modes?: GameMode[]
}