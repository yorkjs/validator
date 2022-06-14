import { checkBoolean } from '../src/checkBoolean'

test('checkBoolean', () => {

  let error = checkBoolean(
    {
      type: 'boolean'
    },
    1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkBoolean(
    {
      type: 'boolean'
    },
    'str'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkBoolean(
    {
      type: 'boolean'
    },
    true
  )

  expect(error).toBe(undefined)

  error = checkBoolean(
    {
      type: 'boolean'
    },
    {}
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkBoolean(
    {
      type: 'boolean'
    },
    null
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkBoolean(
    {
      type: 'boolean'
    },
    undefined
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkBoolean(
    {
      type: 'boolean'
    },
    []
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkBoolean(
    {
      type: 'boolean',
      value: true,
    },
    false
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('value')
  }

  error = checkBoolean(
    {
      type: 'boolean',
      value: true,
    },
    true
  )

  expect(error).toBe(undefined)

  error = checkBoolean(
    {
      type: 'boolean',
      value: false,
    },
    true
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('value')
  }

  error = checkBoolean(
    {
      type: 'boolean',
      value: false,
    },
    false
  )

  expect(error).toBe(undefined)

})
