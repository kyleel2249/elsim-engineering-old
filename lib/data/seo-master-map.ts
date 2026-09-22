/**
 * ELSIM SEO Keyword Master Map
 *
 * Primary → secondary → long-tail → target page → H1 → meta title/description
 * → URL slug → image ALT keywords.
 *
 * Use getSeoTarget() / keywordsForPath() when building page metadata.
 * Prefer natural placement in titles and body copy; avoid stuffing.
 */

export type SeoTarget = {
  id: string;
  /** Tier-1 focus phrase for the page */
  primary: string;
  secondary: string[];
  longTail: string[];
  /** App path (with trailing slash except home uses '/') */
  path: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  slug: string;
  imageAltKeywords: string[];
};

export const SEO_MASTER_MAP: SeoTarget[] = [
  // —— Home ——
  {
    id: 'home',
    primary: 'ELSIM Engineering',
    secondary: [
      'electrical engineering company Ghana',
      'electrical installations',
      'solar power solutions',
      'power distribution',
      'transformer projects',
      'electrical maintenance',
      'West Africa engineering',
    ],
    longTail: [
      'electrical engineering firm in Ghana',
      'electrical contractor in Accra',
      'power infrastructure West Africa',
      'engineering services Ghana and West Africa',
    ],
    path: '/',
    h1: 'Electrical, energy and industrial engineering across Ghana and West Africa',
    metaTitle:
      'ELSIM Engineering | Electrical Engineering, Solar & Power Distribution in Ghana',
    metaDescription:
      'ELSIM Engineering Firm designs, installs, tests and maintains electrical systems, solar PV, transformers and power distribution for commercial and industrial clients in Accra, Ghana and West Africa.',
    slug: '',
    imageAltKeywords: [
      'ELSIM Engineering electrical team Ghana',
      'power infrastructure West Africa',
      'solar and electrical installation',
    ],
  },

  // —— Services index ——
  {
    id: 'services',
    primary: 'Engineering services',
    secondary: [
      'electrical engineering services',
      'energy solutions',
      'industrial solutions',
      'technical services',
      'professional engineering',
    ],
    longTail: [
      'electrical engineering services Accra',
      'engineering services West Africa',
      'industrial electrical services Ghana',
    ],
    path: '/services/',
    h1: 'Electrical, energy and industrial engineering services',
    metaTitle: 'Engineering Services | Electrical, Solar & Power | ELSIM Ghana',
    metaDescription:
      'Electrical installations, solar photovoltaic systems, inspection and maintenance, power distribution, transformer projects and electrical consulting from ELSIM Engineering in Ghana and West Africa.',
    slug: 'services',
    imageAltKeywords: [
      'electrical engineering services Ghana',
      'ELSIM technical solutions',
    ],
  },

  // —— Service lines ——
  {
    id: 'service-electrical-installations',
    primary: 'Electrical installations',
    secondary: [
      'electrical system design',
      'electrical system installation',
      'commercial electrical installation',
      'industrial electrical installation',
      'residential electrical installation',
      'electrical commissioning',
      'electrical testing',
      'building electrical systems',
    ],
    longTail: [
      'electrical installation company Ghana',
      'electrical installation services Ghana',
      'industrial electrical contractor Ghana',
      'commercial electrical contractor Ghana',
      'residential electrical installation Ghana',
    ],
    path: '/services/electrical-installations/',
    h1: 'Electrical installations for commercial, industrial and residential facilities',
    metaTitle: 'Electrical Installations in Ghana & West Africa | ELSIM Engineering',
    metaDescription:
      'Professional electrical system design, installation, testing and commissioning for commercial, industrial and residential facilities. ELSIM Engineering — Accra, Ghana and West Africa.',
    slug: 'electrical-installations',
    imageAltKeywords: [
      'electrical installation Ghana',
      'switchgear and distribution panels',
      'electrical wiring and commissioning',
    ],
  },
  {
    id: 'service-solar',
    primary: 'Solar power solutions',
    secondary: [
      'solar installation',
      'solar photovoltaic',
      'PV systems',
      'renewable energy solutions',
      'solar system design',
      'commercial solar',
      'industrial solar',
      'solar engineering',
    ],
    longTail: [
      'solar installation company Ghana',
      'solar power solutions Ghana',
      'solar PV installation Ghana',
      'solar engineering West Africa',
      'industrial solar installation',
    ],
    path: '/services/solar-power-solutions/',
    h1: 'Solar power solutions — design, supply and installation of PV systems',
    metaTitle: 'Solar Power Solutions & PV Installation | ELSIM Engineering Ghana',
    metaDescription:
      'Design, supply and installation of solar photovoltaic systems for commercial and industrial clients. Renewable energy solutions from ELSIM Engineering across Ghana and West Africa.',
    slug: 'solar-power-solutions',
    imageAltKeywords: [
      'solar PV installation Ghana',
      'industrial solar power system',
      'photovoltaic panels installation',
    ],
  },
  {
    id: 'service-maintenance',
    primary: 'Electrical inspection and maintenance',
    secondary: [
      'preventive maintenance',
      'electrical fault diagnosis',
      'electrical troubleshooting',
      'system reliability',
      'electrical servicing',
      'equipment maintenance',
    ],
    longTail: [
      'electrical maintenance company Ghana',
      'electrical inspection services Ghana',
      'preventive electrical maintenance Accra',
    ],
    path: '/services/electrical-maintenance/',
    h1: 'Electrical inspection and preventive maintenance',
    metaTitle: 'Electrical Inspection & Maintenance Ghana | ELSIM Engineering',
    metaDescription:
      'Preventive maintenance, inspections, fault diagnosis and testing to keep electrical systems reliable. ELSIM Engineering maintenance support across Ghana and West Africa.',
    slug: 'electrical-maintenance',
    imageAltKeywords: [
      'electrical inspection Ghana',
      'preventive maintenance electrical systems',
    ],
  },
  {
    id: 'service-power-distribution',
    primary: 'Power distribution and transformer projects',
    secondary: [
      'power distribution systems',
      'distribution networks',
      'transformer installation',
      'utility infrastructure',
      'rural electrification',
      'service line extension',
      'power infrastructure',
    ],
    longTail: [
      'power distribution company Ghana',
      'transformer installation company Ghana',
      'power infrastructure West Africa',
      'rural electrification West Africa',
    ],
    path: '/services/power-distribution/',
    h1: 'Power distribution networks and transformer projects',
    metaTitle: 'Power Distribution & Transformer Projects | ELSIM Engineering',
    metaDescription:
      'Power distribution systems, transformer installation and testing, network lines and electrification works. ELSIM Engineering delivers power infrastructure across Ghana and West Africa.',
    slug: 'power-distribution',
    imageAltKeywords: [
      'power distribution network Ghana',
      'transformer installation West Africa',
      'overhead power lines and distribution poles',
    ],
  },
  {
    id: 'service-consulting',
    primary: 'Electrical consulting and audits',
    secondary: [
      'electrical consultancy',
      'technical advisory services',
      'engineering consulting',
      'electrical system assessment',
      'power consulting',
    ],
    longTail: [
      'electrical consulting company Ghana',
      'electrical audit services Ghana',
      'engineering consultancy Accra',
    ],
    path: '/services/electrical-consulting/',
    h1: 'Independent electrical consulting, audits and technical advisory',
    metaTitle: 'Electrical Consulting & Audits Ghana | ELSIM Engineering',
    metaDescription:
      'Independent electrical consulting, system audits and technical advisory for commercial and industrial clients. Professional engineering advice from ELSIM Engineering in Ghana.',
    slug: 'electrical-consulting',
    imageAltKeywords: [
      'electrical audit Ghana',
      'engineering consulting Accra',
    ],
  },

  // —— Projects index ——
  {
    id: 'projects',
    primary: 'Engineering projects',
    secondary: [
      'electrical projects',
      'power projects',
      'solar projects',
      'transformer projects',
      'industrial projects',
      'infrastructure project',
    ],
    longTail: [
      'electrical engineering projects Ghana',
      'transformer installation projects West Africa',
      'solar installation projects Burkina Faso',
    ],
    path: '/projects/',
    h1: 'Verified electrical, solar and power infrastructure projects',
    metaTitle: 'Projects | Transformer, Solar & Power Works | ELSIM Engineering',
    metaDescription:
      'Selected ELSIM Engineering projects: rural electrification in Togo, 800KVA transformer works in Aného and Abidjan, solar for industry in Ouagadougou, and service line extension in Oyarifa, Ghana.',
    slug: 'projects',
    imageAltKeywords: [
      'ELSIM engineering project West Africa',
      'transformer and solar installation project',
    ],
  },

  // —— Flagship projects ——
  {
    id: 'project-togo-rural',
    primary: 'Rural electrification Togo',
    secondary: [
      'Togo power distribution',
      'Government of Togo electrical project',
      'electrification',
      'distribution networks',
    ],
    longTail: [
      'Togo rural electrification',
      'electrical contractor Togo',
      'power distribution Togo',
    ],
    path: '/projects/togo-rural-electrification/',
    h1: 'Rural electrification project for the Government of Togo',
    metaTitle: 'Rural Electrification Togo | ELSIM Engineering Project',
    metaDescription:
      'Rural electrification works delivered for the Government of Togo by ELSIM Engineering — power distribution and electrical infrastructure for communities.',
    slug: 'togo-rural-electrification',
    imageAltKeywords: [
      'rural electrification Togo',
      'power distribution network Togo',
    ],
  },
  {
    id: 'project-aneho',
    primary: '800KVA transformer Aného',
    secondary: [
      'transformer installation Togo',
      'industrial machine installation',
      'Aného Togo',
      'distribution transformers',
    ],
    longTail: [
      '800KVA transformer installation Aného',
      'transformer installation Togo',
      'industrial electrical installation Togo',
    ],
    path: '/projects/aneho-transformer-800kva/',
    h1: 'Industrial machine and 800KVA transformer installation in Aného, Togo',
    metaTitle: '800KVA Transformer Installation Aného, Togo | ELSIM',
    metaDescription:
      'Industrial machinery and 800KVA transformer installation in Aného, Togo by ELSIM Engineering — power infrastructure for industrial facilities.',
    slug: 'aneho-transformer-800kva',
    imageAltKeywords: [
      '800KVA transformer Aného Togo',
      'industrial transformer installation',
    ],
  },
  {
    id: 'project-abidjan',
    primary: '800KVA transformer Abidjan',
    secondary: [
      "transformer installation Côte d'Ivoire",
      'Abidjan electrical engineering',
      'power transformers',
    ],
    longTail: [
      '800KVA transformer installation Abidjan',
      "transformer installation Côte d'Ivoire",
      'Ivory Coast electrical contractor',
    ],
    path: '/projects/abidjan-transformer-800kva/',
    h1: "800KVA transformer installation in Abidjan, Côte d'Ivoire",
    metaTitle: "800KVA Transformer Abidjan, Côte d'Ivoire | ELSIM Engineering",
    metaDescription:
      "Transformer installation project in Abidjan, Côte d'Ivoire. ELSIM Engineering delivers power transformer works for industrial clients across West Africa.",
    slug: 'abidjan-transformer-800kva',
    imageAltKeywords: [
      '800KVA transformer Abidjan',
      "transformer installation Côte d'Ivoire",
    ],
  },
  {
    id: 'project-ouagadougou-solar',
    primary: 'Solar installation Ouagadougou',
    secondary: [
      'solar power Burkina Faso',
      'extruder machine solar installation',
      'industrial solar',
    ],
    longTail: [
      'solar installation Ouagadougou',
      'solar installation for extruder machines',
      'industrial solar Burkina Faso',
    ],
    path: '/projects/ouagadougou-solar-extruder/',
    h1: 'Solar installation for extruder machines in Ouagadougou',
    metaTitle: 'Solar for Extruder Machines Ouagadougou | ELSIM Engineering',
    metaDescription:
      'Solar power installation supporting extruder machines in Ouagadougou, Burkina Faso — industrial renewable energy by ELSIM Engineering.',
    slug: 'ouagadougou-solar-extruder',
    imageAltKeywords: [
      'solar installation Ouagadougou',
      'industrial solar Burkina Faso',
    ],
  },
  {
    id: 'project-oyarifa',
    primary: 'Service line extension Oyarifa',
    secondary: [
      'service line extension Ghana',
      'Ghana power distribution',
      'Oyarifa electrical engineering',
    ],
    longTail: [
      'service line extension Oyarifa Ghana',
      'electrical infrastructure Oyarifa',
    ],
    path: '/projects/oyarifa-service-line/',
    h1: 'Service line extension in Oyarifa, Ghana',
    metaTitle: 'Service Line Extension Oyarifa, Ghana | ELSIM Engineering',
    metaDescription:
      'Service line extension works in Oyarifa, Accra region, Ghana by ELSIM Engineering — electrical distribution and connection infrastructure.',
    slug: 'oyarifa-service-line',
    imageAltKeywords: [
      'service line extension Oyarifa Ghana',
      'electrical distribution Accra',
    ],
  },

  // —— Lead & company ——
  {
    id: 'quotation',
    primary: 'Engineering project consultation',
    secondary: [
      'request a project consultation',
      'electrical project',
      'power project',
      'solar project',
      'electrical contractor',
    ],
    longTail: [
      'electrical project consultation Ghana',
      'request quotation electrical engineering Accra',
    ],
    path: '/quotation/',
    h1: 'Request a project consultation',
    metaTitle: 'Request a Quotation | ELSIM Engineering Ghana',
    metaDescription:
      'Share your project location, load and timeline. ELSIM Engineering provides quotations for electrical installations, solar, transformers and power distribution across Ghana and West Africa.',
    slug: 'quotation',
    imageAltKeywords: ['ELSIM Engineering project consultation'],
  },
  {
    id: 'contact',
    primary: 'Contact ELSIM Engineering',
    secondary: [
      'Accra engineering firm',
      'Oyarifa Teiman',
      'electrical contractor Accra',
    ],
    longTail: [
      'engineering company Accra Ghana',
      'contact electrical contractor Accra',
    ],
    path: '/contact/',
    h1: 'Contact ELSIM Engineering in Accra',
    metaTitle: 'Contact ELSIM Engineering | Accra, Ghana',
    metaDescription:
      'Contact ELSIM Engineering Firm at Oyarifa Teiman, Inside 3T Plaza, Accra. Electrical engineering, solar and power infrastructure services across Ghana and West Africa.',
    slug: 'contact',
    imageAltKeywords: ['ELSIM Engineering Accra office contact'],
  },
  {
    id: 'about',
    primary: 'ELSIM Engineering Firm',
    secondary: [
      'engineering firm Ghana',
      'professional engineering',
      'safety',
      'reliability',
      'excellence',
      'innovation',
    ],
    longTail: [
      'electrical engineering company in Ghana',
      'engineering firm Accra West Africa',
    ],
    path: '/about/',
    h1: 'About ELSIM Engineering Firm',
    metaTitle: 'About ELSIM Engineering Firm | Accra & West Africa',
    metaDescription:
      'ELSIM Engineering Firm Ltd — electrical, energy and industrial engineering from Accra, Ghana. Safety, reliability, excellence and professional execution across West Africa.',
    slug: 'about',
    imageAltKeywords: [
      'ELSIM Engineering Firm Accra',
      'engineering team Ghana',
    ],
  },
  {
    id: 'blog',
    primary: 'Engineering insights',
    secondary: [
      'electrical engineering',
      'power infrastructure',
      'solar engineering',
      'safety',
    ],
    longTail: ['electrical engineering articles Ghana'],
    path: '/blog/',
    h1: 'Insights on electrical, solar and power engineering',
    metaTitle: 'Blog | Electrical & Power Engineering | ELSIM',
    metaDescription:
      'Articles from ELSIM Engineering on electrical installations, solar PV, transformers, maintenance and power infrastructure in Ghana and West Africa.',
    slug: 'blog',
    imageAltKeywords: ['ELSIM Engineering blog electrical insights'],
  },
  {
    id: 'safety',
    primary: 'Electrical safety',
    secondary: [
      'workplace safety',
      'construction safety',
      'safety standards',
      'site safety',
      'safety compliance',
    ],
    longTail: ['electrical safety standards Ghana engineering'],
    path: '/safety/',
    h1: 'Safety in every electrical and power project',
    metaTitle: 'Safety | ELSIM Engineering Ghana',
    metaDescription:
      'How ELSIM Engineering manages electrical safety, site discipline and stop-work authority on installations, transformer works and industrial projects.',
    slug: 'safety',
    imageAltKeywords: ['electrical site safety ELSIM'],
  },
];

const byPath = new Map(
  SEO_MASTER_MAP.map((t) => [t.path.replace(/\/$/, '') || '/', t])
);

/** Resolve SEO target by app path (`/services/solar-power-solutions/` etc.). */
export function getSeoTarget(path: string): SeoTarget | undefined {
  const normalized = path.replace(/\/$/, '') || '/';
  return byPath.get(normalized) ?? byPath.get(`${normalized}/`);
}

export function getSeoTargetBySlug(
  kind: 'service' | 'project',
  slug: string
): SeoTarget | undefined {
  const prefix = kind === 'service' ? '/services/' : '/projects/';
  return getSeoTarget(`${prefix}${slug}/`);
}

/** Flat keyword list for a path (primary + secondary + long-tail). */
export function keywordsForPath(path: string): string[] {
  const t = getSeoTarget(path);
  if (!t) return [];
  return [t.primary, ...t.secondary, ...t.longTail];
}

/** Aggregate keywords for root metadata (deduped). */
export function allMappedKeywords(): string[] {
  const set = new Set<string>();
  for (const t of SEO_MASTER_MAP) {
    set.add(t.primary);
    t.secondary.forEach((k) => set.add(k));
    t.longTail.forEach((k) => set.add(k));
  }
  // Brand & geo anchors always present
  [
    'ELSIM Engineering',
    'ELSIM Engineering Firm',
    'ELSIM Engineering Limited',
    'www.elsimengineering.com',
    'Ghana',
    'Accra',
    'West Africa',
    'Togo',
    "Côte d'Ivoire",
    'Burkina Faso',
    'Senegal',
    'Niger',
  ].forEach((k) => set.add(k));
  return [...set];
}
