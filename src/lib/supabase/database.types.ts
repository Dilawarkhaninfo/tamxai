export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      activity_log: {
        Row: {
          action: string
          actor_id: string | null
          actor_name: string | null
          created_at: string
          entity: string
          entity_id: string | null
          id: number
          meta: Json
        }
        Insert: {
          action: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          entity: string
          entity_id?: string | null
          id?: never
          meta?: Json
        }
        Update: {
          action?: string
          actor_id?: string | null
          actor_name?: string | null
          created_at?: string
          entity?: string
          entity_id?: string | null
          id?: never
          meta?: Json
        }
        Relationships: [
          {
            foreignKeyName: "activity_log_actor_id_fkey"
            columns: ["actor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_categories: {
        Row: {
          id: string
          name: string
          position: number
          slug: string
        }
        Insert: {
          id?: string
          name: string
          position?: number
          slug: string
        }
        Update: {
          id?: string
          name?: string
          position?: number
          slug?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          author_name: string
          category_id: string | null
          content_html: string
          cover_url: string | null
          created_at: string
          excerpt: string
          id: string
          is_featured: boolean
          published_at: string | null
          read_minutes: number
          slug: string
          status: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          author_name: string
          category_id?: string | null
          content_html?: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          is_featured?: boolean
          published_at?: string | null
          read_minutes?: number
          slug: string
          status?: Database["public"]["Enums"]["post_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          author_name?: string
          category_id?: string | null
          content_html?: string
          cover_url?: string | null
          created_at?: string
          excerpt?: string
          id?: string
          is_featured?: boolean
          published_at?: string | null
          read_minutes?: number
          slug?: string
          status?: Database["public"]["Enums"]["post_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          budget: string | null
          country_code: string | null
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          message: string
          phone: string | null
          service: string | null
          source: string | null
          status: Database["public"]["Enums"]["submission_status"]
        }
        Insert: {
          budget?: string | null
          country_code?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          message: string
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
        }
        Update: {
          budget?: string | null
          country_code?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          message?: string
          phone?: string | null
          service?: string | null
          source?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          answer: string
          id: string
          is_active: boolean
          position: number
          question: string
        }
        Insert: {
          answer: string
          id?: string
          is_active?: boolean
          position?: number
          question: string
        }
        Update: {
          answer?: string
          id?: string
          is_active?: boolean
          position?: number
          question?: string
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt_text: string | null
          bucket: string
          created_at: string
          filename: string
          height: number | null
          id: string
          kind: Database["public"]["Enums"]["media_kind"]
          mime: string
          path: string
          size_bytes: number
          uploaded_by: string | null
          width: number | null
        }
        Insert: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          filename: string
          height?: number | null
          id?: string
          kind: Database["public"]["Enums"]["media_kind"]
          mime: string
          path: string
          size_bytes: number
          uploaded_by?: string | null
          width?: number | null
        }
        Update: {
          alt_text?: string | null
          bucket?: string
          created_at?: string
          filename?: string
          height?: number | null
          id?: string
          kind?: Database["public"]["Enums"]["media_kind"]
          mime?: string
          path?: string
          size_bytes?: number
          uploaded_by?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "media_assets_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      meeting_bookings: {
        Row: {
          company: string | null
          created_at: string
          duration_min: number
          email: string
          full_name: string
          id: string
          notes: string | null
          scheduled_at: string
          status: Database["public"]["Enums"]["booking_status"]
          topic: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          duration_min?: number
          email: string
          full_name: string
          id?: string
          notes?: string | null
          scheduled_at: string
          status?: Database["public"]["Enums"]["booking_status"]
          topic?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          duration_min?: number
          email?: string
          full_name?: string
          id?: string
          notes?: string | null
          scheduled_at?: string
          status?: Database["public"]["Enums"]["booking_status"]
          topic?: string
        }
        Relationships: []
      }
      plan_features: {
        Row: {
          id: string
          label: string
          plan_id: string
          position: number
        }
        Insert: {
          id?: string
          label: string
          plan_id: string
          position?: number
        }
        Update: {
          id?: string
          label?: string
          plan_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "plan_features_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "pricing_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing_plans: {
        Row: {
          billing_cycle: string
          button_text: string
          created_at: string
          currency: string
          description: string
          id: string
          is_active: boolean
          is_popular: boolean
          plan_name: string
          position: number
          price: string
          updated_at: string
        }
        Insert: {
          billing_cycle?: string
          button_text?: string
          created_at?: string
          currency?: string
          description?: string
          id?: string
          is_active?: boolean
          is_popular?: boolean
          plan_name: string
          position?: number
          price: string
          updated_at?: string
        }
        Update: {
          billing_cycle?: string
          button_text?: string
          created_at?: string
          currency?: string
          description?: string
          id?: string
          is_active?: boolean
          is_popular?: boolean
          plan_name?: string
          position?: number
          price?: string
          updated_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          created_at: string
          description: string
          hero_image: string | null
          href: string
          icon: string
          id: string
          is_published: boolean
          position: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          hero_image?: string | null
          href: string
          icon: string
          id?: string
          is_published?: boolean
          position?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          hero_image?: string | null
          href?: string
          icon?: string
          id?: string
          is_published?: boolean
          position?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          last_login_at: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_status"]
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          full_name: string
          id: string
          last_login_at?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          last_login_at?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string
        }
        Relationships: []
      }
      project_images: {
        Row: {
          alt: string | null
          id: string
          position: number
          project_id: string
          url: string
        }
        Insert: {
          alt?: string | null
          id?: string
          position?: number
          project_id: string
          url: string
        }
        Update: {
          alt?: string | null
          id?: string
          position?: number
          project_id?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_images_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          cover_url: string | null
          created_at: string
          description: string
          id: string
          industry: string
          position: number
          published_at: string | null
          slug: string
          status: Database["public"]["Enums"]["project_status"]
          title: string
          updated_at: string
        }
        Insert: {
          cover_url?: string | null
          created_at?: string
          description?: string
          id?: string
          industry: string
          position?: number
          published_at?: string | null
          slug: string
          status?: Database["public"]["Enums"]["project_status"]
          title: string
          updated_at?: string
        }
        Update: {
          cover_url?: string | null
          created_at?: string
          description?: string
          id?: string
          industry?: string
          position?: number
          published_at?: string | null
          slug?: string
          status?: Database["public"]["Enums"]["project_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      service_capabilities: {
        Row: {
          id: string
          label: string
          position: number
          service_id: string
        }
        Insert: {
          id?: string
          label: string
          position?: number
          service_id: string
        }
        Update: {
          id?: string
          label?: string
          position?: number
          service_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_capabilities_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          created_at: string
          description: string
          href: string
          icon: string
          id: string
          is_published: boolean
          position: number
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          href?: string
          icon: string
          id?: string
          is_published?: boolean
          position?: number
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          href?: string
          icon?: string
          id?: string
          is_published?: boolean
          position?: number
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          contact_address: string
          contact_email: string
          contact_phone: string
          id: number
          meta_description: string | null
          meta_title: string | null
          social_facebook: string | null
          social_instagram: string | null
          social_linkedin: string | null
          social_twitter: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          contact_address?: string
          contact_email?: string
          contact_phone?: string
          id?: number
          meta_description?: string | null
          meta_title?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          contact_address?: string
          contact_email?: string
          contact_phone?: string
          id?: number
          meta_description?: string | null
          meta_title?: string | null
          social_facebook?: string | null
          social_instagram?: string | null
          social_linkedin?: string | null
          social_twitter?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "site_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          avatar_url: string | null
          category: string
          company: string
          created_at: string
          description: string
          full_name: string
          id: string
          is_active: boolean
          is_founder: boolean
          position: number
          quote: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          category?: string
          company?: string
          created_at?: string
          description?: string
          full_name: string
          id?: string
          is_active?: boolean
          is_founder?: boolean
          position?: number
          quote?: string | null
          role: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          category?: string
          company?: string
          created_at?: string
          description?: string
          full_name?: string
          id?: string
          is_active?: boolean
          is_founder?: boolean
          position?: number
          quote?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          avatar_url: string | null
          body: string
          company: string
          created_at: string
          id: string
          is_active: boolean
          name: string
          position: number
          rating: number
          role: string
        }
        Insert: {
          avatar_url?: string | null
          body: string
          company: string
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          position?: number
          rating?: number
          role: string
        }
        Update: {
          avatar_url?: string | null
          body?: string
          company?: string
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          position?: number
          rating?: number
          role?: string
        }
        Relationships: []
      }
      trusted_clients: {
        Row: {
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          position: number
        }
        Insert: {
          id: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          position?: number
        }
        Update: {
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          position?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
    }
    Enums: {
      booking_status: "pending" | "confirmed" | "cancelled" | "completed"
      media_kind: "image" | "vector" | "document" | "video" | "code" | "audio" | "other"
      post_status: "published" | "draft" | "scheduled" | "archived"
      project_status: "published" | "draft" | "archived"
      submission_status: "new" | "in_review" | "contacted" | "closed"
      user_role: "admin" | "editor" | "viewer"
      user_status: "active" | "inactive" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
