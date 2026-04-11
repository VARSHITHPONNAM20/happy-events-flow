import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Event } from "@/data/events";
import { format } from "date-fns";

interface EventCardProps {
  event: Event;
  index?: number;
}

const categoryColors: Record<string, string> = {
  concert: "bg-accent/10 text-accent border-accent/20",
  conference: "bg-primary/10 text-primary border-primary/20",
  workshop: "bg-success/10 text-success border-success/20",
  sports: "bg-warning/10 text-warning border-warning/20",
  cultural: "bg-accent/10 text-accent border-accent/20",
};

const EventCard = ({ event, index = 0 }: EventCardProps) => {
  const lowestPrice = Math.min(...event.tickets.map((t) => t.price));
  const percentSold = Math.round((event.soldCount / event.totalCapacity) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <Link to={`/events/${event.id}`} className="group block">
        <div className="overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-1">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            
            <div className="absolute top-3 left-3">
              <Badge variant="outline" className={`${categoryColors[event.category]} backdrop-blur-sm text-xs`}>
                {event.category}
              </Badge>
            </div>

            {event.featured && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-accent text-accent-foreground text-xs">Featured</Badge>
              </div>
            )}

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="text-sm font-semibold text-primary-foreground">
                {lowestPrice === 0 ? "Free" : `From ₹${lowestPrice}`}
              </div>
              <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
                <Users className="h-3 w-3" />
                {percentSold}% sold
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-card-foreground line-clamp-1 group-hover:text-accent transition-colors">
              {event.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
            <div className="flex items-center gap-4 pt-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {format(new Date(event.date), "MMM d, yyyy")}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default EventCard;
