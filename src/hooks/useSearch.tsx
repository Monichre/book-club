import { useState } from 'react';

// type: `users` | `books`,
export const useSearch = (fn: any) => {
  // const [searchType, setSearchType] = useState(type)
  const [currentSearchString, setCurrentSearchString] = useState(null)
  const [results, setResults]: any = useState(null)

  const handleSearchString = ({ target: { value } }) => {
    setCurrentSearchString(value)
  }

  const search = async () => {
    const res = await fn(currentSearchString)
    console.log('currentSearchString: ', currentSearchString)
    console.log('res: ', res)

    setResults(res)
  }

  const handleEnterKeyPress = async ({ charCode }) => {
    if (charCode === 13) {
      await search()
    }
  }

  return {
    results,
    currentSearchString,
    handleSearchString,
    handleEnterKeyPress,
  }
}
