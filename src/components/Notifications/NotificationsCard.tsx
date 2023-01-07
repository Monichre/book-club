import NotificationsContext from '@/features/notifications/NotificationsContext';
import { FunctionComponent, useContext } from 'react';

interface NotificationsCardProps {}

const NotificationsCard: FunctionComponent<NotificationsCardProps> = () => {
  const { notifications } = useContext(NotificationsContext)
  return <div></div>
}

export default NotificationsCard
