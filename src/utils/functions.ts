export const camelToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)

export const snakeCaseObjectFields = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    const field = camelToSnakeCase(key)
    if (!acc[field]) {
      acc[field] = obj[key]
    }
    return acc
  }, {})

export const objToArray = (obj) => Object.keys(obj).map((key) => obj[key])
export const arrayToMap = (arr) =>
  arr.reduce((acc, item) => {
    const { id } = item
    if (!acc[id]) {
      acc[id] = item
    }
    return acc
  }, {})

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
