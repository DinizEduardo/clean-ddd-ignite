/* eslint-disable @typescript-eslint/no-empty-function */
import { InMemoryNotificationRepositories } from 'test/repositories/in-memory-notification-repository'
import { SendNotificationUseCase } from './send-notification'

let inMemoryNotificationsRepository: InMemoryNotificationRepositories
let sut: SendNotificationUseCase

describe('Send Notification', () => {
  beforeEach(() => {
    inMemoryNotificationsRepository = new InMemoryNotificationRepositories()
    sut = new SendNotificationUseCase(inMemoryNotificationsRepository)
  })

  it('Should be able to send a notification', async () => {
    const result = await sut.execute({
      recipientId: '1',
      content: 'Notification content',
      title: 'Notification title',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryNotificationsRepository.items[0]).toEqual(
      result.value?.notification,
    )
  })
})
