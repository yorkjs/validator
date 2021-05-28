import { checkString } from '../src/checkString'

test('checkString', () => {

  let error = checkString(
    {
      type: 'string'
    },
    1
  )

  expect(error).toBe('type')

  error = checkString(
    {
      type: 'string'
    },
    0.1
  )

  expect(error).toBe('type')

  error = checkString(
    {
      type: 'string'
    },
    NaN
  )

  expect(error).toBe('type')

  error = checkString(
    {
      type: 'string'
    },
    '1'
  )

  expect(error).toBe(undefined)

  error = checkString(
    {
      type: 'string'
    },
    true
  )

  expect(error).toBe('type')

  error = checkString(
    {
      type: 'string'
    },
    {}
  )

  expect(error).toBe('type')

  error = checkString(
    {
      type: 'string'
    },
    null
  )

  expect(error).toBe('type')

  error = checkString(
    {
      type: 'string'
    },
    undefined
  )

  expect(error).toBe('type')

  error = checkString(
    {
      type: 'string'
    },
    []
  )

  expect(error).toBe('type')

  error = checkString(
    {
      type: 'string',
    },
    ''
  )

  expect(error).toBe('empty')

  error = checkString(
    {
      type: 'string',
      empty: true,
    },
    ''
  )

  expect(error).toBe(undefined)

  error = checkString(
    {
      type: 'string',
      min: 2
    },
    '1'
  )

  expect(error).toBe('min')

  error = checkString(
    {
      type: 'string',
      max: 3
    },
    '1234'
  )

  expect(error).toBe('max')

  error = checkString(
    {
      type: 'string',
    },
    '1234'
  )

  expect(error).toBe(undefined)

  error = checkString(
    {
      type: 'string',
      pattern: /^\d+$/
    },
    'abc'
  )

  expect(error).toBe('pattern')

  error = checkString(
    {
      type: 'string',
      pattern: /^\d+$/
    },
    '123'
  )

  expect(error).toBe(undefined)

  error = checkString(
    {
      type: 'string',
      custom(value) {
        return 'test'
      }
    },
    '123'
  )

  expect(error).toBe('test')

  error = checkString(
    {
      type: 'string',
      custom(value) {

      }
    },
    '123'
  )

  expect(error).toBe(undefined)

})
