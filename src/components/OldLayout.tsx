import TrashIcon from '@/components/TrashIcon';
import { Button, Column, Img, Input, Line, List, Row, Stack, Text } from '@/components/ui';
import Sidebar from '@/components/ui/Sidebar/Sidebar';
import UserContext from '@/features/auth/UserContext';
import { addChannel, deleteChannel } from '@/lib/Store';
import Link from 'next/link';
import { useContext } from 'react';

export default function Layout(props) {
  const { signOut, user, userRoles } = useContext(UserContext)

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

  const newChannel = async () => {
    const slug = prompt('Please enter your name')
    if (slug) {
      addChannel(slugify(slug), user.id)
    }
  }

  return (
    <Column className='bg-gray_100 font-sfprodisplay items-center justify-start mx-[auto] w-[100%]'>
      <Row className='items-center justify-between w-[100%]'>
        <Row className='items-center justify-between w-[41%]'>
          <Sidebar className='w-[28%]' />
          <Column className='items-center w-[61%]'>
            <Column className='items-center justify-start w-[100%]'>
              <Row className='items-center justify-between w-[98%]'>
                <Input
                  // value={inputvalue}
                  // onChange={(e) => setInputvalue(e?.target?.value)}
                  className='placeholder:text-gray_500 email'
                  wrapClassName='flex w-[82%]'
                  name='Search'
                  placeholder='Search in social…'
                  prefix={
                    <Img
                      src='images/img_search.svg'
                      className='cursor-pointer ml-[1px] lg:w-[12px] lg:h-[13px] lg:mr-[10px] xl:w-[16px] xl:h-[17px] xl:mr-[13px] 2xl:w-[18px] 2xl:h-[19px] 2xl:mr-[15px] 3xl:w-[21px] 3xl:h-[22px] 3xl:mr-[18px] my-[auto]'
                      alt='search'
                    />
                  }
                  // suffix={
                  //   inputvalue?.length > 0 ? (
                  //     <CloseSVG
                  //       color="#8f92a1"
                  //       className="cursor-pointer lg:w-[12px] lg:h-[13px] lg:ml-[7px] lg:mr-[15px] xl:w-[16px] xl:h-[17px] xl:ml-[8px] xl:mr-[19px] 2xl:w-[18px] 2xl:h-[19px] 2xl:ml-[10px] 2xl:mr-[22px] 3xl:w-[21px] 3xl:h-[22px] 3xl:ml-[12px] 3xl:mr-[26px] my-[auto]"
                  //       // onClick={() => setInputvalue("")}
                  //     />
                  //   ) : (
                  //     ""
                  //   )
                  // }
                  shape='srcRoundedBorder12'
                  size='lgSrc'
                  variant='srcFillWhiteA700'
                ></Input>
                <Button
                  className='flex items-center justify-center mail_One1'
                  shape='icbRoundedBorder12'
                  size='mdIcn'
                  variant='icbFillGreen400'
                >
                  <Img
                    src='images/img_laptop_14X14.svg'
                    className='flex items-center justify-center lg:h-[16px] xl:h-[20px] 2xl:h-[23px] 3xl:h-[27px]'
                    alt='laptop'
                  />
                </Button>
              </Row>
              <Column className='justify-start lg:mt-[44px] xl:mt-[56px] 2xl:mt-[63px] 3xl:mt-[75px] w-[100%]'>
                <Text className='text-gray_900 w-[auto]' as='h1' variant='h1'>
                  Inbox
                </Text>
                <Row className='font-inter items-start lg:mt-[29px] xl:mt-[37px] 2xl:mt-[42px] 3xl:mt-[50px] py-[1px] w-[84%]'>
                  <Column className='items-center justify-start mt-[3px] w-[38%]'>
                    <Text
                      className='font-bold text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Direct Messages
                    </Text>
                    <Line className='bg-gray_900 h-[2px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[100%]' />
                  </Column>
                  <Text
                    className='font-bold lg:ml-[14px] xl:ml-[17px] 2xl:ml-[20px] 3xl:ml-[24px] mt-[3px] text-gray_500 w-[auto]'
                    as='h5'
                    variant='h5'
                  >
                    Group Chat
                  </Text>
                  <Text
                    className='lg:ml-[16px] xl:ml-[20px] 2xl:ml-[23px] 3xl:ml-[27px] NavigationTab2'
                    as='h5'
                    variant='h5'
                  >
                    Archived
                  </Text>
                </Row>
              </Column>
            </Column>
            <List
              className='font-inter gap-[0] min-h-[auto] lg:mt-[28px] xl:mt-[35px] 2xl:mt-[40px] 3xl:mt-[48px] w-[98%]'
              orientation='vertical'
            >
              <Row className='Messages'>
                <Row className='items-end justify-between w-[59%]'>
                  <Stack className='lg:h-[35px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] w-[24%]'>
                    <Img
                      src='images/img_avatar_28X28.png'
                      className='Avatar9'
                      alt='Avatar'
                    />
                    <Stack className='absolute xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] right-[0] top-[0] w-[30%]'>
                      <div className='absolute bg-gray_100 xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] rounded-radius758 w-[100%]'></div>
                      <div className='absolute bg-green_400 2xl:h-[11px] 3xl:h-[13px] lg:h-[8px] xl:h-[9px] inset-x-[0] mx-[auto] rounded-radius50 top-[0] 2xl:w-[10px] 3xl:w-[12px] lg:w-[7px] xl:w-[8px]'></div>
                    </Stack>
                  </Stack>
                  <Column className='justify-start mb-[3px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[70%]'>
                    <Text
                      className='font-medium text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Billy Green
                    </Text>
                    <Text className='Message' as='h5' variant='h5'>
                      Thank you for sharing
                    </Text>
                  </Column>
                </Row>
                <Column className='items-end justify-start mt-[3px] pl-[4px] pt-[4px] w-[25%]'>
                  <Text className='Right' as='h6' variant='h6'>
                    3:03pm
                  </Text>
                  <Button
                    className='font-bold font-sfprodisplay lg:mt-[3px] xl:mt-[4px] 2xl:mt-[5px] 3xl:mt-[6px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[8px] text-center tracking-ls1 uppercase w-[21%]'
                    shape='RoundedBorder4'
                    size='sm'
                    variant='FillRedA200'
                  >
                    1
                  </Button>
                </Column>
              </Row>
              <Row className='Messages'>
                <Row className='items-end justify-between w-[59%]'>
                  <Stack className='lg:h-[35px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] w-[24%]'>
                    <Img
                      src='images/img_image_11.png'
                      className='Avatar9'
                      alt='Avatar One'
                    />
                    <Stack className='absolute xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] right-[0] top-[0] w-[30%]'>
                      <div className='absolute bg-gray_100 xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] rounded-radius758 w-[100%]'></div>
                      <div className='absolute bg-green_400 2xl:h-[11px] 3xl:h-[13px] lg:h-[8px] xl:h-[9px] inset-x-[0] mx-[auto] rounded-radius50 top-[0] 2xl:w-[10px] 3xl:w-[12px] lg:w-[7px] xl:w-[8px]'></div>
                    </Stack>
                  </Stack>
                  <Column className='justify-start mb-[3px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[70%]'>
                    <Text
                      className='font-medium text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Billy Green
                    </Text>
                    <Text className='Message' as='h5' variant='h5'>
                      Thank you for sharing
                    </Text>
                  </Column>
                </Row>
                <Column className='items-end justify-start mt-[3px] pl-[4px] pt-[4px] w-[25%]'>
                  <Text className='Right' as='h6' variant='h6'>
                    3:03pm
                  </Text>
                  <Button
                    className='font-bold font-sfprodisplay lg:mt-[3px] xl:mt-[4px] 2xl:mt-[5px] 3xl:mt-[6px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[8px] text-center tracking-ls1 uppercase w-[21%]'
                    shape='RoundedBorder4'
                    size='sm'
                    variant='FillRedA200'
                  >
                    1
                  </Button>
                </Column>
              </Row>
              <Row className='Messages'>
                <Row className='items-end justify-between w-[59%]'>
                  <Stack className='lg:h-[35px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] w-[24%]'>
                    <Img
                      src='images/img_image_9.png'
                      className='Avatar9'
                      alt='Avatar Two'
                    />
                    <Stack className='absolute xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] right-[0] top-[0] w-[30%]'>
                      <div className='absolute bg-gray_100 xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] rounded-radius758 w-[100%]'></div>
                      <div className='absolute bg-green_400 2xl:h-[11px] 3xl:h-[13px] lg:h-[8px] xl:h-[9px] inset-x-[0] mx-[auto] rounded-radius50 top-[0] 2xl:w-[10px] 3xl:w-[12px] lg:w-[7px] xl:w-[8px]'></div>
                    </Stack>
                  </Stack>
                  <Column className='justify-start mb-[3px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[70%]'>
                    <Text
                      className='font-medium text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Billy Green
                    </Text>
                    <Text className='Message' as='h5' variant='h5'>
                      Thank you for sharing
                    </Text>
                  </Column>
                </Row>
                <Column className='items-end justify-start mt-[3px] pl-[4px] pt-[4px] w-[25%]'>
                  <Text className='Right' as='h6' variant='h6'>
                    3:03pm
                  </Text>
                  <Button
                    className='font-bold font-sfprodisplay lg:mt-[3px] xl:mt-[4px] 2xl:mt-[5px] 3xl:mt-[6px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[8px] text-center tracking-ls1 uppercase w-[21%]'
                    shape='RoundedBorder4'
                    size='sm'
                    variant='FillRedA200'
                  >
                    1
                  </Button>
                </Column>
              </Row>
              <Row className='pr-[1px] Messages'>
                <Row className='items-end justify-between w-[59%]'>
                  <Stack className='lg:h-[35px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] w-[24%]'>
                    <Img
                      src='images/img_avatar_18.png'
                      className='Avatar9'
                      alt='Avatar Three'
                    />
                    <Stack className='absolute xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] right-[0] top-[0] w-[30%]'>
                      <div className='absolute bg-gray_100 xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] rounded-radius758 w-[100%]'></div>
                      <div className='absolute bg-green_400 2xl:h-[11px] 3xl:h-[13px] lg:h-[8px] xl:h-[9px] inset-x-[0] mx-[auto] rounded-radius50 top-[0] 2xl:w-[10px] 3xl:w-[12px] lg:w-[7px] xl:w-[8px]'></div>
                    </Stack>
                  </Stack>
                  <Column className='justify-start mb-[3px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[70%]'>
                    <Text
                      className='font-medium text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Billy Green
                    </Text>
                    <Text className='Message' as='h5' variant='h5'>
                      Thank you for sharing
                    </Text>
                  </Column>
                </Row>
                <Text className='duration' as='h6' variant='h6'>
                  Yesterday
                </Text>
              </Row>
              <Row className='pr-[1px] Messages'>
                <Row className='items-end justify-between w-[59%]'>
                  <Stack className='lg:h-[35px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] w-[24%]'>
                    <Img
                      src='images/img_avatar_6.png'
                      className='Avatar9'
                      alt='Avatar Four'
                    />
                    <Stack className='absolute xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] right-[0] top-[0] w-[30%]'>
                      <div className='absolute bg-gray_100 xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] rounded-radius758 w-[100%]'></div>
                      <div className='absolute bg-green_400 2xl:h-[11px] 3xl:h-[13px] lg:h-[8px] xl:h-[9px] inset-x-[0] mx-[auto] rounded-radius50 top-[0] 2xl:w-[10px] 3xl:w-[12px] lg:w-[7px] xl:w-[8px]'></div>
                    </Stack>
                  </Stack>
                  <Column className='justify-start mb-[3px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[70%]'>
                    <Text
                      className='font-medium text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Billy Green
                    </Text>
                    <Text className='Message' as='h5' variant='h5'>
                      Thank you for sharing
                    </Text>
                  </Column>
                </Row>
                <Text className='duration' as='h6' variant='h6'>
                  Yesterday
                </Text>
              </Row>
              <Row className='pr-[1px] Messages'>
                <Row className='items-end justify-between w-[59%]'>
                  <Stack className='lg:h-[35px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] w-[24%]'>
                    <Img
                      src='images/img_avatar_21.png'
                      className='Avatar9'
                      alt='Avatar Five'
                    />
                    <Stack className='absolute xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] right-[0] top-[0] w-[30%]'>
                      <div className='absolute bg-gray_100 xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] rounded-radius758 w-[100%]'></div>
                      <div className='absolute bg-green_400 2xl:h-[11px] 3xl:h-[13px] lg:h-[8px] xl:h-[9px] inset-x-[0] mx-[auto] rounded-radius50 top-[0] 2xl:w-[10px] 3xl:w-[12px] lg:w-[7px] xl:w-[8px]'></div>
                    </Stack>
                  </Stack>
                  <Column className='justify-start mb-[3px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[70%]'>
                    <Text
                      className='font-medium text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Billy Green
                    </Text>
                    <Text className='Message' as='h5' variant='h5'>
                      Thank you for sharing
                    </Text>
                  </Column>
                </Row>
                <Text className='december,Counter_Two' as='h6' variant='h6'>
                  Oct 26
                </Text>
              </Row>
              <Row className='Messages'>
                <Row className='items-end justify-between w-[59%]'>
                  <Stack className='lg:h-[35px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] w-[24%]'>
                    <Img
                      src='images/img_avatar_19.png'
                      className='Avatar9'
                      alt='Avatar Six'
                    />
                    <Stack className='absolute xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] right-[0] top-[0] w-[30%]'>
                      <div className='absolute bg-gray_100 xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] rounded-radius758 w-[100%]'></div>
                      <div className='absolute bg-green_400 2xl:h-[11px] 3xl:h-[13px] lg:h-[8px] xl:h-[9px] inset-x-[0] mx-[auto] rounded-radius50 top-[0] 2xl:w-[10px] 3xl:w-[12px] lg:w-[7px] xl:w-[8px]'></div>
                    </Stack>
                  </Stack>
                  <Column className='justify-start mb-[3px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[70%]'>
                    <Text
                      className='font-medium text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Billy Green
                    </Text>
                    <Text className='Message' as='h5' variant='h5'>
                      Thank you for sharing
                    </Text>
                  </Column>
                </Row>
                <Column className='items-end justify-start mt-[3px] pl-[3px] pt-[3px] w-[25%]'>
                  <Text className='Right' as='h6' variant='h6'>
                    Oct 26
                  </Text>
                  <Button
                    className='font-bold font-sfprodisplay lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[8px] text-center tracking-ls1 uppercase w-[20%]'
                    shape='RoundedBorder4'
                    size='sm'
                    variant='FillRedA200'
                  >
                    1
                  </Button>
                </Column>
              </Row>
              <Row className='Messages'>
                <Row className='items-end justify-between w-[59%]'>
                  <Stack className='lg:h-[35px] xl:h-[43px] 2xl:h-[49px] 3xl:h-[58px] w-[24%]'>
                    <Img
                      src='images/img_image_8.png'
                      className='Avatar9'
                      alt='Avatar Seven'
                    />
                    <Stack className='absolute xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] right-[0] top-[0] w-[30%]'>
                      <div className='absolute bg-gray_100 xl:h-[11px] 2xl:h-[13px] 3xl:h-[15px] lg:h-[9px] rounded-radius758 w-[100%]'></div>
                      <div className='absolute bg-green_400 2xl:h-[11px] 3xl:h-[13px] lg:h-[8px] xl:h-[9px] inset-x-[0] mx-[auto] rounded-radius50 top-[0] 2xl:w-[10px] 3xl:w-[12px] lg:w-[7px] xl:w-[8px]'></div>
                    </Stack>
                  </Stack>
                  <Column className='justify-start mb-[3px] lg:mt-[4px] xl:mt-[6px] 2xl:mt-[7px] 3xl:mt-[8px] w-[70%]'>
                    <Text
                      className='font-medium text-gray_900 w-[auto]'
                      as='h5'
                      variant='h5'
                    >
                      Billy Green
                    </Text>
                    <Text className='Message' as='h5' variant='h5'>
                      Thank you for sharing
                    </Text>
                  </Column>
                </Row>
                <Column className='items-end justify-start mt-[3px] pl-[3px] pt-[3px] w-[25%]'>
                  <Text className='Right' as='h6' variant='h6'>
                    Oct 26
                  </Text>
                  <Button
                    className='font-bold font-sfprodisplay lg:mt-[4px] xl:mt-[5px] 2xl:mt-[6px] 3xl:mt-[7px] 2xl:text-[10px] 3xl:text-[12px] lg:text-[7px] xl:text-[8px] text-center tracking-ls1 uppercase w-[20%]'
                    shape='RoundedBorder4'
                    size='sm'
                    variant='FillRedA200'
                  >
                    1
                  </Button>
                </Column>
              </Row>
            </List>
          </Column>
        </Row>
        {/* <button
              className='bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150'
              onClick={() => newChannel()}
            >
              New Channel
            </button>
          </div>
          <hr className='m-2' />
          <div className='p-2 flex flex-col space-y-2'>
            <h6 className='text-xs'>{user?.email}</h6>
            <button
              className='bg-blue-900 hover:bg-blue-800 text-white py-2 px-4 rounded w-full transition duration-150'
              onClick={() => signOut()}
            >
              Log out
            </button>
          </div>
          <hr className='m-2' />
          <h4 className='font-bold'>Channels</h4>
          <ul className='channel-list'>
            {props.channels.map((x) => (
              <SidebarItem
                channel={x}
                key={x.id}
                isActiveChannel={x.id === props.activeChannelId}
                user={user}
                userRoles={userRoles}
              />
            ))}
          
        */}

        {/* Messages */}
        {props.children}
      </Row>
    </Column>
  )
}

const SidebarItem = ({ channel, isActiveChannel, user, userRoles }) => (
  <>
    <li className='flex items-center justify-between'>
      <Link
        href='/channels/[id]'
        as={`/channels/${channel.id}`}
        className={isActiveChannel ? 'font-bold' : ''}
      >
        {channel.slug}
      </Link>
      {channel.id !== 1 &&
        (channel.created_by === user?.id || userRoles.includes('admin')) && (
          <Button onClick={() => deleteChannel(channel.id)}>
            <TrashIcon />
          </Button>
        )}
    </li>
  </>
)
