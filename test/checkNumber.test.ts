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

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkNumber(
    {
      type: 'number'
    },
    '1'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkNumber(
    {
      type: 'number'
    },
    true
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkNumber(
    {
      type: 'number'
    },
    {}
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkNumber(
    {
      type: 'number'
    },
    null
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkNumber(
    {
      type: 'number'
    },
    undefined
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkNumber(
    {
      type: 'number'
    },
    []
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkNumber(
    {
      type: 'number',
      min: 1,
    },
    0
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('min')
  }

  error = checkNumber(
    {
      type: 'number',
      max: 2,
    },
    3
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('max')
  }

  error = checkNumber(
    {
      type: 'number',
      precision: 1,
    },
    3.14
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('precision')
  }

  // 精度小于 precision 无所谓
  error = checkNumber(
    {
      type: 'number',
      precision: 3,
    },
    3.14
  )

  expect(error).toBe(undefined)

})
