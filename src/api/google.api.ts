const GOOGLE_BOOKS_URI = 'https://www.googleapis.com/books/v1/volumes'
// NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY

export const searchGoogleBooks = async (title: string) => {
  const res = await fetch(
    `${GOOGLE_BOOKS_URI}?q=${title}&key=${process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY}`
  )
  const data = await res.json()
  return data
}
