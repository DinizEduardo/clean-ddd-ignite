/* eslint-disable @typescript-eslint/no-empty-function */
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionRepositories } from 'test/repositories/in-memory-question-repositories'
import { CommentOnQuestionUseCase } from './comment-on-question'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionRepository: InMemoryQuestionRepositories
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepositories()
    sut = new CommentOnQuestionUseCase(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentsRepository,
    )
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(inMemoryQuestionCommentsRepository.items[0].content).toEqual(
      'Comentario teste',
    )
  })

  it('should not be able to comment on an unexistent question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepository.create(question)

    await expect(async () => {
      await sut.execute({
        questionId: 'question-1',
        authorId: question.authorId.toString(),
        content: 'Comentario teste',
      })
    }).rejects.toBeInstanceOf(Error)
  })
})