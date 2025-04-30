
import { Member } from '../types/member';

// This is a mock API service that would be replaced with actual backend calls
const API_URL = '/api';

// Mocked team data (would come from backend in production)
const mockMembers: Member[] = [];

// In a real application, these would make actual API calls
export const fetchMembers = async (): Promise<Member[]> => {
  // In production: return (await axios.get(`${API_URL}/members`)).data;
  return new Promise(resolve => {
    setTimeout(() => resolve(mockMembers), 500);
  });
};

export const fetchMemberById = async (id: string): Promise<Member> => {
  // In production: return (await axios.get(`${API_URL}/members/${id}`)).data;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const member = mockMembers.find(m => m.id === id);
      if (member) {
        resolve(member);
      } else {
        reject(new Error('Member not found'));
      }
    }, 500);
  });
};

export const createMember = async (member: Omit<Member, 'id'>): Promise<Member> => {
  // In production: return (await axios.post(`${API_URL}/members`, member)).data;
  return new Promise(resolve => {
    const newMember = {
      id: String(Date.now()),
      ...member
    };
    mockMembers.push(newMember);
    setTimeout(() => resolve(newMember), 500);
  });
};
