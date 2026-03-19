export const vehicle = {
  name: '1995 Toyota Soarer',
  chassis: 'JZZ31',
  alsoKnownAs: 'Lexus SC300 (USDM)',
  year: 1995,
  bodyStyle: '2-door grand tourer coupé',
  plate: 'ENVEME',
  market: 'New Zealand',
  purchasePrice: 19000,
  currency: 'NZD',

  engine: {
    code: '2JZ-GE',
    type: '3.0L DOHC Inline-6',
    displacement: '2997cc',
    aspiration: 'Naturally aspirated',
    power: { hp: 225, rpm: 6000 },
    torque: { lbft: 210, rpm: 4800 },
  },

  drivetrain: {
    transmission: 'A340E 4-speed automatic',
    layout: 'RWD',
  },

  dimensions: {
    kerbWeight: '1590 kg',
  },

  currentState: {
    odometer: '~102,000 km',
    condition: 'Good — active project',
    colour: 'Pearl White',
    status: 'Street registered · Active build',
  },
}

// Flat arrays derived from the vehicle object — used in SpecsSection and specs page

export const keySpecs = [
  { label: 'Make', value: 'Toyota' },
  { label: 'Model', value: `Soarer (${vehicle.chassis})` },
  { label: 'Also known as', value: vehicle.alsoKnownAs },
  { label: 'Year', value: String(vehicle.year) },
  { label: 'Engine code', value: vehicle.engine.code },
  { label: 'Engine type', value: vehicle.engine.type },
  { label: 'Displacement', value: vehicle.engine.displacement },
  { label: 'Power output', value: `${vehicle.engine.power.hp} hp @ ${vehicle.engine.power.rpm} RPM` },
  { label: 'Torque', value: `${vehicle.engine.torque.lbft} lb-ft @ ${vehicle.engine.torque.rpm} RPM` },
  { label: 'Aspiration', value: vehicle.engine.aspiration },
  { label: 'Transmission', value: vehicle.drivetrain.transmission },
  { label: 'Drivetrain', value: 'Rear-wheel drive' },
  { label: 'Kerb weight', value: vehicle.dimensions.kerbWeight },
  { label: 'Body style', value: vehicle.bodyStyle },
]

export const specsGrid = [
  { value: vehicle.engine.code, label: 'Engine' },
  { value: vehicle.engine.displacement, label: 'Displacement' },
  { value: `${vehicle.engine.power.hp} hp`, label: 'Peak Power' },
  { value: `${vehicle.engine.power.rpm} rpm`, label: 'Power RPM' },
  { value: `${vehicle.engine.torque.lbft} lb-ft`, label: 'Peak Torque' },
  { value: `${vehicle.engine.torque.rpm} rpm`, label: 'Torque RPM' },
  { value: 'A340E', label: 'Gearbox' },
  { value: vehicle.drivetrain.layout, label: 'Drivetrain' },
  { value: vehicle.dimensions.kerbWeight, label: 'Kerb Weight' },
  { value: vehicle.chassis, label: 'Chassis' },
  { value: String(vehicle.year), label: 'Year' },
  { value: 'NZ', label: 'Market' },
]

export const currentStateItems = [
  { label: 'Odometer', value: vehicle.currentState.odometer },
  { label: 'Condition', value: vehicle.currentState.condition },
  { label: 'Original colour', value: vehicle.currentState.colour },
  { label: 'Status', value: vehicle.currentState.status },
  { label: 'NZ plate', value: vehicle.plate },
  { label: 'Purchase price', value: `${vehicle.currency} $${vehicle.purchasePrice.toLocaleString()}` },
]

// Specs used in the homepage SpecsSection (subset — key numbers only)
export const homepageSpecs = [
  { value: vehicle.engine.code, label: 'Engine Code' },
  { value: vehicle.engine.displacement, label: 'Displacement' },
  { value: `${vehicle.engine.power.hp} hp`, label: 'Peak Power' },
  { value: `${vehicle.engine.torque.lbft} lb-ft`, label: 'Peak Torque' },
  { value: 'A340E', label: 'Transmission' },
  { value: vehicle.drivetrain.layout, label: 'Drivetrain' },
  { value: vehicle.dimensions.kerbWeight, label: 'Kerb Weight' },
  { value: String(vehicle.year), label: 'Model Year' },
]
