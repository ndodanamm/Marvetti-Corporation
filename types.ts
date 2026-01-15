
import React from 'react';

export interface PricingTier {
  name: string;
  description: string;
  price: string;
}

export interface ServiceItem {
  id: string;
  category: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  tools: string[];
  packages: PricingTier[];
  startingPrice: string;
  icon: React.ReactNode;
  color: string;
}

export interface StandaloneService {
  id: string;
  title: string;
  price: string;
  description: string;
  deliveryTime: string;
  icon: React.ReactNode;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  serviceId: string;
  title: string;
  client: string;
  description: string;
  fullChallenge: string;
  fullSolution: string;
  image: string;
  templateImage: string;
  marketingImage: string;
  tag: string;
  stats: ProjectStat[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface RecommendationResult {
  categoryName: string;
  reason: string;
  suggestedSteps: string[];
  estimatedCost: string;
}
