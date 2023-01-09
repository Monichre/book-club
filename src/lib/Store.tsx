import { supabase } from '@/lib/supabase';
import { snakeCaseObjectFields } from '@/utils/functions';
import { useEffect, useState } from 'react';

/**
 * @param {number} channelId the currently selected Channel
 */
export const useStore = (
  { channelId = null, userId }: { channelId?: any; userId?: string } = null
) => {
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState([])

  const [users] = useState(new Map())
  const [newMessage, handleNewMessage] = useState(null)

  const [newChannel, handleNewChannel] = useState(null)
  const [newOrUpdatedUser, handleNewOrUpdatedUser] = useState(null)
  const [deletedChannel, handleDeletedChannel] = useState(null)
  const [deletedMessage, handleDeletedMessage] = useState(null)

  // Load initial data and set up listeners
  useEffect(() => {
    // Get Channels
    // fetchChannels(setChannels)
    // Listen for new and deleted messages
    const messageListener = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => setMessages((messages) => [...messages, payload.new])
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'messages' },
        (payload) => handleDeletedMessage(payload.old)
      )
      .subscribe()
    // Listen for changes to our users
    const userListener = supabase
      .channel('public:users')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users' },
        (payload) => handleNewOrUpdatedUser(payload.new)
      )
      .subscribe()
    // Listen for new and deleted channels
    const channelListener = supabase
      .channel('public:channels')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'channels' },
        (payload) => handleNewChannel(payload.new)
      )
      .on(
        'postgres_changes',
        { event: 'DELETE', schema: 'public', table: 'channels' },
        (payload) => handleDeletedChannel(payload.old)
      )
      .subscribe()
    // Cleanup on unmount
    // return () => {
    //   // if (supabase) {
    //   //   supabase.removeChannel('public:messages')
    //   //   supabase.removeChannel('public:users')
    //   //   supabase.removeChannel('public:channels')
    //   // }
    // }
  }, [])

  useEffect(() => {
    if (userId) {
      fetchChannels(userId).then((res) => setChannels(res))
    }
  }, [userId])
  // Update when the route changes
  useEffect(() => {
    if (channelId) {
      fetchMessages(channelId).then((res) => setMessages(res))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channelId])

  // // New message received from Postgres
  // useEffect(() => {
  //   if (newMessage && newMessage.channel_id === Number(channelId)) {
  //     const handleAsync = async () => {
  //       let authorId = newMessageuser_id
  //       if (!users.get(authorId))
  //         await fetchUser(authorId, (user: SetStateAction<null>) =>
  //           handleNewOrUpdatedUser(user)
  //         )
  //       setMessages(messages.concat(newMessage))
  //     }
  //     handleAsync()
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [newMessage])

  // Deleted message received from postgres
  useEffect(() => {
    if (deletedMessage)
      setMessages(
        messages.filter((message) => message.id !== deletedMessage.id)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedMessage])

  // New channel received from Postgres
  useEffect(() => {
    if (newChannel) setChannels(channels.concat(newChannel))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newChannel])

  // Deleted channel received from postgres
  useEffect(() => {
    if (deletedChannel)
      setChannels(
        channels.filter((channel) => channel.id !== deletedChannel.id)
      )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deletedChannel])

  // New or updated user received from Postgres
  useEffect(() => {
    if (newOrUpdatedUser) users.set(newOrUpdatedUser.id, newOrUpdatedUser)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newOrUpdatedUser])

  return {
    // We can export computed values here to map the authors to each message
    messages,
    channels,
    users,
  }
}

/**
 * Fetch all channels
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */

export const fetchChannelByBookClubId = async (book_club_id) => {
  let { data }: any = await supabase
    .from('book_club_channels')
    .select(`*`)
    .eq('book_club_id', book_club_id)

  return data[0]
}
export const fetchChannels = async (userId) => {
  try {
    if (userId) {
      let { data } = await supabase
        .from('book_club_members')
        .select(`book_club_id`)
        .eq('user_id', userId)

      const channels = await Promise.all(
        data?.map(async ({ book_club_id }) => {
          const channel = await fetchChannelByBookClubId(book_club_id)

          return channel
        })
      )
      return channels
    }
  } catch (error) {}
}

/**
 * Fetch a single user
 * @param {number} userId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUsersBookClubs = async (userId: any) => {
  try {
    let { data: bookClubs } = await supabase
      .from('book_club_members')
      .select(`*`)
      .eq('id', userId)

    return { bookClubs }
  } catch (error) {}
}

export const fetchUsersFriends = async (userId) => {
  let { data: friends } = await supabase
    .from('friends')
    .select(
      `*
   
    `
    )
    .or(`invitee_id.eq.${userId},invitor_id.eq.${userId}`)
  return { friends }
}
export const updateUserOnlineStatus = async (userId) => {
  const { data: user } = await supabase
    .from('users')
    .update({ status: 'ONLINE' })
    .eq('id', userId)
    .select(`*, book_clubs(*, schedule(*))`)
    // .limit(1)
    .single()

  console.log('user: ', user)

  return user
}

export const fetchUser = async ({ userId = null }: any) => {
  let { data } = await supabase
    .from('users')
    .select(`*, book_clubs(*, schedule(*))`)
    .eq('id', userId)

  const [user] = data || [null]

  return user
}
export const searchUsers = async (args) => {
  let { data } = await supabase
    .from('users')
    .select('*')
    .or(`name.eq.${args},email.eq.${args}`)

  return data
}

export const fetchUsers = async () => {
  let { data: users } = await supabase.from('users').select(
    `*
    `
  )

  return users
}

/**
 * Fetch all roles for the current user
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUserRoles = async (
  setState: (arg0: any[] | null) => void
) => {
  try {
    let { data } = await supabase.from('user_roles').select(`*`)

    if (setState) setState(data)
    return data
  } catch (error) {}
}

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (channelId: any) => {
  try {
    let { data } = await supabase
      .from('messages')
      .select(`*, from:user_id(*)`)
      .eq('channel_id', channelId)
      .order('inserted_at', true)

    return data
  } catch (error) {}
}

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */
export const addChannel = async (slug: any, user_id: any) => {
  try {
    let { data } = await supabase
      .from('channels')
      .insert([{ slug, created_by: user_id }])
      .select()
    return data
  } catch (error) {}
}

/**
 * Insert a new message into the DB
 * @param {string} message The message text
 * @param {number} channel_id
 * @param {number} user_id The author
 */
export const addMessage = async ({ message, channel_id, user_id }) => {
  try {
    let { data } = await supabase
      .from('messages')
      .insert([{ message, channel_id, user_id }])
      .select(`*, from:user_id(*)`)
      .single()
    console.log('message: ', data)
    return data
  } catch (error) {}
}

/**
 * Delete a channel from the DB
 * @param {number} channel_id
 */
export const deleteChannel = async (channel_id: any) => {
  try {
    let { data } = await supabase
      .from('channels')
      .delete()
      .match({ id: channel_id })
    return data
  } catch (error) {}
}

/**
 * Delete a message from the DB
 * @param {number} message_id
 */
export const deleteMessage = async (message_id: any) => {
  try {
    let { data } = await supabase
      .from('messages')
      .delete()
      .match({ id: message_id })
    return data
  } catch (error) {}
}

/**
 * Insert a new channel into the DB
 * @param {string} slug The channel name
 * @param {number} user_id The channel creator
 */
type BookClubChannelPayload = {
  name: string
  ownerId: string
  bookClubId: string
}
export const getTotalBookClubMembers = async ({ bookClubId }) => {
  const { count: total } = await supabase
    .from('book_club_members')
    .select('*', { count: 'exact', head: true })
  return total
}
export const getBookClub = async ({ bookClubId }) => {
  const { data } = await supabase
    .from(`book_clubs`)
    .select(
      `*, 
book_club_members(*, users(*))
`
    )
    .eq(`id`, bookClubId)

  return data
}

const addBookClubMember = async ({ bookClubId, userId }) => {
  let { data } = await supabase
    .from('book_club_members')
    .insert([
      {
        book_club_id: bookClubId,
        user_id: userId,
      },
    ])
    .select('*')

  return data
}

const createBookClubChannel = async (channel: BookClubChannelPayload) => {
  let { data } = await supabase
    .from('book_club_channels')
    .insert([
      {
        ...snakeCaseObjectFields(channel),
      },
    ])
    .select()

  return data
}

const createBookClubCurriculum = async (schedule: BookClubSchedule) => {
  const { startTime, endTime } = schedule
  const days = schedule.days.join()

  let { data } = await supabase
    .from('book_club_schedule')
    .insert([
      {
        ...snakeCaseObjectFields(schedule),
      },
    ])
    .select()

  return data
}

const createBookClubBook = async ({
  bookId: id,
  bookClubId: book_club_id,
  name: title,
  image_url,
}) => {
  let { data } = await supabase
    .from('book_club_books')
    .insert([
      {
        id,
        book_club_id,
        title,
        image_url,
      },
    ])
    .select()

  return data
}

export const createBookClub = async ({
  schedule,
  bookClub: bookClubData,
}: // invitees
{
  schedule: BookClubSchedule
  bookClub: NewBookClubData
}) => {
  const { bookId, ...rest } = bookClubData

  const payload = snakeCaseObjectFields(rest)
  const { ownerId } = bookClubData
  try {
    let { data }: any = await supabase
      .from('book_clubs')
      .insert([
        {
          ...payload,
        },
      ])
      .select('*')

    const bookClub = data[0]

    const { name, id: bookClubId, image_url } = bookClub

    const channel = await createBookClubChannel({ ownerId, name, bookClubId })
    const bookClubSchedule = await createBookClubCurriculum(schedule)
    const currentBook = await createBookClubBook({
      bookId,
      bookClubId,
      name,
      image_url,
    })

    await addBookClubMember({ userId: ownerId, bookClubId })

    return {
      bookClub,
      channel,
      bookClubSchedule,
      currentBook,
    }
  } catch (error) {}
}

export const sendFriendRequest = async ({ requestorId, inviteeId }) => {
  const args = snakeCaseObjectFields({ requestorId, inviteeId })

  let { data: friendRequest } = await supabase.from('friend_requests').insert([
    {
      ...snakeCaseObjectFields({ requestorId, inviteeId }),
    },
  ]).select(`*, 
  from: requestor_id(*),
  to: invitee_id(*)
  `)

  return friendRequest
}

export const acceptFriendRequest = async ({ accepted, ...rest }) => {
  let { status } = await supabase
    .from('friend_requests')
    .update([
      {
        accepted: true,
      },
    ])
    .eq('id', rest.id)

  if (status === 204) {
    return {
      accepted: true,
      ...rest,
    }
  }

  return false
}

export const getFriendRequests = async (invitee_id) => {
  let { data: friendRequests } = await supabase
    .from('friend_requests')
    .select(
      `*, 
  from: requestor_id(*)
  `
    )
    .match({
      invitee_id,
      accepted: false,
    })

  // .eq(`invitee_id`, invitee_id)

  return friendRequests
}

export const getUsersFriends = async (userId) => {
  let { data } = await supabase
    .from('friend_requests')
    .select(
      `*, 
    from: requestor_id(*),
    to: invitee_id(*)
    `
    )
    .or(`invitee_id.eq.${userId},requestor_id.eq.${userId}`)
    .match({
      accepted: true,
    })
  const friends = data?.map(({ from }) => from)

  // .eq(`invitee_id`, invitee_id)

  return friends
}

export const sendJoinAppInvitation = async (invitation: any) => {
  let { data } = await supabase
    .from('app_invitations')
    .insert([
      {
        ...snakeCaseObjectFields(invitation),
      },
    ])
    .select()

  return data
}

export const sendBookClubJoinRequest = async (joinRequest: any) => {
  let { data } = await supabase
    .from('book_club_join_requests')
    .insert([
      {
        ...snakeCaseObjectFields(joinRequest),
      },
    ])
    .select()

  return data
}
