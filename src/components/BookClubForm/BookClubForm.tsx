import { FriendsList } from '@/components/FriendsList';
import { Checkbox, Grid, Input, Loading, Spacer, Text } from '@nextui-org/react';
import TimePicker from 'rc-time-picker';

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

export const BookClubForm = ({
  bookTitle,
  currentBook,
  updateBookClubData,
  updateBookClubSchedule,
  handleNewBookClub,
  currentUser,
  handleEnterKeyPress,
  searchBookTitles,
}: any) => {
  const format = 'h:mm'

  const handleStartTime = (timeData: {
    calendar: () => {
      (): any
      new (): any
      split: { (arg0: string): [any, any, any, any]; new (): any }
    }
  }) => {
    const [_, __, hour, timeOfDay] = timeData.calendar().split(' ')

    const startTime = `${hour} ${timeOfDay}`

    updateBookClubSchedule({ startTime })
  }

  const handleEndTime = (timeData: {
    calendar: () => {
      (): any
      new (): any
      split: { (arg0: string): [any, any, any, any]; new (): any }
    }
  }) => {
    const [_, __, hour, timeOfDay] = timeData.calendar().split(' ')

    const endTime = `${hour} ${timeOfDay}`

    updateBookClubSchedule({ endTime })
  }
  const handleSchedule = (days: any) => {
    updateBookClubSchedule({ days })
  }
  // const handleBookClubData = (data: { schedule?: any; name?: any }) => {
  //   updateBookClubData(data)
  // }

  const handleName = ({ target: { value: name } }) => {
    updateBookClubData({ name })
  }

  const handleInvite = (friend) => {
    console.log('friend: ', friend)
  }

  return (
    <Grid.Container>
      <Grid xs={8}>
        <Grid.Container gap={4}>
          <Grid xs={6} css={{ display: 'block!important' }}>
            <Text h3>Enter a name for your book club</Text>
            <Spacer />
            <div>
              <Input bordered labelLeft='Club Name' onChange={handleName} />
            </div>
          </Grid>
          <Grid xs={6} css={{ display: 'block!important' }}>
            <Text h3>Search books by title using Google Books</Text>
            <Spacer />

            <div>
              <Input
                onKeyPress={handleEnterKeyPress}
                clearable
                color='primary'
                bordered
                type='search'
                value={bookTitle}
                labelLeft='Book Name'
                onChange={searchBookTitles}
                contentRight={
                  bookTitle && bookTitle !== '' ? <Loading size='xs' /> : null
                }
              />
            </div>
          </Grid>

          <Grid xs={12}>
            <Text h3>Invite Your Friends</Text>
            <Spacer />

            <FriendsList onClick={handleInvite} />
          </Grid>

          <Grid xs={12}>
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

            <Grid xs={12}>
              <TimePicker
                showSecond={false}
                className='xxx'
                onChange={handleStartTime}
                // value={bookClub.startTime}
                format={format}
                use12Hours
                inputReadOnly
              />

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
          </Grid>
        </Grid.Container>
      </Grid>
    </Grid.Container>
  )
}
