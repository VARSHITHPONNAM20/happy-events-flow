import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { events } from "@/data/events";
import EventCard from "./EventCard";

const FeaturedEvents = () => {
  const featured = events.filter((e) => e.featured);

  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold">Featured Events</h2>
            <p className="text-muted-foreground mt-1">Don't miss these trending experiences</p>
          </div>
          <Link
            to="/events"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-accent hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((event, i) => (
            <EventCard key={event.id} event={event} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
