export type UserRole = "admin" | "builder" | "client";

export interface User {
  id: string;
  full_name: string;
  email: string;
  role: UserRole;
  is_active: boolean;
  created_at: string;
}

export type ProjectStatus =
  | "planning"
  | "in_progress"
  | "on_hold"
  | "completed";

export interface Project {
  id: string;
  name: string;
  description: string | null;
  location: string | null;
  status: ProjectStatus;
  overall_progress: number;
  start_date: string | null;
  expected_end_date: string | null;
  client_id: string;
  builder_id: string;
  created_at: string;
  updated_at: string;
}

export type WorkCategory =
  | "foundation"
  | "framing"
  | "roofing"
  | "plumbing"
  | "electrical"
  | "painting"
  | "flooring"
  | "windows_doors"
  | "finishing"
  | "other";

export interface Update {
  id: string;
  title: string;
  description: string | null;
  category: WorkCategory;
  progress_percentage: number;
  photo_urls: string[];
  project_id: string;
  posted_by: string;
  created_at: string;
}

export type MaterialType =
  | "lumber"
  | "cement"
  | "bricks"
  | "steel"
  | "paint"
  | "tiles"
  | "plumbing_pipes"
  | "electrical_wire"
  | "glass"
  | "sand"
  | "gravel"
  | "other";

export interface Material {
  id: string;
  material_type: MaterialType;
  name: string;
  quantity: number;
  unit: string;
  unit_cost: number;
  total_cost: number;
  supplier: string | null;
  project_id: string;
  purchased_at: string;
  created_at: string;
}

export interface Token {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface CreateProjectRequest {
  name: string;
  description: string | null;
  location: string | null;
  client_id: string;
  start_date: string | null;
  expected_end_date: string | null;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string | null;
  location?: string | null;
  status?: ProjectStatus;
  overall_progress?: number;
  expected_end_date?: string | null;
}

export interface CreateUpdateRequest {
  title: string;
  description: string | null;
  category: WorkCategory;
  progress_percentage: number;
  photo_urls: string[];
  project_id: string;
}

export interface CreateMaterialRequest {
  material_type: MaterialType;
  name: string;
  quantity: number;
  unit: string;
  unit_cost: number;
  supplier: string | null;
  project_id: string;
}
