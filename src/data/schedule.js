// Demo calendar data for the "My Schedule" page.
// Days are represented 0 (Sun) - 6 (Sat) within the reference week (23-29 Nov 2021).

export const scheduleCategories = [
  { key: 'interview', label: 'Interview Schedule', color: '#4640de', checked: true },
  { key: 'internal', label: 'Internal Meeting', color: '#56cdad', checked: true },
  { key: 'team', label: 'Team Schedule', color: '#ffb836', checked: false },
  { key: 'task', label: 'My Task', color: '#f24d4d', checked: false },
  { key: 'reminder', label: 'Reminders', color: '#56b8de', checked: false },
];

export const weekDays = [
  { label: 'SUN', date: 23 },
  { label: 'MON', date: 24 },
  { label: 'TUE', date: 25 },
  { label: 'WED', date: 26 },
  { label: 'THU', date: 27, holiday: true },
  { label: 'FRI', date: 28 },
  { label: 'SAT', date: 29 },
];

// hour is in 24h format (e.g. 2 = 2 AM, 14 = 2 PM), duration in hours (supports decimals).
export const scheduleEvents = [
  {
    id: 'e1',
    dayIndex: 1, // Monday
    category: 'interview',
    title: 'Interview session with Kathryn Murphy',
    startHour: 2,
    endHour: 4,
    time: '02.00 - 04.00 AM',
    avatars: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    ],
  },
  {
    id: 'e2',
    dayIndex: 1, // Monday
    category: 'interview',
    title: 'Interview session with...',
    startHour: 8,
    endHour: 9,
    time: '08.00 - 09.00 AM',
    avatars: [],
  },
  {
    id: 'e3',
    dayIndex: 3, // Wednesday
    category: 'internal',
    title: 'Meeting with s...',
    startHour: 9,
    endHour: 10,
    time: '09.00 - 10.00 AM',
    avatars: [],
  },
];