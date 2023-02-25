import { Meals } from "./meal"

export type Day = {
  _id: string
  day: string
  meals: Meals
}

export type Days = Day[]