import { checkObject } from '../src/checkObject'

test('checkObject', () => {

  let error = checkObject(
    {
      type: 'object'
    },
    1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkObject(
    {
      type: 'object'
    },
    'str'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkObject(
    {
      type: 'object'
    },
    true
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkObject(
    {
      type: 'object'
    },
    {}
  )

  expect(error).toBe(undefined)

  error = checkObject(
    {
      type: 'object'
    },
    null
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkObject(
    {
      type: 'object'
    },
    undefined
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkObject(
    {
      type: 'object'
    },
    []
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

})
