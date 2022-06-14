import { checkDateTime } from '../src/checkDateTime'

test('checkDateTime', () => {

  let error = checkDateTime(
    {
      type: 'string'
    },
    1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkDateTime(
    {
      type: 'string'
    },
    '1'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('pattern')
  }

  error = checkDateTime(
    {
      type: 'string'
    },
    '2020-10-10'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.rule.pattern).not.toBe(undefined)
    expect(error.reason).toBe('pattern')
  }

  error = checkDateTime(
    {
      type: 'string'
    },
    '2020-10-10 10:10'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('pattern')
  }

  error = checkDateTime(
    {
      type: 'string'
    },
    '2020-10-10 10:10:09'
  )

  expect(error).toBe(undefined)


})
