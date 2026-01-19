
import React from 'react';

export interface PricingTier {
  name: string;
  description: string;
  price: string;
}

export interface ServiceStage {
  id: string;
  stageNumber: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  priceDisplay: string;
  fixedPrice?: number;
  fromPrice?: number;
  icon: React.ReactNode;
  color: string;
  questions: QuestionnaireField[];
}

// Added to fix "Module '../types' has no exported member 'RecommendationResult'"
export interface RecommendationResult {
  categoryName: string;
  reason: string;
  suggestedSteps: string[];
  estimatedCost: string;
}

// Added to fix "Module '../types' has no exported member 'Project'"
export interface Project {
  id: string;
  title: string;
  client: string;
  description: string;
  tag: string;
  image: string;
  serviceId: string;
  fullChallenge: string;
  fullSolution: string;
  templateImage: string;
  marketingImage: string;
  stats: ProjectStat[];
}

export interface ServicePackage {
  name: string;
  price: string;
  description: string;
}

// Added to fix "Module '../types' has no exported member 'ServiceItem'"
export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  icon: React.ReactNode;
  color: string;
  tools: string[];
  packages: ServicePackage[];
  startingPrice: string;
}

export interface QuestionnaireField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'checkbox';
  options?: string[];
  required: boolean;
}

export interface Order {
  id: string;
  clientId: string;
  stageId: string;
  status: 'Pending' | 'Questionnaire' | 'AI_Generating' | 'Sandbox_Preview' | 'Awaiting_Approval' | 'Payment_Pending' | 'In_Progress' | 'Review' | 'Completed';
  inputs: Record<string, any>;
  aiOutput?: string;
  regenerationsUsed: number;
  maxRegenerations: number;
  totalInvestment: string;
  timestamp: string;
  humanQCCheck: boolean;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  businessName: string;
  tier: 'Standard' | 'Premium' | 'Enterprise';
  createdAt: string;
  completedStages: number[];
}

export interface StaffUser {
  id: string;
  name: string;
  role: 'Admin' | 'Strategist' | 'Engineer';
  email: string;
  accessLevel: number;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  service: string;
  status: 'New' | 'Contacted' | 'Proposal' | 'Closed';
  timestamp: string;
}
