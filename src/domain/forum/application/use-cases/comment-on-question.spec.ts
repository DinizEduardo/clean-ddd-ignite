/* eslint-disable @typescript-eslint/no-empty-function */
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'
import { InMemoryQuestionRepositories } from 'test/repositories/in-memory-question-repositories'
import { CommentOnQuestionUseCase } from './comment-on-question'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let inMemoryQuestionCommentsRepository: InMemoryQuestionCommentsRepository
let inMemoryQuestionRepository: InMemoryQuestionRepositories
let inMemoryQuestionAttachmentRepository: InMemoryQuestionAttachmentsRepository
let sut: CommentOnQuestionUseCase

describe('Comment on question', () => {
  beforeEach(() => {
    inMemoryQuestionCommentsRepository =
      new InMemoryQuestionCommentsRepository()
    inMemoryQuestionAttachmentRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionRepository = new InMemoryQuestionRepositories(
      inMemoryQuestionAttachmentRepository,
    )
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

    const result = await sut.execute({
      questionId: 'question-1',
      authorId: question.authorId.toString(),
      content: 'Comentario teste',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
