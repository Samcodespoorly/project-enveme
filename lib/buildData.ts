export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'image-placeholder'; caption: string }
  | { type: 'spec-table'; rows: { label: string; value: string }[] }
  | { type: 'callout'; label: string; text: string; color?: string }

export type JournalEntry = {
  slug: string
  date: string
  category: string
  tagColor: string
  title: string
  excerpt: string
  readTime: string
  content: ContentBlock[]
  relatedMods?: string[]
  tools?: string[]
  cost?: string
}

export const journalEntries: JournalEntry[] = [
  {
    slug: 'tein-coilover-install',
    date: 'May 2025',
    category: 'SUSPENSION',
    tagColor: '#60A5FA',
    title: 'Tein Coilover Installation & Alignment',
    excerpt: 'After sourcing a set of Tein Street Basis coilovers, I undertook the full front and rear suspension replacement over a weekend. The process involved removing the OEM shock absorbers, compressing the new coilover springs, and setting the initial ride height at 30mm below standard before a four-wheel alignment.',
    readTime: '7 min read',
    tools: ['Spring compressor', 'Torque wrench', 'Breaker bar', '17mm / 19mm / 22mm sockets', 'Alignment gauge'],
    cost: 'NZD $1,850 (coilovers + alignment)',
    content: [
      {
        type: 'paragraph',
        text: 'The factory Soarer shock absorbers were 30 years old and had accumulated over 100,000 km. They were functional — no active leaks — but the damping response was soft enough that the car felt more comfortable cruiser than the chassis-focused grand tourer it was designed to be. Coilovers were always in the plan; it was just a question of timing.',
      },
      {
        type: 'heading',
        text: 'Why Tein Street Basis Z?',
      },
      {
        type: 'paragraph',
        text: 'The JZZ31 has a relatively compact aftermarket suspension ecosystem compared to the JDM Z32 or S14 scene. Tein\'s Street Basis Z is one of the few coilover kits with JZZ31-specific fitment, proper valving for a 1590 kg grand tourer, and a reputation for reliability at a realistic budget. I ruled out Eibach/Bilstein OEM replacement springs (no adjustability) and full-spec coilovers like Öhlins DFV (out of budget, overkill for a street car). Street Basis Z was the right call.',
      },
      {
        type: 'spec-table',
        rows: [
          { label: 'Model', value: 'Tein Street Basis Z' },
          { label: 'Application', value: 'Toyota Soarer JZZ31 (1991–2000)' },
          { label: 'Front spring rate', value: '5.0 kg/mm' },
          { label: 'Rear spring rate', value: '4.0 kg/mm' },
          { label: 'Height adjustment', value: 'Lower mount, ±40mm range' },
          { label: 'Damping', value: 'Fixed mono-tube' },
          { label: 'Warranty', value: '1 year' },
        ],
      },
      {
        type: 'heading',
        text: 'The Installation',
      },
      {
        type: 'paragraph',
        text: 'Front strut removal on the JZZ31 follows the standard MacPherson layout: loosen the wheel, support the car on stands, disconnect the lower ball joint pinch bolt, unbolt the strut top mount from the strut tower (three 12mm bolts), and the assembly drops free. The hardest part is breaking the top nut loose — a breaker bar and a good impact socket are essential. Don\'t attempt this with an underpowered cordless impact driver.',
      },
      {
        type: 'callout',
        label: 'SAFETY NOTE',
        text: 'Always use a proper coil spring compressor rated for the load. A JZZ31 front spring stores significant energy. I used a double-hook compressor rated to 2,000 kg — two separate hooks, compressed symmetrically. Never compress a spring beyond what\'s needed to free the top hat, and never remove the centre nut until the spring is fully compressed.',
        color: '#F87171',
      },
      {
        type: 'paragraph',
        text: 'Rear installation is more involved than the front. The JZZ31 uses a multi-link rear suspension with separate spring and damper locations. The rear coilover replaces the spring and shock as a combined unit, but you still need to manage the trailing arms and lateral links carefully. I replaced one side at a time to keep a reference for reassembly.',
      },
      {
        type: 'image-placeholder',
        caption: 'Front strut removed — OEM vs Tein Street Basis Z comparison',
      },
      {
        type: 'heading',
        text: 'Setting the Drop',
      },
      {
        type: 'paragraph',
        text: 'I targeted 30mm below factory ride height — enough to fill the wheel arches visually and reduce the centre of gravity meaningfully without compromising driveability on New Zealand roads. The lower mount threads on the Tein kit have clear distance markings; I set both sides to equal thread engagement and measured arch-to-centre height with a tape measure at all four corners before and after.',
      },
      {
        type: 'heading',
        text: 'Four-Wheel Alignment Results',
      },
      {
        type: 'paragraph',
        text: 'After installation, I booked a four-wheel alignment at a local shop with a Hunter alignment rack. Changing the ride height affects all alignment angles — particularly camber in the rear. I specified factory alignment targets as the baseline, which is appropriate for a street car that will see occasional spirited use but no track days.',
      },
      {
        type: 'spec-table',
        rows: [
          { label: 'Front camber (target)', value: '−0.3° to −0.8°' },
          { label: 'Front camber (set)', value: '−0.5° L / −0.5° R' },
          { label: 'Front toe (target)', value: '0.0° ± 0.1° total' },
          { label: 'Front toe (set)', value: '0.05° total toe-in' },
          { label: 'Rear camber (target)', value: '−1.0° to −1.5°' },
          { label: 'Rear camber (set)', value: '−1.2° L / −1.2° R' },
          { label: 'Rear toe (target)', value: '0.15° ± 0.1° total toe-in' },
          { label: 'Rear toe (set)', value: '0.18° total toe-in' },
        ],
      },
      {
        type: 'callout',
        label: 'RESULT',
        text: 'The change is significant. The car sits properly in its arches, body roll is meaningfully reduced, and the steering response is noticeably sharper. Ride quality is firmer than stock but not harsh on smooth asphalt. Bumpy urban roads are more pronounced — expected with higher spring rates. Overall, exactly the transformation the chassis deserved.',
        color: '#60A5FA',
      },
    ],
  },
  {
    slug: 'baseline-fluid-service',
    date: 'Apr 2025',
    category: 'MAINTENANCE',
    tagColor: '#34D399',
    title: 'Full Fluid Service & Baseline Inspection',
    excerpt: 'With the JZZ31 freshly acquired, the first priority was a comprehensive fluid service and mechanical baseline. Engine oil, coolant, transmission fluid, differential oil, and brake fluid were all replaced. Worn front lower control arm bushings were identified and replaced ahead of the upcoming suspension work.',
    readTime: '6 min read',
    tools: ['Oil drain pan', 'Torque wrench', 'Fluid pump', 'Jack stands', 'Multimeter', 'OBD-II scanner'],
    cost: 'NZD $420 (fluids + bushings)',
    content: [
      {
        type: 'paragraph',
        text: 'The first thing I do with any newly acquired car is establish a known baseline. This means ignoring the service history — no matter how complete it looks — and replacing every consumable fluid from scratch. Fluid condition degrades with heat cycles, moisture absorption, and age regardless of what the logbook says. Starting fresh means I know exactly what condition everything is in.',
      },
      {
        type: 'heading',
        text: 'Why a Baseline Service Matters',
      },
      {
        type: 'paragraph',
        text: 'The JZZ31 had a folder of service records that showed regular oil changes, but no record of transmission fluid, differential oil, or power steering fluid changes. On a 30-year-old car with 102,000 km, those fluids have almost certainly degraded — ATF in particular becomes acidic over time and accelerates clutch pack wear in the A340E. Coolant loses its anti-corrosion additives. Brake fluid absorbs moisture, lowering its boiling point. All of it gets replaced.',
      },
      {
        type: 'spec-table',
        rows: [
          { label: 'Engine oil', value: 'Motul 8100 X-clean 5W-30 · 5.0L with filter' },
          { label: 'Engine coolant', value: 'Toyota Super Long Life Coolant · 50/50 mix' },
          { label: 'Transmission (ATF)', value: 'Toyota ATF Type T-IV · 8.5L total (partial drain)' },
          { label: 'Differential oil', value: 'Motul Gear 300 75W-90 · 1.1L' },
          { label: 'Brake fluid', value: 'Motul RBF 600 · full system flush' },
          { label: 'Power steering fluid', value: 'Toyota PSF · reservoir replaced' },
        ],
      },
      {
        type: 'heading',
        text: 'Engine Oil',
      },
      {
        type: 'paragraph',
        text: 'The 2JZ-GE in naturally aspirated form is not particularly demanding on oil — it doesn\'t run the high oil temperatures of the turbocharged variant. I chose Motul 8100 X-clean in 5W-30 for its good low-temperature flow properties (important for NZ winters) and high-quality synthetic base. The 2JZ takes 5.0L with the filter change.',
      },
      {
        type: 'heading',
        text: 'Coolant System',
      },
      {
        type: 'paragraph',
        text: 'The JZZ31 uses an aluminium radiator with aluminium block components. Toyota Super Long Life Coolant (SLLC) is specifically formulated for these alloys with OAT (Organic Acid Technology) additives. I flushed the system twice with distilled water before filling with a 50/50 mix of SLLC and distilled water — never tap water, which introduces mineral deposits.',
      },
      {
        type: 'heading',
        text: 'The Bushing Discovery',
      },
      {
        type: 'paragraph',
        text: 'During the inspection, I put the car on stands and walked through the suspension components. The front lower control arm bushings were noticeably worn — you could feel play in the arm when loaded laterally by hand, and the rubber was visibly cracked on the outboard bushing. On a car this age, rubber suspension components harden and crack from UV exposure and heat cycling even with low mileage.',
      },
      {
        type: 'callout',
        label: 'FINDING',
        text: 'Worn front lower control arm bushings cause imprecise steering response and can mask alignment issues — the car may not hold its alignment settings correctly if the mounting points are moving under load. These were flagged as a priority repair ahead of the coilover installation, since there\'s no point aligning a car with worn pivot points.',
        color: '#34D399',
      },
      {
        type: 'paragraph',
        text: 'I sourced OEM Toyota bushings rather than aftermarket rubber units. The JZZ31 shares many suspension components with the Lexus SC300, so OEM parts are readily available. The press-in replacement is straightforward with the right tooling — I took the arms to a local shop with a hydraulic press rather than attempting the job with a bench vice.',
      },
      {
        type: 'image-placeholder',
        caption: 'Front lower control arm — cracked OEM bushing visible on outboard mount',
      },
      {
        type: 'heading',
        text: 'OBD-II Scan',
      },
      {
        type: 'paragraph',
        text: 'I ran a full scan with an OBD-II scanner before and after the service. No stored fault codes. The 2JZ-GE runs on Toyota\'s early OBD-II protocol — most generic scanners cover it, but a Toyota-specific tool or Techstream gives more live data. Live data showed coolant temperature, oxygen sensor switching, and idle trims all within normal parameters. Clean bill of health.',
      },
    ],
  },
  {
    slug: 'acquisition-story',
    date: 'Mar 2025',
    category: 'ACQUISITION',
    tagColor: '#E8920A',
    title: 'Purchasing the JZZ31 — Why This Car?',
    excerpt: 'After months of searching Trade Me and local classifieds, I found the right example in Auckland — a 1995 Pearl White JZZ31 with 102,000 km and a folder of service history. The 2JZ-GE is a bulletproof platform, the chassis is sophisticated, and the Soarer is genuinely undervalued in the NZ market.',
    readTime: '8 min read',
    tools: [],
    cost: 'NZD $19,000',
    content: [
      {
        type: 'paragraph',
        text: 'I\'d been watching the NZ market for a project platform for about eight months. The requirements were specific: rear-wheel drive, inline-six engine with a known aftermarket and strong parts availability, a usable cabin, and a price point that left budget for proper development. The shortlist eventually narrowed to the JZZ31 Soarer over a Z32 300ZX, and I\'m confident it was the right call.',
      },
      {
        type: 'heading',
        text: 'Why the JZZ31 Soarer?',
      },
      {
        type: 'paragraph',
        text: 'The JZZ31 is the third-generation Toyota Soarer — sold in the US as the Lexus SC300. In Japan it ran from 1991 to 2000, powered by the naturally aspirated 2JZ-GE. The platform sits below the twin-turbo 2JZ-GTE models in the hierarchy but offers something different: a refined, high-revving inline-six in a grand tourer body that\'s genuinely undervalued because it\'s often overlooked in favour of the turbo variant. For a build focused on chassis development and mechanical understanding rather than peak power, the NA motor is actually more interesting.',
      },
      {
        type: 'paragraph',
        text: 'The New Zealand market has a good supply of JZZ31 examples from Japanese import — most were brought in through the late 1990s and early 2000s, giving the NZ fleet a consistent mileage and condition range. Prices have been stable below $25,000 for clean examples, which puts the JZZ31 in a reasonable position compared to inflated Z32 and R32 pricing.',
      },
      {
        type: 'heading',
        text: 'The Search Process',
      },
      {
        type: 'paragraph',
        text: 'I tracked Trade Me and SellMyCar listings for about four months before finding this example. I\'d viewed two other JZZ31s — one with a failed head gasket (clear from the coolant condition and radiator residue), one with a questionable service history and rust in the rear subframe mounts. Both were passed over. The right car needed clean documentation and no evidence of deferred maintenance.',
      },
      {
        type: 'image-placeholder',
        caption: 'First inspection — Auckland, March 2025',
      },
      {
        type: 'heading',
        text: 'Pre-Purchase Inspection',
      },
      {
        type: 'paragraph',
        text: 'I inspected the car personally before purchase. Key inspection points for a 2JZ-GE of this age and mileage:',
      },
      {
        type: 'callout',
        label: 'INSPECTION CHECKLIST',
        text: 'Timing belt service history (belt + tensioner + water pump — critical on any 2JZ). Coolant condition (should be pink/red SLLC, not brown or rusty). Oil condition (dark but not sludged). Radiator cap and overflow reservoir condition. Differential for leaks at pinion seal. Rear subframe mounts for rust (common failure point on older imports). Interior electrical — all four window motors, climate control, and instrument cluster.',
        color: '#E8920A',
      },
      {
        type: 'paragraph',
        text: 'The timing belt had been replaced at 85,000 km — documented in the service folder with a stamp from a Toyota dealership in Christchurch. Coolant was fresh pink SLLC, consistent with a recent change. Oil was dark but not sludged, with no mayo contamination on the cap (no head gasket concerns). The rear subframe mounts showed surface rust only — no structural concern.',
      },
      {
        type: 'heading',
        text: 'Factory Specifications (at Purchase)',
      },
      {
        type: 'spec-table',
        rows: [
          { label: 'Make / Model', value: 'Toyota Soarer (JZZ31)' },
          { label: 'Year', value: '1995' },
          { label: 'Market', value: 'Japan (JDM) — NZ complied import' },
          { label: 'Engine', value: '2JZ-GE · 3.0L DOHC Inline-6 · NA' },
          { label: 'Power', value: '225 hp @ 6000 rpm (factory)' },
          { label: 'Torque', value: '210 lb-ft @ 4800 rpm' },
          { label: 'Transmission', value: 'A340E 4-speed automatic' },
          { label: 'Drivetrain', value: 'Rear-wheel drive' },
          { label: 'Kerb weight', value: '1590 kg' },
          { label: 'Odometer at purchase', value: '~102,000 km' },
          { label: 'Colour', value: 'Pearl White (062)' },
          { label: 'Purchase price', value: 'NZD $19,000' },
        ],
      },
      {
        type: 'heading',
        text: 'Why $19,000?',
      },
      {
        type: 'paragraph',
        text: 'The asking price was $21,500. The timing belt documentation and clean history supported the price, but I used the minor front lower control arm bushing wear as a negotiation point — not major, but real work that needed doing. We settled at $19,000, which is fair market for a clean, documented JZZ31 in the current NZ market. I\'ve built the bushing replacement cost into the initial maintenance budget.',
      },
      {
        type: 'paragraph',
        text: 'The long-term thesis: the JZZ31 is a genuinely sophisticated chassis with a legendary engine platform, currently undervalued relative to its Z30 predecessor and its American SC300 equivalent. With documented development work and a maintained service record, it should hold value better than the market currently prices it.',
      },
    ],
  },
]
