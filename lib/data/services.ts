import { Service } from '@/types';

// PROVISIONAL: descriptions and specs are drafted from the general scope
// implied by the company name and sector, pending ELSIM's verified service
// list. Replace copy once management confirms exact offerings.
export const services: Service[] = [
  {
    slug: 'electrical-installation',
    name: 'Electrical Installation & Wiring',
    shortDescription:
      'Design, supply and installation of low- and medium-voltage electrical systems for commercial and industrial sites.',
    description:
      'End-to-end electrical works covering distribution boards, cable containment, lighting circuits and power reticulation. Every installation is built to Ghana Grid Company and IEC standards, with as-built documentation handed over on completion.',
    capabilities: [
      'LV/MV distribution design and installation',
      'Cable sizing, containment and termination',
      'Lighting and small power circuits',
      'Earthing and lightning protection',
      'As-built drawings and test certificates'
    ],
    spec: [
      { label: 'Standards', value: 'IEC 60364, GS 1465' },
      { label: 'Voltage range', value: '230V – 33kV' },
      { label: 'Typical lead time', value: '2–10 weeks' }
    ],
    icon: 'circuit'
  },
  {
    slug: 'structural-engineering',
    name: 'Structural Engineering',
    shortDescription:
      'Structural analysis, design and site supervision for steel and reinforced-concrete works.',
    description:
      'Structural design services for warehouses, mezzanines, equipment platforms and steel frames, from concept sketches through to stamped construction drawings and site supervision during erection.',
    capabilities: [
      'Structural analysis and member sizing',
      'Steel frame and portal design',
      'Reinforced concrete detailing',
      'Foundation design for equipment loads',
      'Site supervision during construction'
    ],
    spec: [
      { label: 'Standards', value: 'BS EN 1993, BS 8110' },
      { label: 'Deliverables', value: 'Calculations + stamped drawings' },
      { label: 'Typical lead time', value: '3–12 weeks' }
    ],
    icon: 'structure'
  },
  {
    slug: 'mechanical-fabrication',
    name: 'Mechanical Fabrication',
    shortDescription:
      'Custom metal fabrication, piping and equipment installation for process and utility plant.',
    description:
      'Workshop and on-site fabrication of structural steel, tanks, ductwork and pipe racks, paired with mechanical installation of pumps, blowers and process equipment.',
    capabilities: [
      'Structural and plate fabrication',
      'Pipe spooling and installation',
      'Equipment alignment and installation',
      'Pressure testing and commissioning support',
      'Preventive maintenance programmes'
    ],
    spec: [
      { label: 'Materials', value: 'Mild steel, stainless, HDPE' },
      { label: 'Welding', value: 'AWS D1.1 qualified procedures' },
      { label: 'Typical lead time', value: '2–8 weeks' }
    ],
    icon: 'gears'
  },
  {
    slug: 'power-systems',
    name: 'Power Systems & Backup',
    shortDescription:
      'Generator installation, automatic transfer switching and solar-hybrid backup power design.',
    description:
      'Resilient power solutions for sites facing grid instability — from generator sizing and installation to hybrid solar-battery systems with automatic transfer control.',
    capabilities: [
      'Generator sizing, supply and installation',
      'Automatic transfer switch (ATS) wiring',
      'Solar-hybrid backup design',
      'Load studies and power factor correction',
      'Remote monitoring setup'
    ],
    spec: [
      { label: 'Generator range', value: '10kVA – 1000kVA' },
      { label: 'Solar option', value: 'Grid-tied & hybrid' },
      { label: 'Typical lead time', value: '2–6 weeks' }
    ],
    icon: 'power'
  },
  {
    slug: 'project-consulting',
    name: 'Engineering Consulting',
    shortDescription:
      'Feasibility studies, technical due diligence and project supervision for owners and developers.',
    description:
      'Independent engineering advice at every project stage — feasibility studies, cost estimation, tender documentation and site supervision to protect the client\'s interests through construction.',
    capabilities: [
      'Feasibility and technical due diligence',
      'Cost estimation and BOQ preparation',
      'Tender documentation and evaluation',
      'Owner\'s engineer / site supervision',
      'Handover and defects-liability inspection'
    ],
    spec: [
      { label: 'Engagement', value: 'Fixed-fee or retainer' },
      { label: 'Reporting', value: 'Weekly site reports' },
      { label: 'Typical lead time', value: 'Project-dependent' }
    ],
    icon: 'blueprint'
  },
  {
    slug: 'maintenance-support',
    name: 'Maintenance & Support',
    shortDescription:
      'Scheduled maintenance contracts and rapid-response repair for electrical and mechanical plant.',
    description:
      'Ongoing maintenance agreements that keep electrical panels, generators and mechanical plant running reliably, backed by a call-out team for unplanned failures.',
    capabilities: [
      'Scheduled preventive maintenance',
      'Thermal imaging and panel inspection',
      'Emergency call-out response',
      'Spare-parts sourcing',
      'Maintenance logs and reporting'
    ],
    spec: [
      { label: 'Contract terms', value: 'Monthly, quarterly, annual' },
      { label: 'Response', value: 'Same-day for contract clients' },
      { label: 'Coverage', value: 'Greater Accra + regional on request' }
    ],
    icon: 'maintenance'
  }
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
