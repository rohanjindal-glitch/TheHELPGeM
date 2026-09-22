export type ResultStatus = 'PASS' | 'FAIL' | 'MISSING' | 'REVIEW' | 'UNVERIFIED';
export type Recommendation = 'COMPLIANT' | 'NON-COMPLIANT' | 'INCOMPLETE' | 'MANUAL REVIEW';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type View = 'welcome' | 'dashboard' | 'registry' | 'setup' | 'requirements' | 'processing' | 'comparison' | 'bidder' | 'review' | 'decision' | 'audit' | 'reports';

export interface Requirement {
  id: string;
  title: string;
  rule: string;
  mandatory: boolean;
  checkType: string;
  operator: string;
  threshold: string;
  unit: string;
  sourceClause: string;
  document: string;
  page: number;
}

export interface EvidenceValue {
  value: string;
  document: string;
  page: number;
  evidence: string;
  confidence: number;
}

export interface Finding {
  requirementId: string;
  requirement: string;
  mandatory: boolean;
  status: ResultStatus;
  requiredValue: string;
  extractedValues: EvidenceValue[];
  reason: string;
  requiresHumanReview: boolean;
}

export interface SecurityWarning {
  title: string;
  detectedText: string;
  document: string;
  page: number;
  action: string;
  recommendation: string;
}

export interface Bidder {
  id: string;
  name: string;
  shortName: string;
  recommendation: Recommendation;
  risk: RiskLevel;
  findings: Finding[];
  warnings: SecurityWarning[];
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  type: 'UPLOAD' | 'EXTRACTION' | 'REQUIREMENT_EDIT' | 'EVALUATION' | 'WARNING' | 'DECISION';
  detail: string;
}

export interface OfficerDecision {
  bidderId: string;
  decision: 'Qualified' | 'Disqualified' | 'Send for Clarification';
  reason: string;
  officer: string;
  timestamp: string;
}
