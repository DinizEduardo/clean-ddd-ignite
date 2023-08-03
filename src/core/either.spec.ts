import { left, right } from './either'

test('success result', () => {
  const successResult = left('success')

  expect(successResult.isLeft()).toBe(true)
})

test('error result', () => {
  const error = right('error')

  expect(error.isRight()).toBe(true)
})
