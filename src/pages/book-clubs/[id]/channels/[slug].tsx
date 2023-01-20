import {
  MessageForm,
  MessageInputWrapper,
  MessageList,
  MessagesWrapper,
} from '@/components/BookClubChannel/Messages/Messages.style';
import UserContext from '@/features/auth/UserContext';
import { addMessage, useStore } from '@/lib/Store';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar, Button } from '@nextui-org/react';
import { Input, Space } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';

const IconText = ({ children, text }: { icon: any; text: string }) => (
  <Space>
    {children}
    {text}
  </Space>
)

const ChannelsPage = (props) => {
  const router = useRouter()

  const [form] = MessageForm.useForm()
  const { currentUser } = useContext(UserContext)
  const [channelMessages, setChannelMessages] = useState([])

  const messagesEndRef = useRef(null)

  // Else load up the page
  const { slug: channelId } = router.query
  const { messages, channels } = useStore({ channelId })

  const onValuesChange = (changedValues) => {
    //
  }

  const onFinish = async ({ message }) => {
    await addMessage({
      message,
      user_id: currentUser?.id,
      channel_id: channelId,
    })
    form.resetFields()
  }

  useEffect(() => {
    if (messages?.length) {
      setChannelMessages(messages)
    }
  }, [messages])

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messagesEndRef])

  // redirect to public channel when current channel is deleted
  // useEffect(() => {
  //   if (!channels.some((channel) => channel.id === Number(channelId))) {
  //     router.push('/channels/1')
  //   }
  // }, [channels, channelId])

  // Render the channels and messages

  return (
    // <Layout style={{ background: 'transparent' }}>
    //   <Content>
    <>
      <MessagesWrapper>
        <MessageList
          // loading={initLoading}
          itemLayout='vertical'
          // loadMore={loadMore}
          dataSource={channelMessages}
          renderItem={(item, index) => (
            <MessageList.Item
              key={index}
              ref={index === channelMessages.length - 1 ? messagesEndRef : null}
              actions={[
                <a key='list-loadmore-edit'>respond</a>,
                <a key='list-loadmore-more'>Like</a>,

                <IconText text={item.inserted_at} key='list-vertical-like-o'>
                  <ClockCircleOutlined />
                </IconText>,
              ]}
            >
              <MessageList.Item.Meta
                avatar={<Avatar src={item.from?.avatar_url} />}
                title={item.message}
                description={item.from.name || item.from.email}
              />
            </MessageList.Item>
          )}
        />
        <MessageInputWrapper>
          <MessageForm
            layout={'inline'}
            form={form}
            onValuesChange={onValuesChange}
            onFinish={onFinish}
          >
            <MessageForm.Item name='message' style={{ width: '95%' }}>
              <Input placeholder='Type something' />
            </MessageForm.Item>
            <MessageForm.Item>
              <Button shadow color='gradient' auto htmlType='submit'>
                Send
              </Button>
            </MessageForm.Item>
          </MessageForm>
        </MessageInputWrapper>
      </MessagesWrapper>
    </>
    //   </Content>
    //   <Sider></Sider>
    // </Layout>
  )
}

export default ChannelsPage
