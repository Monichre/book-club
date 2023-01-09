import { MessageInputWrapper, MessagesWrapper } from '@/components/BookClubChannel/Messages/Messages.style';
import UserContext from '@/features/auth/UserContext';
import { addMessage, useStore } from '@/lib/Store';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Avatar } from '@nextui-org/react';
import { Button, Form, Input, Layout, List, Space } from 'antd';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';

const { Header, Footer, Sider, Content } = Layout

const IconText = ({ children, text }: { icon: any; text: string }) => (
  <Space>
    {children}
    {text}
  </Space>
)

const ChannelsPage = (props) => {
  const router = useRouter()
  console.log('router: ', router)
  const [form] = Form.useForm()
  const { currentUser } = useContext(UserContext)

  const messagesEndRef = useRef(null)

  // Else load up the page
  const { slug: channelId } = router.query
  const { messages, channels } = useStore({ channelId })

  const onValuesChange = (changedValues) => {
    // console.log('changedValues: ', changedValues)
  }

  const onFinish = async ({ message }) => {
    console.log('message: ', message)
    await addMessage({
      message,
      user_id: currentUser?.id,
      channel_id: channelId,
    })
    form.resetFields()
  }
  console.log('messages: ', messages)

  useEffect(() => {
    messagesEndRef?.current?.scrollIntoView({
      block: 'start',
      behavior: 'smooth',
    })
  }, [messages])

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
        <List
          className='demo-loadmore-list'
          // loading={initLoading}
          itemLayout='vertical'
          // loadMore={loadMore}
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key='list-loadmore-edit'>respond</a>,
                <a key='list-loadmore-more'>Like</a>,

                <IconText text={item.inserted_at} key='list-vertical-like-o'>
                  <ClockCircleOutlined />
                </IconText>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.from?.avatar_url} />}
                title={
                  <a href='https://ant.design'>
                    {item.from.name || item.from.email}
                  </a>
                }
                description={item.message}
              />
            </List.Item>
          )}
        />
      </MessagesWrapper>
      <MessageInputWrapper>
        <Form
          layout={'inline'}
          form={form}
          onValuesChange={onValuesChange}
          onFinish={onFinish}
        >
          <Form.Item name='message' style={{ width: '95%' }}>
            <Input placeholder='Type something' />
          </Form.Item>
          <Form.Item>
            <Button htmlType='submit' type='primary'>
              Send
            </Button>
          </Form.Item>
        </Form>
      </MessageInputWrapper>
    </>
    //   </Content>
    //   <Sider></Sider>
    // </Layout>
  )
}

export default ChannelsPage
