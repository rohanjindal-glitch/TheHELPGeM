import type { Finding, Recommendation, ResultStatus, RiskLevel } from './domain';

export function normalizeCurrency(value: number, unit: string): number {
  const normalized = unit.toLowerCase().replace(/₹|inr|rupees?/g, '').trim();
  if (normalized.includes('crore') || normalized === 'cr') return value * 10_000_000;
  if (normalized.includes('lakh') || normalized.includes('lac')) return value * 100_000;
  return value;
}

export function compareThreshold(actual: number, operator: string, required: number): ResultStatus {
  const matched = operator === '>=' ? actual >= required : operator === '<=' ? actual <= required : operator === '>' ? actual > required : operator === '<' ? actual < required : actual === required;
  return matched ? 'PASS' : 'FAIL';
}

export function normalizeDuration(value: number, unit: string): number {
  const u = unit.toLowerCase();
  if (u.startsWith('week')) return value * 7;
  if (u.startsWith('month')) return value * 30;
  if (u.startsWith('year')) return value * 365;
  return value;
}

export function parseDate(value: string): Date | null {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function certificateValidity(expiry: string, closingDate: string): ResultStatus {
  const end = parseDate(expiry);
  const close = parseDate(closingDate);
  if (!end || !close) return 'REVIEW';
  return end >= close ? 'PASS' : 'FAIL';
}

export function normalizeIdentity(value: string): string {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, '');
}

export function checkDocumentPresence(files: string[], matcher: RegExp): ResultStatus {
  return files.some((file) => matcher.test(file)) ? 'PASS' : 'MISSING';
}

export function detectConflict(values: Array<{ value: number; reliable: boolean }>): boolean {
  const reliable = values.filter((item) => item.reliable).map((item) => item.value);
  return new Set(reliable).size > 1;
}

export function calculateRecommendation(findings: Pick<Finding, 'mandatory' | 'status'>[]): Recommendation {
  const mandatory = findings.filter((finding) => finding.mandatory);
  if (mandatory.some((finding) => finding.status === 'FAIL')) return 'NON-COMPLIANT';
  if (mandatory.some((finding) => finding.status === 'MISSING')) return 'INCOMPLETE';
  if (mandatory.some((finding) => finding.status === 'REVIEW' || finding.status === 'UNVERIFIED')) return 'MANUAL REVIEW';
  return 'COMPLIANT';
}

export function calculateRiskLevel(findings: Pick<Finding, 'status'>[], warningCount = 0): RiskLevel {
  const reviewCount = findings.filter((finding) => finding.status === 'REVIEW' || finding.status === 'UNVERIFIED').length;
  if (warningCount > 1 || findings.some((finding) => finding.status === 'FAIL') || reviewCount > 1) return 'HIGH';
  if (warningCount === 1 || reviewCount === 1 || findings.some((finding) => finding.status === 'MISSING')) return 'MEDIUM';
  return 'LOW';
}
