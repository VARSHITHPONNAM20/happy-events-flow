import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Film } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieCard from "@/components/MovieCard";
import { movies } from "@/data/movies";

const Movies = () => {
  const [search, setSearch] = useState("");

  const filtered = movies.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.genre.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Film className="h-8 w-8 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Now Showing
              </h1>
            </div>
            <p className="text-muted-foreground">Book your favourite movies now</p>
          </motion.div>

          {/* Search */}
          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search movies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {filtered.map((movie, i) => (
              <MovieCard key={movie.id} movie={movie} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-20">No movies found.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Movies;
