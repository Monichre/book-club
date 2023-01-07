import { Button, Card, Col, Grid, Row, Text } from '@nextui-org/react';
import Link from 'next/link';
import * as React from 'react';

interface BookClubCardProps {
  bookClub: any
}

const BookClubCard: React.FunctionComponent<BookClubCardProps> = ({
  bookClub,
}) => {
  console.log('bookClub: ', bookClub)
  return (
    <Card>
      <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
        <Col>
          <Text size={12} weight='bold' transform='uppercase' color='#ffffffAA'>
            {bookClub.name}
          </Text>
          <Text h4 color='white'>
            {bookClub.status}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body>
        <Card.Image
          src={bookClub.image_url}
          objectFit='contain'
          width='100%'
          height={'100%'}
        />
      </Card.Body>
      <Card.Footer
        isBlurred
        css={{
          position: 'absolute',
          bgBlur: '#ffffff66',
          borderTop: '$borderWeights$light solid rgba(255, 255, 255, 0.2)',
          bottom: 0,
          zIndex: 1,
        }}
      >
        <Row>
          <Col>
            <Text color='#000' size={12}>
              Available soon.
            </Text>
            <Text color='#000' size={12}>
              Get notified.
            </Text>
          </Col>
          <Col>
            <Row justify='flex-end'>
              <Button flat auto rounded color='secondary'>
                <Text
                  css={{ color: 'inherit' }}
                  size={12}
                  weight='bold'
                  transform='uppercase'
                >
                  <Link href={{ pathname: `/book-clubs/${bookClub?.id}` }}>
                    Visit
                  </Link>
                </Text>
              </Button>
            </Row>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  )
}

export default BookClubCard

export type UserBookClubsProps = {
  bookClubs: any[]
}

export const UserBookClubs: React.FunctionComponent<UserBookClubsProps> = ({
  bookClubs,
}: UserBookClubsProps) => {
  return (
    <Grid.Container gap={2} justify='flex-start'>
      {bookClubs.map((bookClub) => (
        <Grid xs={12} sm={4}>
          <BookClubCard bookClub={bookClub} />
        </Grid>
      ))}
    </Grid.Container>
  )
}
