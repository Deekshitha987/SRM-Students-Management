
import axios from 'axios';
import { Member } from '../types/member';

// This is a mock API service that would be replaced with actual backend calls
const API_URL = '/api';

// Mocked team data (would come from backend in production)
const mockMembers: Member[] = [
  {
    id: '1',
    name: 'Jane Smith',
    role: 'Team Lead',
    email: 'jane.smith@example.com',
    phone: '(555) 123-4567',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    department: 'Engineering',
    joinDate: '2021-03-15',
    bio: 'Jane is an experienced team lead with expertise in React and Node.js development.'
  },
  {
    id: '2',
    name: 'John Doe',
    role: 'Frontend Developer',
    email: 'john.doe@example.com',
    phone: '(555) 987-6543',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    department: 'Engineering',
    joinDate: '2022-01-10',
    bio: 'John specializes in creating beautiful user interfaces with React and Tailwind CSS.'
  },
  {
    id: '3',
    name: 'Emily Johnson',
    role: 'Backend Developer',
    email: 'emily.johnson@example.com',
    phone: '(555) 567-8901',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    department: 'Engineering',
    joinDate: '2021-11-05',
    bio: 'Emily has extensive experience with Node.js and MongoDB database design.'
  }
];

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
