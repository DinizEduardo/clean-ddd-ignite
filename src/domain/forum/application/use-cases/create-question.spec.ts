/* eslint-disable @typescript-eslint/no-empty-function */
import { InMemoryQuestionRepositories } from 'test/repositories/in-memory-question-repositories'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionRepositories
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepositories()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to create a question', async () => {
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)

    const { question } = await sut.execute({
      authorId: '1',
      content: 'Question content',
      title: 'Question title',
    })

    expect(question.content).toEqual('Question content')
    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(question.id)
  })
})
