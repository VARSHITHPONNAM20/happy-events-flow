import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Users, ArrowLeft, Share2, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { events } from "@/data/events";
import { format } from "date-fns";

const EventDetail = () => {
  const { id } = useParams();
  const event = events.find((e) => e.id === id);
  const [bookingOpen, setBookingOpen] = useState(false);

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Event not found</h1>
          <Link to="/events" className="text-accent hover:underline">
            Browse all events
          </Link>
        </div>
      </div>
    );
  }

  const percentSold = Math.round((event.soldCount / event.totalCapacity) * 100);
  const lowestPrice = Math.min(...event.tickets.map((t) => t.price));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[350px]">
        <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="container pb-8">
            <Link
              to="/events"
              className="inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to events
            </Link>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground"
            >
              {event.title}
            </motion.h1>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <div className="container py-10">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left: Details */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-wrap gap-3"
              >
                <Badge variant="outline" className="capitalize">{event.category}</Badge>
                {event.featured && <Badge className="bg-accent text-accent-foreground">Featured</Badge>}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4"
              >
                {[
                  { icon: Calendar, label: "Date", value: format(new Date(event.date), "MMM d, yyyy") },
                  { icon: Clock, label: "Time", value: event.time },
                  { icon: MapPin, label: "Location", value: event.location },
                  { icon: Users, label: "Capacity", value: event.totalCapacity.toLocaleString() },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-border bg-card p-4">
                    <item.icon className="h-4 w-4 text-accent mb-1" />
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="text-sm font-semibold text-card-foreground">{item.value}</div>
                  </div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-xl font-bold mb-3">About this event</h2>
                <p className="text-muted-foreground leading-relaxed">{event.longDescription}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h2 className="text-xl font-bold mb-3">Venue</h2>
                <div className="rounded-lg border border-border bg-card p-6">
                  <h3 className="font-semibold text-card-foreground">{event.venue}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{event.location}</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-xl font-bold mb-3">Tickets</h2>
                <div className="space-y-3">
                  {event.tickets.map((tier) => (
                    <div
                      key={tier.id}
                      className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
                    >
                      <div>
                        <div className="font-medium text-card-foreground">{tier.name}</div>
                        <div className="text-sm text-muted-foreground">{tier.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-card-foreground">
                          {tier.price === 0 ? "Free" : `₹${tier.price}`}
                        </div>
                        <div className="text-xs text-muted-foreground">{tier.available} left</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Sticky booking card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="sticky top-24 rounded-xl border border-border bg-card p-6 space-y-5 shadow-lg"
              >
                <div>
                  <div className="text-sm text-muted-foreground">Starting from</div>
                  <div className="text-3xl font-extrabold text-card-foreground">
                    {lowestPrice === 0 ? "Free" : `₹${lowestPrice}`}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Availability</span>
                    <span className="font-medium text-card-foreground">{percentSold}% sold</span>
                  </div>
                  <Progress value={percentSold} className="h-2" />
                </div>

                <div className="text-sm text-muted-foreground">
                  Organized by <span className="font-medium text-card-foreground">{event.organizer}</span>
                </div>

                <Button
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-md shadow-accent/20"
                  size="lg"
                  onClick={() => setBookingOpen(true)}
                >
                  Book Tickets
                </Button>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <BookingModal event={event} open={bookingOpen} onClose={() => setBookingOpen(false)} />
    </div>
  );
};

export default EventDetail;
