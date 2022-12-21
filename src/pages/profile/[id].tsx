import 'rc-time-picker/assets/index.css';

import { searchGoogleBooks } from '@/api/google.api';
import { GoogleBooks } from '@/components/GoogleBooksPreview';
import { createBookClub } from '@/lib/Store';
import UserContext from '@/lib/UserContext';
import { Button, Card, Checkbox, Col, Grid, Input, Loading, Row, Spacer, Text } from '@nextui-org/react';
import TimePicker from 'rc-time-picker';
import { FunctionComponent, useCallback, useContext, useEffect, useState } from 'react';

interface BookSearchResultsProps {}

const daysOfWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
]

export const NewBookClubForm = ({
  handleBookTitle,
  bookTitle,
  currentBook,
  handleBookClubData,
  handleNewBookClub,
  bookClub,
}: any) => {
  const [currentSearchString, setCurrentSearchString] = useState(null)
  const [previewLoaded, setPreviewLoaded] = useState(false)
  const handlePreviewLoaded = (isLoaded) => {
    setPreviewLoaded(isLoaded)
  }

  const format = 'h:mm'
  const handleSearchByBookTitle = ({ target: { value } }) => {
    setCurrentSearchString(value)
  }

  const handleEnterKeyPress = ({ charCode }) => {
    if (charCode === 13) {
      handleBookTitle(currentSearchString)
    }
  }

  const handleStartTime = (timeData) => {
    const [_, __, hour, timeOfDay] = timeData.calendar().split(' ')

    const startTime = `${hour} ${timeOfDay}`

    handleBookClubData({ startTime })
  }

  const handleEndTime = (timeData) => {
    const [_, __, hour, timeOfDay] = timeData.calendar().split(' ')

    const endTime = `${hour} ${timeOfDay}`

    handleBookClubData({ endTime })
  }
  const handleSchedule = (days) => {
    updateBookClubData({ days })
  }
  const updateBookClubData = (data) => {
    handleBookClubData(data)
  }

  const handleName = ({ target: { value: name } }) => {
    updateBookClubData({ name })
  }

  return (
    <Card css={{ w: '100%', h: 'auto', padding: '40px' }}>
      <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight='bold' transform='uppercase' color='#9E9E9E'>
            Your day your way
          </Text>
          <Text h3 color='white'>
            Your checklist for better sleep
          </Text>
        </Col>
      </Card.Header>
      <Spacer y={6} />
      <Card.Body css={{ p: 0 }}>
        <Grid.Container>
          <Grid xs={8}>
            <Grid.Container gap={2}>
              <Grid>
                <Input
                  onKeyPress={handleEnterKeyPress}
                  clearable
                  color='primary'
                  bordered
                  type='search'
                  value={bookTitle}
                  labelLeft='Book Name'
                  onChange={handleSearchByBookTitle}
                  contentRight={<Loading size='xs' />}
                />
              </Grid>
              <Grid>
                <Input bordered labelLeft='Club Name' onChange={handleName} />
              </Grid>
              <Grid>
                <TimePicker
                  showSecond={false}
                  className='xxx'
                  onChange={handleStartTime}
                  // value={bookClub.startTime}
                  format={format}
                  use12Hours
                  inputReadOnly
                />
              </Grid>
              <Grid>
                <TimePicker
                  showSecond={false}
                  className='xxx'
                  onChange={handleEndTime}
                  // value={bookClub.endTime}
                  format={format}
                  use12Hours
                  inputReadOnly
                />
              </Grid>
              <Grid>
                <Checkbox.Group
                  onChange={handleSchedule}
                  label='Select schedule'
                  orientation='horizontal'
                  color='secondary'
                >
                  {daysOfWeek.map((day) => (
                    <Checkbox value={day}>{day}</Checkbox>
                  ))}
                </Checkbox.Group>
              </Grid>

              {/* <Grid>
                <Checkbox color='gradient' defaultSelected={false}>
                  Public?
                </Checkbox>
              </Grid> */}
            </Grid.Container>
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
                  Create Book Club
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

interface ProfileProps {}

export type NewBookClubData = {
  bookId: string
  name: string
  imageUrl: string
  status: string
  public: boolean
  ownerId: string
}

export type BookClubSchedule = {
  bookClubId?: string
  days:
    | 'monday'
    | 'tuesday'
    | 'wednesday'
    | 'thursday'
    | 'friday'
    | 'saturday'
    | 'sunday'
  startTime: Date
  endTime: Date
  title: string
  content: string
}

const Profile: FunctionComponent<ProfileProps> = () => {
  const { user, authLoaded, signOut } = useContext(UserContext)

  const [bookClub, setBookClub] = useState({
    name: null,
    public: false,
    bookId: null,
    ownerId: null,
    imageUrl: null,
    status: null,
    schedule: [],
    startTime: null,
    endTime: null,
  })
  const [bookResults, setBookResults] = useState([])
  const [currentBook, setCurrentBook] = useState(null)
  const [bookTitle, setBookTitle] = useState(null)

  const handleBookTitle = useCallback(async (title) => {
    setBookTitle(title)
    const books = await searchGoogleBooks(title).then(({ items }) =>
      items.length
        ? items.map(({ volumeInfo, id, etag }) => ({
            volumeInfo,
            id,
            etag,
          }))
        : null
    )

    setBookResults(books)
    setCurrentBook(books[0])
  }, [])
  const handleBookClubData = (newData) => {
    setBookClub((bookClub) => ({
      ...bookClub,
      ...newData,
    }))
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
    if (currentBook?.id) {
      setBookClub((bookClub) => ({
        ...bookClub,
        bookId: currentBook.id,
        imageUrl: currentBook.volumeInfo.imageLinks.thumbnail,
      }))
    }
  }, [currentBook])

  useEffect(() => {
    if (user?.id) {
      setBookClub((bookClub) => ({
        ...bookClub,
        ownerId: user.id,
      }))
    }
  }, [user])

  return (
    <Grid.Container gap={2} justify='center'>
      <Grid xs={3}>
        <div className='group-div14'>
          <div className='rectangle-div18' />
          <img className='group-icon6' alt='' src='../group-112.svg' />
          <div className='james-kilan'>James Kilan</div>
          <div className='rectangle-div19' />
          <div className='product-designer'>Product Designer</div>
          <div className='group-div15'>
            <img className='user1-1-icon' alt='' src='../user1-1.svg' />
            <div className='my-profile1'>My Profile</div>
          </div>
          <div className='group-div16'>
            <img
              className='notification-bing-1-icon'
              alt=''
              src='../notificationbing-1.svg'
            />
            <div className='notification'>Notification</div>
          </div>
          <div className='group-div17'>
            <img
              className='code-circle9-1-icon'
              alt=''
              src='../codecircle9-1.svg'
            />
            <Button onClick={handleNewBookClub}>Start a new Book Club</Button>
          </div>
        </div>
      </Grid>
      <Grid xs={9}>
        <NewBookClubForm
          handleBookClubData={handleBookClubData}
          bookClub={bookClub}
          handleBookTitle={handleBookTitle}
          bookTitle={bookTitle}
          currentBook={currentBook}
          handleNewBookClub={handleNewBookClub}
        />
      </Grid>
    </Grid.Container>
  )
}

export default Profile
