import movie1 from "@/assets/movie-1.jpg";
import movie2 from "@/assets/movie-2.jpg";
import movie3 from "@/assets/movie-3.jpg";
import movie4 from "@/assets/movie-4.jpg";
import movie5 from "@/assets/movie-5.jpg";
import movie6 from "@/assets/movie-6.jpg";
import movieTelugu1 from "@/assets/movie-telugu-1.jpg";
import movieTelugu2 from "@/assets/movie-telugu-2.jpg";
import movieTelugu3 from "@/assets/movie-telugu-3.jpg";
import movieTelugu4 from "@/assets/movie-telugu-4.jpg";
import movieTelugu5 from "@/assets/movie-telugu-5.jpg";
import movieTelugu6 from "@/assets/movie-telugu-6.jpg";
import movieTelugu7 from "@/assets/movie-telugu-7.jpg";

export interface ShowTime {
  id: string;
  time: string;
  format: string;
  price: number;
}

export interface Movie {
  id: string;
  title: string;
  genre: string;
  rating: number;
  duration: string;
  language: string;
  certificate: string;
  poster: string;
  description: string;
  director: string;
  cast: string[];
  releaseDate: string;
  showTimes: ShowTime[];
}

export const movies: Movie[] = [
  {
    id: "m1",
    title: "Eclipse Rising",
    genre: "Sci-Fi / Action",
    rating: 8.5,
    duration: "2h 28m",
    language: "English",
    certificate: "UA",
    poster: movie1,
    description: "In a dystopian future, a lone warrior rises against a tyrannical AI empire to restore humanity's freedom.",
    director: "James Harlow",
    cast: ["Chris Valor", "Zara Knight", "Leo Storm"],
    releaseDate: "2026-04-10",
    showTimes: [
      { id: "s1", time: "10:00 AM", format: "2D", price: 150 },
      { id: "s2", time: "1:30 PM", format: "3D", price: 250 },
      { id: "s3", time: "4:45 PM", format: "IMAX", price: 350 },
      { id: "s4", time: "8:00 PM", format: "2D", price: 200 },
      { id: "s5", time: "10:30 PM", format: "3D", price: 280 },
    ],
  },
  {
    id: "m2",
    title: "Love in Paris",
    genre: "Romance / Comedy",
    rating: 7.2,
    duration: "2h 05m",
    language: "English",
    certificate: "U",
    poster: movie2,
    description: "Two strangers meet in the city of love and discover that fate has more in store than they imagined.",
    director: "Sophie Laurent",
    cast: ["Emma Rose", "Daniel Briar", "Claire Moon"],
    releaseDate: "2026-04-12",
    showTimes: [
      { id: "s6", time: "11:00 AM", format: "2D", price: 150 },
      { id: "s7", time: "2:00 PM", format: "2D", price: 150 },
      { id: "s8", time: "5:30 PM", format: "2D", price: 200 },
      { id: "s9", time: "9:00 PM", format: "2D", price: 200 },
    ],
  },
  {
    id: "m3",
    title: "The Hollow",
    genre: "Horror / Thriller",
    rating: 7.8,
    duration: "1h 55m",
    language: "English",
    certificate: "A",
    poster: movie3,
    description: "A family moves into a seemingly perfect mansion only to uncover its terrifying secrets lurking in the shadows.",
    director: "Mark Crane",
    cast: ["Sarah Veil", "Tom Ashford", "Nina Graves"],
    releaseDate: "2026-04-08",
    showTimes: [
      { id: "s10", time: "12:00 PM", format: "2D", price: 150 },
      { id: "s11", time: "3:30 PM", format: "2D", price: 150 },
      { id: "s12", time: "7:00 PM", format: "IMAX", price: 300 },
      { id: "s13", time: "10:00 PM", format: "2D", price: 200 },
    ],
  },
  {
    id: "m4",
    title: "Dragon Quest",
    genre: "Animation / Adventure",
    rating: 8.1,
    duration: "1h 48m",
    language: "English",
    certificate: "U",
    poster: movie4,
    description: "A young hero teams up with a mischievous dragon to save a magical kingdom from an ancient evil.",
    director: "Pixie Studios",
    cast: ["Voice: Anna Bell", "Voice: Jake Roar", "Voice: Mia Sparkle"],
    releaseDate: "2026-04-05",
    showTimes: [
      { id: "s14", time: "9:30 AM", format: "2D", price: 120 },
      { id: "s15", time: "12:30 PM", format: "3D", price: 200 },
      { id: "s16", time: "3:00 PM", format: "2D", price: 150 },
      { id: "s17", time: "6:00 PM", format: "3D", price: 220 },
    ],
  },
  {
    id: "m5",
    title: "Shadow Protocol",
    genre: "Action / Thriller",
    rating: 7.6,
    duration: "2h 15m",
    language: "English",
    certificate: "UA",
    poster: movie5,
    description: "A rogue spy must unravel a global conspiracy before time runs out in this high-octane thriller.",
    director: "Victor Kane",
    cast: ["Ryan Steele", "Olivia Fox", "Marcus Hunt"],
    releaseDate: "2026-04-15",
    showTimes: [
      { id: "s18", time: "10:30 AM", format: "2D", price: 150 },
      { id: "s19", time: "1:00 PM", format: "IMAX", price: 350 },
      { id: "s20", time: "4:00 PM", format: "2D", price: 200 },
      { id: "s21", time: "7:30 PM", format: "3D", price: 280 },
      { id: "s22", time: "10:45 PM", format: "2D", price: 200 },
    ],
  },
  {
    id: "m6",
    title: "Unbroken Silence",
    genre: "Drama",
    rating: 8.9,
    duration: "2h 20m",
    language: "English",
    certificate: "UA",
    poster: movie6,
    description: "A powerful story of resilience, loss, and the unbreakable human spirit in the face of adversity.",
    director: "Ava Chen",
    cast: ["Lily Hart", "Samuel Cross", "Diana Pearl"],
    releaseDate: "2026-04-18",
    showTimes: [
      { id: "s23", time: "11:30 AM", format: "2D", price: 150 },
      { id: "s24", time: "2:30 PM", format: "2D", price: 150 },
      { id: "s25", time: "6:00 PM", format: "2D", price: 200 },
      { id: "s26", time: "9:30 PM", format: "2D", price: 200 },
    ],
  },
  {
    id: "m7",
    title: "Ustaad Bhagat Singh",
    genre: "Action / Drama",
    rating: 7.9,
    duration: "2h 35m",
    language: "Telugu",
    certificate: "UA",
    poster: movieTelugu1,
    description: "A fearless police officer takes on the corrupt system to bring justice to the common people.",
    director: "Anil Ravipudi",
    cast: ["Pawan Kalyan", "Sreeleela", "Sakshi Tanwar"],
    releaseDate: "2026-04-11",
    showTimes: [
      { id: "s27", time: "10:00 AM", format: "2D", price: 150 },
      { id: "s28", time: "1:30 PM", format: "2D", price: 200 },
      { id: "s29", time: "5:00 PM", format: "2D", price: 200 },
      { id: "s30", time: "8:30 PM", format: "2D", price: 250 },
    ],
  },
  {
    id: "m8",
    title: "Bhartha Mahasayulaku Wignyapthi",
    genre: "Drama / Political",
    rating: 7.5,
    duration: "2h 20m",
    language: "Telugu",
    certificate: "UA",
    poster: movieTelugu2,
    description: "A gripping political drama that exposes the deep-rooted corruption in the system through the eyes of an honest citizen.",
    director: "Trinadha Rao Nakkina",
    cast: ["Nani", "Rashmika Mandanna", "Murali Sharma"],
    releaseDate: "2026-04-14",
    showTimes: [
      { id: "s31", time: "11:00 AM", format: "2D", price: 150 },
      { id: "s32", time: "2:30 PM", format: "2D", price: 200 },
      { id: "s33", time: "6:00 PM", format: "2D", price: 200 },
      { id: "s34", time: "9:30 PM", format: "2D", price: 250 },
    ],
  },
  {
    id: "m9",
    title: "Vishnu Vinyasam",
    genre: "Comedy / Adventure",
    rating: 7.3,
    duration: "2h 10m",
    language: "Telugu",
    certificate: "U",
    poster: movieTelugu3,
    description: "A hilarious adventure where a quirky hero finds himself in absurd situations while trying to save his village.",
    director: "Harish Shankar",
    cast: ["Venkatesh", "Siddhu Jonnalagadda", "Pooja Hegde"],
    releaseDate: "2026-04-09",
    showTimes: [
      { id: "s35", time: "10:30 AM", format: "2D", price: 120 },
      { id: "s36", time: "1:00 PM", format: "2D", price: 150 },
      { id: "s37", time: "4:30 PM", format: "2D", price: 200 },
      { id: "s38", time: "7:30 PM", format: "2D", price: 200 },
    ],
  },
  {
    id: "m10",
    title: "Couple Friendly",
    genre: "Romance / Comedy",
    rating: 7.1,
    duration: "2h 05m",
    language: "Telugu",
    certificate: "UA",
    poster: movieTelugu4,
    description: "A modern love story exploring the ups and downs of relationships in today's fast-paced world.",
    director: "Parasuram",
    cast: ["Vijay Deverakonda", "Samantha Ruth Prabhu", "Vennela Kishore"],
    releaseDate: "2026-04-12",
    showTimes: [
      { id: "s39", time: "11:30 AM", format: "2D", price: 150 },
      { id: "s40", time: "2:00 PM", format: "2D", price: 150 },
      { id: "s41", time: "5:30 PM", format: "2D", price: 200 },
      { id: "s42", time: "9:00 PM", format: "2D", price: 250 },
    ],
  },
  {
    id: "m11",
    title: "Mrithyunjay",
    genre: "Action / Mythology",
    rating: 8.4,
    duration: "2h 45m",
    language: "Telugu",
    certificate: "UA",
    poster: movieTelugu5,
    description: "An epic mythological action saga about a warrior who defies death itself to protect his people.",
    director: "S.S. Rajamouli",
    cast: ["Ram Charan", "Jr NTR", "Alia Bhatt"],
    releaseDate: "2026-04-18",
    showTimes: [
      { id: "s43", time: "10:00 AM", format: "2D", price: 200 },
      { id: "s44", time: "1:00 PM", format: "3D", price: 300 },
      { id: "s45", time: "4:30 PM", format: "IMAX", price: 400 },
      { id: "s46", time: "8:00 PM", format: "3D", price: 350 },
      { id: "s47", time: "11:00 PM", format: "2D", price: 250 },
    ],
  },
  {
    id: "m12",
    title: "Sumathi Sathakam",
    genre: "Drama / Family",
    rating: 8.0,
    duration: "2h 15m",
    language: "Telugu",
    certificate: "U",
    poster: movieTelugu6,
    description: "A heartwarming tale of a wise teacher who transforms an entire community through the power of knowledge and compassion.",
    director: "Sekhar Kammula",
    cast: ["Nagarjuna", "Keerthy Suresh", "Prakash Raj"],
    releaseDate: "2026-04-20",
    showTimes: [
      { id: "s48", time: "10:00 AM", format: "2D", price: 150 },
      { id: "s49", time: "1:30 PM", format: "2D", price: 150 },
      { id: "s50", time: "5:00 PM", format: "2D", price: 200 },
      { id: "s51", time: "8:30 PM", format: "2D", price: 200 },
    ],
  },
  {
    id: "m13",
    title: "Lenin",
    genre: "Political / Drama",
    rating: 8.2,
    duration: "2h 30m",
    language: "Telugu",
    certificate: "UA",
    poster: movieTelugu7,
    description: "A fiery political drama about a revolutionary leader who rises from the masses to challenge the establishment and fight for the oppressed.",
    director: "Vamsi Paidipally",
    cast: ["Mahesh Babu", "Keerthy Suresh", "Prakash Raj"],
    releaseDate: "2026-04-22",
    showTimes: [
      { id: "s52", time: "10:15 AM", format: "2D", price: 180 },
      { id: "s53", time: "1:45 PM", format: "2D", price: 200 },
      { id: "s54", time: "5:15 PM", format: "2D", price: 250 },
      { id: "s55", time: "8:45 PM", format: "2D", price: 250 },
    ],
  },
];
