export interface Profile {
  id?: number
  name?: string
  username?: string
  email?: string
  total_score?: number
  avatar?: string
}

export interface GetProfileResponse {
  user?: Profile
}