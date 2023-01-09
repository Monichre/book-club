import { Database } from '@/types/database.types';

export type DatabaseUserSchema = Database['public']['Tables']['users']['Row']
export type BookClubSchema = Database['public']['Tables']['book_clubs']['Row']
export type BookClubMemberSchema =
  Database['public']['Tables']['book_club_members']['Row']
export type BookClubScheduleSchema =
  Database['public']['Tables']['book_club_schedule']['Row']
export type BookClubChannelSchema =
  Database['public']['Tables']['book_club_channels']['Row']
export type BookClubBookSchema =
  Database['public']['Tables']['book_club_books']['Row']

export interface CurrentAppUser extends DatabaseUserSchema {}
