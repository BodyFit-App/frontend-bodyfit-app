/**
 * Represents a JSON value, which can be a string, number, boolean, null, object, or array.
 * 
 * @typedef {string | number | boolean | null | { [key: string]: Json | undefined } | Json[]} Json
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

  /**
 * Represents the main structure of the database schema.
 * 
 * @typedef {Object} Database
 * @property {Object} public - The public schema of the database.
 */

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      categories_exercises: {
        Row: {
          category_id: number
          exercise_id: number
          profile_id: number | null
        }
        Insert: {
          category_id: number
          exercise_id: number
          profile_id?: number | null
        }
        Update: {
          category_id?: number
          exercise_id?: number
          profile_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_exercises_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_exercise_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "category_exercise_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises: {
        Row: {
          banner_image: string | null
          created_at: string
          description: string | null
          estimated_time_minutes: number | null
          id: number
          profile_id: number | null
          title: string
          visible: boolean
        }
        Insert: {
          banner_image?: string | null
          created_at?: string
          description?: string | null
          estimated_time_minutes?: number | null
          id?: number
          profile_id?: number | null
          title: string
          visible?: boolean
        }
        Update: {
          banner_image?: string | null
          created_at?: string
          description?: string | null
          estimated_time_minutes?: number | null
          id?: number
          profile_id?: number | null
          title?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "exercises_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      exercises_sessions: {
        Row: {
          exercise_id: number
          profile_id: number | null
          session_id: number
        }
        Insert: {
          exercise_id: number
          profile_id?: number | null
          session_id: number
        }
        Update: {
          exercise_id?: number
          profile_id?: number | null
          session_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "exercises_sessions_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exercises_sessions_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_exercises: {
        Row: {
          created_at: string
          exercise_id: number
          id: number
          profile_id: number
        }
        Insert: {
          created_at?: string
          exercise_id: number
          id?: number
          profile_id?: number
        }
        Update: {
          created_at?: string
          exercise_id?: number
          id?: number
          profile_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "favorite_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            isOneToOne: false
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_exercises_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_programs: {
        Row: {
          created_at: string
          id: number
          profile_id: number
          program_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          profile_id?: number
          program_id: number
        }
        Update: {
          created_at?: string
          id?: number
          profile_id?: number
          program_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "favorite_programs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorite_programs_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      followings: {
        Row: {
          created_at: string
          followee_id: number
          id: number
          profile_id: number | null
        }
        Insert: {
          created_at?: string
          followee_id: number
          id?: number
          profile_id?: number | null
        }
        Update: {
          created_at?: string
          followee_id?: number
          id?: number
          profile_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "followings_followee_id_fkey"
            columns: ["followee_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "followings_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      goals: {
        Row: {
          achieved: string | null
          banner_image: string | null
          created_at: string
          date_end: string | null
          date_start: string | null
          description: string | null
          id: number
          profile_id: number | null
          program_id: number | null
          title: string
          visible: boolean
        }
        Insert: {
          achieved?: string | null
          banner_image?: string | null
          created_at?: string
          date_end?: string | null
          date_start?: string | null
          description?: string | null
          id?: number
          profile_id?: number | null
          program_id?: number | null
          title: string
          visible?: boolean
        }
        Update: {
          achieved?: string | null
          banner_image?: string | null
          created_at?: string
          date_end?: string | null
          date_start?: string | null
          description?: string | null
          id?: number
          profile_id?: number | null
          program_id?: number | null
          title?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "goals_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "goals_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          firstname: string | null
          id: number
          lastname: string | null
          pseudo: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          firstname?: string | null
          id?: number
          lastname?: string | null
          pseudo?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          firstname?: string | null
          id?: number
          lastname?: string | null
          pseudo?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          created_at: string
          description: string | null
          id: number
          profile_id: number | null
          title: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          profile_id?: number | null
          title: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          profile_id?: number | null
          title?: string
          visible?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "programs_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          created_at: string
          description: string | null
          id: number
          profile_id: number | null
          program_id: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          profile_id?: number | null
          program_id?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          profile_id?: number | null
          program_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      steps: {
        Row: {
          achieved: boolean
          created_at: string
          description: string | null
          goal_id: number | null
          id: number
          profile_id: number | null
          title: string
        }
        Insert: {
          achieved?: boolean
          created_at?: string
          description?: string | null
          goal_id?: number | null
          id?: number
          profile_id?: number | null
          title: string
        }
        Update: {
          achieved?: boolean
          created_at?: string
          description?: string | null
          goal_id?: number | null
          id?: number
          profile_id?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "steps_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "steps_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      progress: {
        Row: {
          name: string | null
          repetition_count: number | null
          total_estimated_time: number | null
        }
        Relationships: []
      }
      user_content: {
        Row: {
          avatar_url: string | null
          firstname: string | null
          id: number | null
          lastname: string | null
          profile_id: number | null
          pseudo: string | null
          time: string | null
          title: string | null
          type: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      delete_user: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_profile_id: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

/**
 * Utility types to infer the row type of a table or view from the public schema.
 * 
 * @template PublicTableNameOrOptions - The name of the public table or an options object containing the schema.
 */

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

/**
 * Utility type to infer the insertable type for a table from the public schema.
 * 
 * @template PublicTableNameOrOptions - The name of the public table or an options object containing the schema.
 */

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

    /**
 * Utility type to infer the update type for a table from the public schema.
 * 
 * @template PublicTableNameOrOptions - The name of the public table or an options object containing the schema.
 */

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

/**
 * Utility type to infer the types for enums from the public schema.
 * 
 * @template PublicEnumNameOrOptions - The name of the public enum or an options object containing the schema.
 */

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
