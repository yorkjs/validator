import { checkDate } from '../src/checkDate'

test('checkDate', () => {

  let error = checkDate(
    {
      type: 'string'
    },
    1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkDate(
    {
      type: 'string'
    },
    '1'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('pattern')
  }

  error = checkDate(
    {
      type: 'string'
    },
    '2020-10-10'
  )

  expect(error).toBe(undefined)


})
