import eventConcert from "@/assets/event-concert.webp";
import eventConference from "@/assets/event-conference.webp";
import eventWorkshop from "@/assets/event-workshop.webp";
import eventSports from "@/assets/event-sports.webp";
import eventCultural from "@/assets/event-cultural.webp";

export type EventCategory = "concert" | "conference" | "workshop" | "sports" | "cultural";

export interface TicketTier {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: EventCategory;
  date: string;
  time: string;
  location: string;
  venue: string;
  image: string;
  organizer: string;
  tickets: TicketTier[];
  featured: boolean;
  totalCapacity: number;
  soldCount: number;
}

export const categories: { id: EventCategory; label: string; icon: string }[] = [
  { id: "concert", label: "Concerts", icon: "🎵" },
  { id: "conference", label: "Conferences", icon: "🎤" },
  { id: "workshop", label: "Workshops", icon: "🎨" },
  { id: "sports", label: "Sports", icon: "⚽" },
  { id: "cultural", label: "Cultural", icon: "🎭" },
];

export const events: Event[] = [
  {
    id: "1",
    title: "Neon Pulse Music Festival",
    description: "A three-day electronic music extravaganza featuring top DJs from around the world.",
    longDescription: "Experience the ultimate electronic music festival with over 50 artists across 4 stages. Featuring immersive light shows, art installations, and gourmet food vendors. The Neon Pulse Music Festival brings together the best in electronic, house, and techno music for an unforgettable weekend experience.",
    category: "concert",
    date: "2026-04-15",
    time: "18:00",
    location: "Los Angeles, CA",
    venue: "Sunset Arena",
    image: eventConcert,
    organizer: "Pulse Productions",
    featured: true,
    totalCapacity: 5000,
    soldCount: 3200,
    tickets: [
      { id: "t1", name: "General Admission", price: 89, description: "Access to all main stages", available: 1200 },
      { id: "t2", name: "VIP Pass", price: 199, description: "VIP lounge, priority viewing, complimentary drinks", available: 300 },
      { id: "t3", name: "Backstage Experience", price: 499, description: "Meet the artists, exclusive backstage access", available: 50 },
    ],
  },
  {
    id: "2",
    title: "Future Tech Summit 2026",
    description: "The premier technology conference for innovators, startups, and industry leaders.",
    longDescription: "Join 2,000+ tech leaders, investors, and innovators at the Future Tech Summit. Explore AI, blockchain, quantum computing, and more through keynotes, workshops, and networking sessions. Features hands-on demo areas and startup pitch competitions.",
    category: "conference",
    date: "2026-05-20",
    time: "09:00",
    location: "San Francisco, CA",
    venue: "Moscone Center",
    image: eventConference,
    organizer: "TechVision Inc.",
    featured: true,
    totalCapacity: 2000,
    soldCount: 1450,
    tickets: [
      { id: "t4", name: "Standard Pass", price: 299, description: "Full conference access, all sessions", available: 400 },
      { id: "t5", name: "Premium Pass", price: 599, description: "Priority seating, workshop access, networking dinner", available: 100 },
      { id: "t6", name: "Executive Pass", price: 999, description: "All access, private meeting rooms, 1-on-1 mentoring", available: 30 },
    ],
  },
  {
    id: "3",
    title: "Watercolor Masterclass",
    description: "Learn advanced watercolor techniques from award-winning artist Maria Chen.",
    longDescription: "This intensive two-day workshop covers advanced watercolor techniques including wet-on-wet, glazing, and negative painting. All materials provided. Suitable for intermediate to advanced painters looking to refine their craft.",
    category: "workshop",
    date: "2026-03-28",
    time: "10:00",
    location: "Portland, OR",
    venue: "Creative Arts Studio",
    image: eventWorkshop,
    organizer: "Art Academy PDX",
    featured: false,
    totalCapacity: 30,
    soldCount: 22,
    tickets: [
      { id: "t7", name: "Workshop Seat", price: 150, description: "Full 2-day workshop with materials", available: 8 },
    ],
  },
  {
    id: "4",
    title: "Champions League Finals Viewing",
    description: "Watch the Champions League final on a giant screen with fellow football fans.",
    longDescription: "Join thousands of passionate football fans for the ultimate Champions League Finals viewing experience. Features a massive 50-foot LED screen, live commentary, halftime entertainment, food trucks, and a festive atmosphere.",
    category: "sports",
    date: "2026-06-01",
    time: "20:00",
    location: "Austin, TX",
    venue: "Stadium Park",
    image: eventSports,
    organizer: "Sports Fan Club ATX",
    featured: true,
    totalCapacity: 3000,
    soldCount: 2100,
    tickets: [
      { id: "t8", name: "General Entry", price: 25, description: "Open standing area", available: 700 },
      { id: "t9", name: "Reserved Seating", price: 55, description: "Covered seating with table", available: 150 },
      { id: "t10", name: "Premium Box", price: 120, description: "Private box for 4, catering included", available: 20 },
    ],
  },
  {
    id: "5",
    title: "Spring Cultural Festival",
    description: "A celebration of diverse cultures through dance, music, food, and art.",
    longDescription: "The Spring Cultural Festival brings together over 20 cultural communities for a vibrant celebration of diversity. Enjoy traditional dance performances, live music, artisan crafts, and cuisine from around the world. Family-friendly with dedicated kids' activities.",
    category: "cultural",
    date: "2026-04-05",
    time: "11:00",
    location: "Chicago, IL",
    venue: "Millennium Park",
    image: eventCultural,
    organizer: "Chicago Cultural Alliance",
    featured: false,
    totalCapacity: 10000,
    soldCount: 4500,
    tickets: [
      { id: "t11", name: "Free Entry", price: 0, description: "General festival access", available: 5000 },
      { id: "t12", name: "Food & Culture Pass", price: 35, description: "5 food vouchers + workshop access", available: 500 },
    ],
  },
  {
    id: "6",
    title: "Jazz Under the Stars",
    description: "An intimate evening of live jazz in a beautiful rooftop setting.",
    longDescription: "Experience world-class jazz musicians performing under the night sky on a stunning rooftop venue. Enjoy craft cocktails, artisan appetizers, and the smooth sounds of jazz in an intimate setting limited to just 200 guests.",
    category: "concert",
    date: "2026-05-10",
    time: "19:30",
    location: "New York, NY",
    venue: "Skyline Rooftop",
    image: eventConcert,
    organizer: "NYC Jazz Society",
    featured: false,
    totalCapacity: 200,
    soldCount: 165,
    tickets: [
      { id: "t13", name: "Standard Ticket", price: 75, description: "Entry with one complimentary drink", available: 25 },
      { id: "t14", name: "Dinner & Show", price: 175, description: "3-course dinner, premium seating, 2 drinks", available: 10 },
    ],
  },
];
