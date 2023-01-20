import { Form, List } from 'antd';
import styled from 'styled-components';

export const MessagesWrapper: any = styled.div`
  height: calc(100vh - 100px);
  overflow: scroll;
  position: relative;
`

export const MessageForm = styled(Form)``
export const MessageInputWrapper = styled.div`
  /* height: 40px; */
  position: fixed;
  bottom: 0;
  width: calc(100% - 350px);
  z-index: 100 !important;
  background-color: #3a3f42;
  padding: 16px;
  border-radius: 8px;
`

export const MessageList = styled(List)`
  background: transparent;

  .ant-list-item-meta-content > * {
    color: #fff !important;
  }
`
