import { AnswersRepository } from '../repositories/answers-repository'

interface EditAnswerUseCaseRequest {
  answerId: string
  authorId: string
  content: string
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    authorId,
    content,
  }: EditAnswerUseCaseRequest): Promise<void> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Resposta não existe')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not allowed')
    }

    answer.content = content

    await this.answerRepository.save(answer)
  }
}
