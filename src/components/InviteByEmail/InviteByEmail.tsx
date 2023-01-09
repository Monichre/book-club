import { inviteNewUser } from '@/features/auth/invitations';
import UserContext from '@/features/auth/UserContext';
import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import * as React from 'react';

export type InviteByEmailProps = {}

export const InviteByEmail: React.FunctionComponent<InviteByEmailProps> = (
  props: InviteByEmailProps
) => {
  const { currentUser } = React.useContext(UserContext)
  const [form] = Form.useForm()

  const sendInviteByEmail = async ({ email }) => {
    await inviteNewUser({ email, from: currentUser })
  }
  const onFinish = async (values: any) => {
    await sendInviteByEmail(values)
  }

  return (
    <Form
      form={form}
      name='horizontal_login'
      layout='inline'
      onFinish={onFinish}
    >
      <Form.Item
        name='email'
        rules={[
          {
            required: true,
            message:
              'Please input your the email address on the intended recipient',
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Username'
        />
      </Form.Item>

      <Form.Item shouldUpdate>
        {() => (
          <Button type='primary' htmlType='submit'>
            Send
          </Button>
        )}
      </Form.Item>
    </Form>
  )
}
