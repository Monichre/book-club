import { searchGoogleBooks } from '@/api/google.api';
import { BookClubForm } from '@/components/BookClubForm';
import { GoogleBooks } from '@/components/GoogleBooksPreview';
import UserContext from '@/features/auth/UserContext';
import { useSearch } from '@/hooks/useSearch';
import { createBookClub } from '@/lib/Store';
import { Button, Card, Col, Dropdown, Grid, Row, Text } from '@nextui-org/react';
import { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';

interface NewBookClubProps {}

const NewBookClub: FunctionComponent<NewBookClubProps> = () => {
  const { currentUser } = useContext(UserContext)

  const [bookClub, setBookClub] = useState({
    name: null,
    public: false,
    bookId: null,
    ownerId: currentUser?.id,
    imageUrl: null,
    status: null,
    schedule: [],
    startTime: null,
    endTime: null,
  })

  const [currentBook, setCurrentBook] = useState(null)

  const searchBookTitles = useCallback(async (title: string) => {
    const books = await searchGoogleBooks(title).then(({ items }) =>
      items.length
        ? items.map(({ volumeInfo, id, etag }) => ({
            volumeInfo,
            id,
            etag,
          }))
        : null
    )
    return books
  }, [])

  const {
    results,
    handleEnterKeyPress,
    currentSearchString: bookTitle,
    handleSearchString,
  } = useSearch(searchBookTitles)

  const handleBookClubData = (newData) => {
    setBookClub((bookClub) => ({
      ...bookClub,
      ...newData,
    }))
  }
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const handlePreviewLoaded = (
    isLoaded: boolean | ((prevState: boolean) => boolean)
  ) => {
    setPreviewLoaded(isLoaded)
  }

  const handleNewBookClub = async () => {
    // const data = await createBookClub()

    const { days, startTime, endTime, ...rest } = bookClub
    const schedule = {
      days,
      startTime,
      endTime,
    }
    const club = {
      ...rest,
    }
    const res = await createBookClub({ schedule, club })
    console.log('res: ', res)
  }

  useEffect(() => {
    if (results?.length) {
      setCurrentBook(results[0])
    }
  }, [results])

  useEffect(() => {
    if (currentBook?.id) {
      setBookClub((bookClub) => ({
        ...bookClub,
        bookId: currentBook.id,
        imageUrl: currentBook.volumeInfo.imageLinks.thumbnail,
      }))
    }
  }, [currentBook])

  const friendsToInvite = currentUser?.friends?.length
    ? currentUser.friends.map((friend) => ({
        key: friend.email,
        id: friend.id,
        name: friend?.full_name,
      }))
    : []
  // fetchUsersFriends

  // useEffect(() => {
  //   if (currentUser?.id) {
  //     setBookClub((bookClub) => ({
  //       ...bookClub,
  //       ownerId: currentUser.id,
  //     }))
  //   }
  // }, [currentUser])

  return (
    <Card>
      <Card.Header>
        <div>
          <Text h1>Create a new book club</Text>
        </div>

        <br />
      </Card.Header>

      <Card.Body>
        <Grid.Container gap={2} justify='center'>
          {/* <Grid xs={3}></Grid> */}
          <Grid xs={9}>
            <BookClubForm
              handleBookClubData={handleBookClubData}
              bookClub={bookClub}
              searchBookTitles={handleSearchString}
              bookTitle={bookTitle}
              currentBook={currentBook}
              handleEnterKeyPress={handleEnterKeyPress}
              handleNewBookClub={handleNewBookClub}
            />
          </Grid>
          <Grid xs={3}>
            <GoogleBooks
              handlePreviewLoaded={handlePreviewLoaded}
              currentBook={currentBook}
            />
          </Grid>
        </Grid.Container>
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: 'absolute',
          bgBlur: '#0f111466',
          borderTop: '$borderWeights$light solid $gray800',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Row justify='flex-start'>
              <Dropdown>
                <Dropdown.Button flat>Trigger</Dropdown.Button>
                <Dropdown.Menu
                  aria-label='Dynamic Actions'
                  items={friendsToInvite}
                >
                  {(item) => (
                    <Dropdown.Item
                      key={item.key}
                      color={item.key === 'delete' ? 'error' : 'default'}
                    >
                      {item.name}
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Button
                flat
                auto
                rounded
                css={{ color: '#94f9f0', bg: '#94f9f026' }}
                onClick={handleNewBookClub}
              >
                <Text
                  css={{ color: 'inherit' }}
                  size={12}
                  weight='bold'
                  transform='uppercase'
                >
                  Save
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default NewBookClub
