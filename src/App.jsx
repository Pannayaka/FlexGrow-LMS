import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Home, BookOpen, Compass, Briefcase, User, Users, BarChart2, Bell, Settings,
  Search, ChevronRight, ChevronDown, Play, CheckCircle2, Star, Clock, MapPin,
  Award, TrendingUp, Target, Zap, Filter, X, ArrowRight, ArrowLeft, Video,
  Calendar, MessageSquare, Download, Bookmark, FileText, Plus, LogOut,
  Sparkles, GraduationCap, Layers, PieChart, AlertTriangle, ThumbsUp,
  Building2, Mail, Lock, ChevronUp, Menu, Circle, CheckCircle, Info,
  ExternalLink, Send, RefreshCw, Trash2, Edit3, UserCheck, Rocket,
  BadgeCheck, Gauge, ListChecks, FolderKanban, Globe2, ShieldCheck
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Legend, LineChart, Line
} from "recharts";
import "./index.css";

/* =========================================================================
   FLEX-Grow Academy — Enterprise Learning & Talent Mobility Platform
   Single-file interactive prototype.
   ========================================================================= */

/* -------------------------------------------------------------------------
   MOCK DATA
   ------------------------------------------------------------------------- */

const DEPARTMENTS = [
  "Digital Technology", "Human Resources", "Finance", "Marketing",
  "Operations", "Business Development"
];

const SKILL_LIBRARY = [
  "Python", "SQL", "Advanced SQL", "Data Analytics", "Data Visualization",
  "Power BI", "Tableau", "Statistics", "Leadership", "Communication",
  "Stakeholder Management", "Project Management", "Agile", "AI",
  "Machine Learning", "Digital Transformation", "Business Strategy",
  "Cybersecurity Awareness"
];

const CURRENT_USER = {
  id: "u-anggun",
  name: "Anggun Valentine",
  role: "Data Analyst",
  department: "Digital Technology",
  level: "Level 2",
  tenure: "2 yrs 4 mos",
  location: "Surakarta, ID",
  workMode: "Hybrid",
  careerGoal: "Senior Data Analyst",
  avatarInitials: "SV",
  mobility: "Open to internal projects",
  availability: "6–8 hrs/week"
};

const TEAM = [
  { id: "u-andi", name: "Andi Pratama", role: "Business Analyst", department: "Digital Technology", initials: "AP", learning: 64, competency: 71, gaps: ["Advanced SQL", "Leadership"] },
  { id: "u-rizky", name: "Rizky Ramadhan", role: "Data Engineer", department: "Digital Technology", initials: "RR", learning: 88, competency: 82, gaps: ["Stakeholder Management"] },
  { id: "u-nadia", name: "Nadia Putri", role: "Product Analyst", department: "Digital Technology", initials: "NP", learning: 45, competency: 58, gaps: ["Python", "AI"] },
  { id: "u-bima", name: "Bima Santoso", role: "Data Analyst", department: "Digital Technology", initials: "BS", learning: 91, competency: 76, gaps: ["Communication"] },
  { id: "u-anggun", name: "Anggun Valentine", role: "Data Analyst", department: "Digital Technology", initials: "AV", learning: 72, competency: 78, gaps: ["Advanced SQL"] },
];

const COURSES = [
  {
    id: "c-ada", title: "Advanced Data Analytics", category: "Data & Analytics",
    instructor: "Dewi Anggraini", instructorRole: "Principal Data Scientist",
    duration: "8h 30m", level: "Intermediate", rating: 4.8, learners: 1248,
    format: "Self-paced", progress: 65, saved: false,
    thumbnail: "analytics", skillsGained: ["Data Analytics", "Statistics", "Data Visualization"],
    description: "Move from descriptive to predictive analysis. Build the statistical and visualization fluency needed to turn raw datasets into decisions stakeholders trust.",
    outcomes: ["Frame a business question as an analytical hypothesis", "Apply statistical tests to validate findings", "Design dashboards that drive decisions, not just report numbers"],
    curriculum: [
      { title: "Introduction to Applied Analytics", minutes: 25 },
      { title: "Data Fundamentals & Quality", minutes: 40 },
      { title: "Data Cleaning at Scale", minutes: 55 },
      { title: "Exploratory Analysis Techniques", minutes: 70 },
      { title: "Visualization for Decision-Makers", minutes: 60 },
      { title: "Business Case: Retail Churn", minutes: 65 },
      { title: "Final Project: Executive Brief", minutes: 55 },
    ],
    careerRelevance: "Supports Data Analyst → Senior Data Analyst.",
    reviews: [
      { name: "Bima Santoso", rating: 5, text: "The retail churn case study mirrors what we actually see in our reporting." },
      { name: "Nadia Putri", rating: 4, text: "Dense but practical — I used the visualization module the same week." },
    ],
  },
  {
    id: "c-apm", title: "Agile Project Management", category: "Project Management",
    instructor: "Farah Hutapea", instructorRole: "Head of PMO",
    duration: "6h 10m", level: "Beginner", rating: 4.6, learners: 2110,
    format: "Blended", progress: 40, saved: true,
    thumbnail: "agile", skillsGained: ["Project Management", "Agile", "Communication"],
    description: "Run sprints, manage backlogs, and keep cross-functional teams aligned using an agile operating rhythm suited to internal projects.",
    outcomes: ["Plan and run a two-week sprint cycle", "Write and prioritize a product backlog", "Facilitate retrospectives that lead to real change"],
    curriculum: [
      { title: "Agile Foundations", minutes: 30 },
      { title: "Backlog & Prioritization", minutes: 45 },
      { title: "Sprint Planning Workshop (Live)", minutes: 60 },
      { title: "Facilitation & Ceremonies", minutes: 35 },
      { title: "Mentoring Circle: Common Pitfalls", minutes: 40 },
    ],
    careerRelevance: "Supports readiness for Analytics Lead.",
    reviews: [{ name: "Andi Pratama", rating: 5, text: "The live sprint planning workshop was worth the whole course." }],
  },
  {
    id: "c-le", title: "Leadership Essentials", category: "Leadership",
    instructor: "Yusuf Kamal", instructorRole: "VP People Development",
    duration: "5h 45m", level: "Beginner", rating: 4.7, learners: 3320,
    format: "Blended", progress: 20, saved: false,
    thumbnail: "leadership", skillsGained: ["Leadership", "Communication"],
    description: "Foundational people-leadership skills for individual contributors preparing to lead projects or teams.",
    outcomes: ["Give feedback that lands", "Delegate without losing accountability", "Lead a cross-functional meeting with confidence"],
    curriculum: [
      { title: "From Contributor to Influencer", minutes: 25 },
      { title: "Feedback & Coaching Conversations", minutes: 40 },
      { title: "Delegation Frameworks", minutes: 30 },
      { title: "Live Mentoring Roundtable", minutes: 45 },
    ],
    careerRelevance: "Required competency for Analytics Lead and above.",
    reviews: [{ name: "Rizky Ramadhan", rating: 4, text: "Practical scripts for feedback conversations I use weekly." }],
  },
  {
    id: "c-pfb", title: "Python for Business", category: "Data & Analytics",
    instructor: "Dewi Anggraini", instructorRole: "Principal Data Scientist",
    duration: "9h 00m", level: "Intermediate", rating: 4.9, learners: 1876,
    format: "Self-paced", progress: 100, saved: false,
    thumbnail: "python", skillsGained: ["Python"],
    description: "Applied Python for analysts — pandas, automation, and lightweight reporting pipelines, taught through business scenarios rather than abstract syntax.",
    outcomes: ["Automate a recurring weekly report", "Clean and merge multi-source datasets with pandas", "Package a script for a non-technical stakeholder to run"],
    curriculum: [
      { title: "Python for Analysts: Setup", minutes: 20 },
      { title: "Working with pandas", minutes: 60 },
      { title: "Automating Reports", minutes: 50 },
      { title: "Final Project: Sales Automation", minutes: 60 },
    ],
    careerRelevance: "Core requirement across the Data Analyst track.",
    reviews: [{ name: "Anggun", rating: 5, text: "Directly automated our Monday sales report after finishing this." }],
  },
  {
    id: "c-sc", title: "Strategic Communication", category: "Communication",
    instructor: "Melati Suryani", instructorRole: "Director of Corporate Comms",
    duration: "4h 20m", level: "Intermediate", rating: 4.5, learners: 980,
    format: "Self-paced", progress: 0, saved: true,
    thumbnail: "comms", skillsGained: ["Communication", "Stakeholder Management"],
    description: "Structure findings and proposals so executives act on them — from the one-slide summary to the full stakeholder narrative.",
    outcomes: ["Structure a recommendation using the pyramid principle", "Tailor a message to an executive audience", "Handle pushback in a live presentation"],
    curriculum: [
      { title: "Structuring the Message", minutes: 30 },
      { title: "Executive Storytelling", minutes: 40 },
      { title: "Handling Difficult Questions", minutes: 35 },
    ],
    careerRelevance: "Closes the Stakeholder Management gap toward Senior Data Analyst.",
    reviews: [],
  },
  {
    id: "c-aif", title: "AI Fundamentals", category: "Artificial Intelligence",
    instructor: "Teguh Wibowo", instructorRole: "Head of AI Enablement",
    duration: "6h 50m", level: "Beginner", rating: 4.7, learners: 2540,
    format: "Self-paced", progress: 0, saved: false,
    thumbnail: "ai", skillsGained: ["AI", "Machine Learning"],
    description: "A practical, non-hype introduction to machine learning concepts and where they apply inside the business.",
    outcomes: ["Explain supervised vs. unsupervised learning to a non-technical partner", "Identify where ML fits a business problem", "Evaluate a model's output critically"],
    curriculum: [
      { title: "What AI Can (and Can't) Do", minutes: 25 },
      { title: "Supervised Learning Basics", minutes: 45 },
      { title: "Case Studies from FLEX Group", minutes: 40 },
    ],
    careerRelevance: "Supports the AI & Automation competency.",
    reviews: [],
  },
  {
    id: "c-cyb", title: "Cybersecurity Awareness", category: "Technology",
    instructor: "Hendra Saputra", instructorRole: "CISO",
    duration: "2h 15m", level: "Beginner", rating: 4.4, learners: 5210,
    format: "Self-paced", progress: 100, saved: false,
    thumbnail: "security", skillsGained: ["Cybersecurity Awareness"],
    description: "Mandatory foundations for handling company data and systems responsibly.",
    outcomes: ["Recognize phishing and social engineering", "Follow data handling policy for internal projects"],
    curriculum: [{ title: "Threats & Phishing", minutes: 30 }, { title: "Data Handling Policy", minutes: 25 }],
    careerRelevance: "Compliance requirement, refreshed annually.",
    reviews: [],
  },
  {
    id: "c-dt", title: "Digital Transformation", category: "Strategy",
    instructor: "Farah Hutapea", instructorRole: "Head of PMO",
    duration: "5h 10m", level: "Intermediate", rating: 4.6, learners: 1420,
    format: "Blended", progress: 0, saved: false,
    thumbnail: "transform", skillsGained: ["Digital Transformation", "Business Strategy"],
    description: "How large organizations sequence technology change without breaking the business that funds it.",
    outcomes: ["Map a transformation roadmap", "Identify change-management risk points"],
    curriculum: [{ title: "Sequencing Change", minutes: 35 }, { title: "Case Clinic (Live)", minutes: 45 }],
    careerRelevance: "Supports Analytics Lead and cross-functional roles.",
    reviews: [],
  },
  {
    id: "c-pbi", title: "Power BI for Business Analytics", category: "Data & Analytics",
    instructor: "Dewi Anggraini", instructorRole: "Principal Data Scientist",
    duration: "5h 40m", level: "Intermediate", rating: 4.8, learners: 1690,
    format: "Self-paced", progress: 0, saved: false,
    thumbnail: "powerbi", skillsGained: ["Power BI", "Data Visualization", "Data Analytics"],
    description: "Build governed, decision-ready dashboards in Power BI, from data model to executive view.",
    outcomes: ["Model relational data for reporting", "Build an interactive executive dashboard", "Apply row-level security to a shared report"],
    curriculum: [{ title: "Data Modeling Basics", minutes: 35 }, { title: "DAX Essentials", minutes: 55 }, { title: "Executive Dashboard Build", minutes: 60 }],
    careerRelevance: "Recommended because you recently completed Data Fundamentals and your target career path requires advanced analytics.",
    matchScore: 94,
    reviews: [],
  },
  {
    id: "c-asql", title: "Advanced SQL Fundamentals", category: "Data & Analytics",
    instructor: "Rian Kusuma", instructorRole: "Lead Data Engineer",
    duration: "4h 45m", level: "Advanced", rating: 4.7, learners: 1105,
    format: "Self-paced", progress: 0, saved: false,
    thumbnail: "sql", skillsGained: ["Advanced SQL"],
    description: "Window functions, query optimization, and complex joins for analysts working with production-scale data.",
    outcomes: ["Write window functions for running totals and ranks", "Optimize slow queries against large tables", "Design multi-table joins without duplicating rows"],
    curriculum: [{ title: "Window Functions", minutes: 40 }, { title: "Query Optimization", minutes: 45 }, { title: "Complex Joins Workshop", minutes: 35 }],
    careerRelevance: "Closes your top missing skill for Customer Data Dashboard and Senior Data Analyst.",
    reviews: [],
  },
];

const LEARNING_PATHS = [
  { id: "lp-analytics", title: "Data Analyst → Senior Data Analyst", courses: ["c-ada", "c-asql", "c-pbi", "c-sc"], readiness: 78 },
  { id: "lp-leadership", title: "Individual Contributor → Team Lead", courses: ["c-le", "c-apm", "c-sc"], readiness: 46 },
  { id: "lp-ai", title: "Analyst → AI-Augmented Analyst", courses: ["c-aif", "c-pfb", "c-pbi"], readiness: 61 },
];

const GIGS = [
  {
    id: "g-cdd", title: "Customer Data Dashboard", department: "Digital Technology",
    owner: "Teguh Wibowo", ownerRole: "Head of AI Enablement", duration: "6 weeks",
    startDate: "Sep 22, 2026", workload: "8 hrs/week", workMode: "Hybrid — Jakarta",
    deadline: "Sep 12, 2026", participants: "2 of 3 spots filled", difficulty: "Intermediate",
    requiredSkills: ["Python", "SQL", "Power BI", "Data Analytics"], niceToHave: ["Tableau", "Statistics"],
    match: 94,
    description: "Design and ship a self-serve customer analytics dashboard for the Commercial team, replacing a set of static monthly reports with a live, governed view.",
    responsibilities: ["Build the interactive dashboard in Power BI", "Analyze customer behavior datasets for key drivers", "Present insights to Commercial leadership", "Work directly with business stakeholders to define metrics"],
    learningOpportunities: ["Row-level security & governed self-serve reporting", "Stakeholder requirement-gathering at leadership level"],
    careerRelevance: "This project contributes directly to your readiness for Senior Data Analyst.",
  },
  {
    id: "g-dpa", title: "Digital Process Automation", department: "Operations",
    owner: "Farah Hutapea", ownerRole: "Head of PMO", duration: "8 weeks",
    startDate: "Oct 1, 2026", workload: "6 hrs/week", workMode: "Remote",
    deadline: "Sep 20, 2026", participants: "1 of 4 spots filled", difficulty: "Intermediate",
    requiredSkills: ["Python", "Project Management"], niceToHave: ["Agile", "SQL"],
    match: 81,
    description: "Automate three high-volume manual approval workflows currently run over email and spreadsheets.",
    responsibilities: ["Map current manual workflows", "Script automation for approval routing", "Run pilot with Operations team"],
    learningOpportunities: ["End-to-end process automation design", "Change management for operational teams"],
    careerRelevance: "Broadens your profile beyond analytics into operational transformation.",
  },
  {
    id: "g-acd", title: "AI Chatbot Development", department: "Digital Technology",
    owner: "Teguh Wibowo", ownerRole: "Head of AI Enablement", duration: "10 weeks",
    startDate: "Oct 6, 2026", workload: "10 hrs/week", workMode: "Hybrid — Jakarta",
    deadline: "Sep 25, 2026", participants: "3 of 5 spots filled", difficulty: "Advanced",
    requiredSkills: ["Python", "AI", "Machine Learning"], niceToHave: ["SQL"],
    match: 68,
    description: "Build an internal-facing support chatbot for the HR helpdesk, trained on existing policy documentation.",
    responsibilities: ["Prototype conversational flows", "Fine-tune retrieval over policy documents", "Run a pilot with HR helpdesk"],
    learningOpportunities: ["Applied LLM tooling and retrieval design"],
    careerRelevance: "Strong differentiator if you're considering an AI-adjacent analytics path.",
  },
  {
    id: "g-eer", title: "Employee Experience Research", department: "Human Resources",
    owner: "Yusuf Kamal", ownerRole: "VP People Development", duration: "5 weeks",
    startDate: "Sep 29, 2026", workload: "5 hrs/week", workMode: "Remote",
    deadline: "Sep 18, 2026", participants: "0 of 3 spots filled", difficulty: "Beginner",
    requiredSkills: ["Communication", "Data Analytics"], niceToHave: ["Statistics"],
    match: 72,
    description: "Design and analyze the annual employee experience survey, then present findings to department heads.",
    responsibilities: ["Design survey instrument", "Analyze response data", "Present findings by department"],
    learningOpportunities: ["Survey methodology", "Executive presentation practice"],
    careerRelevance: "Builds the Communication competency needed for Analytics Lead.",
  },
  {
    id: "g-map", title: "Marketing Analytics Project", department: "Marketing",
    owner: "Melati Suryani", ownerRole: "Director of Corporate Comms", duration: "6 weeks",
    startDate: "Sep 25, 2026", workload: "7 hrs/week", workMode: "Hybrid — Jakarta",
    deadline: "Sep 15, 2026", participants: "1 of 3 spots filled", difficulty: "Intermediate",
    requiredSkills: ["SQL", "Data Visualization", "Data Analytics"], niceToHave: ["Power BI"],
    match: 88,
    description: "Analyze cross-channel campaign performance and build a reusable attribution view for the Marketing team.",
    responsibilities: ["Build attribution model across channels", "Visualize campaign ROI", "Recommend budget reallocation"],
    learningOpportunities: ["Marketing attribution modeling"],
    careerRelevance: "Diversifies your analytics portfolio into a second business function.",
  },
  {
    id: "g-sr", title: "Sustainability Reporting", department: "Finance",
    owner: "Hendra Saputra", ownerRole: "CISO", duration: "4 weeks",
    startDate: "Oct 3, 2026", workload: "4 hrs/week", workMode: "Remote",
    deadline: "Sep 22, 2026", participants: "0 of 2 spots filled", difficulty: "Beginner",
    requiredSkills: ["Data Analytics", "Communication"], niceToHave: ["SQL"],
    match: 65,
    description: "Compile and validate ESG metrics for the annual sustainability report.",
    responsibilities: ["Validate ESG data sources", "Draft reporting narrative", "Support external audit queries"],
    learningOpportunities: ["ESG reporting standards"],
    careerRelevance: "Good entry point if you're exploring Finance-adjacent analytics.",
  },
];

const MENTORS = [
  { id: "m-dewi", name: "Dewi Anggraini", role: "Principal Data Scientist", department: "Digital Technology", experience: "11 yrs", expertise: ["Data Analytics", "Python", "Machine Learning"], rating: 4.9, availability: "2 slots this month", initials: "DA" },
  { id: "m-farah", name: "Farah Hutapea", role: "Head of PMO", department: "Operations", experience: "14 yrs", expertise: ["Project Management", "Agile", "Digital Transformation"], rating: 4.8, availability: "1 slot this month", initials: "FH" },
  { id: "m-yusuf", name: "Yusuf Kamal", role: "VP People Development", department: "Human Resources", experience: "16 yrs", expertise: ["Leadership", "Communication"], rating: 4.9, availability: "Waitlist", initials: "YK" },
  { id: "m-teguh", name: "Teguh Wibowo", role: "Head of AI Enablement", department: "Digital Technology", experience: "9 yrs", expertise: ["AI", "Machine Learning", "Python"], rating: 4.7, availability: "3 slots this month", initials: "TW" },
  { id: "m-rian", name: "Rian Kusuma", role: "Lead Data Engineer", department: "Digital Technology", experience: "8 yrs", expertise: ["SQL", "Advanced SQL", "Data Analytics"], rating: 4.6, availability: "2 slots this month", initials: "RK" },
];

const WEBINARS = [
  { id: "w1", title: "Building an Agile Workforce", speaker: "Farah Hutapea, Head of PMO", date: "Sep 15, 2026", time: "10:00 AM", duration: "60 min", attendees: 214, topic: "Project Management", status: "upcoming" },
  { id: "w2", title: "From Dashboards to Decisions", speaker: "Dewi Anggraini, Principal Data Scientist", date: "Sep 18, 2026", time: "2:00 PM", duration: "45 min", attendees: 168, topic: "Data & Analytics", status: "upcoming" },
  { id: "w3", title: "AI in Everyday Analytics", speaker: "Teguh Wibowo, Head of AI Enablement", date: "Sep 2, 2026", time: "11:00 AM", duration: "50 min", attendees: 302, topic: "Artificial Intelligence", status: "live" },
  { id: "w4", title: "Giving Feedback That Lands", speaker: "Yusuf Kamal, VP People Development", date: "Aug 20, 2026", time: "9:00 AM", duration: "40 min", attendees: 256, topic: "Leadership", status: "past" },
  { id: "w5", title: "Q2 Data Governance Review", speaker: "Rian Kusuma, Lead Data Engineer", date: "Aug 5, 2026", time: "3:00 PM", duration: "55 min", attendees: 141, topic: "Data & Analytics", status: "past" },
];

const CAREER_PATH = {
  track: "Data & Analytics",
  currentRole: "Data Analyst",
  steps: [
    { role: "Junior Data Analyst", status: "complete" },
    { role: "Data Analyst", status: "current", readiness: 100 },
    {
      role: "Senior Data Analyst", status: "next", readiness: 78,
      requiredSkills: ["Advanced SQL", "Power BI", "Stakeholder Management"],
      requiredCompetencies: ["Data Analytics", "Communication"],
      missing: ["Advanced SQL", "Leadership", "Stakeholder Management"],
      recommendedCourses: ["c-asql", "c-pbi"], recommendedProjects: ["g-cdd"], recommendedMentors: 1,
    },
    {
      role: "Analytics Lead", status: "locked", readiness: 32,
      requiredSkills: ["Leadership", "Project Management", "Business Strategy"],
      requiredCompetencies: ["Leadership", "Project Management"],
      missing: ["Leadership", "Agile", "Business Strategy"],
      recommendedCourses: ["c-le", "c-apm"], recommendedProjects: ["g-dpa"], recommendedMentors: 1,
    },
    {
      role: "Head of Analytics", status: "locked", readiness: 12,
      requiredSkills: ["Business Strategy", "Digital Transformation", "Leadership"],
      requiredCompetencies: ["Business Strategy", "Leadership"],
      missing: ["Digital Transformation", "Business Strategy"],
      recommendedCourses: ["c-dt"], recommendedProjects: [], recommendedMentors: 1,
    },
  ],
};

const COMPETENCIES = [
  { name: "Data Analytics", level: 80, category: "Technical" },
  { name: "Project Management", level: 60, category: "Business" },
  { name: "Leadership", level: 50, category: "Leadership" },
  { name: "Communication", level: 70, category: "Communication" },
  { name: "AI & Automation", level: 80, category: "Digital" },
];

const SKILLS_DETAIL = [
  { name: "Python", category: "Technical", current: "Advanced", currentPct: 88, target: "Expert", targetPct: 100, courses: 2, projects: 1, assessments: 1 },
  { name: "SQL", category: "Technical", current: "Intermediate", currentPct: 65, target: "Advanced", targetPct: 90, courses: 1, projects: 2, assessments: 1 },
  { name: "Advanced SQL", category: "Technical", current: "Beginner", currentPct: 25, target: "Advanced", targetPct: 90, courses: 0, projects: 0, assessments: 0 },
  { name: "Data Analytics", category: "Technical", current: "Advanced", currentPct: 80, target: "Advanced", targetPct: 85, courses: 3, projects: 2, assessments: 1 },
  { name: "Power BI", category: "Technical", current: "Intermediate", currentPct: 62, target: "Advanced", targetPct: 88, courses: 1, projects: 1, assessments: 0 },
  { name: "Leadership", category: "Leadership", current: "Beginner", currentPct: 40, target: "Intermediate", targetPct: 70, courses: 1, projects: 0, assessments: 0 },
  { name: "Communication", category: "Communication", current: "Intermediate", currentPct: 70, target: "Advanced", targetPct: 85, courses: 1, projects: 1, assessments: 0 },
  { name: "Project Management", category: "Business", current: "Intermediate", currentPct: 60, target: "Advanced", targetPct: 80, courses: 1, projects: 1, assessments: 0 },
  { name: "AI", category: "Digital", current: "Beginner", currentPct: 35, target: "Intermediate", targetPct: 65, courses: 0, projects: 0, assessments: 0 },
];

const SKILL_GAP_ORG = [
  { skill: "AI & Automation", current: 58, required: 82, department: "Digital Technology" },
  { skill: "Data Analytics", current: 71, required: 85, department: "Digital Technology" },
  { skill: "Leadership", current: 54, required: 75, department: "All" },
  { skill: "Stakeholder Management", current: 62, required: 78, department: "All" },
  { skill: "Digital Transformation", current: 49, required: 80, department: "Operations" },
  { skill: "Cybersecurity Awareness", current: 88, required: 90, department: "All" },
];

const PORTFOLIO_PROJECTS = [
  { id: "p-sda", title: "Sales Dashboard Automation", role: "Data Analyst", duration: "6 weeks", skills: ["Python", "SQL", "Power BI"], impact: "Reduced weekly reporting time by 40%.", date: "Jun 2026" },
  { id: "p-cs", title: "Churn Signal Model", role: "Data Analyst", duration: "5 weeks", skills: ["Python", "Statistics"], impact: "Flagged at-risk accounts 3 weeks earlier than manual review.", date: "Mar 2026" },
];

const CERTIFICATIONS = [
  { title: "Python for Business — Certified", date: "Jul 2026" },
  { title: "Cybersecurity Awareness — Certified", date: "Jan 2026" },
];

const ACHIEVEMENTS = [
  { title: "Completed 4 courses in a single quarter", date: "Q2 2026" },
  { title: "First internal project delivered on time", date: "Jun 2026" },
];

const INITIAL_APPLICATIONS = [
  { id: "app-1", gigId: "g-map", status: "Under Review", appliedDate: "Aug 20, 2026" },
];

const INITIAL_NOTIFICATIONS = [
  { id: "n1", text: "You are 94% matched with Customer Data Dashboard.", time: "2h ago", read: false, kind: "match" },
  { id: "n2", text: "New course recommended: Power BI for Business Analytics.", time: "1d ago", read: false, kind: "course" },
  { id: "n3", text: "Your application to Marketing Analytics Project is Under Review.", time: "2d ago", read: false, kind: "application" },
  { id: "n4", text: "You are 78% ready for Senior Data Analyst.", time: "4d ago", read: true, kind: "career" },
  { id: "n5", text: "Your mentor request to Dewi Anggraini was accepted.", time: "1w ago", read: true, kind: "mentor" },
];

const MATCH_BREAKDOWN = {
  "g-cdd": { technical: 96, experience: 88, careerAlignment: 98, availability: 92, missing: ["Advanced SQL"], recommendedAction: "Complete Advanced SQL Fundamentals" },
  "g-dpa": { technical: 78, experience: 82, careerAlignment: 74, availability: 88, missing: ["Agile"], recommendedAction: "Complete Agile Project Management" },
  "g-acd": { technical: 60, experience: 55, careerAlignment: 70, availability: 88, missing: ["Machine Learning", "AI"], recommendedAction: "Complete AI Fundamentals" },
  "g-eer": { technical: 68, experience: 74, careerAlignment: 72, availability: 76, missing: ["Statistics"], recommendedAction: "Complete Advanced Data Analytics" },
  "g-map": { technical: 90, experience: 84, careerAlignment: 86, availability: 92, missing: ["Power BI"], recommendedAction: "Complete Power BI for Business Analytics" },
  "g-sr": { technical: 58, experience: 60, careerAlignment: 62, availability: 80, missing: ["Statistics", "SQL"], recommendedAction: "Complete Advanced SQL Fundamentals" },
};

const ORG_METRICS = {
  totalEmployees: 1284, activeLearners: 941, learningCompletion: 74,
  mobilityRate: 18, skillsAcquired: 5320, gigParticipation: 412,
  matchSuccess: 86, criticalGaps: 6,
};

const DEPT_CAPABILITY = [
  { department: "Digital Tech", capability: 82 }, { department: "Finance", capability: 68 },
  { department: "Marketing", capability: 71 }, { department: "Operations", capability: 64 },
  { department: "HR", capability: 75 }, { department: "Biz Dev", capability: 69 },
];

const LEARNING_ACTIVITY = [
  { month: "Apr", hours: 620 }, { month: "May", hours: 710 }, { month: "Jun", hours: 845 },
  { month: "Jul", hours: 780 }, { month: "Aug", hours: 910 }, { month: "Sep", hours: 640 },
];

/* -------------------------------------------------------------------------
   UI ATOMS
   ------------------------------------------------------------------------- */

function cx(...a) { return a.filter(Boolean).join(" "); }

function Avatar({ initials, size = 36, tone = "brand" }) {
  const bg = tone === "brand" ? "var(--brand-tint)" : "var(--amber-tint)";
  const fg = tone === "brand" ? "var(--brand)" : "var(--amber)";
  return (
    <div
      className="flex items-center justify-center rounded-full font-semibold shrink-0 fg-display"
      style={{ width: size, height: size, background: bg, color: fg, fontSize: size * 0.38 }}
    >
      {initials}
    </div>
  );
}

function Chip({ children, tone = "neutral", size = "sm" }) {
  const tones = {
    neutral: { bg: "var(--border-soft)", fg: "var(--ink-soft)" },
    brand: { bg: "var(--brand-tint)", fg: "var(--brand)" },
    amber: { bg: "var(--amber-tint)", fg: "var(--amber)" },
    success: { bg: "var(--success-tint)", fg: "var(--success)" },
    danger: { bg: "var(--danger-tint)", fg: "var(--danger)" },
    info: { bg: "var(--info-tint)", fg: "var(--info)" },
  };
  const t = tones[tone] || tones.neutral;
  const pad = size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm";
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full font-medium", pad)} style={{ background: t.bg, color: t.fg }}>
      {children}
    </span>
  );
}

function StatusBadge({ status }) {
  const map = {
    "Applied": "info", "Under Review": "amber", "Interview": "amber", "Approved": "success",
    "Rejected": "danger", "Active": "brand", "Completed": "success",
    "complete": "success", "current": "brand", "next": "amber", "locked": "neutral",
    "upcoming": "info", "live": "danger", "past": "neutral",
  };
  return <Chip tone={map[status] || "neutral"}>{status === "live" ? "Live now" : status}</Chip>;
}

function ProgressBar({ value, tone = "brand", height = 8, showLabel = false }) {
  const bg = tone === "brand" ? "var(--brand)" : tone === "amber" ? "var(--amber)" : "var(--slate)";
  return (
    <div className="w-full">
      <div className="w-full rounded-full overflow-hidden" style={{ height, background: "var(--border-soft)" }}>
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: bg }}
        />
      </div>
      {showLabel && <div className="text-xs mt-1 fg-num" style={{ color: "var(--slate)" }}>{value}%</div>}
    </div>
  );
}

/* Ring — the recurring FLEX-Grow motif for match score & competency level */
function Ring({ value, size = 64, stroke = 7, tone = "brand", label, sublabel }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, value) / 100) * c;
  const color = tone === "amber" ? "var(--amber)" : tone === "success" ? "var(--success)" : "var(--brand)";
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border-soft)" strokeWidth={stroke} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset .6s ease" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="fg-num font-bold" style={{ fontSize: size * 0.24, color: "var(--ink)" }}>{value}%</span>
        {sublabel && <span style={{ fontSize: size * 0.12, color: "var(--slate)" }}>{sublabel}</span>}
      </div>
    </div>
  );
}

function Card({ children, className = "", padded = true, ...rest }) {
  return (
    <div className={cx("fg-card", padded && "p-5", className)} {...rest}>
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between mb-4">
      <div>
        {eyebrow && <div className="text-xs font-semibold mb-1" style={{ color: "var(--brand)" }}>{eyebrow}</div>}
        <h2 className="fg-display text-xl font-bold" style={{ color: "var(--ink)" }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function Button({ children, variant = "primary", size = "md", icon: Icon, onClick, className = "", type = "button", disabled }) {
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-base" };
  const base = "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors fg-focus disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary: "fg-btn-primary",
    secondary: "border hover:bg-[var(--canvas)]",
    ghost: "hover:bg-[var(--canvas)]",
    danger: "text-white",
  };
  const style =
    variant === "secondary" ? { borderColor: "var(--border)", color: "var(--ink)", background: "var(--surface)" } :
    variant === "ghost" ? { color: "var(--ink-soft)" } :
    variant === "danger" ? { background: "var(--danger)" } : {};
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={cx(base, sizes[size], variants[variant], className)} style={style}>
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );
}

function EmptyState({ icon: Icon = Compass, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-6">
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "var(--brand-tint)" }}>
        <Icon size={26} style={{ color: "var(--brand)" }} />
      </div>
      <h3 className="fg-display font-bold text-lg mb-1" style={{ color: "var(--ink)" }}>{title}</h3>
      {subtitle && <p className="text-sm max-w-sm mb-4" style={{ color: "var(--slate)" }}>{subtitle}</p>}
      {action}
    </div>
  );
}

function AIInsight({ children, action }) {
  return (
    <div className="rounded-2xl p-4 flex items-start gap-3" style={{ background: "var(--amber-tint)", border: "1px solid #EFDBB8" }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#fff" }}>
        <Sparkles size={16} style={{ color: "var(--amber)" }} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-semibold mb-0.5" style={{ color: "var(--amber)" }}>AI Insight</div>
        <div className="text-sm" style={{ color: "var(--ink)" }}>{children}</div>
        {action}
      </div>
    </div>
  );
}

function Tabs({ tabs, active, onChange }) {
  return (
    <div className="flex items-center gap-1 border-b overflow-x-auto fg-scrollbar" style={{ borderColor: "var(--border)" }}>
      {tabs.map(t => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className="px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors fg-focus"
          style={{
            borderColor: active === t.key ? "var(--brand)" : "transparent",
            color: active === t.key ? "var(--brand)" : "var(--slate)",
          }}
        >
          {t.label}{typeof t.count === "number" && <span className="ml-1.5 opacity-70">({t.count})</span>}
        </button>
      ))}
    </div>
  );
}

function KPICard({ icon: Icon, label, value, delta, tone = "brand" }) {
  const color = tone === "amber" ? "var(--amber)" : "var(--brand)";
  const tint = tone === "amber" ? "var(--amber-tint)" : "var(--brand-tint)";
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: tint }}>
          <Icon size={18} style={{ color }} />
        </div>
        {delta && (
          <span className="text-xs font-semibold flex items-center gap-0.5" style={{ color: "var(--success)" }}>
            <TrendingUp size={12} /> {delta}
          </span>
        )}
      </div>
      <div>
        <div className="fg-display fg-num text-2xl font-bold" style={{ color: "var(--ink)" }}>{value}</div>
        <div className="text-sm mt-0.5" style={{ color: "var(--slate)" }}>{label}</div>
      </div>
    </Card>
  );
}

function Modal({ open, onClose, title, children, width = 480 }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(15,27,43,0.45)" }} onClick={onClose}>
      <div
        className="fg-card fg-fade-in w-full p-6 max-h-[85vh] overflow-y-auto fg-scrollbar"
        style={{ maxWidth: width }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="fg-display font-bold text-lg" style={{ color: "var(--ink)" }}>{title}</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[var(--canvas)] fg-focus">
            <X size={18} style={{ color: "var(--slate)" }} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 fg-fade-in">
      <div className="fg-card px-4 py-3 flex items-center gap-3 shadow-lg" style={{ boxShadow: "0 8px 24px rgba(15,27,43,0.12)" }}>
        <CheckCircle2 size={18} style={{ color: "var(--success)" }} />
        <span className="text-sm font-medium" style={{ color: "var(--ink)" }}>{toast}</span>
      </div>
    </div>
  );
}

function CourseThumb({ seed, className = "" }) {
  const palettes = {
    analytics: ["#146356", "#1E8A73"], agile: ["#2A6FA8", "#5C93C2"], leadership: ["#C8842B", "#DDA85C"],
    python: ["#0E4A40", "#146356"], comms: ["#8A5A9E", "#B18BC4"], ai: ["#C4432E", "#DE7861"],
    security: ["#374357", "#5C6B85"], transform: ["#2A6FA8", "#8A5A9E"], powerbi: ["#C8842B", "#146356"],
    sql: ["#146356", "#2A6FA8"],
  };
  const [c1, c2] = palettes[seed] || ["#146356", "#1E8A73"];
  return (
    <div className={cx("relative overflow-hidden rounded-xl", className)} style={{ background: `linear-gradient(135deg, ${c1}, ${c2})` }}>
      <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 200 120">
        <circle cx="170" cy="10" r="60" fill="white" fillOpacity="0.12" />
        <circle cx="10" cy="110" r="40" fill="white" fillOpacity="0.10" />
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------
   LAYOUT: SIDEBAR + TOPBAR
   ------------------------------------------------------------------------- */

function getNavGroups(role) {
  const common = [
    { key: "dashboard", label: "Dashboard", icon: Home, group: null },
  ];
  const learning = {
    label: "My Learning", icon: BookOpen, group: "learning",
    items: [
      { key: "learning:continue", label: "Continue Learning" },
      { key: "learning:courses", label: "My Courses" },
      { key: "learning:saved", label: "Saved Courses" },
      { key: "learning:history", label: "Learning History" },
    ],
  };
  const explore = {
    label: "Explore", icon: Compass, group: "explore",
    items: [
      { key: "catalog", label: "Course Catalog" },
      { key: "paths", label: "Learning Paths" },
      { key: "webinars", label: "Webinars" },
      { key: "mentors", label: "Mentors" },
    ],
  };
  const mobility = {
    label: "Talent Mobility", icon: Briefcase, group: "mobility",
    items: [
      { key: "gigs", label: "Internal Gigs" },
      { key: "ai-matching", label: "AI Talent Matching" },
      { key: "applications", label: "My Applications" },
      { key: "my-projects", label: "My Projects" },
    ],
  };
  const career = {
    label: "My Career", icon: GraduationCap, group: "career",
    items: [
      { key: "talent-profile", label: "Career Profile" },
      { key: "skills", label: "Skills & Competencies" },
      { key: "career-path", label: "Career Path" },
      { key: "portfolio", label: "Portfolio" },
    ],
  };
  const team = {
    label: "Team", icon: Users, group: "team",
    items: [
      { key: "team:overview", label: "Team Overview" },
      { key: "team:gaps", label: "Skill Gaps" },
      { key: "team:learning", label: "Team Learning" },
      { key: "team:talent", label: "Talent Recommendations" },
    ],
  };
  const hrMobility = {
    label: "Talent Mobility", icon: Briefcase, group: "mobility",
    items: [
      { key: "gigs", label: "Browse Gigs" },
      { key: "gig-management", label: "Gig Management" },
      { key: "applications", label: "Applications" },
    ],
  };

  const tail = [
    { key: "notifications", label: "Notifications", icon: Bell, group: null },
    { key: "settings", label: "Settings", icon: Settings, group: null },
    { key: "talent-profile", label: "Profile", icon: User, group: null },
  ];

  if (role === "employee") {
    return [...common, learning, explore, mobility, career, { key: "analytics-note", skip: true }, ...tail];
  }
  if (role === "manager") {
    return [
      ...common, team, learning, explore, mobility,
      { key: "skill-gap", label: "Analytics", icon: BarChart2, group: null },
      ...tail,
    ];
  }
  // hr
  return [
    { key: "hr-dashboard", label: "Dashboard", icon: Home, group: null },
    hrMobility,
    { key: "skill-gap", label: "Skill Gap Analysis", icon: BarChart2, group: null },
    explore,
    { key: "notifications", label: "Notifications", icon: Bell, group: null },
    { key: "settings", label: "Settings", icon: Settings, group: null },
    { key: "talent-profile", label: "Profile", icon: User, group: null },
  ];
}

function Sidebar({ role, page, subPage, navigate, mobileOpen, setMobileOpen }) {
  const groups = getNavGroups(role);
  const [expanded, setExpanded] = useState({ learning: true, mobility: true, explore: false, career: false, team: true });

  const isGroupActive = (g) => g.items && g.items.some(it => it.key === `${page}:${subPage}` || it.key === page);

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}
      <aside
        className={cx(
          "fixed lg:sticky top-0 left-0 h-screen z-40 w-72 shrink-0 flex flex-col transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ background: "var(--surface)", borderRight: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2.5 px-5 h-16 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <FlexGrowMark />
          <div className="leading-tight">
            <div className="fg-display font-extrabold text-[15px]" style={{ color: "var(--ink)" }}>FLEX-Grow</div>
            <div className="text-[11px] font-medium -mt-0.5" style={{ color: "var(--slate)" }}>Academy</div>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setMobileOpen(false)}>
            <X size={20} style={{ color: "var(--slate)" }} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto fg-scrollbar px-3 py-4 space-y-0.5">
          {groups.map((g) => {
            if (g.skip) return null;
            if (g.items) {
              const open = expanded[g.group];
              const active = isGroupActive(g);
              return (
                <div key={g.label} className="mb-1">
                  <button
                    onClick={() => setExpanded(e => ({ ...e, [g.group]: !e[g.group] }))}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium fg-focus"
                    style={{ color: active ? "var(--brand)" : "var(--ink-soft)", background: active ? "var(--brand-tint)" : "transparent" }}
                  >
                    <g.icon size={17} />
                    <span className="flex-1 text-left">{g.label}</span>
                    {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  {open && (
                    <div className="mt-0.5 ml-[1.65rem] pl-3 space-y-0.5" style={{ borderLeft: "1px solid var(--border)" }}>
                      {g.items.map(it => {
                        const [p, s] = it.key.split(":");
                        const isActive = page === p && (s ? subPage === s : true);
                        return (
                          <button
                            key={it.key}
                            onClick={() => { navigate(p, s); setMobileOpen(false); }}
                            className="w-full text-left px-3 py-2 rounded-lg text-[13px] font-medium fg-focus"
                            style={{ color: isActive ? "var(--brand)" : "var(--slate)", background: isActive ? "var(--brand-tint)" : "transparent" }}
                          >
                            {it.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }
            const isActive = page === g.key;
            return (
              <button
                key={g.key}
                onClick={() => { navigate(g.key); setMobileOpen(false); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium fg-focus"
                style={{ color: isActive ? "var(--brand)" : "var(--ink-soft)", background: isActive ? "var(--brand-tint)" : "transparent" }}
              >
                <g.icon size={17} />
                <span className="flex-1 text-left">{g.label}</span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--brand)" }} />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 mx-3 mb-4 rounded-xl" style={{ background: "var(--canvas)" }}>
          <div className="flex items-center gap-2 mb-1.5">
            <Rocket size={14} style={{ color: "var(--brand)" }} />
            <span className="text-xs font-semibold" style={{ color: "var(--ink)" }}>Career readiness</span>
          </div>
          <ProgressBar value={78} />
          <div className="text-[11px] mt-1.5" style={{ color: "var(--slate)" }}>78% ready for Senior Data Analyst</div>
        </div>
      </aside>
    </>
  );
}

function FlexGrowMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <rect width="40" height="40" rx="11" fill="var(--brand)" />
      <path d="M12 27C12 27 15 15 22 13C27.5 11.4 30 15 28 18.5C26 22 20 21 20 21" stroke="white" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="12" cy="27" r="2.6" fill="var(--amber)" />
    </svg>
  );
}

function Topbar({ user, role, setRole, page, navigate, notifications, setMobileOpen, markAllRead }) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  const results = useMemo(() => {
    if (!query.trim()) return null;
    const q = query.toLowerCase();
    return {
      Courses: COURSES.filter(c => c.title.toLowerCase().includes(q)).slice(0, 3),
      Gigs: GIGS.filter(g => g.title.toLowerCase().includes(q)).slice(0, 3),
      Mentors: MENTORS.filter(m => m.name.toLowerCase().includes(q)).slice(0, 3),
      Skills: SKILL_LIBRARY.filter(s => s.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query]);

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center gap-3 px-4 lg:px-6 shrink-0" style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
      <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
        <Menu size={22} style={{ color: "var(--ink)" }} />
      </button>

      <div className="relative flex-1 max-w-md">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--slate-light)" }} />
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onFocus={() => setSearchOpen(true)}
          onBlur={() => setTimeout(() => setSearchOpen(false), 150)}
          placeholder="Search courses, gigs, mentors, skills…"
          className="w-full pl-9 pr-3 py-2 rounded-lg text-sm fg-focus"
          style={{ background: "var(--canvas)", border: "1px solid var(--border)", color: "var(--ink)" }}
        />
        {searchOpen && results && (
          <div className="absolute top-full mt-2 left-0 right-0 fg-card p-3 fg-fade-in z-30 max-h-80 overflow-y-auto fg-scrollbar">
            {Object.entries(results).every(([, v]) => v.length === 0) && (
              <div className="text-sm px-2 py-3" style={{ color: "var(--slate)" }}>No results for "{query}"</div>
            )}
            {Object.entries(results).map(([cat, items]) => items.length > 0 && (
              <div key={cat} className="mb-2 last:mb-0">
                <div className="text-[11px] font-semibold uppercase tracking-wide px-2 mb-1" style={{ color: "var(--slate-light)" }}>{cat}</div>
                {items.map((it, i) => (
                  <button
                    key={i}
                    onMouseDown={() => {
                      setQuery(""); setSearchOpen(false);
                      if (cat === "Courses") navigate("course-detail", null, { courseId: it.id });
                      else if (cat === "Gigs") navigate("gig-detail", null, { gigId: it.id });
                      else if (cat === "Mentors") navigate("mentors");
                      else navigate("skills");
                    }}
                    className="w-full text-left px-2 py-1.5 rounded-md text-sm hover:bg-[var(--canvas)]"
                    style={{ color: "var(--ink)" }}
                  >
                    {it.title || it.name || it}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-1.5 text-xs font-medium px-1" style={{ color: "var(--slate)" }}>
        <span>Viewing as</span>
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="rounded-lg px-2 py-1.5 text-xs font-semibold fg-focus"
          style={{ background: "var(--canvas)", border: "1px solid var(--border)", color: "var(--ink)" }}
        >
          <option value="employee">Employee</option>
          <option value="manager">Manager</option>
          <option value="hr">HR / Talent Admin</option>
        </select>
      </div>

      <div className="relative">
        <button onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }} className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--canvas)] fg-focus">
          <Bell size={19} style={{ color: "var(--ink-soft)" }} />
          {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "var(--danger)" }} />}
        </button>
        {notifOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 fg-card p-2 fg-fade-in z-30">
            <div className="flex items-center justify-between px-2 py-1.5">
              <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>Notifications</span>
              <button onClick={markAllRead} className="text-xs font-medium" style={{ color: "var(--brand)" }}>Mark all read</button>
            </div>
            <div className="max-h-72 overflow-y-auto fg-scrollbar">
              {notifications.slice(0, 5).map(n => (
                <div key={n.id} className="px-2 py-2 rounded-lg hover:bg-[var(--canvas)] flex gap-2 items-start">
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: n.read ? "transparent" : "var(--amber)" }} />
                  <div>
                    <div className="text-sm" style={{ color: "var(--ink)" }}>{n.text}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--slate-light)" }}>{n.time}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => { navigate("notifications"); setNotifOpen(false); }} className="w-full text-center text-xs font-medium py-2 mt-1" style={{ color: "var(--brand)" }}>
              View all notifications
            </button>
          </div>
        )}
      </div>

      <div className="relative">
        <button onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }} className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-[var(--canvas)] fg-focus">
          <Avatar initials={user.avatarInitials} size={32} />
        </button>
        {profileOpen && (
          <div className="absolute right-0 top-full mt-2 w-56 fg-card p-2 fg-fade-in z-30">
            <div className="px-3 py-2 mb-1" style={{ borderBottom: "1px solid var(--border-soft)" }}>
              <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{user.name}</div>
              <div className="text-xs" style={{ color: "var(--slate)" }}>{user.role} · {user.department}</div>
            </div>
            <button onClick={() => { navigate("talent-profile"); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[var(--canvas)] flex items-center gap-2" style={{ color: "var(--ink)" }}>
              <User size={15} /> View Profile
            </button>
            <button onClick={() => { navigate("settings"); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[var(--canvas)] flex items-center gap-2" style={{ color: "var(--ink)" }}>
              <Settings size={15} /> Settings
            </button>
            <button onClick={() => { navigate("login"); setProfileOpen(false); }} className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-[var(--canvas)] flex items-center gap-2" style={{ color: "var(--danger)" }}>
              <LogOut size={15} /> Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------
   LOGIN PAGE
   ------------------------------------------------------------------------- */

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("anggun.valentine@flexgroup.co.id");
  const [password, setPassword] = useState("••••••••••");

  return (
    <div className="min-h-screen flex fg-root" style={{ background: "var(--surface)" }}>
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden" style={{ background: "var(--brand-dark)" }}>
        <svg className="absolute inset-0 w-full h-full opacity-[0.12]" viewBox="0 0 600 800" preserveAspectRatio="xMidYMid slice">
          <circle cx="520" cy="90" r="220" fill="white" />
          <circle cx="40" cy="740" r="160" fill="white" />
        </svg>
        <div className="relative flex items-center gap-2.5">
          <FlexGrowMark size={38} />
          <div className="leading-tight">
            <div className="fg-display font-extrabold text-white text-base">FLEX-Grow</div>
            <div className="text-[11px] font-medium text-white/70 -mt-0.5">Academy</div>
          </div>
        </div>

        <div className="relative">
          <h1 className="fg-display text-white font-bold text-4xl leading-tight mb-4">Grow your skills.<br />Shape your career.</h1>
          <p className="text-white/75 text-base max-w-md mb-10">One platform for learning, talent mobility, and real-world growth.</p>

          <div className="flex items-center gap-3">
            {[
              { icon: BookOpen, label: "Learn" },
              { icon: Award, label: "Build skills" },
              { icon: Briefcase, label: "Get matched" },
              { icon: TrendingUp, label: "Grow" },
            ].map((s, i, arr) => (
              <React.Fragment key={s.label}>
                <div className="flex flex-col items-center gap-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}>
                    <s.icon size={18} className="text-white" />
                  </div>
                  <span className="text-[11px] text-white/70 font-medium">{s.label}</span>
                </div>
                {i < arr.length - 1 && <ArrowRight size={14} className="text-white/40 mb-5" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="relative text-white/50 text-xs">© 2026 FLEX Group. Internal platform.</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <FlexGrowMark />
            <div className="leading-tight">
              <div className="fg-display font-extrabold text-[15px]" style={{ color: "var(--ink)" }}>FLEX-Grow</div>
              <div className="text-[11px] font-medium -mt-0.5" style={{ color: "var(--slate)" }}>Academy</div>
            </div>
          </div>

          <h2 className="fg-display text-2xl font-bold mb-1" style={{ color: "var(--ink)" }}>Sign in</h2>
          <p className="text-sm mb-7" style={{ color: "var(--slate)" }}>Welcome back — continue where you left off.</p>

          <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Corporate email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--slate-light)" }} />
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", color: "var(--ink)" }} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--slate-light)" }} />
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", color: "var(--ink)" }} />
              </div>
            </div>
            <div className="flex items-center justify-end">
              <a href="#" onClick={e => e.preventDefault()} className="text-xs font-medium" style={{ color: "var(--brand)" }}>Forgot password?</a>
            </div>
            <Button type="submit" className="w-full" size="lg">Sign In</Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <span className="text-xs" style={{ color: "var(--slate-light)" }}>or</span>
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>

          <div className="space-y-2.5">
            <Button variant="secondary" className="w-full">Continue with Microsoft</Button>
            <Button variant="secondary" className="w-full">Continue with Google</Button>
          </div>

          <p className="text-center text-xs mt-7" style={{ color: "var(--slate)" }}>
            Need access? <a href="#" onClick={e => e.preventDefault()} style={{ color: "var(--brand)", fontWeight: 600 }}>Contact administrator</a>
          </p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   ROOT APP
   ------------------------------------------------------------------------- */

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("employee");
  const [page, setPage] = useState("dashboard");
  const [subPage, setSubPage] = useState("continue");
  const [selectedCourseId, setSelectedCourseId] = useState("c-ada");
  const [selectedGigId, setSelectedGigId] = useState("g-cdd");
  const [mobileOpen, setMobileOpen] = useState(false);

  const [courses, setCourses] = useState(COURSES);
  const [skills, setSkills] = useState(SKILLS_DETAIL);
  const [competencies, setCompetencies] = useState(COMPETENCIES);
  const [applications, setApplications] = useState(INITIAL_APPLICATIONS);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [portfolio, setPortfolio] = useState(PORTFOLIO_PROJECTS);
  const [careerReadiness, setCareerReadiness] = useState(78);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (msg) => setToast(msg);
  const addNotification = (text, kind = "info") => {
    setNotifications(n => [{ id: "n" + Date.now(), text, time: "Just now", read: false, kind }, ...n]);
  };
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));

  const navigate = (p, s, extra) => {
    setPage(p);
    if (s) setSubPage(s);
    if (extra?.courseId) setSelectedCourseId(extra.courseId);
    if (extra?.gigId) setSelectedGigId(extra.gigId);
    setMobileOpen(false);
    window.scrollTo?.({ top: 0, behavior: "instant" });
  };

  const findCourse = (id) => courses.find(c => c.id === id);
  const findGig = (id) => GIGS.find(g => g.id === id);

  const learningProgress = Math.round(courses.reduce((a, c) => a + c.progress, 0) / courses.length);
  const activeCoursesCount = courses.filter(c => c.progress > 0 && c.progress < 100).length;
  const completedCoursesCount = courses.filter(c => c.progress >= 100).length;
  const skillsAcquiredCount = skills.length;
  const projectMatchCount = GIGS.filter(g => g.match >= 65).length;

  function advanceCourse(courseId, amount = 25) {
    setCourses(prev => prev.map(c => {
      if (c.id !== courseId) return c;
      const wasIncomplete = c.progress < 100;
      const next = Math.min(100, c.progress === 0 ? 15 : c.progress + amount);
      if (wasIncomplete && next >= 100) {
        setTimeout(() => {
          const gained = c.skillsGained.filter(sg => !skills.some(sk => sk.name === sg));
          if (gained.length) {
            setSkills(sk => [...sk, ...gained.map(g => ({ name: g, category: "Technical", current: "Beginner", currentPct: 30, target: "Intermediate", targetPct: 65, courses: 1, projects: 0, assessments: 0 }))]);
            setCareerReadiness(r => Math.min(100, r + 2));
            addNotification(`Course completed: ${c.title}. New skill added: ${gained[0]}.`, "course");
            showToast(`Completed "${c.title}" — ${gained[0]} added to your skills`);
          } else {
            addNotification(`Course completed: ${c.title}.`, "course");
            showToast(`Completed "${c.title}"`);
          }
        }, 0);
      } else {
        setTimeout(() => showToast(`Progress saved — ${c.title} at ${next}%`), 0);
      }
      return { ...c, progress: next };
    }));
  }

  function toggleSaveCourse(courseId) {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, saved: !c.saved } : c));
  }

  function applyToGig(gigId) {
    if (applications.some(a => a.gigId === gigId)) { showToast("You've already applied to this project"); return; }
    const gig = findGig(gigId);
    setApplications(prev => [...prev, { id: "app-" + Date.now(), gigId, status: "Applied", appliedDate: "Today" }]);
    setTimeout(() => setApplications(prev => prev.map(a => a.gigId === gigId ? { ...a, status: "Under Review" } : a)), 900);
    addNotification(`Your application to ${gig.title} was submitted.`, "application");
    showToast(`Applied to "${gig.title}"`);
  }

  function setApplicationStatus(appId, status) {
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status } : a));
    const app = applications.find(a => a.id === appId);
    const gig = app ? findGig(app.gigId) : null;
    if (gig) {
      addNotification(`${status === "Approved" ? "Your manager approved" : "Update on"} your application to ${gig.title}: ${status}.`, "application");
      showToast(`${gig.title} → ${status}`);
    }
  }

  function completeProject(appId) {
    const app = applications.find(a => a.id === appId);
    if (!app) return;
    const gig = findGig(app.gigId);
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, status: "Completed" } : a));
    setPortfolio(prev => [{ id: "p-" + Date.now(), title: gig.title, role: CURRENT_USER.role, duration: gig.duration, skills: gig.requiredSkills, impact: `Delivered "${gig.title}" for ${gig.department}.`, date: "Sep 2026" }, ...prev]);
    setCareerReadiness(r => Math.min(100, r + 4));
    setCompetencies(prev => prev.map(c => c.name === "Data Analytics" ? { ...c, level: Math.min(100, c.level + 5) } : c));
    addNotification(`Project completed: ${gig.title}. Your portfolio and career readiness were updated.`, "career");
    showToast(`"${gig.title}" completed — portfolio updated`);
  }

  function requestMentorship(mentorName) {
    addNotification(`Mentorship request sent to ${mentorName}.`, "mentor");
    showToast(`Request sent to ${mentorName}`);
  }

  function registerWebinar(title) {
    addNotification(`You're registered for "${title}".`, "webinar");
    showToast(`Registered for "${title}"`);
  }

  if (!loggedIn) {
    return (
      <div className="fg-root">
        <LoginPage onLogin={() => { setLoggedIn(true); showToast(`Welcome back, ${CURRENT_USER.name.split(" ")[0]}`); }} />
      </div>
    );
  }

  const ctx = {
    role, page, subPage, navigate, user: CURRENT_USER,
    courses, skills, competencies, applications, notifications, portfolio, careerReadiness,
    learningProgress, activeCoursesCount, completedCoursesCount, skillsAcquiredCount, projectMatchCount,
    findCourse, findGig, selectedCourseId, selectedGigId,
    advanceCourse, toggleSaveCourse, applyToGig, setApplicationStatus, completeProject,
    requestMentorship, registerWebinar, addNotification, showToast, setNotifications,
  };

  let content;
  if (page === "dashboard") content = <EmployeeDashboard ctx={ctx} />;
  else if (page === "learning") content = <MyLearningPage ctx={ctx} />;
  else if (page === "catalog") content = <CourseCatalogPage ctx={ctx} />;
  else if (page === "paths") content = <LearningPathsPage ctx={ctx} />;
  else if (page === "course-detail") content = <CourseDetailPage ctx={ctx} />;
  else if (page === "course-player") content = <CoursePlayerPage ctx={ctx} />;
  else if (page === "gigs") content = <InternalGigsPage ctx={ctx} />;
  else if (page === "gig-detail") content = <GigDetailPage ctx={ctx} />;
  else if (page === "ai-matching") content = <AITalentMatchingPage ctx={ctx} />;
  else if (page === "applications") content = <ApplicationsPage ctx={ctx} />;
  else if (page === "my-projects") content = <MyProjectsPage ctx={ctx} />;
  else if (page === "skills") content = <SkillsCompetenciesPage ctx={ctx} />;
  else if (page === "career-path") content = <CareerPathPage ctx={ctx} />;
  else if (page === "portfolio") content = <PortfolioPage ctx={ctx} />;
  else if (page === "talent-profile") content = <TalentProfilePage ctx={ctx} />;
  else if (page === "mentors") content = <MentorsPage ctx={ctx} />;
  else if (page === "webinars") content = <WebinarsPage ctx={ctx} />;
  else if (page === "notifications") content = <NotificationsPage ctx={ctx} />;
  else if (page === "settings") content = <SettingsPage ctx={ctx} />;
  else if (page === "team") content = <ManagerDashboardPage ctx={ctx} />;
  else if (page === "skill-gap") content = <SkillGapAnalysisPage ctx={ctx} />;
  else if (page === "hr-dashboard") content = <HRDashboardPage ctx={ctx} />;
  else if (page === "gig-management") content = <GigManagementPage ctx={ctx} />;
  else content = <EmployeeDashboard ctx={ctx} />;

  return (
    <div className="fg-root min-h-screen flex">
      <Sidebar role={role} page={page} subPage={subPage} navigate={navigate} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar user={CURRENT_USER} role={role} setRole={(r) => { setRole(r); navigate(r === "hr" ? "hr-dashboard" : r === "manager" ? "team" : "dashboard", r === "manager" ? "overview" : undefined); }} page={page} navigate={navigate} notifications={notifications} setMobileOpen={setMobileOpen} markAllRead={markAllRead} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto fg-fade-in">
          {content}
        </main>
      </div>
      <Toast toast={toast} />
    </div>
  );
}

export default App;

/* -------------------------------------------------------------------------
   PAGE: EMPLOYEE DASHBOARD
   ------------------------------------------------------------------------- */

function EmployeeDashboard({ ctx }) {
  const { user, navigate, courses, learningProgress, activeCoursesCount, skillsAcquiredCount, projectMatchCount, careerReadiness, advanceCourse, toggleSaveCourse } = ctx;
  const continueCourses = courses.filter(c => c.progress > 0 && c.progress < 100).slice(0, 4);
  const recommended = courses.filter(c => c.matchScore).slice(0, 2);
  const topGigs = [...GIGS].sort((a, b) => b.match - a.match).slice(0, 3);
  const hour = new Date().getHours();
  const greeting = hour < 11 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="fg-display text-3xl font-bold" style={{ color: "var(--ink)" }}>{greeting}, {user.name.split(" ")[0]}</h1>
          <p className="text-base mt-1" style={{ color: "var(--slate)" }}>Ready to grow today?</p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Chip tone="brand"><Briefcase size={12} /> {user.role}</Chip>
            <Chip><Building2 size={12} /> {user.department}</Chip>
            <Chip tone="amber"><Award size={12} /> {user.level}</Chip>
          </div>
        </div>
        <Ring value={careerReadiness} size={92} sublabel="Career ready" />
      </div>

      <AIInsight action={
        <button onClick={() => navigate("gigs")} className="fg-link-row inline-flex items-center gap-1 text-sm font-semibold mt-2" style={{ color: "var(--amber)" }}>
          Explore Opportunities <ArrowRight size={14} className="fg-link-arrow" />
        </button>
      }>
        Your recent learning in Python and Data Analysis makes you a strong match for {projectMatchCount} internal projects.
      </AIInsight>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard icon={TrendingUp} label="Learning Progress" value={`${learningProgress}%`} delta="+12% this month" />
        <KPICard icon={BookOpen} label="Active Courses" value={activeCoursesCount} />
        <KPICard icon={Award} label="Skills Acquired" value={skillsAcquiredCount} delta="+1 this month" />
        <KPICard icon={Briefcase} label="Project Matches" value={projectMatchCount} tone="amber" />
        <KPICard icon={Target} label="Career Readiness" value={`${careerReadiness}%`} delta="+2% this month" />
      </div>

      <section>
        <SectionHeading title="Continue Learning" action={<button onClick={() => navigate("learning", "continue")} className="text-sm font-semibold" style={{ color: "var(--brand)" }}>View all</button>} />
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {continueCourses.map(c => (
            <CourseCard key={c.id} course={c} onOpen={() => navigate("course-detail", null, { courseId: c.id })} onContinue={() => advanceCourse(c.id)} onSave={() => toggleSaveCourse(c.id)} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="AI-Powered" title="Recommended for Your Growth" />
        <div className="grid md:grid-cols-2 gap-4">
          {recommended.map(c => (
            <Card key={c.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--amber)" }}>{c.matchScore}% Match</div>
                  <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{c.title}</h3>
                </div>
                <Ring value={c.matchScore} size={48} tone="amber" />
              </div>
              <p className="text-sm" style={{ color: "var(--slate)" }}>{c.careerRelevance}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.skillsGained.map(s => <Chip key={s} tone="brand">{s}</Chip>)}
              </div>
              <Button size="sm" className="self-start mt-1" onClick={() => navigate("course-detail", null, { courseId: c.id })}>View Course</Button>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading title="Internal Gigs" action={<button onClick={() => navigate("gigs")} className="text-sm font-semibold" style={{ color: "var(--brand)" }}>Browse all</button>} />
        <div className="grid md:grid-cols-3 gap-4">
          {topGigs.map(g => <GigCard key={g.id} gig={g} onOpen={() => navigate("gig-detail", null, { gigId: g.id })} compact />)}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <SectionHeading title="Career Progress" />
          <div className="flex items-center gap-4">
            <Ring value={careerReadiness} size={80} sublabel="ready" />
            <div>
              <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>Senior Data Analyst</div>
              <div className="text-xs mt-0.5" style={{ color: "var(--slate)" }}>Missing: Advanced SQL, Leadership</div>
              <button onClick={() => navigate("career-path")} className="fg-link-row inline-flex items-center gap-1 text-sm font-semibold mt-2" style={{ color: "var(--brand)" }}>
                View Career Path <ArrowRight size={14} className="fg-link-arrow" />
              </button>
            </div>
          </div>
        </Card>
        <Card>
          <SectionHeading title="Skills Overview" />
          <div className="space-y-2.5">
            {COMPETENCIES.slice(0, 3).map(c => (
              <div key={c.name}>
                <div className="flex justify-between text-xs mb-1" style={{ color: "var(--ink-soft)" }}>
                  <span className="font-medium">{c.name}</span><span className="fg-num">{c.level}%</span>
                </div>
                <ProgressBar value={c.level} height={6} />
              </div>
            ))}
          </div>
          <button onClick={() => navigate("skills")} className="fg-link-row inline-flex items-center gap-1 text-sm font-semibold mt-3" style={{ color: "var(--brand)" }}>
            View all skills <ArrowRight size={14} className="fg-link-arrow" />
          </button>
        </Card>
      </div>
    </div>
  );
}

function CourseCard({ course, onOpen, onContinue, onSave, showSave = true }) {
  return (
    <Card padded={false} className="overflow-hidden flex flex-col">
      <button onClick={onOpen} className="text-left">
        <CourseThumb seed={course.thumbnail} className="h-28 w-full" />
      </button>
      <div className="p-4 flex flex-col flex-1 gap-2.5">
        <div className="flex items-start justify-between gap-2">
          <button onClick={onOpen} className="text-left">
            <div className="text-xs font-medium mb-0.5" style={{ color: "var(--brand)" }}>{course.category}</div>
            <h3 className="fg-display font-bold text-[15px] leading-snug" style={{ color: "var(--ink)" }}>{course.title}</h3>
          </button>
          {showSave && (
            <button onClick={onSave} className="shrink-0 mt-0.5">
              <Bookmark size={16} fill={course.saved ? "var(--amber)" : "none"} style={{ color: course.saved ? "var(--amber)" : "var(--slate-light)" }} />
            </button>
          )}
        </div>
        <div className="text-xs" style={{ color: "var(--slate)" }}>{course.instructor} · {course.duration}</div>
        {course.progress > 0 ? (
          <div>
            <ProgressBar value={course.progress} height={6} />
            <div className="text-xs mt-1 fg-num" style={{ color: "var(--slate)" }}>{course.progress}% complete</div>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs" style={{ color: "var(--slate)" }}><Clock size={12} /> {course.duration} · {course.level}</div>
        )}
        <Button size="sm" onClick={onContinue} className="mt-auto self-start" icon={course.progress >= 100 ? CheckCircle2 : Play}>
          {course.progress >= 100 ? "Completed" : course.progress > 0 ? "Continue" : "Start Learning"}
        </Button>
      </div>
    </Card>
  );
}

function GigCard({ gig, onOpen, compact = false }) {
  return (
    <Card className="flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs font-medium mb-0.5" style={{ color: "var(--slate)" }}>{gig.department}</div>
          <h3 className="fg-display font-bold text-[15px] leading-snug" style={{ color: "var(--ink)" }}>{gig.title}</h3>
        </div>
        <Ring value={gig.match} size={44} tone={gig.match >= 85 ? "success" : gig.match >= 70 ? "brand" : "amber"} />
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: "var(--slate)" }}>
        <span className="flex items-center gap-1"><Clock size={12} /> {gig.duration}</span>
        <span className="flex items-center gap-1"><MapPin size={12} /> {gig.workMode}</span>
      </div>
      {!compact && (
        <div className="flex flex-wrap gap-1.5">
          {gig.requiredSkills.slice(0, 3).map(s => <Chip key={s}>{s}</Chip>)}
        </div>
      )}
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs" style={{ color: "var(--slate-light)" }}>Deadline {gig.deadline}</span>
        <Button size="sm" variant="secondary" onClick={onOpen}>View Project</Button>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------------------
   PAGE: MY LEARNING
   ------------------------------------------------------------------------- */

function MyLearningPage({ ctx }) {
  const { courses, subPage, navigate, advanceCourse, toggleSaveCourse } = ctx;
  const tabKey = ["continue", "courses", "saved", "history"].includes(subPage) ? subPage : "continue";
  const [category, setCategory] = useState("All");

  const inProgress = courses.filter(c => c.progress > 0 && c.progress < 100);
  const completed = courses.filter(c => c.progress >= 100);
  const saved = courses.filter(c => c.saved);
  const recommended = courses.filter(c => c.matchScore);

  const tabs = [
    { key: "continue", label: "In Progress", count: inProgress.length },
    { key: "courses", label: "Completed", count: completed.length },
    { key: "saved", label: "Saved", count: saved.length },
    { key: "history", label: "Recommended", count: recommended.length },
  ];

  let list = tabKey === "continue" ? inProgress : tabKey === "courses" ? completed : tabKey === "saved" ? saved : recommended;
  if (category !== "All") list = list.filter(c => c.category === category);
  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>My Learning</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Track your courses from first module to certification.</p>
      </div>

      <Tabs tabs={tabs} active={tabKey} onChange={(k) => navigate("learning", k)} />

      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} style={{ color: "var(--slate)" }} />
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} className="px-3 py-1.5 rounded-full text-xs font-medium fg-focus" style={{ background: category === c ? "var(--brand-tint)" : "var(--canvas)", color: category === c ? "var(--brand)" : "var(--slate)" }}>
            {c}
          </button>
        ))}
      </div>

      {list.length === 0 ? (
        <EmptyState
          icon={BookOpen}
          title={tabKey === "continue" ? "No active courses yet." : tabKey === "saved" ? "No saved courses." : "Nothing here yet."}
          subtitle="Start exploring courses designed for your career goals."
          action={<Button onClick={() => navigate("catalog")}>Explore Course Catalog</Button>}
        />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map(c => (
            <CourseCard key={c.id} course={c} onOpen={() => navigate("course-detail", null, { courseId: c.id })} onContinue={() => advanceCourse(c.id)} onSave={() => toggleSaveCourse(c.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: COURSE CATALOG
   ------------------------------------------------------------------------- */

function CourseCatalogPage({ ctx }) {
  const { courses, navigate, advanceCourse, toggleSaveCourse } = ctx;
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [format, setFormat] = useState("All");

  const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const formats = ["All", "Self-paced", "Blended", "Experiential"];

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) &&
    (category === "All" || c.category === category) &&
    (level === "All" || c.level === level) &&
    (format === "All" || c.format === format)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Course Catalog</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>{courses.length} courses across {categories.length - 1} categories.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--slate-light)" }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search courses…" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }} />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={level} onChange={e => setLevel(e.target.value)} className="px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
          {levels.map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={format} onChange={e => setFormat(e.target.value)} className="px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
          {formats.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={Search} title="No courses match your filters." subtitle="Try a different keyword or clear a filter." action={<Button variant="secondary" onClick={() => { setQuery(""); setCategory("All"); setLevel("All"); setFormat("All"); }}>Clear filters</Button>} />
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(c => (
            <CourseCard key={c.id} course={c} onOpen={() => navigate("course-detail", null, { courseId: c.id })} onContinue={() => advanceCourse(c.id)} onSave={() => toggleSaveCourse(c.id)} />
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: LEARNING PATHS
   ------------------------------------------------------------------------- */

function LearningPathsPage({ ctx }) {
  const { navigate, findCourse } = ctx;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Learning Paths</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Curated course sequences mapped to real career destinations.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {LEARNING_PATHS.map(lp => (
          <Card key={lp.id} className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-medium mb-1" style={{ color: "var(--brand)" }}>Learning Path</div>
                <h3 className="fg-display font-bold text-lg" style={{ color: "var(--ink)" }}>{lp.title}</h3>
              </div>
              <Ring value={lp.readiness} size={52} sublabel="ready" />
            </div>
            <div className="space-y-2">
              {lp.courses.map((cid, i) => {
                const c = findCourse(cid);
                if (!c) return null;
                return (
                  <button key={cid} onClick={() => navigate("course-detail", null, { courseId: cid })} className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-[var(--canvas)] text-left">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 fg-num" style={{ background: c.progress >= 100 ? "var(--success-tint)" : "var(--border-soft)", color: c.progress >= 100 ? "var(--success)" : "var(--slate)" }}>
                      {c.progress >= 100 ? <CheckCircle2 size={14} /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate" style={{ color: "var(--ink)" }}>{c.title}</div>
                      <ProgressBar value={c.progress} height={5} />
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: COURSE DETAIL
   ------------------------------------------------------------------------- */

function CourseDetailPage({ ctx }) {
  const { selectedCourseId, findCourse, navigate, advanceCourse, toggleSaveCourse } = ctx;
  const course = findCourse(selectedCourseId) || COURSES[0];
  const [tab, setTab] = useState("overview");
  const related = ctx.courses.filter(c => c.category === course.category && c.id !== course.id).slice(0, 3);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "curriculum", label: "Curriculum" },
    { key: "instructor", label: "Instructor" },
    { key: "reviews", label: "Reviews", count: course.reviews.length },
  ];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("catalog")} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--slate)" }}>
        <ArrowLeft size={15} /> Back to catalog
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <CourseThumb seed={course.thumbnail} className="h-52 w-full" />
          <div>
            <div className="text-xs font-semibold mb-1" style={{ color: "var(--brand)" }}>{course.category}</div>
            <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>{course.title}</h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-sm" style={{ color: "var(--slate)" }}>
              <span className="flex items-center gap-1"><Star size={14} fill="var(--amber)" style={{ color: "var(--amber)" }} /> {course.rating} ({course.learners.toLocaleString()} learners)</span>
              <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
              <span className="flex items-center gap-1"><Gauge size={14} /> {course.level}</span>
              <Chip>{course.format}</Chip>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {course.skillsGained.map(s => <Chip key={s} tone="brand">{s}</Chip>)}
            </div>
          </div>

          <Tabs tabs={tabs} active={tab} onChange={setTab} />

          {tab === "overview" && (
            <div className="space-y-5 fg-fade-in">
              <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{course.description}</p>
              <div>
                <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>What you'll learn</h3>
                <ul className="space-y-2">
                  {course.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--ink-soft)" }}>
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "var(--success)" }} /> {o}
                    </li>
                  ))}
                </ul>
              </div>
              <AIInsight>{course.careerRelevance}</AIInsight>
            </div>
          )}

          {tab === "curriculum" && (
            <div className="space-y-2 fg-fade-in">
              {course.curriculum.map((ch, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg" style={{ border: "1px solid var(--border)" }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold fg-num shrink-0" style={{ background: "var(--border-soft)", color: "var(--slate)" }}>{i + 1}</div>
                  <span className="flex-1 text-sm font-medium" style={{ color: "var(--ink)" }}>{ch.title}</span>
                  <span className="text-xs fg-num" style={{ color: "var(--slate)" }}>{ch.minutes} min</span>
                </div>
              ))}
            </div>
          )}

          {tab === "instructor" && (
            <div className="flex items-center gap-4 fg-fade-in">
              <Avatar initials={course.instructor.split(" ").map(n => n[0]).join("")} size={56} />
              <div>
                <div className="font-semibold" style={{ color: "var(--ink)" }}>{course.instructor}</div>
                <div className="text-sm" style={{ color: "var(--slate)" }}>{course.instructorRole}</div>
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div className="space-y-3 fg-fade-in">
              {course.reviews.length === 0 ? (
                <EmptyState icon={MessageSquare} title="No reviews yet." subtitle="Be the first to share feedback after completing this course." />
              ) : course.reviews.map((r, i) => (
                <div key={i} className="p-3 rounded-lg" style={{ border: "1px solid var(--border)" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <Avatar initials={r.name.split(" ").map(n => n[0]).join("")} size={28} />
                    <span className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{r.name}</span>
                    <span className="flex items-center gap-0.5 ml-auto text-xs fg-num" style={{ color: "var(--amber)" }}><Star size={12} fill="var(--amber)" /> {r.rating}</span>
                  </div>
                  <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            {course.progress > 0 && (
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1"><span style={{ color: "var(--slate)" }}>Your progress</span><span className="fg-num font-semibold" style={{ color: "var(--ink)" }}>{course.progress}%</span></div>
                <ProgressBar value={course.progress} />
              </div>
            )}
            <div className="space-y-2">
              <Button className="w-full" icon={course.progress >= 100 ? CheckCircle2 : Play} onClick={() => navigate("course-player", null, { courseId: course.id })}>
                {course.progress >= 100 ? "Review Course" : course.progress > 0 ? "Continue Learning" : "Start Learning"}
              </Button>
              <Button variant="secondary" className="w-full" icon={Bookmark} onClick={() => toggleSaveCourse(course.id)}>
                {course.saved ? "Saved to Learning Plan" : "Add to Learning Plan"}
              </Button>
            </div>
          </Card>
          {related.length > 0 && (
            <Card>
              <h3 className="font-semibold text-sm mb-3" style={{ color: "var(--ink)" }}>Related courses</h3>
              <div className="space-y-3">
                {related.map(c => (
                  <button key={c.id} onClick={() => navigate("course-detail", null, { courseId: c.id })} className="w-full text-left flex items-center gap-2.5">
                    <CourseThumb seed={c.thumbnail} className="w-14 h-10 shrink-0" />
                    <span className="text-sm font-medium leading-snug" style={{ color: "var(--ink)" }}>{c.title}</span>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: COURSE PLAYER
   ------------------------------------------------------------------------- */

function CoursePlayerPage({ ctx }) {
  const { selectedCourseId, findCourse, navigate, advanceCourse } = ctx;
  const course = findCourse(selectedCourseId) || COURSES[0];
  const completedChapters = Math.round((course.progress / 100) * course.curriculum.length);
  const [activeChapter, setActiveChapter] = useState(Math.min(completedChapters, course.curriculum.length - 1));
  const [rightTab, setRightTab] = useState("notes");
  const [note, setNote] = useState("");

  const chapter = course.curriculum[activeChapter];
  const isLast = activeChapter === course.curriculum.length - 1;

  function markComplete() {
    const step = Math.ceil(100 / course.curriculum.length);
    advanceCourse(course.id, step);
    if (!isLast) setActiveChapter(a => Math.min(course.curriculum.length - 1, a + 1));
  }

  return (
    <div className="-m-4 sm:-m-6 lg:-m-8 h-[calc(100vh-4rem)] flex flex-col">
      <div className="flex items-center gap-3 px-4 sm:px-6 h-14 shrink-0" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <button onClick={() => navigate("course-detail", null, { courseId: course.id })} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--slate)" }}>
          <ArrowLeft size={15} /> Exit player
        </button>
        <span className="fg-display font-bold text-sm truncate" style={{ color: "var(--ink)" }}>{course.title}</span>
        <div className="ml-auto w-40 hidden sm:block"><ProgressBar value={course.progress} height={6} /></div>
        <span className="text-xs fg-num font-semibold hidden sm:inline" style={{ color: "var(--slate)" }}>{course.progress}%</span>
      </div>

      <div className="flex-1 flex min-h-0">
        <aside className="w-64 shrink-0 hidden md:flex flex-col overflow-y-auto fg-scrollbar" style={{ borderRight: "1px solid var(--border)", background: "var(--surface)" }}>
          {course.curriculum.map((ch, i) => (
            <button key={i} onClick={() => setActiveChapter(i)} className="text-left px-4 py-3 flex items-start gap-2.5" style={{ background: i === activeChapter ? "var(--brand-tint)" : "transparent", borderBottom: "1px solid var(--border-soft)" }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold fg-num shrink-0 mt-0.5" style={{ background: i < completedChapters ? "var(--success)" : "var(--border-soft)", color: i < completedChapters ? "#fff" : "var(--slate)" }}>
                {i < completedChapters ? <CheckCircle2 size={12} /> : i + 1}
              </div>
              <div>
                <div className="text-sm font-medium leading-snug" style={{ color: i === activeChapter ? "var(--brand)" : "var(--ink)" }}>{ch.title}</div>
                <div className="text-xs mt-0.5" style={{ color: "var(--slate-light)" }}>{ch.minutes} min</div>
              </div>
            </button>
          ))}
        </aside>

        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex items-center justify-center p-6" style={{ background: "#0F1B2B" }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(255,255,255,0.1)" }}>
                <Play size={26} className="text-white ml-1" />
              </div>
              <div className="text-white font-semibold">{chapter.title}</div>
              <div className="text-white/50 text-sm mt-1">{chapter.minutes} min lesson</div>
            </div>
          </div>
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0" style={{ borderTop: "1px solid var(--border)", background: "var(--surface)" }}>
            <Button variant="ghost" icon={ArrowLeft} onClick={() => setActiveChapter(a => Math.max(0, a - 1))} disabled={activeChapter === 0}>Previous</Button>
            <Button icon={CheckCircle2} onClick={markComplete}>Mark Complete</Button>
            <Button variant="ghost" onClick={() => setActiveChapter(a => Math.min(course.curriculum.length - 1, a + 1))} disabled={isLast}>
              Next <ArrowRight size={15} />
            </Button>
          </div>
        </div>

        <aside className="w-72 shrink-0 hidden lg:flex flex-col overflow-y-auto fg-scrollbar" style={{ borderLeft: "1px solid var(--border)", background: "var(--surface)" }}>
          <div className="flex px-2 pt-2">
            {[{ k: "notes", l: "Notes" }, { k: "resources", l: "Resources" }, { k: "discussion", l: "Discussion" }].map(t => (
              <button key={t.k} onClick={() => setRightTab(t.k)} className="flex-1 text-xs font-semibold py-2 rounded-lg" style={{ color: rightTab === t.k ? "var(--brand)" : "var(--slate)", background: rightTab === t.k ? "var(--brand-tint)" : "transparent" }}>{t.l}</button>
            ))}
          </div>
          <div className="p-4">
            {rightTab === "notes" && (
              <div>
                <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Jot down a note for this lesson…" rows={6} className="w-full p-3 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
                <Button size="sm" variant="secondary" className="w-full mt-2">Save note</Button>
              </div>
            )}
            {rightTab === "resources" && (
              <div className="space-y-2">
                {["Lesson slides.pdf", "Dataset — sample.csv", "Reference sheet.pdf"].map(r => (
                  <div key={r} className="flex items-center gap-2 p-2.5 rounded-lg text-sm" style={{ border: "1px solid var(--border)", color: "var(--ink)" }}>
                    <FileText size={15} style={{ color: "var(--slate)" }} /> <span className="flex-1 truncate">{r}</span> <Download size={14} style={{ color: "var(--slate)" }} />
                  </div>
                ))}
              </div>
            )}
            {rightTab === "discussion" && (
              <EmptyState icon={MessageSquare} title="No discussion yet." subtitle="Ask a question and your peers or instructor can respond." />
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: INTERNAL GIGS
   ------------------------------------------------------------------------- */

function InternalGigsPage({ ctx }) {
  const { navigate } = ctx;
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("All");
  const [sort, setSort] = useState("match");

  let list = GIGS.filter(g => g.title.toLowerCase().includes(query.toLowerCase()) && (dept === "All" || g.department === dept));
  list = [...list].sort((a, b) => sort === "match" ? b.match - a.match : sort === "deadline" ? a.deadline.localeCompare(b.deadline) : 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Internal Gigs</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Real projects, cross-department, matched to your skills — think of it as your internal marketplace.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--slate-light)" }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search internal gigs…" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }} />
        </div>
        <select value={dept} onChange={e => setDept(e.target.value)} className="px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
          <option>All</option>
          {DEPARTMENTS.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
          <option value="match">Sort: Best match</option>
          <option value="deadline">Sort: Deadline</option>
        </select>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map(g => (
          <Card key={g.id} className="flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="text-xs font-medium mb-0.5" style={{ color: "var(--slate)" }}>{g.department}</div>
                <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{g.title}</h3>
              </div>
              <Ring value={g.match} size={48} tone={g.match >= 85 ? "success" : g.match >= 70 ? "brand" : "amber"} sublabel="match" />
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs" style={{ color: "var(--slate)" }}>
              <span className="flex items-center gap-1"><Clock size={12} /> {g.duration}</span>
              <span className="flex items-center gap-1"><Gauge size={12} /> {g.difficulty}</span>
              <span className="flex items-center gap-1"><MapPin size={12} /> {g.workMode}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {g.requiredSkills.map(s => <Chip key={s}>{s}</Chip>)}
            </div>
            <div className="flex items-center justify-between text-xs pt-2" style={{ borderTop: "1px solid var(--border-soft)", color: "var(--slate-light)" }}>
              <span>Apply by {g.deadline}</span>
              <span>{g.participants}</span>
            </div>
            <Button onClick={() => navigate("gig-detail", null, { gigId: g.id })}>View Project</Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: GIG DETAIL
   ------------------------------------------------------------------------- */

function GigDetailPage({ ctx }) {
  const { selectedGigId, findGig, navigate, applications, applyToGig } = ctx;
  const gig = findGig(selectedGigId) || GIGS[0];
  const application = applications.find(a => a.gigId === gig.id);
  const breakdown = MATCH_BREAKDOWN[gig.id];

  return (
    <div className="space-y-6">
      <button onClick={() => navigate("gigs")} className="flex items-center gap-1.5 text-sm font-medium" style={{ color: "var(--slate)" }}>
        <ArrowLeft size={15} /> Back to Internal Gigs
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Chip>{gig.department}</Chip>
              <Chip tone={gig.match >= 85 ? "success" : "amber"}>{gig.match}% AI Match</Chip>
            </div>
            <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>{gig.title}</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { label: "Project owner", value: gig.owner, icon: User },
              { label: "Duration", value: gig.duration, icon: Clock },
              { label: "Start date", value: gig.startDate, icon: Calendar },
              { label: "Workload", value: gig.workload, icon: Gauge },
              { label: "Work mode", value: gig.workMode, icon: MapPin },
              { label: "Participants", value: gig.participants, icon: Users },
            ].map(f => (
              <div key={f.label} className="p-3 rounded-lg" style={{ background: "var(--canvas)" }}>
                <div className="flex items-center gap-1.5 text-xs mb-1" style={{ color: "var(--slate)" }}><f.icon size={12} /> {f.label}</div>
                <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>{f.value}</div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>About this project</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>{gig.description}</p>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>Responsibilities</h3>
            <ul className="space-y-2">
              {gig.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--ink-soft)" }}>
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: "var(--success)" }} /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>Required skills</h3>
              <div className="flex flex-wrap gap-1.5">{gig.requiredSkills.map(s => <Chip key={s} tone="brand">{s}</Chip>)}</div>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>Nice-to-have</h3>
              <div className="flex flex-wrap gap-1.5">{gig.niceToHave.map(s => <Chip key={s}>{s}</Chip>)}</div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>Learning opportunities</h3>
            <p className="text-xs mb-2" style={{ color: "var(--slate)" }}>You will develop these competencies during this project.</p>
            <ul className="space-y-2">
              {gig.learningOpportunities.map((l, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--ink-soft)" }}>
                  <Sparkles size={15} className="mt-0.5 shrink-0" style={{ color: "var(--amber)" }} /> {l}
                </li>
              ))}
            </ul>
          </div>

          <AIInsight>{gig.careerRelevance}</AIInsight>
        </div>

        <div className="space-y-4">
          <Card>
            <Ring value={gig.match} size={80} tone={gig.match >= 85 ? "success" : "brand"} sublabel="AI Match" />
            {breakdown && (
              <div className="mt-4 space-y-2">
                {Object.entries({ "Technical Skills": breakdown.technical, "Experience": breakdown.experience, "Career Alignment": breakdown.careerAlignment, "Availability": breakdown.availability }).map(([k, v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-xs mb-1"><span style={{ color: "var(--slate)" }}>{k}</span><span className="fg-num font-medium" style={{ color: "var(--ink)" }}>{v}%</span></div>
                    <ProgressBar value={v} height={5} />
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border-soft)" }}>
              {application ? (
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ background: "var(--brand-tint)" }}>
                  <span className="text-sm font-medium" style={{ color: "var(--brand)" }}>Application status</span>
                  <StatusBadge status={application.status} />
                </div>
              ) : (
                <Button className="w-full" icon={Send} onClick={() => applyToGig(gig.id)}>Apply for Project</Button>
              )}
            </div>
          </Card>
          {breakdown && (
            <Card>
              <h3 className="font-semibold text-sm mb-2" style={{ color: "var(--ink)" }}>Missing skills</h3>
              <div className="flex flex-wrap gap-1.5 mb-3">{breakdown.missing.map(s => <Chip key={s} tone="danger">{s}</Chip>)}</div>
              <div className="text-xs font-semibold mb-1" style={{ color: "var(--amber)" }}>Recommended action</div>
              <p className="text-sm" style={{ color: "var(--ink-soft)" }}>{breakdown.recommendedAction}</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: AI TALENT MATCHING
   ------------------------------------------------------------------------- */

function AITalentMatchingPage({ ctx }) {
  const { navigate, user } = ctx;
  const [expandedId, setExpandedId] = useState("g-cdd");
  const sorted = [...GIGS].sort((a, b) => b.match - a.match);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>AI Talent Matching</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>
          The AI analyzes {user.name.split(" ")[0]}'s skills, course history, competencies, experience, career goals, and availability against every open project.
        </p>
      </div>

      <div className="space-y-3">
        {sorted.map(g => {
          const b = MATCH_BREAKDOWN[g.id];
          const open = expandedId === g.id;
          return (
            <Card key={g.id} padded={false} className="overflow-hidden">
              <button onClick={() => setExpandedId(open ? null : g.id)} className="w-full flex items-center gap-4 p-4 text-left">
                <Ring value={g.match} size={52} tone={g.match >= 85 ? "success" : g.match >= 70 ? "brand" : "amber"} />
                <div className="flex-1 min-w-0">
                  <div className="text-xs" style={{ color: "var(--slate)" }}>{g.department} · {g.owner}</div>
                  <div className="fg-display font-bold" style={{ color: "var(--ink)" }}>{g.title}</div>
                </div>
                {open ? <ChevronUp size={18} style={{ color: "var(--slate)" }} /> : <ChevronDown size={18} style={{ color: "var(--slate)" }} />}
              </button>
              {open && b && (
                <div className="px-4 pb-4 fg-fade-in grid md:grid-cols-2 gap-5" style={{ borderTop: "1px solid var(--border-soft)" }}>
                  <div className="pt-4 space-y-2.5">
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--slate-light)" }}>Match breakdown</div>
                    {Object.entries({ "Technical Skills": b.technical, "Experience": b.experience, "Career Alignment": b.careerAlignment, "Availability": b.availability }).map(([k, v]) => (
                      <div key={k}>
                        <div className="flex justify-between text-xs mb-1"><span style={{ color: "var(--ink-soft)" }}>{k}</span><span className="fg-num font-semibold" style={{ color: "var(--ink)" }}>{v}%</span></div>
                        <ProgressBar value={v} height={6} />
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 space-y-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--slate-light)" }}>Missing skills</div>
                      <div className="flex flex-wrap gap-1.5">{b.missing.map(s => <Chip key={s} tone="danger">{s}</Chip>)}</div>
                    </div>
                    <AIInsight>Recommended action: {b.recommendedAction}</AIInsight>
                    <Button size="sm" variant="secondary" icon={ExternalLink} onClick={() => navigate("gig-detail", null, { gigId: g.id })}>View Match Details</Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: APPLICATIONS (My Applications for employee, Applications Management for manager/HR)
   ------------------------------------------------------------------------- */

const STATUS_FLOW = ["Applied", "Under Review", "Interview", "Approved", "Rejected", "Active", "Completed"];

function ApplicationsPage({ ctx }) {
  const { role, applications, findGig, navigate, setApplicationStatus, user } = ctx;
  const isManager = role === "manager" || role === "hr";

  if (isManager) {
    // Manager/HR view: review team applications, with mock candidate roster for realism
    const candidateApps = [
      { id: "cand-1", name: "Andi Pratama", initials: "AP", gigId: "g-dpa", match: 81, status: "Under Review" },
      { id: "cand-2", name: "Nadia Putri", initials: "NP", gigId: "g-eer", match: 72, status: "Interview" },
      ...applications.map(a => ({ id: a.id, name: user.name, initials: user.avatarInitials, gigId: a.gigId, match: findGig(a.gigId)?.match, status: a.status, real: true })),
    ];
    return (
      <div className="space-y-6">
        <div>
          <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Applications Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Review candidates applying to your team's internal gigs.</p>
        </div>
        <div className="space-y-3">
          {candidateApps.map(a => {
            const gig = findGig(a.gigId);
            return (
              <Card key={a.id} className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Avatar initials={a.initials} size={40} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{a.name}</div>
                  <div className="text-xs" style={{ color: "var(--slate)" }}>{gig?.title} · {gig?.department}</div>
                </div>
                <Chip tone="amber">{a.match}% Match</Chip>
                <StatusBadge status={a.status} />
                {a.real && a.status !== "Approved" && a.status !== "Rejected" && a.status !== "Completed" && a.status !== "Active" && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setApplicationStatus(a.id, "Rejected")}>Reject</Button>
                    <Button size="sm" onClick={() => setApplicationStatus(a.id, "Approved")}>Approve</Button>
                  </div>
                )}
                {!a.real && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="secondary" disabled>Reject</Button>
                    <Button size="sm" disabled>Approve</Button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>My Applications</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Track the status of every internal gig you've applied to.</p>
      </div>
      {applications.length === 0 ? (
        <EmptyState icon={Send} title="No project applications." subtitle="Explore internal gigs to find your next opportunity." action={<Button onClick={() => navigate("gigs")}>Browse Internal Gigs</Button>} />
      ) : (
        <div className="space-y-3">
          {applications.map(a => {
            const gig = findGig(a.gigId);
            const steps = ["Applied", "Under Review", "Approved", "Completed"];
            const stepIdx = a.status === "Rejected" ? -1 : steps.indexOf(a.status === "Active" ? "Approved" : a.status);
            return (
              <Card key={a.id}>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold" style={{ color: "var(--ink)" }}>{gig?.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "var(--slate)" }}>{gig?.department} · Applied {a.appliedDate}</div>
                  </div>
                  <StatusBadge status={a.status} />
                  <Button size="sm" variant="secondary" onClick={() => navigate("gig-detail", null, { gigId: a.gigId })}>View Project</Button>
                </div>
                {a.status !== "Rejected" && (
                  <div className="flex items-center mt-4">
                    {steps.map((s, i) => (
                      <React.Fragment key={s}>
                        <div className="flex flex-col items-center gap-1">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: i <= stepIdx ? "var(--brand)" : "var(--border-soft)" }}>
                            {i <= stepIdx && <CheckCircle2 size={13} className="text-white" />}
                          </div>
                          <span className="text-[10px] font-medium text-center" style={{ color: i <= stepIdx ? "var(--brand)" : "var(--slate-light)" }}>{s}</span>
                        </div>
                        {i < steps.length - 1 && <div className="flex-1 h-0.5 mx-1 mb-4" style={{ background: i < stepIdx ? "var(--brand)" : "var(--border-soft)" }} />}
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: MY PROJECTS
   ------------------------------------------------------------------------- */

function MyProjectsPage({ ctx }) {
  const { applications, findGig, navigate, completeProject } = ctx;
  const active = applications.filter(a => a.status === "Approved" || a.status === "Active");
  const completed = applications.filter(a => a.status === "Completed");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>My Projects</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Approved and completed internal projects.</p>
      </div>

      <section>
        <SectionHeading title="Active Projects" />
        {active.length === 0 ? (
          <EmptyState icon={FolderKanban} title="No active projects." subtitle="Once a manager approves your application, it will appear here." action={<Button onClick={() => navigate("gigs")}>Browse Internal Gigs</Button>} />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {active.map(a => {
              const gig = findGig(a.gigId);
              return (
                <Card key={a.id} className="flex flex-col gap-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-xs" style={{ color: "var(--slate)" }}>{gig.department}</div>
                      <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{gig.title}</h3>
                    </div>
                    <StatusBadge status="Approved" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">{gig.requiredSkills.map(s => <Chip key={s} tone="brand">{s}</Chip>)}</div>
                  <p className="text-xs" style={{ color: "var(--slate)" }}>{gig.duration} · {gig.workload}</p>
                  <Button size="sm" icon={CheckCircle2} className="self-start" onClick={() => completeProject(a.id)}>Mark Project Complete</Button>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      <section>
        <SectionHeading title="Completed Projects" />
        {completed.length === 0 ? (
          <EmptyState icon={Award} title="No completed projects yet." subtitle="Completed projects update your portfolio and career readiness automatically." />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {completed.map(a => {
              const gig = findGig(a.gigId);
              return (
                <Card key={a.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{gig.title}</h3>
                    <StatusBadge status="Completed" />
                  </div>
                  <p className="text-xs" style={{ color: "var(--slate)" }}>{gig.department} · {gig.duration}</p>
                  <button onClick={() => navigate("portfolio")} className="fg-link-row inline-flex items-center gap-1 text-sm font-semibold mt-1" style={{ color: "var(--brand)" }}>
                    View in Portfolio <ArrowRight size={14} className="fg-link-arrow" />
                  </button>
                </Card>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: SKILLS & COMPETENCIES
   ------------------------------------------------------------------------- */

function SkillsCompetenciesPage({ ctx }) {
  const { skills, competencies, navigate } = ctx;
  const [category, setCategory] = useState("All");
  const categories = ["All", "Technical", "Leadership", "Communication", "Business", "Digital"];
  const filtered = category === "All" ? skills : skills.filter(s => s.category === category);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>My Skills</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Current proficiency, target, and the evidence behind each skill.</p>
      </div>

      <section>
        <SectionHeading title="Competency Profile" action={<button onClick={() => navigate("career-path")} className="text-sm font-semibold" style={{ color: "var(--brand)" }}>View career path</button>} />
        <Card className="space-y-3">
          {competencies.map(c => (
            <div key={c.name} className="flex items-center gap-4">
              <span className="w-44 text-sm font-medium shrink-0" style={{ color: "var(--ink)" }}>{c.name}</span>
              <ProgressBar value={c.level} height={10} />
              <span className="w-10 text-sm fg-num font-semibold text-right" style={{ color: "var(--ink)" }}>{c.level}%</span>
            </div>
          ))}
        </Card>
      </section>

      <section>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className="px-3 py-1.5 rounded-full text-xs font-medium fg-focus" style={{ background: category === c ? "var(--brand-tint)" : "var(--canvas)", color: category === c ? "var(--brand)" : "var(--slate)" }}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {filtered.map(s => (
            <Card key={s.name} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{s.name}</h3>
                <Chip>{s.category}</Chip>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1"><span style={{ color: "var(--slate)" }}>Current: {s.current}</span><span style={{ color: "var(--slate)" }}>Target: {s.target}</span></div>
                  <div className="relative">
                    <ProgressBar value={s.currentPct} height={8} />
                    <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3" style={{ left: `${s.targetPct}%`, background: "var(--ink)" }} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs pt-1" style={{ color: "var(--slate)" }}>
                <span className="flex items-center gap-1"><BookOpen size={12} /> {s.courses} courses</span>
                <span className="flex items-center gap-1"><Briefcase size={12} /> {s.projects} projects</span>
                <span className="flex items-center gap-1"><ListChecks size={12} /> {s.assessments} assessment</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: CAREER PATH
   ------------------------------------------------------------------------- */

function CareerPathPage({ ctx }) {
  const { navigate, findCourse } = ctx;
  const [expanded, setExpanded] = useState(2);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Career Path</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>{CAREER_PATH.track} track — visualize where your development leads.</p>
      </div>

      <div className="relative pl-2">
        <div className="absolute left-[27px] top-4 bottom-4 w-0.5" style={{ background: "var(--border)" }} />
        <div className="space-y-3">
          {CAREER_PATH.steps.map((step, i) => {
            const isOpen = expanded === i;
            const iconColor = step.status === "complete" ? "var(--success)" : step.status === "current" ? "var(--brand)" : step.status === "next" ? "var(--amber)" : "var(--slate-light)";
            const iconBg = step.status === "complete" ? "var(--success-tint)" : step.status === "current" ? "var(--brand-tint)" : step.status === "next" ? "var(--amber-tint)" : "var(--border-soft)";
            return (
              <div key={step.role} className="relative flex gap-4">
                <div className="w-14 flex justify-center shrink-0 z-10">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: iconBg, border: "3px solid var(--surface)" }}>
                    {step.status === "complete" ? <CheckCircle2 size={20} style={{ color: iconColor }} /> :
                      step.status === "locked" ? <Lock size={18} style={{ color: iconColor }} /> :
                      <span className="fg-num font-bold text-sm" style={{ color: iconColor }}>{step.readiness}%</span>}
                  </div>
                </div>
                <Card className="flex-1 mb-1" onClick={() => step.requiredSkills && setExpanded(isOpen ? -1 : i)} style={{ cursor: step.requiredSkills ? "pointer" : "default" }}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="fg-display font-bold" style={{ color: "var(--ink)" }}>{step.role}</div>
                      {step.status === "current" && <div className="text-xs mt-0.5 font-medium" style={{ color: "var(--brand)" }}>Your current role</div>}
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={step.status} />
                      {step.requiredSkills && (isOpen ? <ChevronUp size={16} style={{ color: "var(--slate)" }} /> : <ChevronDown size={16} style={{ color: "var(--slate)" }} />)}
                    </div>
                  </div>
                  {isOpen && step.requiredSkills && (
                    <div className="mt-4 pt-4 grid sm:grid-cols-2 gap-4 fg-fade-in" style={{ borderTop: "1px solid var(--border-soft)" }}>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--slate-light)" }}>Required skills</div>
                        <div className="flex flex-wrap gap-1.5 mb-3">{step.requiredSkills.map(s => <Chip key={s} tone="brand">{s}</Chip>)}</div>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--slate-light)" }}>Missing competencies</div>
                        <div className="flex flex-wrap gap-1.5">{step.missing.map(s => <Chip key={s} tone="danger">{s}</Chip>)}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wide mb-1.5" style={{ color: "var(--slate-light)" }}>Recommended</div>
                        <div className="space-y-1.5">
                          {step.recommendedCourses.map(cid => {
                            const c = findCourse(cid);
                            return c && (
                              <button key={cid} onClick={(e) => { e.stopPropagation(); navigate("course-detail", null, { courseId: cid }); }} className="flex items-center gap-2 text-sm w-full text-left" style={{ color: "var(--ink)" }}>
                                <BookOpen size={14} style={{ color: "var(--brand)" }} /> {c.title}
                              </button>
                            );
                          })}
                          {step.recommendedProjects.map(gid => {
                            const g = GIGS.find(x => x.id === gid);
                            return g && (
                              <button key={gid} onClick={(e) => { e.stopPropagation(); navigate("gig-detail", null, { gigId: gid }); }} className="flex items-center gap-2 text-sm w-full text-left" style={{ color: "var(--ink)" }}>
                                <Briefcase size={14} style={{ color: "var(--brand)" }} /> {g.title}
                              </button>
                            );
                          })}
                          {step.recommendedMentors > 0 && (
                            <button onClick={(e) => { e.stopPropagation(); navigate("mentors"); }} className="flex items-center gap-2 text-sm w-full text-left" style={{ color: "var(--ink)" }}>
                              <Users size={14} style={{ color: "var(--brand)" }} /> {step.recommendedMentors} mentorship program
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: MY PORTFOLIO
   ------------------------------------------------------------------------- */

function PortfolioPage({ ctx }) {
  const { user, portfolio, skills, courses } = ctx;
  const completedCourses = courses.filter(c => c.progress >= 100);

  return (
    <div className="space-y-8">
      <Card className="flex flex-col sm:flex-row sm:items-center gap-5">
        <Avatar initials={user.avatarInitials} size={72} />
        <div className="flex-1">
          <h1 className="fg-display text-xl font-bold" style={{ color: "var(--ink)" }}>{user.name}</h1>
          <p className="text-sm" style={{ color: "var(--slate)" }}>{user.role} · {user.department}</p>
          <div className="flex items-center gap-1.5 mt-2 text-sm" style={{ color: "var(--brand)" }}>
            <Target size={14} /> Career goal: {user.careerGoal}
          </div>
        </div>
        <Button variant="secondary" icon={Download}>Export Portfolio</Button>
      </Card>

      <section>
        <SectionHeading title="Skills" />
        <div className="flex flex-wrap gap-2">
          {skills.map(s => <Chip key={s.name} tone="brand">{s.name}</Chip>)}
        </div>
      </section>

      <section>
        <SectionHeading title="Projects" />
        <div className="grid md:grid-cols-2 gap-4">
          {portfolio.map(p => (
            <Card key={p.id} className="flex flex-col gap-2.5">
              <div className="flex items-start justify-between">
                <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{p.title}</h3>
                <span className="text-xs shrink-0" style={{ color: "var(--slate-light)" }}>{p.date}</span>
              </div>
              <div className="text-xs" style={{ color: "var(--slate)" }}>{p.role} · {p.duration}</div>
              <div className="flex flex-wrap gap-1.5">{p.skills.map(s => <Chip key={s}>{s}</Chip>)}</div>
              <div className="flex items-start gap-2 text-sm p-2.5 rounded-lg mt-1" style={{ background: "var(--success-tint)", color: "var(--success)" }}>
                <TrendingUp size={15} className="shrink-0 mt-0.5" /> {p.impact}
              </div>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section>
          <SectionHeading title="Courses" />
          <div className="space-y-2">
            {completedCourses.map(c => (
              <div key={c.id} className="flex items-center gap-2.5 p-3 rounded-lg" style={{ border: "1px solid var(--border)" }}>
                <CheckCircle2 size={16} style={{ color: "var(--success)" }} />
                <span className="text-sm font-medium flex-1" style={{ color: "var(--ink)" }}>{c.title}</span>
              </div>
            ))}
          </div>
        </section>
        <section>
          <SectionHeading title="Certifications" />
          <div className="space-y-2">
            {CERTIFICATIONS.map(c => (
              <div key={c.title} className="flex items-center gap-2.5 p-3 rounded-lg" style={{ border: "1px solid var(--border)" }}>
                <BadgeCheck size={16} style={{ color: "var(--brand)" }} />
                <span className="text-sm font-medium flex-1" style={{ color: "var(--ink)" }}>{c.title}</span>
                <span className="text-xs" style={{ color: "var(--slate-light)" }}>{c.date}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section>
        <SectionHeading title="Achievements" />
        <div className="grid sm:grid-cols-2 gap-3">
          {ACHIEVEMENTS.map(a => (
            <div key={a.title} className="flex items-center gap-2.5 p-3 rounded-lg" style={{ background: "var(--amber-tint)" }}>
              <Award size={16} style={{ color: "var(--amber)" }} />
              <span className="text-sm font-medium flex-1" style={{ color: "var(--ink)" }}>{a.title}</span>
              <span className="text-xs" style={{ color: "var(--slate)" }}>{a.date}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: TALENT PROFILE (Career Profile)
   ------------------------------------------------------------------------- */

function TalentProfilePage({ ctx }) {
  const { user, competencies, courses, portfolio, careerReadiness } = ctx;
  const radarData = competencies.map(c => ({ subject: c.name.split(" ")[0], value: c.level, fullMark: 100 }));

  return (
    <div className="space-y-8">
      <Card className="flex flex-col sm:flex-row sm:items-start gap-6">
        <Avatar initials={user.avatarInitials} size={80} />
        <div className="flex-1 grid sm:grid-cols-2 gap-x-6 gap-y-3">
          <div>
            <h1 className="fg-display text-xl font-bold" style={{ color: "var(--ink)" }}>{user.name}</h1>
            <p className="text-sm" style={{ color: "var(--slate)" }}>{user.role} · {user.department}</p>
          </div>
          <div className="flex sm:justify-end"><Ring value={careerReadiness} size={64} sublabel="ready" /></div>
          {[
            { label: "Years of experience", value: user.tenure, icon: Briefcase },
            { label: "Career goal", value: user.careerGoal, icon: Target },
            { label: "Mobility preference", value: user.mobility, icon: Compass },
            { label: "Availability", value: user.availability, icon: Clock },
            { label: "Location", value: user.location, icon: MapPin },
            { label: "Work mode", value: user.workMode, icon: Globe2 },
          ].map(f => (
            <div key={f.label} className="flex items-center gap-2 text-sm">
              <f.icon size={14} style={{ color: "var(--slate)" }} />
              <span style={{ color: "var(--slate)" }}>{f.label}:</span>
              <span className="font-medium" style={{ color: "var(--ink)" }}>{f.value}</span>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="fg-display font-bold mb-4" style={{ color: "var(--ink)" }}>Competency Radar</h3>
          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer>
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--slate)" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9, fill: "var(--slate-light)" }} />
                <Radar dataKey="value" stroke="var(--brand)" fill="var(--brand)" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="fg-display font-bold mb-4" style={{ color: "var(--ink)" }}>Top Skills</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {["Python", "Data Analytics", "SQL", "Power BI", "Communication"].map(s => <Chip key={s} tone="brand">{s}</Chip>)}
          </div>
          <h3 className="fg-display font-bold mb-3" style={{ color: "var(--ink)" }}>Learning History</h3>
          <div className="text-sm" style={{ color: "var(--slate)" }}>{courses.filter(c => c.progress >= 100).length} courses completed · {courses.filter(c => c.progress > 0 && c.progress < 100).length} in progress</div>
          <h3 className="fg-display font-bold mt-6 mb-3" style={{ color: "var(--ink)" }}>Project History</h3>
          <div className="text-sm" style={{ color: "var(--slate)" }}>{portfolio.length} internal project{portfolio.length !== 1 ? "s" : ""} completed</div>
        </Card>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: MENTORS
   ------------------------------------------------------------------------- */

function MentorsPage({ ctx }) {
  const { requestMentorship } = ctx;
  const [query, setQuery] = useState("");
  const [skill, setSkill] = useState("All");
  const [requested, setRequested] = useState({});
  const skillOptions = ["All", ...Array.from(new Set(MENTORS.flatMap(m => m.expertise)))];

  const list = MENTORS.filter(m =>
    m.name.toLowerCase().includes(query.toLowerCase()) &&
    (skill === "All" || m.expertise.includes(skill))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Mentors</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Find a mentor by skill, department, career path, or experience.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--slate-light)" }} />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search mentors…" className="w-full pl-9 pr-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }} />
        </div>
        <select value={skill} onChange={e => setSkill(e.target.value)} className="px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)", background: "var(--surface)" }}>
          {skillOptions.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {list.map(m => (
          <Card key={m.id} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <Avatar initials={m.initials} size={48} />
              <div className="min-w-0">
                <div className="fg-display font-bold text-sm" style={{ color: "var(--ink)" }}>{m.name}</div>
                <div className="text-xs" style={{ color: "var(--slate)" }}>{m.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs" style={{ color: "var(--slate)" }}>
              <span className="flex items-center gap-1"><Building2 size={12} /> {m.department}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {m.experience}</span>
              <span className="flex items-center gap-1"><Star size={12} fill="var(--amber)" style={{ color: "var(--amber)" }} /> {m.rating}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">{m.expertise.map(s => <Chip key={s} tone="brand">{s}</Chip>)}</div>
            <div className="text-xs" style={{ color: m.availability === "Waitlist" ? "var(--danger)" : "var(--success)" }}>{m.availability}</div>
            <Button size="sm" disabled={!!requested[m.id]} onClick={() => { setRequested(r => ({ ...r, [m.id]: true })); requestMentorship(m.name); }}>
              {requested[m.id] ? "Request Sent" : "Request Mentorship"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: WEBINARS
   ------------------------------------------------------------------------- */

function WebinarsPage({ ctx }) {
  const { registerWebinar } = ctx;
  const [tab, setTab] = useState("upcoming");
  const [registered, setRegistered] = useState({});
  const list = WEBINARS.filter(w => w.status === tab);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Webinars</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Live sessions from experts across FLEX Group.</p>
      </div>
      <Tabs
        tabs={[
          { key: "upcoming", label: "Upcoming", count: WEBINARS.filter(w => w.status === "upcoming").length },
          { key: "live", label: "Live now", count: WEBINARS.filter(w => w.status === "live").length },
          { key: "past", label: "Past", count: WEBINARS.filter(w => w.status === "past").length },
        ]}
        active={tab} onChange={setTab}
      />
      {list.length === 0 ? (
        <EmptyState icon={Video} title="Nothing here right now." subtitle="Check back soon for new sessions." />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {list.map(w => (
            <Card key={w.id} className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <Chip tone={w.status === "live" ? "danger" : "brand"}>{w.topic}</Chip>
                {w.status === "live" && <StatusBadge status="live" />}
              </div>
              <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{w.title}</h3>
              <div className="text-sm" style={{ color: "var(--slate)" }}>{w.speaker}</div>
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs" style={{ color: "var(--slate)" }}>
                <span className="flex items-center gap-1"><Calendar size={12} /> {w.date}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {w.time} · {w.duration}</span>
                <span className="flex items-center gap-1"><Users size={12} /> {w.attendees} attendees</span>
              </div>
              {w.status !== "past" ? (
                <Button size="sm" className="self-start" disabled={!!registered[w.id]} onClick={() => { setRegistered(r => ({ ...r, [w.id]: true })); registerWebinar(w.title); }}>
                  {registered[w.id] ? "Registered" : w.status === "live" ? "Join Now" : "Register"}
                </Button>
              ) : (
                <Button size="sm" variant="secondary" className="self-start" icon={Play}>Watch Recording</Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: NOTIFICATIONS
   ------------------------------------------------------------------------- */

const NOTIF_ICON = { match: Sparkles, course: BookOpen, application: Send, career: Target, mentor: Users, webinar: Video, info: Bell };

function NotificationsPage({ ctx }) {
  const { notifications, setNotifications, markAllRead } = ctx;
  const [filter, setFilter] = useState("All");
  const kinds = ["All", ...Array.from(new Set(notifications.map(n => n.kind)))];
  const list = filter === "All" ? notifications : notifications.filter(n => n.kind === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Notifications</h1>
          <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Everything the platform wants you to know about, in one place.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => ctx.markAllRead ? ctx.markAllRead() : null}>Mark all read</Button>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        {kinds.map(k => (
          <button key={k} onClick={() => setFilter(k)} className="px-3 py-1.5 rounded-full text-xs font-medium capitalize fg-focus" style={{ background: filter === k ? "var(--brand-tint)" : "var(--canvas)", color: filter === k ? "var(--brand)" : "var(--slate)" }}>
            {k}
          </button>
        ))}
      </div>
      {list.length === 0 ? (
        <EmptyState icon={Bell} title="You're all caught up." subtitle="New updates about learning, projects, and career will appear here." />
      ) : (
        <div className="space-y-2">
          {list.map(n => {
            const Icon = NOTIF_ICON[n.kind] || Bell;
            return (
              <Card key={n.id} padded={false} className="flex items-start gap-3 p-4" onClick={() => setNotifications(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))} style={{ cursor: "pointer", background: n.read ? "var(--surface)" : "var(--brand-tint)" }}>
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "var(--surface)" }}>
                  <Icon size={16} style={{ color: "var(--brand)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm" style={{ color: "var(--ink)" }}>{n.text}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--slate-light)" }}>{n.time}</div>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: "var(--amber)" }} />}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: SETTINGS
   ------------------------------------------------------------------------- */

function SettingsPage({ ctx }) {
  const { user, showToast } = ctx;
  const [tab, setTab] = useState("profile");
  const [prefs, setPrefs] = useState({ courseReco: true, gigMatches: true, mentorUpdates: true, weeklyDigest: false });

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Settings</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Manage your profile, notifications, and platform preferences.</p>
      </div>
      <Tabs tabs={[{ key: "profile", label: "Profile" }, { key: "notifications", label: "Notifications" }, { key: "mobility", label: "Mobility Preferences" }]} active={tab} onChange={setTab} />

      {tab === "profile" && (
        <Card className="space-y-4 fg-fade-in">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Full name</label>
              <input defaultValue={user.name} className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Department</label>
              <input defaultValue={user.department} disabled className="w-full px-3 py-2.5 rounded-lg text-sm" style={{ border: "1px solid var(--border)", background: "var(--canvas)", color: "var(--slate)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Career goal</label>
              <input defaultValue={user.careerGoal} className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Location</label>
              <input defaultValue={user.location} className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
          </div>
          <Button onClick={() => showToast("Profile updated")}>Save changes</Button>
        </Card>
      )}

      {tab === "notifications" && (
        <Card className="space-y-4 fg-fade-in">
          {[
            { key: "courseReco", label: "Course recommendations", sub: "AI-suggested courses based on your goals" },
            { key: "gigMatches", label: "Internal gig matches", sub: "New project matches above 70%" },
            { key: "mentorUpdates", label: "Mentor updates", sub: "Responses to mentorship requests" },
            { key: "weeklyDigest", label: "Weekly digest email", sub: "A summary of your learning activity" },
          ].map(p => (
            <label key={p.key} className="flex items-center justify-between py-2 cursor-pointer" style={{ borderBottom: "1px solid var(--border-soft)" }}>
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--ink)" }}>{p.label}</div>
                <div className="text-xs" style={{ color: "var(--slate)" }}>{p.sub}</div>
              </div>
              <button onClick={() => setPrefs(pr => ({ ...pr, [p.key]: !pr[p.key] }))} className="w-10 h-6 rounded-full relative shrink-0 transition-colors" style={{ background: prefs[p.key] ? "var(--brand)" : "var(--border)" }}>
                <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-all" style={{ left: prefs[p.key] ? 20 : 4 }} />
              </button>
            </label>
          ))}
        </Card>
      )}

      {tab === "mobility" && (
        <Card className="space-y-4 fg-fade-in">
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Mobility preference</label>
            <select defaultValue={user.mobility} className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }}>
              <option>Open to internal projects</option>
              <option>Open to department transfer</option>
              <option>Not currently available</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Weekly availability</label>
            <select defaultValue={user.availability} className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }}>
              <option>2–4 hrs/week</option>
              <option>6–8 hrs/week</option>
              <option>10+ hrs/week</option>
            </select>
          </div>
          <Button onClick={() => showToast("Mobility preferences updated")}>Save preferences</Button>
        </Card>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: MANAGER DASHBOARD (Team)
   ------------------------------------------------------------------------- */

function ManagerDashboardPage({ ctx }) {
  const { subPage, navigate } = ctx;
  const tabKey = ["overview", "gaps", "learning", "talent"].includes(subPage) ? subPage : "overview";
  const avgLearning = Math.round(TEAM.reduce((a, t) => a + t.learning, 0) / TEAM.length);
  const avgCompetency = Math.round(TEAM.reduce((a, t) => a + t.competency, 0) / TEAM.length);
  const allGaps = Array.from(new Set(TEAM.flatMap(t => t.gaps)));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Team Overview</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Digital Technology · Data & Analytics pod</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={Users} label="Team Members" value="42" />
        <KPICard icon={BookOpen} label="Learning Completion" value={`${avgLearning}%`} delta="+5% this month" />
        <KPICard icon={Award} label="Skill Coverage" value={`${avgCompetency}%`} />
        <KPICard icon={AlertTriangle} label="Open Skill Gaps" value={allGaps.length} tone="amber" />
      </div>

      <Tabs tabs={[
        { key: "overview", label: "Team Skill Matrix" },
        { key: "gaps", label: "Employee Development" },
        { key: "learning", label: "Project Talent Needs" },
        { key: "talent", label: "Recommended Talent" },
      ]} active={tabKey} onChange={(k) => navigate("team", k)} />

      {tabKey === "overview" && (
        <Card padded={false} className="overflow-x-auto fg-fade-in">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border)" }}>
                {["Team member", "Role", "Learning", "Competency", "Skill gaps"].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-xs uppercase tracking-wide" style={{ color: "var(--slate-light)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TEAM.map(t => (
                <tr key={t.id} style={{ borderBottom: "1px solid var(--border-soft)" }}>
                  <td className="px-4 py-3"><div className="flex items-center gap-2.5"><Avatar initials={t.initials} size={30} /><span className="font-medium" style={{ color: "var(--ink)" }}>{t.name}</span></div></td>
                  <td className="px-4 py-3" style={{ color: "var(--slate)" }}>{t.role}</td>
                  <td className="px-4 py-3 w-32"><ProgressBar value={t.learning} height={6} /></td>
                  <td className="px-4 py-3 w-32"><ProgressBar value={t.competency} height={6} tone="amber" /></td>
                  <td className="px-4 py-3"><div className="flex flex-wrap gap-1">{t.gaps.map(g => <Chip key={g} tone="danger">{g}</Chip>)}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {tabKey === "gaps" && (
        <div className="grid md:grid-cols-2 gap-4 fg-fade-in">
          {TEAM.map(t => (
            <Card key={t.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar initials={t.initials} size={40} />
                <div>
                  <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{t.name}</div>
                  <div className="text-xs" style={{ color: "var(--slate)" }}>{t.role}</div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1"><span style={{ color: "var(--slate)" }}>Learning progress</span><span className="fg-num" style={{ color: "var(--ink)" }}>{t.learning}%</span></div>
                <ProgressBar value={t.learning} height={6} />
              </div>
              <div className="flex flex-wrap gap-1.5">{t.gaps.map(g => <Chip key={g} tone="danger">{g}</Chip>)}</div>
              <Button size="sm" variant="secondary" className="self-start">Recommend Learning</Button>
            </Card>
          ))}
        </div>
      )}

      {tabKey === "learning" && (
        <div className="grid md:grid-cols-2 gap-4 fg-fade-in">
          {GIGS.filter(g => g.department === "Digital Technology").map(g => (
            <Card key={g.id} className="flex flex-col gap-2">
              <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{g.title}</h3>
              <div className="flex flex-wrap gap-1.5">{g.requiredSkills.map(s => <Chip key={s} tone="brand">{s}</Chip>)}</div>
              <div className="text-xs" style={{ color: "var(--slate)" }}>{g.participants}</div>
            </Card>
          ))}
        </div>
      )}

      {tabKey === "talent" && (
        <div className="space-y-3 fg-fade-in">
          <AIInsight>AI found {TEAM.length + 13} employees with &gt;80% match for open Digital Technology projects.</AIInsight>
          {TEAM.map(t => (
            <Card key={t.id} className="flex items-center gap-4">
              <Avatar initials={t.initials} size={40} />
              <div className="flex-1">
                <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{t.name}</div>
                <div className="text-xs" style={{ color: "var(--slate)" }}>{t.role}</div>
              </div>
              <Chip tone="success">{t.competency}% ready</Chip>
              <Button size="sm" variant="secondary">View Profile</Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: SKILL GAP ANALYSIS
   ------------------------------------------------------------------------- */

function SkillGapAnalysisPage({ ctx }) {
  const [dept, setDept] = useState("All");
  const list = dept === "All" ? SKILL_GAP_ORG : SKILL_GAP_ORG.filter(s => s.department === dept || s.department === "All");
  const chartData = list.map(s => ({ name: s.skill, Current: s.current, Required: s.required }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Skill Gap Analysis</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Current organizational capability versus what upcoming projects require.</p>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <Filter size={14} style={{ color: "var(--slate)" }} />
        {["All", ...DEPARTMENTS].map(d => (
          <button key={d} onClick={() => setDept(d)} className="px-3 py-1.5 rounded-full text-xs font-medium fg-focus" style={{ background: dept === d ? "var(--brand-tint)" : "var(--canvas)", color: dept === d ? "var(--brand)" : "var(--slate)" }}>{d}</button>
        ))}
      </div>

      <Card>
        <h3 className="fg-display font-bold mb-4" style={{ color: "var(--ink)" }}>Current vs. Required Capability</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={chartData} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "var(--slate)" }} />
              <YAxis type="category" dataKey="name" width={140} tick={{ fontSize: 11, fill: "var(--ink-soft)" }} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Current" fill="var(--slate-light)" radius={[0, 6, 6, 0]} barSize={12} />
              <Bar dataKey="Required" fill="var(--brand)" radius={[0, 6, 6, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map(s => (
          <Card key={s.skill}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{s.skill}</h3>
              <Chip tone="danger">Gap {s.required - s.current}%</Chip>
            </div>
            <div className="flex justify-between text-xs mb-1"><span style={{ color: "var(--slate)" }}>Current: {s.current}%</span><span style={{ color: "var(--slate)" }}>Required: {s.required}%</span></div>
            <div className="relative">
              <ProgressBar value={s.current} height={8} />
              <div className="absolute top-1/2 -translate-y-1/2 w-0.5 h-3" style={{ left: `${s.required}%`, background: "var(--ink)" }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: HR / TALENT DASHBOARD
   ------------------------------------------------------------------------- */

function HRDashboardPage({ ctx }) {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>HR / Talent Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Organization-wide learning, mobility, and capability metrics.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard icon={Users} label="Total Employees" value={ORG_METRICS.totalEmployees.toLocaleString()} />
        <KPICard icon={BookOpen} label="Active Learners" value={ORG_METRICS.activeLearners.toLocaleString()} delta="+6%" />
        <KPICard icon={CheckCircle2} label="Learning Completion" value={`${ORG_METRICS.learningCompletion}%`} />
        <KPICard icon={Briefcase} label="Internal Mobility Rate" value={`${ORG_METRICS.mobilityRate}%`} tone="amber" />
        <KPICard icon={Award} label="Skills Acquired" value={ORG_METRICS.skillsAcquired.toLocaleString()} />
        <KPICard icon={FolderKanban} label="Gig Participation" value={ORG_METRICS.gigParticipation} />
        <KPICard icon={Target} label="Talent Match Success" value={`${ORG_METRICS.matchSuccess}%`} />
        <KPICard icon={AlertTriangle} label="Critical Skill Gaps" value={ORG_METRICS.criticalGaps} tone="amber" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <h3 className="fg-display font-bold mb-4" style={{ color: "var(--ink)" }}>Learning Activity (hrs/month)</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={LEARNING_ACTIVITY}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "var(--slate)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--slate)" }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
                <Line type="monotone" dataKey="hours" stroke="var(--brand)" strokeWidth={2.5} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="fg-display font-bold mb-4" style={{ color: "var(--ink)" }}>Department Capability</h3>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={DEPT_CAPABILITY}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-soft)" />
                <XAxis dataKey="department" tick={{ fontSize: 10, fill: "var(--slate)" }} />
                <YAxis tick={{ fontSize: 11, fill: "var(--slate)" }} domain={[0, 100]} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid var(--border)", fontSize: 12 }} />
                <Bar dataKey="capability" fill="var(--amber)" radius={[6, 6, 0, 0]} barSize={28} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card>
        <h3 className="fg-display font-bold mb-4" style={{ color: "var(--ink)" }}>Skill Distribution — Critical Gaps</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_GAP_ORG.map(s => (
            <div key={s.skill} className="p-3 rounded-lg" style={{ background: "var(--canvas)" }}>
              <div className="text-sm font-medium mb-1" style={{ color: "var(--ink)" }}>{s.skill}</div>
              <ProgressBar value={s.current} height={6} />
              <div className="text-xs mt-1" style={{ color: "var(--slate)" }}>{s.current}% of {s.required}% required</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

/* -------------------------------------------------------------------------
   PAGE: GIG MANAGEMENT
   ------------------------------------------------------------------------- */

function GigManagementPage({ ctx }) {
  const { showToast } = ctx;
  const [showForm, setShowForm] = useState(false);
  const [matchCount, setMatchCount] = useState(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="fg-display text-2xl font-bold" style={{ color: "var(--ink)" }}>Gig Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>Create and manage internal gigs across the organization.</p>
        </div>
        <Button icon={Plus} onClick={() => setShowForm(true)}>Create Internal Gig</Button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {GIGS.map(g => (
          <Card key={g.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h3 className="fg-display font-bold" style={{ color: "var(--ink)" }}>{g.title}</h3>
              <Chip>{g.department}</Chip>
            </div>
            <div className="text-xs" style={{ color: "var(--slate)" }}>{g.duration} · Apply by {g.deadline}</div>
            <div className="text-xs" style={{ color: "var(--slate)" }}>{g.participants}</div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" variant="secondary" icon={Edit3}>Edit</Button>
              <Button size="sm" variant="ghost" icon={Trash2}>Close</Button>
            </div>
          </Card>
        ))}
      </div>

      <Modal open={showForm} onClose={() => { setShowForm(false); setMatchCount(null); }} title="Create Internal Gig" width={640}>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Project title</label>
              <input placeholder="e.g. Customer Retention Model" className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Description</label>
              <textarea rows={3} placeholder="What will this project accomplish?" className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Department</label>
              <select className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }}>{DEPARTMENTS.map(d => <option key={d}>{d}</option>)}</select>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Project owner</label>
              <input placeholder="e.g. Teguh Wibowo" className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Duration</label>
              <input placeholder="e.g. 6 weeks" className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Estimated workload</label>
              <input placeholder="e.g. 8 hrs/week" className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Work mode</label>
              <select className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }}><option>Remote</option><option>Hybrid</option><option>On-site</option></select>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Max participants</label>
              <input type="number" placeholder="3" className="w-full px-3 py-2.5 rounded-lg text-sm fg-focus" style={{ border: "1px solid var(--border)" }} />
            </div>
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--ink-soft)" }}>Required skills</label>
              <div className="flex flex-wrap gap-1.5">{["Python", "SQL", "Power BI", "Data Analytics"].map(s => <Chip key={s} tone="brand">{s}</Chip>)}</div>
            </div>
          </div>
          {matchCount !== null && <AIInsight>AI found {matchCount} employees with &gt;80% match for this project.</AIInsight>}
          <div className="flex gap-2 pt-2">
            <Button variant="secondary" icon={Sparkles} onClick={() => setMatchCount(17)}>Preview AI Matches</Button>
            <Button className="ml-auto" onClick={() => { setShowForm(false); setMatchCount(null); showToast("Internal gig created"); }}>Publish Gig</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
