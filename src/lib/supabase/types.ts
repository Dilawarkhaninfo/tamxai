export type UserRole = 'admin' | 'editor' | 'viewer'
export type UserStatus = 'active' | 'inactive' | 'suspended'
export type PostStatus = 'published' | 'draft' | 'scheduled' | 'archived'
export type ProjectStatus = 'published' | 'draft' | 'archived'
export type SubmissionStatus = 'new' | 'in_review' | 'contacted' | 'closed'
export type MediaKind = 'image' | 'vector' | 'document' | 'video' | 'code' | 'audio' | 'other'

export interface Profile {
  id: string
  email: string
  full_name: string
  role: UserRole
  status: UserStatus
  avatar_url: string | null
  last_login_at: string | null
  created_at: string
  updated_at: string
}

export interface Service {
  id: string
  title: string
  slug: string
  icon: string
  href: string
  description: string
  is_published: boolean
  position: number
  created_at: string
  updated_at: string
  service_capabilities?: ServiceCapability[]
}

export interface ServiceCapability {
  id: string
  service_id: string
  label: string
  position: number
}

export interface Product {
  id: string
  title: string
  slug: string
  icon: string
  href: string
  description: string
  is_published: boolean
  position: number
  hero_image: string | null
  created_at: string
  updated_at: string
}

export interface PricingPlan {
  id: string
  plan_name: string
  description: string
  price: string
  currency: string
  billing_cycle: string
  button_text: string
  is_popular: boolean
  is_active: boolean
  position: number
  created_at: string
  updated_at: string
  plan_features?: PlanFeature[]
}

export interface PlanFeature {
  id: string
  plan_id: string
  label: string
  position: number
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  position: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  category_id: string | null
  cover_url: string | null
  author_id: string | null
  author_name: string
  excerpt: string
  content_html: string
  read_minutes: number
  status: PostStatus
  is_featured: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  blog_categories?: BlogCategory
}

export interface TeamMember {
  id: string
  full_name: string
  role: string
  company: string
  category: string
  description: string
  quote: string | null
  is_founder: boolean
  avatar_url: string | null
  position: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  title: string
  slug: string
  industry: string
  description: string
  cover_url: string | null
  status: ProjectStatus
  published_at: string | null
  position: number
  created_at: string
  updated_at: string
  project_images?: ProjectImage[]
}

export interface ProjectImage {
  id: string
  project_id: string
  url: string
  alt: string | null
  position: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  body: string
  rating: number
  avatar_url: string | null
  position: number
  is_active: boolean
  created_at: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  position: number
  is_active: boolean
}

export interface MediaAsset {
  id: string
  bucket: string
  path: string
  filename: string
  mime: string
  kind: MediaKind
  size_bytes: number
  width: number | null
  height: number | null
  alt_text: string | null
  uploaded_by: string | null
  created_at: string
}

export interface SiteSettings {
  id: number
  contact_email: string
  contact_phone: string
  contact_address: string
  social_linkedin: string | null
  social_instagram: string | null
  social_facebook: string | null
  social_twitter: string | null
  meta_title: string | null
  meta_description: string | null
  updated_at: string
  updated_by: string | null
}

export interface ContactSubmission {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string | null
  country_code: string | null
  service: string | null
  budget: string | null
  message: string
  status: SubmissionStatus
  source: string
  created_at: string
}

export interface ActivityLog {
  id: number
  actor_id: string | null
  actor_name: string | null
  entity: string
  entity_id: string | null
  action: string
  meta: Record<string, unknown>
  created_at: string
}

export interface TrustedClient {
  id: string
  name: string
  logo_url: string | null
  position: number
  is_active: boolean
}

// Supabase Database type map
export interface Database {
  public: {
    Tables: {
      profiles: { Row: Profile; Insert: Omit<Profile, 'created_at' | 'updated_at'>; Update: Partial<Profile> }
      services: { Row: Service; Insert: Omit<Service, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Service> }
      service_capabilities: { Row: ServiceCapability; Insert: Omit<ServiceCapability, 'id'>; Update: Partial<ServiceCapability> }
      products: { Row: Product; Insert: Omit<Product, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Product> }
      pricing_plans: { Row: PricingPlan; Insert: Omit<PricingPlan, 'id' | 'created_at' | 'updated_at'>; Update: Partial<PricingPlan> }
      plan_features: { Row: PlanFeature; Insert: Omit<PlanFeature, 'id'>; Update: Partial<PlanFeature> }
      blog_categories: { Row: BlogCategory; Insert: Omit<BlogCategory, 'id'>; Update: Partial<BlogCategory> }
      blog_posts: { Row: BlogPost; Insert: Omit<BlogPost, 'id' | 'created_at' | 'updated_at'>; Update: Partial<BlogPost> }
      team_members: { Row: TeamMember; Insert: Omit<TeamMember, 'id' | 'created_at' | 'updated_at'>; Update: Partial<TeamMember> }
      projects: { Row: Project; Insert: Omit<Project, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Project> }
      project_images: { Row: ProjectImage; Insert: Omit<ProjectImage, 'id'>; Update: Partial<ProjectImage> }
      testimonials: { Row: Testimonial; Insert: Omit<Testimonial, 'id' | 'created_at'>; Update: Partial<Testimonial> }
      faq_items: { Row: FaqItem; Insert: Omit<FaqItem, 'id'>; Update: Partial<FaqItem> }
      media_assets: { Row: MediaAsset; Insert: Omit<MediaAsset, 'id' | 'created_at'>; Update: Partial<MediaAsset> }
      site_settings: { Row: SiteSettings; Insert: Omit<SiteSettings, 'updated_at'>; Update: Partial<SiteSettings> }
      contact_submissions: { Row: ContactSubmission; Insert: Omit<ContactSubmission, 'id' | 'created_at'>; Update: Partial<ContactSubmission> }
      activity_log: { Row: ActivityLog; Insert: Omit<ActivityLog, 'id' | 'created_at'>; Update: never }
      trusted_clients: { Row: TrustedClient; Insert: Omit<TrustedClient, 'id'>; Update: Partial<TrustedClient> }
    }
  }
}
