import { checkArray } from '../src/checkArray'

test('checkArray', () => {

  let error = checkArray(
    {
      type: 'array'
    },
    1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkArray(
    {
      type: 'array'
    },
    'str'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkArray(
    {
      type: 'array'
    },
    true
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkArray(
    {
      type: 'array'
    },
    {}
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkArray(
    {
      type: 'array'
    },
    null
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkArray(
    {
      type: 'array'
    },
    undefined
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkArray(
    {
      type: 'array'
    },
    []
  )

  expect(error).toBe(undefined)

  error = checkArray(
    {
      type: 'array',
      min: 1,
    },
    []
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('min')
  }

  error = checkArray(
    {
      type: 'array',
      min: 1,
      max: 2,
    },
    [1, 2, 3]
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('max')
  }

  error = checkArray(
    {
      type: 'array',
      min: 1,
      itemType: 'string'
    },
    [1, 2, 3]
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('itemType')
  }

  error = checkArray(
    {
      type: 'array',
      min: 1,
      itemType: 'number'
    },
    [1, 2, 3]
  )

  expect(error).toBe(undefined)

})
