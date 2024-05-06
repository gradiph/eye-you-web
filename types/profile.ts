export interface Profile {
  id?: number
  name?: string
  username?: string
  email?: string
  total_score?: number
  avatar?: string
  achievements?: Array<Achievement>
}

export interface GetProfileResponse {
  user?: Profile
}

export interface Achievement {
  id?: number
  name?: string
  image?: string
  created_at?: Date
  updated_at?: Date
}

export interface FormEditProfile {
  name: string
  password: string
  password_confirmation: string
}
