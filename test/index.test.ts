import { Validator } from '../src/index'

const validator = new Validator()

test('validate int', () => {

  let errors = validator.validate(
    {
      age1: 10,
      age2: 20,
      age3: 30,
      age4: 10.5,
      age5: '123',
    },
    {
      age1: 'int',
      age2: {
        type: 'int',
        min: 22,
        max: 30,
      },
      age3: {
        type: 'int',
        max: 20,
      },
      age4: 'int',
      age5: 'int',
      age6: 'int',
      age7: {
        type: 'int',
      }
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.age1).toBe(undefined)
    expect(errors.age2).toBe('min')
    expect(errors.age3).toBe('max')
    expect(errors.age4).toBe('type')
    expect(errors.age5).toBe('type')
    expect(errors.age6).toBe('required')
    expect(errors.age7).toBe('required')
  }

})

test('validate integer', () => {

  let errors = validator.validate(
    {
      age1: 10,
      age2: 20,
      age3: 30,
      age4: 10.5,
      age5: '123',
    },
    {
      age1: 'integer',
      age2: {
        type: 'integer',
        min: 22,
        max: 30,
      },
      age3: {
        type: 'integer',
        max: 20,
      },
      age4: 'integer',
      age5: 'integer',
      age6: 'integer',
      age7: {
        type: 'integer',
      }
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.age1).toBe(undefined)
    expect(errors.age2).toBe('min')
    expect(errors.age3).toBe('max')
    expect(errors.age4).toBe('type')
    expect(errors.age5).toBe('type')
    expect(errors.age6).toBe('required')
    expect(errors.age7).toBe('required')
  }

})

test('validate number', () => {

  let errors = validator.validate(
    {
      age1: 10,
      age2: 20,
      age3: 30,
      age4: 10.5,
      age5: '123',
      age8: NaN,
    },
    {
      age1: 'number',
      age2: {
        type: 'number',
        min: 22,
        max: 30,
      },
      age3: {
        type: 'number',
        max: 20,
      },
      age4: 'number',
      age5: 'number',
      age6: 'number',
      age7: {
        type: 'number',
      },
      age8: 'number',
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.age1).toBe(undefined)
    expect(errors.age2).toBe('min')
    expect(errors.age3).toBe('max')
    expect(errors.age4).toBe(undefined)
    expect(errors.age5).toBe('type')
    expect(errors.age6).toBe('required')
    expect(errors.age7).toBe('required')
    expect(errors.age8).toBe('type')
  }

})

test('validate string', () => {

  let errors = validator.validate(
    {
      name2: '',
      name3: '',
      name4: 30,
      name5: '123456',
      name6: '123456',
      name7: '111',
      name8: '111',
    },
    {
      name0: 'string',
      name1: {
        type: 'string',
      },
      name2: 'string',
      name3: {
        type: 'string',
      },
      name4: 'string',
      name5: {
        type: 'string',
        min: 10,
      },
      name6: {
        type: 'string',
        max: 3,
      },
      name7: {
        type: 'string',
        pattern: /^[a-z]$/
      },
      name8: {
        type: 'string',
        custom(value) {
          return 'test'
        }
      },
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.name0).toBe('required')
    expect(errors.name1).toBe('required')
    expect(errors.name2).toBe('empty')
    expect(errors.name3).toBe('empty')
    expect(errors.name4).toBe('type')
    expect(errors.name5).toBe('min')
    expect(errors.name6).toBe('max')
    expect(errors.name7).toBe('pattern')
    expect(errors.name8).toBe('test')
  }

})

test('validate boolean', () => {

  let errors = validator.validate(
    {
      value1: 1,
      value2: false,
      value3: true,
    },
    {
      value1: {
        type: 'boolean'
      },
      value2: {
        type: 'boolean',
        value: true,
      },
      value3: {
        type: 'boolean',
        value: true,
      }
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.value1).toBe('type')
    expect(errors.value2).toBe('value')
    expect(errors.value3).toBe(undefined)
  }

})

test('validate enum', () => {

  let errors = validator.validate(
    {
      value1: 0,
      value2: '1',
      value3: 1,
    },
    {
      value1: {
        type: 'enum',
        values: [1, 2]
      },
      value2: [1, 2],
      value3: [1, 2]
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.value1).toBe('type')
    expect(errors.value2).toBe('type')
    expect(errors.value3).toBe(undefined)
  }

})

test('validate array', () => {

  let errors = validator.validate(
    {
      value1: [1,2,3],
      value2: 1,
      value3: [1, 2, 3],
      value4: [1, 2, 3, 4, 5, 6],
    },
    {
      value1: {
        type: 'array',
        itemType: 'string',
      },
      value2: {
        type: 'array'
      },
      value3: {
        type: 'array',
        min: 4,
      },
      value4: {
        type: 'array',
        max: 4,
      }
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.value1).toBe('itemType')
    expect(errors.value2).toBe('type')
    expect(errors.value3).toBe('min')
    expect(errors.value4).toBe('max')
  }

})

test('validate object', () => {

  let errors = validator.validate(
    {
      value1: [1, 2, 3],
      value2: 1,
      value3: {}
    },
    {
      value1: {
        type: 'object',
      },
      value2: {
        type: 'object'
      },
      value3: {
        type: 'object',
      },
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.value1).toBe('type')
    expect(errors.value2).toBe('type')
    expect(errors.value3).toBe(undefined)
  }

})

test('validate date', () => {

  let errors = validator.validate(
    {
      value1: '2020-10-10',
      value2: '2020-10-10 10:10:10',
    },
    {
      value1: {
        type: 'date',
      },
      value2: {
        type: 'date',
      },
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.value1).toBe(undefined)
    expect(errors.value2).toBe('pattern')
  }

})


test('validate dateTime', () => {

  let errors = validator.validate(
    {
      value1: '2020-10-10',
      value2: '2020-10-10 10:10:10',
    },
    {
      value1: {
        type: 'dateTime',
      },
      value2: {
        type: 'dateTime',
      },
    }
  )

  expect(errors).not.toBe(undefined)
  if (errors) {
    expect(errors.value1).toBe('pattern')
    expect(errors.value2).toBe(undefined)
  }

})