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
  /** Optional client name. Only ever shown when `clientPermission` is true. */
  client?: string;
  /** Set true only once the client has agreed to be named publicly. */
  clientPermission?: boolean;
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
