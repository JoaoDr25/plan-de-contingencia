import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  formatDate,
  formatHour,
  formatTime,
  getCurrentDate,
  getDateOnly,
} from 'src/utils/date.utils'

afterEach(() => vi.useRealTimers())
describe('date.utils', () => {
  it('normaliza fecha sin hora al formato de los filtros sin desplazar el dia', () => {
    expect(getDateOnly('2026-08-10')).toBe('2026-08-10')
  })
  it.each([null, undefined, '', 'invalid', new Date('invalid')])(
    'no inventa un dia para fechas ausentes o invalidas: %s',
    (value) => {
      expect(getDateOnly(value)).toBe('')
    },
  )
  it.each(['2026-08-12T00:30:00Z', '2026-08-12T23:30:00-05:00'])(
    'el dia del filtro coincide con la fecha mostrada para %s',
    (value) => {
      const [day, month, year] = formatDate(value).split('/')
      expect(getDateOnly(value)).toBe(`${year}-${month}-${day}`)
    },
  )
  it('incluye medianoche y el ultimo milisegundo del mismo dia local', () => {
    expect(getDateOnly(new Date(2026, 7, 12, 0, 0, 0))).toBe('2026-08-12')
    expect(getDateOnly(new Date(2026, 7, 12, 23, 59, 59, 999))).toBe('2026-08-12')
  })
  it('fecha sin hora conserva dia sin desplazamiento de zona horaria', () => {
    expect(formatDate('2026-08-10')).toBe('10/08/2026')
  })
  it.each([null, undefined, '', 'invalid'])('fecha y hora ausentes o invalidas: %s', (value) => {
    expect(formatDate(value)).toBe('')
    expect(formatTime(value)).toBe('')
  })
  it('formatea timestamp usando el formato de fecha del sistema', () => {
    const date = new Date('2026-08-10T15:00:00Z')
    expect(formatDate(date)).toBe(
      new Intl.DateTimeFormat('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date),
    )
  })
  it('hora de un timestamp se presenta en America/Bogota', () => {
    const date = new Date('2026-08-10T15:00:00Z')
    expect(formatTime(date)).toBe(
      new Intl.DateTimeFormat('es-CO', {
        timeZone: 'America/Bogota',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }).format(date),
    )
  })
  it.each([
    ['00:00', '12:00 a. m.'],
    ['12:00', '12:00 p. m.'],
    ['13:05', '01:05 p. m.'],
    ['09:30', '09:30 a. m.'],
    ['', ''],
    ['invalid', 'invalid'],
  ])('formatea %s', (input, output) => {
    expect(formatHour(input)).toBe(output)
  })
  it('fecha actual es controlable con reloj simulado', () => {
    vi.useFakeTimers()
    const now = new Date('2026-08-10T15:00:00Z')
    vi.setSystemTime(now)
    expect(getCurrentDate()).toBe(
      now.toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    )
  })
})
