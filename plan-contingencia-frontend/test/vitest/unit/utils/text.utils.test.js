import { describe, expect, it } from 'vitest'
import { toSentenceCase, toTitleCase } from 'src/utils/text.utils'

describe('text.utils', () => {
  it.each([
    ['PRODUCCIÓN AGROPECUARIA', 'Producción Agropecuaria'],
    ['visita (técnica)', 'Visita (Técnica)'],
    ['sur-occidente', 'Sur-Occidente'],
  ])('capitaliza titulo: %s', (value, expected) => {
    expect(toTitleCase(value)).toBe(expected)
  })
  it('normaliza oracion y espacios externos', () => {
    expect(toSentenceCase('  VISITA TÉCNICA  ')).toBe('Visita técnica')
  })
  it.each([null, undefined, 123, '', '   '])(
    'conserva entradas no textuales o vacias: %s',
    (value) => {
      expect(toTitleCase(value)).toBe(value)
      expect(toSentenceCase(value)).toBe(value)
    },
  )
})
