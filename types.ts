
export interface Company {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  website: string;
  logoUrl: string;
  joinedDate?: string;
  village?: string;
  commune?: string;
  district?: string;
  province?: string;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  role: string;
  companyName: string;
  createdAt: string;
  joinedDate?: string;
  avatarUrl: string;
  gender?: string;
}

export interface Meter {
  id: string;
  serial: string;
  name: string;
  ration: string;
  brand: string;
  type: string;
  group: string;
  trCap: string;
  trBrand: string;
  company: string;
  createdAt: string;
}

export type Tab = 'Company' | 'User' | 'Upload' | 'Dashboard';
