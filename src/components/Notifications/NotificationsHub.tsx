import { Container, Content, Life, Message } from '@/components/Notifications/Notifications.style';
import { Button } from '@nextui-org/react';
import { useTransition } from '@react-spring/web';
import { MouseEvent, useEffect, useMemo, useState } from 'react';

let id = 0

interface NotificationsHubProps {
  config?: {
    tension: number
    friction: number
    precision: number
  }
  timeout?: number
  children: (add: AddFunction) => void
}

type AddFunction = (msg: string) => void

interface Item {
  key: number
  msg: string
}

export const NotificationsHub = ({
  config = { tension: 125, friction: 20, precision: 0.1 },
  timeout = 3000,
  children,
}: NotificationsHubProps) => {
  const refMap = useMemo(() => new WeakMap(), [])
  const cancelMap = useMemo(() => new WeakMap(), [])
  const [items, setItems] = useState<Item[]>([])

  const transitions = useTransition(items, {
    from: { opacity: 0, height: 0, life: '100%' },
    keys: (item) => item.key,
    enter: (item) => async (next, cancel) => {
      cancelMap.set(item, cancel)
      await next({ opacity: 1, height: refMap.get(item).offsetHeight })
      await next({ life: '0%' })
    },
    leave: [{ opacity: 0 }, { height: 0 }],
    onRest: (result, ctrl, item) => {
      setItems((state) =>
        state.filter((i) => {
          return i.key !== item.key
        })
      )
    },
    config: (item, index, phase) => (key) =>
      phase === 'enter' && key === 'life' ? { duration: timeout } : config,
  })

  useEffect(() => {
    children((msg: string) => {
      setItems((state) => [...state, { key: id++, msg }])
    })
  }, [])

  return (
    <Container>
      {transitions(({ life, ...style }, item) => (
        <Message style={style}>
          <Content ref={(ref: HTMLDivElement) => ref && refMap.set(item, ref)}>
            <Life style={{ right: life }} />
            <p>{item.msg}</p>
            <Button
              onClick={(e: MouseEvent) => {
                e.stopPropagation()
                if (cancelMap.has(item) && life.get() !== '0%')
                  cancelMap.get(item)()
              }}
            >
              Close
            </Button>
          </Content>
        </Message>
      ))}
    </Container>
  )
}
