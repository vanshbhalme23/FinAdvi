export type Specialization =
  | "investments"
  | "tax"
  | "retirement"
  | "savings"
  | "insurance"
  | "estate";

export interface Advisor {
  id: string;
  name: string;
  qualifications: string[];
  certifications: string[];
  experienceYears: number;
  expertise: Specialization[];
  hourlyFee: number;
  sessionFee: number;
  rating: number;
  reviews: number;
  city: string;
  avatarUrl?: string;
  bio: string;
}

export interface ResourceItem {
  id: string;
  type: "article" | "video" | "faq";
  title: string;
  summary: string;
  url?: string;
  category: "budgeting" | "investing" | "tax" | "retirement" | "savings";
  readMinutes?: number;
}

export interface Appointment {
  id: string;
  advisorId: string;
  clientId: string;
  datetime: string; // ISO
  status: "pending" | "confirmed" | "rejected" | "completed";
  notes?: string;
}

export const advisors: Advisor[] = [
  {
    id: "a1",
    name: "Ananya Gupta",
    qualifications: ["MBA (Finance)", "CFP"],
    certifications: ["SEBI RIA"],
    experienceYears: 8,
    expertise: ["investments", "tax", "retirement"],
    hourlyFee: 60,
    sessionFee: 45,
    rating: 4.8,
    reviews: 214,
    city: "Mumbai",
    avatarUrl: undefined,
    bio: "Helping young professionals build long-term wealth with tax-efficient strategies.",
  },
  {
    id: "a2",
    name: "Rahul Mehta",
    qualifications: ["CA", "CFA L2"],
    certifications: ["SEBI RIA"],
    experienceYears: 12,
    expertise: ["tax", "savings"],
    hourlyFee: 70,
    sessionFee: 55,
    rating: 4.6,
    reviews: 148,
    city: "Bengaluru",
    avatarUrl: undefined,
    bio: "Specialist in income tax planning and emergency fund optimisation.",
  },
  {
    id: "a3",
    name: "Priya Sharma",
    qualifications: ["CWM"],
    certifications: ["NISM XA XB"],
    experienceYears: 6,
    expertise: ["investments", "insurance"],
    hourlyFee: 50,
    sessionFee: 40,
    rating: 4.7,
    reviews: 176,
    city: "Delhi",
    avatarUrl: undefined,
    bio: "Goal-based investing with a focus on risk management and coverage.",
  },
];

export const resources: ResourceItem[] = [
  {
    id: "r1",
    type: "article",
    title: "Beginner's Guide to Budgeting",
    summary: "A practical approach to track spending and save consistently.",
    category: "budgeting",
    readMinutes: 7,
  },
  {
    id: "r2",
    type: "video",
    title: "Mutual Funds vs Index Funds",
    summary: "Understand costs, returns and which is right for you.",
    category: "investing",
    url: "https://www.youtube.com/",
    readMinutes: 10,
  },
  {
    id: "r3",
    type: "faq",
    title: "How much emergency fund do I need?",
    summary: "Most people should target 6 months of expenses in liquid assets.",
    category: "savings",
  },
];

export const appointments: Appointment[] = [
  {
    id: "ap1",
    advisorId: "a1",
    clientId: "c1",
    datetime: new Date(Date.now() + 86400000).toISOString(),
    status: "confirmed",
  },
];
