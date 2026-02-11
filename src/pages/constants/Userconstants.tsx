
import { User } from '../../../types';

const generateUsers = (count: number): User[] => {
  const baseUsers: User[] = [
    {
      id: 'u1',
      name: 'KAAM SOMNOR',
      phone: '+855-71-6512-180',
      email: 'kaamsomnor@vpstart.com',
      address: 'Phnom Penh',
      role: 'User',
      companyName: 'KAAM SOMNOR DEVLPMENT CO.,LTD',
      createdAt: '23-01-2026',
      joinedDate: '23-01-2026',
      avatarUrl: 'https://i.pravatar.cc/150?u=kaam',
      gender: 'Male'
    },
    {
      id: 'u2',
      name: 'SOPHEAK TRA',
      phone: '+855-12-888-999',
      email: 'sopheak.tra@vpstart.com',
      address: 'Kandal',
      role: 'Admin',
      companyName: 'KAAM SOMNOR DEVLPMENT CO.,LTD',
      createdAt: '23-01-2026',
      joinedDate: '23-01-2026',
      avatarUrl: 'https://i.pravatar.cc/150?u=tra',
      gender: 'Male'
    },
    {
      id: 'u3',
      name: 'ANG SNOL',
      phone: '+855-71-478-475',
      email: 'electricityangsnol@vpstart.com',
      address: 'Phnom Penh',
      role: 'User',
      companyName: 'TNAL BEK CHACAR LUE ELECTRICITY',
      createdAt: '23-01-2026',
      joinedDate: '23-01-2026',
      avatarUrl: 'https://i.pravatar.cc/150?u=ang',
      gender: 'Female'
    }
  ];

  const results: User[] = [];
  // Ensure we have users for the specific companies from screenshot
  results.push(...baseUsers);
  
  for (let i = 3; i < count; i++) {
    const base = baseUsers[i % baseUsers.length];
    results.push({
      ...base,
      id: `u${i + 1}`,
      name: `${base.name} ${Math.floor(i / baseUsers.length)}`,
      joinedDate: '23-01-2026'
    });
  }
  return results;
};

export const MOCK_USERS: User[] = generateUsers(45);
