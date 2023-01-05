import { Checkbox, Grid, Input, Loading, Spacer, Text } from '@nextui-org/react';
import TimePicker from 'rc-time-picker';
import { useState } from 'react';

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
  handleBookClubData,
  handleNewBookClub,
  currentUser,
  handleEnterKeyPress,
  searchBookTitles,
}: any) => {
  const [days, setDays] = useState([])

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

    handleBookClubData({ startTime })
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

    handleBookClubData({ endTime })
  }
  const handleSchedule = (days: any) => {
    updateBookClubData({ days })
  }
  const updateBookClubData = (data: { days?: any; name?: any }) => {
    handleBookClubData(data)
  }

  const handleName = ({ target: { value: name } }) => {
    updateBookClubData({ name })
  }

  return (
    <Grid.Container>
      <Grid xs={8}>
        <Grid.Container gap={4}>
          <Grid>
            <Spacer />
            <Text h3>Enter a name for your book club</Text>
            <Input bordered labelLeft='Club Name' onChange={handleName} />

            <Spacer />
            <Text h3>Search books by title using Google Books</Text>

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
            {/* <Dropdown>
      <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
        {selectedValue}
      </Dropdown.Button>
      <Dropdown.Menu
        aria-label="Multiple selection actions"
        color="secondary"
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selected}
        onSelectionChange={setSelected}
      >
        <Dropdown.Item key="text">Text</Dropdown.Item>
        <Dropdown.Item key="number">Number</Dropdown.Item>
        <Dropdown.Item key="date">Date</Dropdown.Item>
        <Dropdown.Item key="single_date">Single Date</Dropdown.Item>
        <Dropdown.Item key="iteration">Iteration</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown> */}
          </Grid>

          {/* <Grid>
                <Checkbox color='gradient' defaultSelected={false}>
                  Public?
                </Checkbox>
              </Grid> */}
        </Grid.Container>
      </Grid>
    </Grid.Container>
  )
}
