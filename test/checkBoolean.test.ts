import { checkBoolean } from '../src/checkBoolean'

test('checkBoolean', () => {

  let error = checkBoolean(
    {
      type: 'boolean'
    },
    1
  )

  expect(error).toBe('type')

  error = checkBoolean(
    {
      type: 'boolean'
    },
    'str'
  )

  expect(error).toBe('type')

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

  expect(error).toBe('type')

  error = checkBoolean(
    {
      type: 'boolean'
    },
    null
  )

  expect(error).toBe('type')

  error = checkBoolean(
    {
      type: 'boolean'
    },
    undefined
  )

  expect(error).toBe('type')

  error = checkBoolean(
    {
      type: 'boolean'
    },
    []
  )

  expect(error).toBe('type')

  error = checkBoolean(
    {
      type: 'boolean',
      value: true,
    },
    false
  )

  expect(error).toBe('value')

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

  expect(error).toBe('value')

  error = checkBoolean(
    {
      type: 'boolean',
      value: false,
    },
    false
  )

  expect(error).toBe(undefined)

})
