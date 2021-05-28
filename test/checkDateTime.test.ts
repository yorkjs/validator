import { checkDateTime } from '../src/checkDateTime'

test('checkDateTime', () => {

  let error = checkDateTime(
    {
      type: 'string'
    },
    1
  )

  expect(error).toBe('type')

  error = checkDateTime(
    {
      type: 'string'
    },
    '1'
  )

  expect(error).toBe('pattern')

  error = checkDateTime(
    {
      type: 'string'
    },
    '2020-10-10'
  )

  expect(error).toBe('pattern')

  error = checkDateTime(
    {
      type: 'string'
    },
    '2020-10-10 10:10'
  )

  expect(error).toBe('pattern')

  error = checkDateTime(
    {
      type: 'string'
    },
    '2020-10-10 10:10:09'
  )

  expect(error).toBe(undefined)


})
