const { toString } = Object.prototype

export function getType(value: any) {
  return toString.call(value).toLowerCase().slice(8, -1)
}

export function isObject(value: any) {
  return value && getType(value) === 'object' ? true : false
}

export function extend(source: object, target: object) {
  for (let key in target) {
    source[key] = target[key]
  }
}