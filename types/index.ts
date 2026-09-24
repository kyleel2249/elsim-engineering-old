export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  capabilities: string[];
  spec: { label: string; value: string }[];
  icon: ServiceIcon;
}

export type ServiceIcon =
  | 'circuit'
  | 'structure'
  | 'gears'
  | 'power'
  | 'blueprint'
  | 'maintenance';

export interface Project {
  slug: string;
  title: string;
  sector: string;
  location: string;
  year: string;
  summary: string;
  detail: string;
  scope: string[];
  status: 'completed' | 'ongoing' | 'provisional';
}

export interface QuotationPayload {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  serviceSlug: string;
  projectLocation: string;
  budgetRange: string;
  timeline: string;
  description: string;
  consent: boolean;
}

export interface QuotationRecord extends QuotationPayload {
  id: string;
  submittedAt: string;
  reference: string;
}
