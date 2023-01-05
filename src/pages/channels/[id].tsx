import Layout from '@/components/Layout';
import { Button, Column, Img, Row, Stack, Text } from '@/components/ui';
import UserContext from '@/features/auth/UserContext';
import { useStore } from '@/lib/Store';
import { useRouter } from 'next/router';
import { useContext, useRef } from 'react';

const ChannelsPage = (props) => {
  const router = useRouter()
  const { user, authLoaded, signOut } = useContext(UserContext)
  const messagesEndRef = useRef(null)

  // Else load up the page
  const { id: channelId } = router.query
  const { messages, channels } = useStore({ channelId })

  // useEffect(() => {
  //   messagesEndRef?.current?.scrollIntoView({
  //     block: 'start',
  //     behavior: 'smooth',
  //   })
  // }, [messages])

  // redirect to public channel when current channel is deleted
  // useEffect(() => {
  //   if (!channels.some((channel) => channel.id === Number(channelId))) {
  //     router.push('/channels/1')
  //   }
  // }, [channels, channelId])

  // Render the channels and messages
  return (
    <Layout channels={channels} activeChannelId={channelId}>
      {/* {messages.map((x) => (
              <Message key={x.id} message={x} />
            ))}
             */}
      {/* <MessageInput
            onSubmit={async (text) => addMessage(text, channelId, user.id)}
          /> */}
      return (
      <>
        <Row className='items-center justify-between w-[56%]'>
          <div className='bg-gray_500_48 xl:h-[114px] 2xl:h-[129px] 3xl:h-[154px] lg:h-[92px] rounded-radius2 w-[1%]'></div>
          <Column className='bg-white_A700 items-center lg:p-[28px] xl:p-[35px] 2xl:p-[40px] 3xl:p-[48px] rounded-bl-[32px] rounded-br-[0] rounded-tl-[32px] rounded-tr-[0] w-[98%]'>
            <Row className='items-center justify-end ml-[auto] lg:mt-[3px] xl:mt-[4px] 2xl:mt-[5px] 3xl:mt-[6px] w-[16%]'>
              <Button
                className='font-bold lg:text-[15px] xl:text-[19px] 2xl:text-[22px] 3xl:text-[26px] text-center mail_One1'
                shape='RoundedBorder12'
                size='lg'
                variant='FillLightblue200'
              >
                1
              </Button>
              <Img
                src='images/img_avatar_48X48.png'
                className='Avatar_One'
                alt='Avatar Eight'
              />
            </Row>
            <Column className='font-inter items-center justify-start lg:mb-[11px] xl:mb-[14px] 2xl:mb-[16px] 3xl:mb-[19px] lg:mt-[206px] xl:mt-[258px] 2xl:mt-[291px] 3xl:mt-[349px] pb-[1px] w-[62%]'>
              <Column className='items-center justify-start w-[100%]'>
                <Stack className='bg-gray_100 lg:h-[114px] xl:h-[143px] 2xl:h-[161px] 3xl:h-[193px] lg:px-[29px] xl:px-[36px] 2xl:px-[41px] 3xl:px-[49px] rounded-radius501 lg:w-[113px] xl:w-[142px] 2xl:w-[160px] 3xl:w-[192px]'>
                  <Img
                    src='images/img_mail_75X78.svg'
                    className='absolute lg:h-[54px] xl:h-[67px] 2xl:h-[76px] 3xl:h-[91px] inset-[0] justify-center m-[auto] w-[49%]'
                    alt='mail One'
                  />
                </Stack>
                <Column className='items-center justify-start lg:mt-[15px] xl:mt-[19px] 2xl:mt-[22px] 3xl:mt-[26px] w-[100%]'>
                  <Text className='text-gray_500 w-[auto]' as='h1' variant='h1'>
                    It's nice to chat with someone
                  </Text>
                  <Text
                    className='font-medium lg:mt-[12px] xl:mt-[15px] 2xl:mt-[17px] 3xl:mt-[20px] text-gray_500 w-[auto]'
                    as='h5'
                    variant='h5'
                  >
                    Pick a person from left menu and start your conversation
                  </Text>
                </Column>
              </Column>
              <Row className='items-center justify-center lg:mt-[226px] xl:mt-[283px] 2xl:mt-[319px] 3xl:mt-[383px] w-[72%]'>
                <Img
                  src='images/img_download.svg'
                  className='trash'
                  alt='download'
                />
                <Text
                  className='font-medium lg:ml-[3px] xl:ml-[4px] 2xl:ml-[5px] 3xl:ml-[6px] text-gray_500 w-[auto]'
                  as='h5'
                  variant='h5'
                >
                  Social is available for Mac
                </Text>
                <Text className='Likes' as='h5' variant='h5'>
                  Download it now
                </Text>
              </Row>
            </Column>
          </Column>
        </Row>
      </>
      );
    </Layout>
  )
}

export default ChannelsPage
