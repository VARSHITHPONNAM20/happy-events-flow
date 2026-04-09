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
];
