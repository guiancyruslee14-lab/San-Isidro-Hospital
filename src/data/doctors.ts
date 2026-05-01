export type Specialization = 'General Medicine' | 'Pediatrics' | 'OB-GYN' | 'Surgery' | 'Internal Medicine' | 'Emergency';

export interface Doctor {
  id: string;
  name: string;
  specialization: Specialization;
  description: string;
  availableToday: boolean;
  nextAvailable?: string; // e.g., 'Tomorrow, 9:00 AM'
  image: string;
  schedules: { day: string; time: string }[];
  hmoAccreditation?: string[];
}

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Maria Santos',
    specialization: 'General Medicine',
    description: '15+ years experience in primary care and family medicine.',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300&h=300',
    schedules: [
      { day: 'Monday - Friday', time: '8:00 AM - 5:00 PM' },
      { day: 'Saturday', time: '8:00 AM - 12:00 NN' }
    ],
    hmoAccreditation: ['Maxicare', 'Intellicare', 'PhilHealth']
  },
  {
    id: '2',
    name: 'Dr. Juan Dela Cruz',
    specialization: 'Pediatrics',
    description: 'Compassionate pediatric care from newborns to adolescents.',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300&h=300',
    schedules: [
      { day: 'Monday, Wed, Fri', time: '10:00 AM - 4:00 PM' }
    ],
    hmoAccreditation: ['Maxicare', 'PhilHealth']
  },
  {
    id: '3',
    name: 'Dr. Elena Reyes',
    specialization: 'OB-GYN',
    description: "Specializes in maternal health and women's wellness.",
    availableToday: false,
    nextAvailable: 'Tomorrow, 9:00 AM',
    image: 'https://images.unsplash.com/photo-1594824436951-7f12bc00a7e4?auto=format&fit=crop&q=80&w=300&h=300',
    schedules: [
      { day: 'Tuesday, Thursday', time: '9:00 AM - 3:00 PM' },
      { day: 'Saturday', time: '1:00 PM - 5:00 PM' }
    ],
    hmoAccreditation: ['Intellicare', 'MediCard']
  },
  {
    id: '4',
    name: 'Dr. Roberto Mendoza',
    specialization: 'Surgery',
    description: 'Expert general surgeon with extensive experience.',
    availableToday: false,
    nextAvailable: 'Wednesday, 8:00 AM',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300&h=300',
    schedules: [
      { day: 'Monday, Wednesday', time: '8:00 AM - 12:00 NN' }
    ],
    hmoAccreditation: []
  },
  {
    id: '5',
    name: 'Dr. Anna Villanueva',
    specialization: 'Internal Medicine',
    description: 'Dedicated to diagnosing and treating adult diseases.',
    availableToday: true,
    image: 'https://images.unsplash.com/photo-1527613426406-8c4d3db258f2?auto=format&fit=crop&q=80&w=300&h=300',
    schedules: [
      { day: 'Monday - Saturday', time: '1:00 PM - 6:00 PM' }
    ],
    hmoAccreditation: ['Maxicare', 'ValuCare', 'PhilHealth']
  }
];
