import { checkNumber } from '../src/checkNumber'

test('checkNumber', () => {

  let error = checkNumber(
    {
      type: 'number'
    },
    1
  )

  expect(error).toBe(undefined)

  error = checkNumber(
    {
      type: 'number'
    },
    -1
  )

  expect(error).toBe(undefined)

  error = checkNumber(
    {
      type: 'number'
    },
    0
  )

  expect(error).toBe(undefined)

  error = checkNumber(
    {
      type: 'number'
    },
    0.1
  )

  expect(error).toBe(undefined)

  error = checkNumber(
    {
      type: 'number'
    },
    -1.1
  )

  expect(error).toBe(undefined)

  error = checkNumber(
    {
      type: 'number'
    },
    NaN
  )

  expect(error).toBe('type')

  error = checkNumber(
    {
      type: 'number'
    },
    '1'
  )

  expect(error).toBe('type')

  error = checkNumber(
    {
      type: 'number'
    },
    true
  )

  expect(error).toBe('type')

  error = checkNumber(
    {
      type: 'number'
    },
    {}
  )

  expect(error).toBe('type')

  error = checkNumber(
    {
      type: 'number'
    },
    null
  )

  expect(error).toBe('type')

  error = checkNumber(
    {
      type: 'number'
    },
    undefined
  )

  expect(error).toBe('type')

  error = checkNumber(
    {
      type: 'number'
    },
    []
  )

  expect(error).toBe('type')

  error = checkNumber(
    {
      type: 'number',
      min: 1,
    },
    0
  )

  expect(error).toBe('min')

  error = checkNumber(
    {
      type: 'number',
      max: 2,
    },
    3
  )

  expect(error).toBe('max')

})
