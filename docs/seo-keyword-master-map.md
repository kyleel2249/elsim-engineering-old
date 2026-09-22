# ELSIM SEO Keyword Master Map

Source of truth in code: [`lib/data/seo-master-map.ts`](../lib/data/seo-master-map.ts).

Each row maps **Primary → Secondary → Long-tail → Page → H1 → Meta title → Meta description → Slug → Image ALT**.

## Hierarchy (tiers)

| Tier | Focus |
|------|--------|
| 1 Brand | ELSIM Engineering · Firm · Limited |
| 2 Core services | Electrical installations · Solar PV · Power distribution · Transformers · Inspection & maintenance · Consulting |
| 3 Industries | Commercial · Industrial · Residential · Energy · Infrastructure |
| 4 Capabilities | Design · Installation · Testing · Commissioning · Maintenance · Switchgear · Panels |
| 5 Geographic | Ghana · Accra · Oyarifa · Togo · Aného · Côte d'Ivoire · Abidjan · Burkina Faso · Ouagadougou · Senegal · Niger · West Africa |
| 6 Trust | Safety · Reliability · Excellence · Integrity · Innovation |

## Page map (summary)

| Primary keyword | Target path | H1 (summary) | Meta title focus |
|-----------------|-------------|--------------|------------------|
| ELSIM Engineering | `/` | Electrical, energy and industrial engineering across Ghana and West Africa | Electrical Engineering, Solar & Power Distribution in Ghana |
| Engineering services | `/services/` | Electrical, energy and industrial engineering services | Engineering Services \| Electrical, Solar & Power |
| Electrical installations | `/services/electrical-installations/` | Commercial, industrial and residential facilities | Electrical Installations in Ghana & West Africa |
| Solar power solutions | `/services/solar-power-solutions/` | Design, supply and installation of PV systems | Solar Power Solutions & PV Installation |
| Electrical inspection and maintenance | `/services/electrical-maintenance/` | Inspection and preventive maintenance | Electrical Inspection & Maintenance Ghana |
| Power distribution and transformer projects | `/services/power-distribution/` | Networks and transformer projects | Power Distribution & Transformer Projects |
| Electrical consulting and audits | `/services/electrical-consulting/` | Independent consulting and technical advisory | Electrical Consulting & Audits Ghana |
| Engineering projects | `/projects/` | Verified electrical, solar and power projects | Transformer, Solar & Power Works |
| Rural electrification Togo | `/projects/togo-rural-electrification/` | Government of Togo rural electrification | Rural Electrification Togo |
| 800KVA transformer Aného | `/projects/aneho-transformer-800kva/` | Industrial machine & 800KVA in Aného | 800KVA Transformer Aného, Togo |
| 800KVA transformer Abidjan | `/projects/abidjan-transformer-800kva/` | Transformer works in Abidjan | 800KVA Transformer Abidjan |
| Solar installation Ouagadougou | `/projects/ouagadougou-solar-extruder/` | Solar for extruder machines | Solar for Extruder Machines Ouagadougou |
| Service line extension Oyarifa | `/projects/oyarifa-service-line/` | Service line extension in Oyarifa | Service Line Extension Oyarifa, Ghana |
| Engineering project consultation | `/quotation/` | Request a project consultation | Request a Quotation |
| Contact ELSIM Engineering | `/contact/` | Contact in Accra | Contact \| Accra, Ghana |
| ELSIM Engineering Firm | `/about/` | About the firm | About \| Accra & West Africa |
| Engineering insights | `/blog/` | Insights on electrical, solar and power | Blog \| Electrical & Power Engineering |
| Electrical safety | `/safety/` | Safety on every project | Safety \| ELSIM Engineering Ghana |

## Distribution rules (how keywords are used)

| Placement | Rule |
|-----------|------|
| **Meta title** | Primary + geography or service; under ~60–65 characters where possible |
| **Meta description** | Primary + 1–2 secondary + location + brand; ~150–160 characters |
| **H1** | One per page; natural sentence using primary keyword |
| **H2/H3** | Process terms (design, installation, testing, commissioning, safety) and related services |
| **Body** | Secondary and long-tail in first paragraphs; no stuffing |
| **URL slug** | Stable service/project slugs from the map |
| **Image ALT** | From `imageAltKeywords` (service/equipment + location when relevant) |
| **Internal links** | Service ↔ project cross-links; CTA to `/quotation/` |
| **Schema** | Service / CreativeWork names and descriptions from the map |
| **Open Graph** | Same title/description as meta via `pageOpenGraph()` |
| **Root keywords meta** | Aggregate of all mapped keywords via `allMappedKeywords()` |

## Editing

1. Update `lib/data/seo-master-map.ts`.
2. Redeploy — service and project pages read the map at build time.
3. Run `npm run seo:audit` against the live origin after deploy.

## Not yet separate landing pages

Dedicated city/country landers (e.g. `/locations/accra/`) are **not** built yet. Geographic keywords are applied on home, services, projects, and project case studies. Add location routes later by extending this map with new `path` entries.
