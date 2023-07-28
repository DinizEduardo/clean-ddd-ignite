/* eslint-disable @typescript-eslint/no-empty-function */
import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/questions-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  create: async (question: Question) => {},
}

test('Create a question', async () => {
  const sut = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await sut.execute({
    authorId: '1',
    content: 'Question content',
    title: 'Question title',
  })

  expect(question.content).toEqual('Question content')
  expect(question.id).toBeTruthy()
})
