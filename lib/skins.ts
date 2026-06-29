export type SkinKey = 'heritage' | 'cinematic' | 'chrome'

export interface SkinScene {
  background: [string, string]
  exposure: number
  ambient: { color: string; intensity: number }
  key:  { color: string; intensity: number; pos: [number, number, number] }
  fill: { color: string; intensity: number; pos: [number, number, number] }
  rim:  { color: string; intensity: number; pos: [number, number, number] }
  fog:  { color: string; near: number; far: number }
  floor: { color: string; metalness: number; roughness: number; opacity: number }
  envIntensity: number
}

export interface Skin {
  key: SkinKey
  name: string
  tagline: string
  blurb: string
  fontDisplay: string
  fontBody: string
  fontMono: string
  css: Record<string, string>
  scene: SkinScene
}

export const SKINS: Record<SkinKey, Skin> = {
  heritage: {
    key: 'heritage',
    name: 'Heritage',
    tagline: 'Retro-JDM · period-correct',
    blurb: 'Warm bone paper, vintage racing livery, analog-gauge graphics.',
    fontDisplay: 'var(--font-saira-cond)',
    fontBody:    'var(--font-saira)',
    fontMono:    'var(--font-jetbrains)',
    css: {
      '--bg':        '#EBE2CF',
      '--bg2':       '#E0D4B9',
      '--surface':   'rgba(42,32,24,0.045)',
      '--surface-2': 'rgba(42,32,24,0.07)',
      '--ink':       '#2A211A',
      '--ink-soft':  '#6E5F4D',
      '--ink-faint': '#9A8B73',
      '--line':      'rgba(42,32,24,0.16)',
      '--line-soft': 'rgba(42,32,24,0.08)',
      '--accent':    '#BF4A23',
      '--accent-2':  '#9A7B2E',
      '--on-accent': '#F4ECDB',
      '--glass-bg':  'rgba(235,226,207,0.62)',
      '--glass-bd':  'rgba(42,32,24,0.14)',
      '--grain':     '0.10',
      '--vignette':  '0',
      '--scanline':  '0',
      '--radius':    '4px',
      '--blur':      '2px',
    },
    scene: {
      background: ['#EFE7D6', '#DCCDAE'],
      exposure: 1.12,
      ambient: { color: '#fff3da', intensity: 0.85 },
      key:  { color: '#ffe7b0', intensity: 2.4, pos: [5, 8, 5] },
      fill: { color: '#bcae90', intensity: 0.7, pos: [-6, 3, -4] },
      rim:  { color: '#ffffff', intensity: 1.3, pos: [-3, 6, -6] },
      fog:  { color: '#e7dcc4', near: 9, far: 26 },
      floor: { color: '#cdbf9f', metalness: 0.0, roughness: 0.85, opacity: 0.9 },
      envIntensity: 0.55,
    },
  },
  cinematic: {
    key: 'cinematic',
    name: 'Cinematic',
    tagline: 'Warm dusk · photographic',
    blurb: 'Golden-hour grade, film grain, editorial serif, deep shadow.',
    fontDisplay: 'var(--font-instrument-serif)',
    fontBody:    'var(--font-newsreader)',
    fontMono:    'var(--font-jetbrains)',
    css: {
      '--bg':        '#17120F',
      '--bg2':       '#1E1712',
      '--surface':   'rgba(255,240,220,0.045)',
      '--surface-2': 'rgba(255,240,220,0.08)',
      '--ink':       '#F3E9DC',
      '--ink-soft':  '#B9A98F',
      '--ink-faint': '#7C6E5C',
      '--line':      'rgba(243,233,220,0.14)',
      '--line-soft': 'rgba(243,233,220,0.07)',
      '--accent':    '#E58E3C',
      '--accent-2':  '#C25A3A',
      '--on-accent': '#1A130D',
      '--glass-bg':  'rgba(30,23,18,0.55)',
      '--glass-bd':  'rgba(243,233,220,0.12)',
      '--grain':     '0.16',
      '--vignette':  '0.55',
      '--scanline':  '0',
      '--radius':    '3px',
      '--blur':      '10px',
    },
    scene: {
      background: ['#23170E', '#0C0907'],
      exposure: 1.05,
      ambient: { color: '#3a2a1c', intensity: 0.55 },
      key:  { color: '#ffb267', intensity: 3.2, pos: [6, 5, 4] },
      fill: { color: '#3d4f7a', intensity: 0.5, pos: [-6, 3, -5] },
      rim:  { color: '#ffd9a3', intensity: 2.4, pos: [-4, 7, -6] },
      fog:  { color: '#160f0a', near: 8, far: 24 },
      floor: { color: '#120c08', metalness: 0.45, roughness: 0.35, opacity: 1 },
      envIntensity: 0.5,
    },
  },
  chrome: {
    key: 'chrome',
    name: 'Chrome',
    tagline: 'Y2K · iridescent HUD',
    blurb: 'Champagne chrome, glass HUD panels, mirror floor, scanlines.',
    fontDisplay: 'var(--font-archivo)',
    fontBody:    'var(--font-archivo)',
    fontMono:    'var(--font-spline-mono)',
    css: {
      '--bg':        '#201B17',
      '--bg2':       '#2A231D',
      '--surface':   'rgba(232,214,190,0.06)',
      '--surface-2': 'rgba(232,214,190,0.10)',
      '--ink':       '#F0E7DA',
      '--ink-soft':  '#C3B49E',
      '--ink-faint': '#867663',
      '--line':      'rgba(240,231,218,0.16)',
      '--line-soft': 'rgba(240,231,218,0.08)',
      '--accent':    '#DBA968',
      '--accent-2':  '#C98E6B',
      '--on-accent': '#1B140E',
      '--glass-bg':  'rgba(38,31,25,0.66)',
      '--glass-bd':  'rgba(240,231,218,0.26)',
      '--grain':     '0.06',
      '--vignette':  '0.35',
      '--scanline':  '0.5',
      '--radius':    '2px',
      '--blur':      '16px',
    },
    scene: {
      background: ['#2A231C', '#100C09'],
      exposure: 1.18,
      ambient: { color: '#bfae93', intensity: 0.7 },
      key:  { color: '#fff0d6', intensity: 3.0, pos: [5, 7, 5] },
      fill: { color: '#d9b78a', intensity: 0.9, pos: [-6, 4, -4] },
      rim:  { color: '#ffe9c4', intensity: 3.2, pos: [-3, 6, -7] },
      fog:  { color: '#15100c', near: 9, far: 26 },
      floor: { color: '#0c0907', metalness: 0.95, roughness: 0.08, opacity: 1 },
      envIntensity: 1.15,
    },
  },
}

export const SKIN_ORDER: SkinKey[] = ['heritage', 'cinematic', 'chrome']
