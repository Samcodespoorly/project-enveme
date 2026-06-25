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
    slug: 'interior-mirror-fabrication',
    date: 'In progress',
    category: 'FABRICATION',
    tagColor: '#60A5FA',
    title: 'Reverse-Engineering Trim & Ganador Mirrors in Fusion 360',
    excerpt: 'Two interior and exterior pieces are getting the CAD treatment: the cracked dashboard AC vents and a set of Ganador-style aero wing mirrors. The workflow is the same for both — pull the original part off the car, measure it by hand with vernier calipers, and rebuild it dimension-by-dimension in Fusion 360 for 3D printing.',
    readTime: '4 min read',
    tools: ['Vernier calipers', 'Fusion 360', '3D printer'],
    content: [
      {
        type: 'paragraph',
        text: 'A 30-year-old interior has parts that simply aren\'t available new any more. The dashboard AC vents on the JZZ31 are a known weak point — the plastic gets brittle with age and UV exposure, and the vanes and surrounds crack. Rather than chase used parts that are in the same condition, I\'m reverse-engineering replacements from scratch.',
      },
      {
        type: 'heading',
        text: 'The Workflow',
      },
      {
        type: 'paragraph',
        text: 'The process is deliberately low-tech on the input side and fully digital on the output side. I remove the original part from the car, then measure every relevant feature by hand with vernier calipers — overall envelope, mounting tabs, clip locations, radii, and wall thicknesses. Those measurements get transferred straight into a parametric Fusion 360 model, so each dimension stays editable as I refine the fit.',
      },
      {
        type: 'callout',
        label: 'WHY PARAMETRIC',
        text: 'Building the model parametrically means a test print that\'s 0.3 mm too tight on a clip can be corrected by editing one dimension and re-exporting — no need to redraw the geometry. For a part that will go through several fit iterations, that\'s the difference between a weekend and a month.',
        color: '#60A5FA',
      },
      {
        type: 'heading',
        text: 'AC Vent Trim',
      },
      {
        type: 'paragraph',
        text: 'The vents are the first target — they\'re visible, cracked, and self-contained. The goal is a printed replacement that drops into the factory aperture and reuses the original mounting points, so no dashboard modification is needed.',
      },
      {
        type: 'image-placeholder',
        caption: 'Original AC vent measured up against the in-progress Fusion 360 model',
      },
      {
        type: 'heading',
        text: 'Ganador-Style Wing Mirrors',
      },
      {
        type: 'paragraph',
        text: 'The wing mirrors are the more ambitious project — modelling a Ganador-style aero mirror to replace the bulky factory units. Same approach: measure the existing mirror base and mounting geometry so the new design bolts straight to the door, then model the aero housing around it.',
      },
    ],
  },
  {
    slug: 'security-audio-upgrade',
    date: 'Mar 2026',
    category: 'ELECTRICAL',
    tagColor: '#A78BFA',
    title: 'Avital 5308L Alarm & Carrozzeria Bluetooth Retrofit',
    excerpt: 'Two electrical jobs done back to back: installing an Avital 5308L aftermarket alarm and security system, and retrofitting Bluetooth to the existing Carrozzeria FH-P040 head unit. Both came down to careful wiring — soldering, stripping, crimping, and tracing circuits with a voltmeter.',
    readTime: '4 min read',
    tools: ['Soldering iron', 'Wire strippers', 'Crimping tool', 'Voltmeter / multimeter', 'Heat-shrink'],
    content: [
      {
        type: 'paragraph',
        text: 'A factory-low-spec Soarer doesn\'t come with much in the way of security, and a 1995 head unit predates Bluetooth by a decade. Both problems are solvable with the right wiring work rather than wholesale replacement.',
      },
      {
        type: 'heading',
        text: 'Avital 5308L Alarm & Security System',
      },
      {
        type: 'paragraph',
        text: 'The Avital 5308L is a two-way alarm and security system. The bulk of the job is integration — tying the alarm into the car\'s existing circuits for the doors, ignition, and lights. On a car this age there\'s no convenient CAN gateway to tap, so every connection is made directly to the relevant wire.',
      },
      {
        type: 'callout',
        label: 'METHOD',
        text: 'Every circuit was identified before cutting into it — back-probing the loom with a voltmeter to confirm which wire does what (constant 12V, switched ignition, door trigger, etc.) rather than trusting a generic wiring diagram. Connections were soldered and heat-shrunk, not just crimped, for a permanent and corrosion-resistant join.',
        color: '#A78BFA',
      },
      {
        type: 'heading',
        text: 'Carrozzeria FH-P040 Bluetooth Retrofit',
      },
      {
        type: 'paragraph',
        text: 'The Carrozzeria (Pioneer\'s JDM brand) FH-P040 is a capable head unit but has no native Bluetooth. Rather than bin it, I retrofitted Bluetooth audio into the existing unit — a soldering job to bring a modern wireless audio source into a period-correct head unit, keeping the factory-look dash intact.',
      },
      {
        type: 'image-placeholder',
        caption: 'FH-P040 on the bench mid-retrofit',
      },
    ],
  },
  {
    slug: 'front-of-engine-refresh',
    date: 'Oct 2025',
    category: 'ENGINE',
    tagColor: '#F87171',
    title: 'Front-of-Engine Refresh — Pulley, Gaskets & Belt',
    excerpt: 'With parts ordered from Amayama, I tackled the front of the 2JZ-GE in one session: a new OEM-replacement crankshaft pulley / harmonic damper, fresh valve cover gaskets to cure an oil leak, and a Gates drive belt with a new aftermarket tensioner to kill a persistent squeak.',
    readTime: '5 min read',
    tools: ['Crankshaft pulley holding tool', 'Breaker bar', 'Impact wrench', 'Torque wrench', 'Socket set'],
    content: [
      {
        type: 'paragraph',
        text: 'Two symptoms drove this job: an oil leak weeping from the valve covers, and a squeak from the drive belt. Both are common on a high-age 2JZ-GE, and since the work overlaps at the front of the engine, it made sense to do it all in one go. Parts were ordered from Amayama, which remains the most reliable way to get genuine and OEM-equivalent Japanese parts into New Zealand.',
      },
      {
        type: 'heading',
        text: 'The Parts',
      },
      {
        type: 'spec-table',
        rows: [
          { label: 'Crankshaft pulley', value: 'OEM-replacement harmonic damper' },
          { label: 'Valve cover gaskets', value: 'Replaced — both cam covers' },
          { label: 'Drive belt', value: 'Gates' },
          { label: 'Belt tensioner', value: 'Aftermarket replacement' },
          { label: 'Supplier', value: 'Amayama (Japan)' },
        ],
      },
      {
        type: 'heading',
        text: 'Valve Cover Gaskets',
      },
      {
        type: 'paragraph',
        text: 'The valve cover gaskets harden and shrink over decades of heat cycling, which is exactly what causes the slow weep down the side of the block. Replacing them is straightforward access-wise on the 2JZ-GE, and clears up the oil leak while everything is apart at the front of the engine.',
      },
      {
        type: 'heading',
        text: 'Drive Belt & Tensioner',
      },
      {
        type: 'paragraph',
        text: 'The squeak traced back to the drive belt and a tired tensioner. A fresh Gates belt paired with a new aftermarket tensioner restores correct belt tension and kills the noise — there\'s no point fitting a new belt to an old tensioner that won\'t hold the right load.',
      },
      {
        type: 'heading',
        text: 'The Harmonic Damper',
      },
      {
        type: 'paragraph',
        text: 'The crankshaft pulley on the 2JZ doubles as a harmonic damper — a bonded rubber element that controls torsional vibration in the crank. The bond degrades with age, so it was replaced with an OEM-equivalent unit while the front of the engine was open.',
      },
      {
        type: 'callout',
        label: 'GOTCHA',
        text: 'The crankshaft pulley bolt is the real challenge of this job. It\'s torqued to an enormous figure from the factory and will not move with hand tools alone — you need a way to hold the crank from turning and serious leverage (a proper holding tool plus a breaker bar or impact wrench) to crack it loose, and again to torque it correctly on reassembly.',
        color: '#F87171',
      },
      {
        type: 'image-placeholder',
        caption: 'Front of the 2JZ-GE with the pulley removed',
      },
    ],
  },
  {
    slug: 'service-baseline-assessment',
    date: 'Jul 2025',
    category: 'MAINTENANCE',
    tagColor: '#34D399',
    title: 'Full Service & Baseline Assessment',
    excerpt: 'Days after picking the car up, I ran a full service — Valvoline 5W-30, a fresh oil filter, and a K&N drop-in performance air filter — and ran the car through a proper baseline assessment. A pre-purchase WOF by an external mechanic had already flagged the two jobs that would shape the build plan: leaking shocks and a worn steering rack.',
    readTime: '4 min read',
    tools: ['Oil drain pan', 'Oil filter wrench', 'Torque wrench', 'Jack & axle stands'],
    content: [
      {
        type: 'paragraph',
        text: 'The first thing any newly acquired car gets from me is a fresh service and an honest baseline. The point isn\'t just clean oil — it\'s establishing a known starting condition so that anything that changes later is measured against a reference I set myself.',
      },
      {
        type: 'heading',
        text: 'The Service',
      },
      {
        type: 'paragraph',
        text: 'Engine oil was changed to Valvoline 5W-30, roughly 5.5 litres for the 2JZ-GE with a fresh filter. I also fitted a K&N drop-in performance air filter — a direct replacement for the factory panel filter that lives in the original airbox (it\'s logged in the build\'s mods list).',
      },
      {
        type: 'spec-table',
        rows: [
          { label: 'Engine oil', value: 'Valvoline 5W-30' },
          { label: 'Oil quantity', value: '≈5.5 L with filter' },
          { label: 'Oil filter', value: 'Replaced' },
          { label: 'Air filter', value: 'K&N drop-in performance panel' },
        ],
      },
      {
        type: 'heading',
        text: 'Baseline Assessment',
      },
      {
        type: 'paragraph',
        text: 'With fresh fluids in, I assessed the car the way you do with any used purchase: listening for noises, feeling for torque linearity through the rev range, and checking how the suspension behaves over bumps and under load — the standard things you look for to gauge mechanical health.',
      },
      {
        type: 'callout',
        label: 'FUTURE WORK FLAGGED',
        text: 'The pre-purchase WOF, carried out by an external mechanic, surfaced the two items that would define the early build plan: leaking shock absorbers and a worn steering rack. Neither was urgent, but both were logged as priority future work.',
        color: '#34D399',
      },
    ],
  },
  {
    slug: 'acquisition-story',
    date: 'Jul 2025',
    category: 'ACQUISITION',
    tagColor: '#E8920A',
    title: 'Buying the JZZ31 — Why This Car?',
    excerpt: 'I picked up the Soarer in Browns Bay with just 49,000 km on the clock — a low-spec, clean, manual JZZ31 in Toyota\'s grey-blue. Low spec means fewer things to break, the manual makes it a genuine driver\'s car, and the early non-VVT-i 2JZ-GE underneath is one of the best project platforms going.',
    readTime: '5 min read',
    tools: [],
    content: [
      {
        type: 'paragraph',
        text: 'I picked the car up in Browns Bay. What sold me wasn\'t a single feature but the combination: a genuinely low-mileage example, a factory manual gearbox, and the 2JZ-GE platform underneath it. That mix is rare, and it\'s exactly what you want as a starting point for a long-term build.',
      },
      {
        type: 'heading',
        text: 'Why the JZZ31 Soarer?',
      },
      {
        type: 'paragraph',
        text: 'The JZZ31 is the third-generation Toyota Soarer — sold in the US as the Lexus SC300. For a project car it ticks every box: a highly modifiable platform, a huge engine bay to work in, enormous aftermarket support, and a parts catalogue largely shared with the Mk4 Supra. As far as I\'m concerned that combination makes it about the best project car you can buy.',
      },
      {
        type: 'paragraph',
        text: 'This particular example is low spec, and that\'s a feature, not a compromise. A simpler car has fewer electronics and luxury systems to fail with age — less to break, less to chase. The interior is clean, and the whole thing is in honest condition for its years.',
      },
      {
        type: 'heading',
        text: 'The Engine That Matters',
      },
      {
        type: 'paragraph',
        text: 'Underneath is the naturally aspirated 2JZ-GE — but the detail that counts is that this is an early example. It runs the thicker connecting rods and a distributor-based ignition, both of which make it a more robust foundation for high-boost applications down the line. If a turbo build is ever on the table, this is the version of the engine you want to start with.',
      },
      {
        type: 'spec-table',
        rows: [
          { label: 'Make / Model', value: 'Toyota Soarer (JZZ31)' },
          { label: 'Year', value: '1995' },
          { label: 'Engine', value: '2JZ-GE · 3.0L DOHC Inline-6 · NA' },
          { label: 'Ignition', value: 'Early non-VVT-i · distributor' },
          { label: 'Internals', value: 'Thicker connecting rods' },
          { label: 'Transmission', value: 'Factory manual' },
          { label: 'Drivetrain', value: 'Rear-wheel drive' },
          { label: 'Odometer at purchase', value: '≈49,000 km' },
          { label: 'Colour', value: 'Toyota grey-blue' },
          { label: 'Location', value: 'Browns Bay, NZ' },
        ],
      },
      {
        type: 'heading',
        text: 'Going In With Eyes Open',
      },
      {
        type: 'paragraph',
        text: 'Nothing about the car was a mystery at purchase. The pre-purchase inspection flagged leaking shock absorbers and a worn steering rack — both known, both logged as future work. For a 30-year-old car with this little distance covered, that\'s a clean bill, and it set the agenda for the first round of work.',
      },
    ],
  },
]
