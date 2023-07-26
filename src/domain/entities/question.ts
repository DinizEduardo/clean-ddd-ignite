import { Entity } from "../../core/entities/entity"
import { UniqueEntityID } from "../../core/entities/unique-entity-id"
import { Slug } from "./value-objects/slug"

interface QuestionProps {
  title: string
  content: string
  authorId: UniqueEntityID
  slug: Slug
  bestAnswerId?: UniqueEntityID
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps> {
}