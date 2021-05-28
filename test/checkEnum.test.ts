import { checkEnum } from '../src/checkEnum'

test('checkEnum', () => {

  let error = checkEnum(
    {
      type: 'enum'
    },
    1
  )

  expect(error).toBe('type')

  error = checkEnum(
    {
      type: 'enum'
    },
    'str'
  )

  expect(error).toBe('type')

  error = checkEnum(
    {
      type: 'enum'
    },
    true
  )

  expect(error).toBe('type')

  error = checkEnum(
    {
      type: 'enum'
    },
    {}
  )

  expect(error).toBe('type')

  error = checkEnum(
    {
      type: 'enum'
    },
    null
  )

  expect(error).toBe('type')

  error = checkEnum(
    {
      type: 'enum'
    },
    undefined
  )

  expect(error).toBe('type')

  error = checkEnum(
    {
      type: 'enum'
    },
    []
  )

  expect(error).toBe('type')

  error = checkEnum(
    {
      type: 'enum',
      values: [],
    },
    1
  )

  expect(error).toBe('type')

  error = checkEnum(
    {
      type: 'enum',
      values: [1],
    },
    1
  )

  expect(error).toBe(undefined)

  error = checkEnum(
    {
      type: 'enum',
      values: [1],
    },
    2
  )

  expect(error).toBe('type')

})
