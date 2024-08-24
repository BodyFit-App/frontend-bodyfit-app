export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
        }
        Insert: {
          category_id: number
          exercise_id: number
        }
        Update: {
          category_id?: number
          exercise_id?: number
        }
        Relationships: [
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
          description: Json | null
          estimated_time_seconds: number | null
          id: number
          profile_id: number | null
          title: string
          visible: boolean
        }
        Insert: {
          banner_image?: string | null
          created_at?: string
          description?: Json | null
          estimated_time_seconds?: number | null
          id?: number
          profile_id?: number | null
          title: string
          visible?: boolean
        }
        Update: {
          banner_image?: string | null
          created_at?: string
          description?: Json | null
          estimated_time_seconds?: number | null
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
          session_id: number
        }
        Insert: {
          exercise_id: number
          session_id: number
        }
        Update: {
          exercise_id?: number
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
          profile_id: number | null
        }
        Insert: {
          created_at?: string
          exercise_id: number
          profile_id?: number | null
        }
        Update: {
          created_at?: string
          exercise_id?: number
          profile_id?: number | null
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
          profile_id: number | null
          program_id: number
        }
        Insert: {
          created_at?: string
          profile_id?: number | null
          program_id: number
        }
        Update: {
          created_at?: string
          profile_id?: number | null
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
          profile_id: number
        }
        Insert: {
          created_at?: string
          followee_id: number
          id?: number
          profile_id: number
        }
        Update: {
          created_at?: string
          followee_id?: number
          id?: number
          profile_id?: number
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
          created_at: string
          date_end: string | null
          date_start: string | null
          description: Json | null
          id: number
          profile_id: number | null
          program_id: number | null
          title: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          date_end?: string | null
          date_start?: string | null
          description?: Json | null
          id?: number
          profile_id?: number | null
          program_id?: number | null
          title: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          date_end?: string | null
          date_start?: string | null
          description?: Json | null
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
          avatar: string | null
          created_at: string
          id: number
          pseudo: string
          user_id: string
        }
        Insert: {
          avatar?: string | null
          created_at?: string
          id?: number
          pseudo: string
          user_id?: string
        }
        Update: {
          avatar?: string | null
          created_at?: string
          id?: number
          pseudo?: string
          user_id?: string
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
          description: Json | null
          id: number
          profile_id: number | null
          title: string
          visible: boolean
        }
        Insert: {
          created_at?: string
          description?: Json | null
          id?: number
          profile_id?: number | null
          title: string
          visible?: boolean
        }
        Update: {
          created_at?: string
          description?: Json | null
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
          description: Json | null
          id: number
          program_id: number | null
          title: string
        }
        Insert: {
          created_at?: string
          description?: Json | null
          id?: number
          program_id?: number | null
          title: string
        }
        Update: {
          created_at?: string
          description?: Json | null
          id?: number
          program_id?: number | null
          title?: string
        }
        Relationships: [
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
          description: Json | null
          goal_id: number | null
          id: number
        }
        Insert: {
          achieved?: boolean
          created_at?: string
          description?: Json | null
          goal_id?: number | null
          id?: number
        }
        Update: {
          achieved?: boolean
          created_at?: string
          description?: Json | null
          goal_id?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "steps_goal_id_fkey"
            columns: ["goal_id"]
            isOneToOne: false
            referencedRelation: "goals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
