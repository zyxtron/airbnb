export const ROOMS = [1, 2, 3, 4] as const
export const DAYS_OF_WEEK = ['Va', 'Hé', 'Ke', 'Sze', 'Csü', 'Pé', 'Szo'] as const
export const DATE_FORMAT = 'yyyy-MM-dd HH:mm'

export const STATUSES = new Map<string, string>([
  ['SENT', 'Elküldve'],
  ['IN_PROGRESS', 'Folyamatban'],
  ['DONE', 'Kész'],
  ['ARCHIVED', 'Archiválva']
])

export const ROLES = new Map<string, string>([
  ['ADMIN', 'Admin'],
  ['TICKET_ADMIN', 'Hibajegy admin'],
  ['USER', 'Felhasználó'],
])
