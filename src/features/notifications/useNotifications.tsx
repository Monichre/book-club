// import UserContext from '@/features/auth/UserContext';
// import { createClient } from '@supabase/supabase-js';
// import { useContext, useEffect, useState } from 'react';

// console.log(
//   'process.env.NEXT_PUBLIC_SUPABASE_KEY: ',
//   process.env.NEXT_PUBLIC_SUPABASE_KEY
// )
// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL || '',
//   process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
// )

// /**
//  * @param {number} channelId the currently selected Channel
//  */
// export const useNotifications = () => {
//   const [friendRequests, setFriendRequests] = useState([])
//   console.log('friendRequests: ', friendRequests)
//   const [notifications, setNotifications] = useState([])
//   console.log('notifications: ', notifications)
//   const [newNotification, setNewNotification] = useState(null)
//   const { currentUser } = useContext(UserContext)

//   const addFriendRequestNotification = (latest) => {
//     console.log('latest: ', latest)
//     setFriendRequests((friendRequests) => [...friendRequests, latest])
//     setNotifications((notifications) => [...notifications, latest.invitee])
//   }

//   useEffect(() => {
//     if (currentUser) {
//       const friendRequestListener = supabase
//         .channel(`public:friend_requests:invitee_id=eq.${currentUser.id}`)
//         .on(
//           'postgres_changes',
//           {
//             event: 'INSERT',
//             schema: 'public',
//             table: 'friend_requests',
//             filter: `invitee_id=eq.${currentUser.id}`,
//           },
//           (payload) => {
//             console.log('payload: ', payload)
//             setFriendRequests((friendRequests) => [
//               ...friendRequests,
//               payload.new,
//             ])
//           }
//         )
//         .on(
//           'postgres_changes',
//           { event: 'UPDATE', schema: 'public', table: 'friend_requests' },
//           (payload) => {
//             console.log('payload: ', payload)
//           }
//         )
//         .subscribe()
//     }

//     return () => {
//       supabase.removeChannel(`public:friend_requests`)
//     }
//   }, [])

//   useEffect(() => {
//     if (notifications?.length) {
//       setNewNotification(notifications[notifications?.length - 1])
//     }
//   }, [notifications])
//   return {
//     // We can export computed values here to map the authors to each message
//     newNotification,
//     addFriendRequestNotification,
//     friendRequests,
//     notifications,
//   }
// }
