import { describe, expect, it } from 'vitest'
import { maxLength, minLength, onlyLetters, phone, required } from 'src/validators/form.validator'

describe('form.validator', () => {
  it.each([null, undefined, '', '  '])('required rechaza vacios: %s', (value) => {
    expect(required(value)).not.toBe(true)
  })
  it.each([0, false, 'Texto'])('required acepta valores presentes: %s', (value) => {
    expect(required(value)).toBe(true)
  })
  it('longitudes son inclusivas en los limites', () => {
    expect(minLength(3)('ab')).not.toBe(true)
    expect(minLength(3)('abc')).toBe(true)
    expect(maxLength(3)('abc')).toBe(true)
    expect(maxLength(3)('abcd')).not.toBe(true)
    expect(maxLength(3)(null)).toBe(true)
  })
  it('solo letras acepta acentos y rechaza numeros', () => {
    expect(onlyLetters('María Muñoz')).toBe(true)
    expect(onlyLetters('Maria123')).not.toBe(true)
    expect(onlyLetters('')).toBe(true)
  })
  it.each([
    ['123456', false],
    ['1234567', true],
    ['1234567890', true],
    ['12345678901', false],
    ['123-4567', false],
    ['', true],
  ])('valida limites de telefono %s', (value, valid) => {
    expect(phone(value) === true).toBe(valid)
  })
})
