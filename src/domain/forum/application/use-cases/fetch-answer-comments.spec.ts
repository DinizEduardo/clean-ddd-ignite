/* eslint-disable @typescript-eslint/no-empty-function */
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { makeAnswerComment } from 'test/factories/make-answer-comment'
import { InMemoryAnswerCommentsRepository } from 'test/repositories/in-memory-answer-comments'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch answer comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryAnswerCommentRepository)
  })

  it('Should be able to get a fetch answers answercomment', async () => {
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )
    await inMemoryAnswerCommentRepository.create(
      makeAnswerComment({
        answerId: new UniqueEntityID('answer-1'),
      }),
    )

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    })

    expect(answerComments).toHaveLength(3)
  })

  it('Should be able to get a fetch paginated answer answercomment', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityID('answer-1'),
        }),
      )
    }
    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    })

    expect(answerComments).toHaveLength(2)
  })
})
