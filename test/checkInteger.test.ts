import { checkInteger } from '../src/checkInteger'

test('checkInteger', () => {

  let error = checkInteger(
    {
      type: 'integer'
    },
    1
  )

  expect(error).toBe(undefined)

  error = checkInteger(
    {
      type: 'integer'
    },
    -1
  )

  expect(error).toBe(undefined)

  error = checkInteger(
    {
      type: 'integer'
    },
    0
  )

  expect(error).toBe(undefined)

  error = checkInteger(
    {
      type: 'integer'
    },
    0.1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer'
    },
    -1.1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer'
    },
    NaN
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer'
    },
    '1'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer'
    },
    true
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer'
    },
    {}
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer'
    },
    null
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer'
    },
    undefined
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer'
    },
    []
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkInteger(
    {
      type: 'integer',
      min: 1,
    },
    0
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.rule.type).toBe('integer')
    expect(error.rule.min).toBe(1)
    expect(error.reason).toBe('min')
  }

  error = checkInteger(
    {
      type: 'integer',
      max: 2,
    },
    3
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('max')
  }

})
