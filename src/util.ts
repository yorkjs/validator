export function getType(value: any) {
  return Object.prototype.toString.call(value).toLowerCase().slice(8, -1)
}

export function isObject(value: any) {
  return getType(value) === 'object'
}