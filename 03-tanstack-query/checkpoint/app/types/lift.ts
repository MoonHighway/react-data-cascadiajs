export type LiftStatus = 'OPEN' | 'CLOSED' | 'HOLD'
export type TrailDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'

export interface Trail {
  id: string
  name: string
  status: 'OPEN' | 'CLOSED'
  difficulty: TrailDifficulty
  groomed: boolean
  trees: boolean
  night: boolean
}

export interface Lift {
  id: string
  name: string
  status: LiftStatus
  capacity: number
  night: boolean
  elevationGain: number
  trailAccess: Trail[]
}