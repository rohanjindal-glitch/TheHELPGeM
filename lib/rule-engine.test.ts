import { describe, expect, it } from 'vitest';
import { calculateRecommendation, certificateValidity, compareThreshold, detectConflict, normalizeCurrency, normalizeDuration } from './rule-engine';

describe('deterministic procurement rules', () => {
  it('normalizes lakh and crore values', () => {
    expect(normalizeCurrency(6, 'crore INR')).toBe(60_000_000);
    expect(normalizeCurrency(500, 'lakh')).toBe(50_000_000);
  });
  it('handles inclusive turnover thresholds', () => {
    expect(compareThreshold(normalizeCurrency(5, 'crore'), '>=', normalizeCurrency(5, 'crore'))).toBe('PASS');
    expect(compareThreshold(normalizeCurrency(4.99, 'crore'), '>=', normalizeCurrency(5, 'crore'))).toBe('FAIL');
  });
  it('normalizes delivery duration boundaries', () => {
    expect(compareThreshold(normalizeDuration(12, 'weeks'), '<=', 90)).toBe('PASS');
    expect(compareThreshold(91, '<=', 90)).toBe('FAIL');
  });
  it('checks certificate validity inclusively', () => {
    expect(certificateValidity('2026-09-30', '2026-09-30')).toBe('PASS');
    expect(certificateValidity('2026-09-29', '2026-09-30')).toBe('FAIL');
  });
  it('detects conflicts and applies recommendation precedence', () => {
    expect(detectConflict([{ value:6, reliable:true }, { value:4.2, reliable:true }])).toBe(true);
    expect(calculateRecommendation([{ mandatory:true, status:'MISSING' }, { mandatory:true, status:'REVIEW' }])).toBe('INCOMPLETE');
    expect(calculateRecommendation([{ mandatory:true, status:'FAIL' }, { mandatory:true, status:'MISSING' }])).toBe('NON-COMPLIANT');
  });
});
