import { List } from 'antd';
import styled from 'styled-components';

export const MessagesWrapper: any = styled.div`
  height: calc(100vh - 200px);

  ${List} {
    background: transparent;
  }
`
export const MessageInputWrapper = styled.div`
  max-height: 120px;
`
