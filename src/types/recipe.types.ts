import { Document } from "mongoose"

interface Ingredient {
  name: string
  amount: number
}

interface Assessment {
  evaluator: string
  note: number
}

interface Step {
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
