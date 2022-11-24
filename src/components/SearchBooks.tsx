import { searchGoogleBooks } from '@/api/google.api';
import { Button, Card, Grid, Input, Row, Spacer, Text } from '@nextui-org/react';
import { useState } from 'react';

interface SearchBooksProps {}

export const SearchBooks: React.FC<SearchBooksProps> = () => {
  const [book, setBook]: any = useState(null)

  const search = async () => {
    const results = await searchGoogleBooks(book)
  }
  const handleTitle = ({ target: { value } }) => {
    setBook(value)
  }

  return (
    <Card css={{ p: '$6', mw: '400px' }}>
      <Card.Header>
        <img
          alt='nextui logo'
          src='https://avatars.githubusercontent.com/u/86160567?s=200&v=4'
          width='34px'
          height='34px'
        />
        <Grid.Container css={{ pl: '$6' }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: '$xs' }}>
              Next UI
            </Text>
          </Grid>
          <Grid xs={12}>
            <Text css={{ color: '$accents8' }}>nextui.org</Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: '$2' }}>
        <Input
          clearable
          underlined
          labelPlaceholder='Title'
          onChange={handleTitle}
        />
        <Spacer y={1.5} />
        <Input
          clearable
          label='Name'
          placeholder='Name'
          initialValue='NextUI'
        />
      </Card.Body>
      <Card.Divider />
      <Card.Footer>
        <Row justify='flex-end'>
          <Button size='sm'>Search</Button>
        </Row>
      </Card.Footer>
    </Card>
  )
}
