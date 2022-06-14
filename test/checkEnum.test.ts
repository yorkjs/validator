import { checkEnum } from '../src/checkEnum'

test('checkEnum', () => {

  let error = checkEnum(
    {
      type: 'enum'
    },
    1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkEnum(
    {
      type: 'enum'
    },
    'str'
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkEnum(
    {
      type: 'enum'
    },
    true
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkEnum(
    {
      type: 'enum'
    },
    {}
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkEnum(
    {
      type: 'enum'
    },
    null
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkEnum(
    {
      type: 'enum'
    },
    undefined
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkEnum(
    {
      type: 'enum'
    },
    []
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

  error = checkEnum(
    {
      type: 'enum',
      values: [],
    },
    1
  )

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

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

  expect(error).not.toBe(undefined)
  if (error) {
    expect(error.reason).toBe('type')
  }

})
