export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      app_invitations: {
        Row: {
          id: number
          created_at: string | null
          book_club_id: number | null
          invitor_id: string | null
          title: string | null
          message: string | null
          email: string
        }
        Insert: {
          id?: number
          created_at?: string | null
          book_club_id?: number | null
          invitor_id?: string | null
          title?: string | null
          message?: string | null
          email: string
        }
        Update: {
          id?: number
          created_at?: string | null
          book_club_id?: number | null
          invitor_id?: string | null
          title?: string | null
          message?: string | null
          email?: string
        }
      }
      authors: {
        Row: {
          id: number
          name: string
          gender: boolean | null
          birth_year: number | null
          death_year: number | null
        }
        Insert: {
          id?: number
          name: string
          gender?: boolean | null
          birth_year?: number | null
          death_year?: number | null
        }
        Update: {
          id?: number
          name?: string
          gender?: boolean | null
          birth_year?: number | null
          death_year?: number | null
        }
      }
      book_authors: {
        Row: {
          id: number
          book_id: number
          author_id: number
        }
        Insert: {
          id?: number
          book_id: number
          author_id: number
        }
        Update: {
          id?: number
          book_id?: number
          author_id?: number
        }
      }
      book_club_books: {
        Row: {
          id: number
          book_id: number
          book_club_id: number
          start_date: string | null
          end_date: string | null
        }
        Insert: {
          id?: number
          book_id: number
          book_club_id: number
          start_date?: string | null
          end_date?: string | null
        }
        Update: {
          id?: number
          book_id?: number
          book_club_id?: number
          start_date?: string | null
          end_date?: string | null
        }
      }
      book_club_channels: {
        Row: {
          id: number
          name: string
          owner_id: string
          book_club_id: number
        }
        Insert: {
          id?: number
          name: string
          owner_id: string
          book_club_id: number
        }
        Update: {
          id?: number
          name?: string
          owner_id?: string
          book_club_id?: number
        }
      }
      book_club_join_requests: {
        Row: {
          id: number
          created_at: string | null
          book_club_id: number | null
          invitee_id: string | null
          invitor_id: string | null
          title: string | null
          message: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          book_club_id?: number | null
          invitee_id?: string | null
          invitor_id?: string | null
          title?: string | null
          message?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          book_club_id?: number | null
          invitee_id?: string | null
          invitor_id?: string | null
          title?: string | null
          message?: string | null
        }
      }
      book_club_schedule: {
        Row: {
          id: number
          created_at: string | null
          book_club_id: number | null
          days:
            | Database['public']['Enums']['book_club_curriculum_schedule']
            | null
          start_time: string | null
          end_time: string | null
          title: string | null
          content: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          book_club_id?: number | null
          days?:
            | Database['public']['Enums']['book_club_curriculum_schedule']
            | null
          start_time?: string | null
          end_time?: string | null
          title?: string | null
          content?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          book_club_id?: number | null
          days?:
            | Database['public']['Enums']['book_club_curriculum_schedule']
            | null
          start_time?: string | null
          end_time?: string | null
          title?: string | null
          content?: string | null
        }
      }
      book_club_users: {
        Row: {
          id: number
          created_at: string | null
          user_id: string
          book_club_id: number
        }
        Insert: {
          id?: number
          created_at?: string | null
          user_id: string
          book_club_id: number
        }
        Update: {
          id?: number
          created_at?: string | null
          user_id?: string
          book_club_id?: number
        }
      }
      book_clubs: {
        Row: {
          id: number
          name: string | null
          image_url: string | null
          status: Database['public']['Enums']['book_club_status'] | null
          public: boolean | null
          created_at: string
          owner_id: string
          book_id: string
        }
        Insert: {
          id?: number
          name?: string | null
          image_url?: string | null
          status?: Database['public']['Enums']['book_club_status'] | null
          public?: boolean | null
          created_at?: string
          owner_id: string
          book_id: string
        }
        Update: {
          id?: number
          name?: string | null
          image_url?: string | null
          status?: Database['public']['Enums']['book_club_status'] | null
          public?: boolean | null
          created_at?: string
          owner_id?: string
          book_id?: string
        }
      }
      friends: {
        Row: {
          created_at: string | null
          invitee_id: string
          invitor_id: string
        }
        Insert: {
          created_at?: string | null
          invitee_id: string
          invitor_id: string
        }
        Update: {
          created_at?: string | null
          invitee_id?: string
          invitor_id?: string
        }
      }
      messages: {
        Row: {
          id: number
          inserted_at: string
          message: string | null
          user_id: string
          book_club_channel: number | null
        }
        Insert: {
          id?: number
          inserted_at?: string
          message?: string | null
          user_id: string
          book_club_channel?: number | null
        }
        Update: {
          id?: number
          inserted_at?: string
          message?: string | null
          user_id?: string
          book_club_channel?: number | null
        }
      }
      role_permissions: {
        Row: {
          id: number
          role: Database['public']['Enums']['app_role']
          permission: Database['public']['Enums']['app_permission']
        }
        Insert: {
          id?: number
          role: Database['public']['Enums']['app_role']
          permission: Database['public']['Enums']['app_permission']
        }
        Update: {
          id?: number
          role?: Database['public']['Enums']['app_role']
          permission?: Database['public']['Enums']['app_permission']
        }
      }
      user_roles: {
        Row: {
          id: number
          user_id: string
          role: Database['public']['Enums']['app_role']
        }
        Insert: {
          id?: number
          user_id: string
          role: Database['public']['Enums']['app_role']
        }
        Update: {
          id?: number
          user_id?: string
          role?: Database['public']['Enums']['app_role']
        }
      }
      users: {
        Row: {
          status: Database['public']['Enums']['user_status'] | null
          id: string
          updated_at: string | null
          username: string | null
          full_name: string | null
          avatar_url: string | null
          email: string | null
        }
        Insert: {
          status?: Database['public']['Enums']['user_status'] | null
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
        }
        Update: {
          status?: Database['public']['Enums']['user_status'] | null
          id?: string
          updated_at?: string | null
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          email?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission']
          user_id: string
        }
        Returns: boolean
      }
      install_available_extensions_and_test: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      app_permission: 'channels.delete' | 'messages.delete'
      app_role: 'admin' | 'owner' | 'moderator' | 'member'
      book_club_curriculum_schedule:
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday'
        | 'sunday'
      book_club_status: 'OPEN' | 'CLOSED'
      book_genre:
        | 'Magazine'
        | 'Novel'
        | 'Life'
        | 'Arts'
        | 'Comics'
        | 'Education & Reference'
        | 'Humanities & Social Sciences'
        | 'Science & Technology'
        | 'Kids'
        | 'Sports'
      user_status: 'ONLINE' | 'OFFLINE'
    }
  }
}
