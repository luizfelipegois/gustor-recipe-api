import { Document } from "mongoose"

export interface Ingredient {
  name: string
  amount: string
}

interface Assessment {
  evaluator: string
  note: number
}

export interface Step {
  title: string
  text: string
}

export interface RecipeDocument extends Document {
  title: string
  description: string
  image: string
  preparationTime: string
  calories: string
  categories: string[]
  ingredients: Ingredient[]
  assessments: Assessment[]
  steps: Step[]
}

export interface RequestBody {
  title: string
  description: string
  image: string
  preparationTime: string
  calories: string
  categories: string[]
  ingredients: Ingredient[]
  assessments: []
  steps: Step[]
}
