import { left, right } from './either'

test('success result', () => {
  const successResult = left('success')

  expect(successResult.isRight()).toBe(true)
})

test('error result', () => {
  const error = right('error')

  expect(error.isLeft()).toBe(true)
})
