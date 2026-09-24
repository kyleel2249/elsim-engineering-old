import { Project } from '@/types';

// PROVISIONAL: no verified project photography or descriptions were
// extractable from the source material. These entries are illustrative
// placeholders in the correct shape/format for real projects to replace.
export const projects: Project[] = [
  {
    slug: 'commercial-fit-out-accra',
    title: 'Commercial Electrical Fit-Out',
    sector: 'Commercial',
    location: 'Accra, Greater Accra',
    year: '2024',
    summary:
      'Full electrical fit-out for a multi-tenant office building, including distribution, backup power and low-voltage cabling.',
    detail:
      'Placeholder case study describing scope, challenges and outcomes once ELSIM confirms a real reference project and grants permission to publish it.',
    scope: ['LV distribution', 'Generator + ATS', 'Structured cabling', 'Lighting design'],
    status: 'provisional'
  },
  {
    slug: 'warehouse-steel-frame',
    title: 'Warehouse Steel Frame & Mezzanine',
    sector: 'Industrial',
    location: 'Tema, Greater Accra',
    year: '2023',
    summary:
      'Structural design and fabrication of a steel-frame warehouse extension with a mezzanine storage level.',
    detail:
      'Placeholder case study. Replace with verified scope, photos and outcomes once available from ELSIM management.',
    scope: ['Structural analysis', 'Steel fabrication', 'Mezzanine design', 'Site supervision'],
    status: 'provisional'
  },
  {
    slug: 'solar-hybrid-backup',
    title: 'Solar-Hybrid Backup Power',
    sector: 'Power',
    location: 'Kumasi, Ashanti',
    year: '2024',
    summary:
      'Hybrid solar-battery-generator system designed to cut grid dependency for a light-manufacturing facility.',
    detail:
      'Placeholder case study. Replace with verified system sizing, savings figures and photos once available from ELSIM management.',
    scope: ['Load study', 'Solar array design', 'Battery + ATS integration', 'Remote monitoring'],
    status: 'provisional'
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/**
 * Projects that are real, approved case studies. Provisional entries are
 * placeholders: their pages stay reachable, but they are kept out of the
 * sitemap (and marked noindex on the page) until ELSIM confirms the project
 * and changes `status` to 'completed' or 'ongoing'.
 */
export function getPublishedProjects(): Project[] {
  return projects.filter((p) => p.status !== 'provisional');
}
