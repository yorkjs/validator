import { checkObject } from '../src/checkObject'

test('checkObject', () => {

  let error = checkObject(
    {
      type: 'object'
    },
    1
  )

  expect(error).toBe('type')

  error = checkObject(
    {
      type: 'object'
    },
    'str'
  )

  expect(error).toBe('type')

  error = checkObject(
    {
      type: 'object'
    },
    true
  )

  expect(error).toBe('type')

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

  expect(error).toBe('type')

  error = checkObject(
    {
      type: 'object'
    },
    undefined
  )

  expect(error).toBe('type')

  error = checkObject(
    {
      type: 'object'
    },
    []
  )

  expect(error).toBe('type')

})
