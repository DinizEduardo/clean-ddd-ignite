import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Question,
  QuestionProps,
} from '@/domain/forum/enterprise/entities/question'

export function makeQuestion(override: Partial<QuestionProps> = {}) {
  const question = Question.create({
    title: 'Example question',
    authorId: new UniqueEntityID(),
    content: 'Example content',
    ...override,
  })

  return question
}
