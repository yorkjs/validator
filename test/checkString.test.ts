import { checkString } from '../src/checkString'

test('checkString', () => {

  let error = checkString(
    {
      type: 'string'
    },
    1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkString(
    {
      type: 'string'
    },
    0.1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkString(
    {
      type: 'string'
    },
    NaN
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

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

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkString(
    {
      type: 'string'
    },
    {}
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkString(
    {
      type: 'string'
    },
    null
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkString(
    {
      type: 'string'
    },
    undefined
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkString(
    {
      type: 'string'
    },
    []
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkString(
    {
      type: 'string',
    },
    ''
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('empty')
  }

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

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('min')
  }

  error = checkString(
    {
      type: 'string',
      max: 3
    },
    '1234'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('max')
  }

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

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('pattern')
  }

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

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('test')
  }

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
