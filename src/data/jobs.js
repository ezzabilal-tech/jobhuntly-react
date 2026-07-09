export const jobs = [
  {
    id: 1,
    role: 'Social Media Assistant',
    status: 'Live',
    datePosted: '20 May 2020',
    dueDate: '24 May 2020',
    jobType: 'Fulltime',
    applicants: 10,
    needs: 4,
  },
  {
    id: 2,
    role: 'Senior Designer',
    status: 'Live',
    datePosted: '16 May 2020',
    dueDate: '24 May 2020',
    jobType: 'Fulltime',
    applicants: 100,
    needs: 10,
  },
  {
    id: 3,
    role: 'Visual Designer',
    status: 'Live',
    datePosted: '15 May 2020',
    dueDate: '24 May 2020',
    jobType: 'Freelance',
    applicants: 2,
    needs: 15,
  },
  {
    id: 4,
    role: 'Data Science',
    status: 'Closed',
    datePosted: '13 May 2020',
    dueDate: '24 May 2020',
    jobType: 'Fulltime',
    applicants: 200,
    needs: 20,
  },
  {
    id: 5,
    role: 'React Developer',
    status: 'Closed',
    datePosted: '12 May 2020',
    dueDate: '24 May 2020',
    jobType: 'Fulltime',
    applicants: 100,
    needs: 10,
  },
  {
    id: 6,
    role: 'React Developer',
    status: 'Closed',
    datePosted: '11 May 2020',
    dueDate: '23 May 2020',
    jobType: 'Fulltime',
    applicants: 100,
    needs: 10,
  },
  {
    id: 7,
    role: 'React Developer',
    status: 'Closed',
    datePosted: '10 May 2020',
    dueDate: '22 May 2020',
    jobType: 'Fulltime',
    applicants: 100,
    needs: 10,
  },
];

// Generates rich "Job Details" tab content (description, responsibilities,
// requirements, perks, sidebar facts) for a job. Falls back to demo content
// styled after the Social Media Assistant reference when a job doesn't have
// its own custom `details` object.
export function getJobDetails(job) {
  if (job.details) return job.details;

  return {
    description:
      "Stripe is looking for Social Media Marketing expert to help manage our online networks. You will be responsible for monitoring our social media channels, creating content, finding effective ways to engage the community and incentivize others to engage on our channels.",
    responsibilities: [
      'Community engagement to ensure that is supported and actively represented online',
      'Focus on social media content development and publication',
      'Marketing and strategy support',
      'Stay on top of trends on social media platforms, and suggest content ideas to the team',
      'Engage with online communities',
    ],
    whoYouAre: [
      'You get energy from people and building the ideal work environment',
      'You have a sense for beautiful spaces and office experiences',
      'You are a confident office manager, ready for added responsibilities',
      "You're detail-oriented and creative",
      "You're a growth marketer and know how to run campaigns",
    ],
    niceToHaves: [
      'Fluent in English',
      'Project management skills',
      'Copy editing skills',
    ],
    perks: [
      {
        icon: 'health',
        title: 'Full Healthcare',
        text: 'We believe in thriving communities and that starts with our team being happy and healthy.',
      },
      {
        icon: 'vacation',
        title: 'Unlimited Vacation',
        text: 'We believe you should have a flexible schedule that makes space for family, wellness, and fun.',
      },
      {
        icon: 'skill',
        title: 'Skill Development',
        text: "We believe in always learning and leveling up our skills. Whether it's a conference or online course.",
      },
      {
        icon: 'summit',
        title: 'Team Summits',
        text: 'Every 6 months we have a full team summit where we have fun, reflect, and plan for the upcoming quarter.',
      },
      {
        icon: 'remote',
        title: 'Remote Working',
        text: 'You know how you perform your best. Work from home, coffee shop or anywhere when you feel like it.',
      },
      {
        icon: 'commuter',
        title: 'Commuter Benefits',
        text: "We're grateful for all the time and energy each team member puts into getting to work every day.",
      },
      {
        icon: 'giveback',
        title: 'We give back.',
        text: 'We anonymously match any donation our employees make (up to $/€ 600) so they can support the organizations they care about most-times two.',
      },
    ],
    applyBefore: 'July 31, 2021',
    jobPostedOn: 'July 1, 2021',
    capacity: 10,
    salary: '$75k-$85k USD',
    categories: ['Marketing', 'Design'],
    requiredSkills: ['Project Management', 'Copywriting', 'English', 'Social Media Marketing', 'Copy Editing'],
  };
}