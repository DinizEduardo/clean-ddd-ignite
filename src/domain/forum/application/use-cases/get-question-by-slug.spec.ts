/* eslint-disable @typescript-eslint/no-empty-function */
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionRepositories } from 'test/repositories/in-memory-question-repositories'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'

let inMemoryQuestionsRepository: InMemoryQuestionRepositories
let sut: GetQuestionBySlugUseCase

describe('Get question by slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionRepositories()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('Should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const { question } = await sut.execute({
      slug: 'example-question',
    })

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
