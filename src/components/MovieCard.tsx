import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Movie } from "@/data/movies";

interface MovieCardProps {
  movie: Movie;
  index?: number;
}

const MovieCard = ({ movie, index = 0 }: MovieCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.4 }}
  >
    <Link to={`/movies/${movie.id}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1">
        {/* Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.poster}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={512}
            height={768}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          {/* Rating badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-accent text-accent-foreground font-bold gap-1">
              <Star className="h-3 w-3 fill-current" />
              {movie.rating}
            </Badge>
          </div>

          {/* Certificate */}
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className="backdrop-blur-sm text-xs border-foreground/30 text-foreground">
              {movie.certificate}
            </Badge>
          </div>

          {/* Bottom info */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex items-center gap-2 text-xs text-foreground/80">
              <Clock className="h-3 w-3" />
              {movie.duration}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-1.5">
          <h3 className="font-bold text-card-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <p className="text-xs text-muted-foreground">{movie.genre}</p>
          <p className="text-xs text-muted-foreground line-clamp-2">{movie.description}</p>
        </div>
      </div>
    </Link>
  </motion.div>
);

export default MovieCard;
