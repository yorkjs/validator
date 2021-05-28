import { checkArray } from '../src/checkArray'

test('checkArray', () => {

  let error = checkArray(
    {
      type: 'array'
    },
    1
  )

  expect(error).toBe('type')

  error = checkArray(
    {
      type: 'array'
    },
    'str'
  )

  expect(error).toBe('type')

  error = checkArray(
    {
      type: 'array'
    },
    true
  )

  expect(error).toBe('type')

  error = checkArray(
    {
      type: 'array'
    },
    {}
  )

  expect(error).toBe('type')

  error = checkArray(
    {
      type: 'array'
    },
    null
  )

  expect(error).toBe('type')

  error = checkArray(
    {
      type: 'array'
    },
    undefined
  )

  expect(error).toBe('type')

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

  expect(error).toBe('min')

  error = checkArray(
    {
      type: 'array',
      min: 1,
      max: 2,
    },
    [1, 2, 3]
  )

  expect(error).toBe('max')

  error = checkArray(
    {
      type: 'array',
      min: 1,
      itemType: 'string'
    },
    [1, 2, 3]
  )

  expect(error).toBe('itemType')

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
