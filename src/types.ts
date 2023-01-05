import { Database } from '@/database.types';

export type DatabaseUser = Database['public']['Tables']['users']['Row']

export interface CurrentAppUser extends DatabaseUser {}
