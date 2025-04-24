// Types
export interface Startup {
  id: string;
  name: string;
  description: string;
  companyUrl: string;
  location: string;
  opportunityType: 'Actively Hiring' | 'Looking for';
  opportunities: string[];
  impactAreas: string[];
  imageUrl: string;
  tags?: string[];
}

export interface EmailSubscription {
  email: string;
}
