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
