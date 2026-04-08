import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, Clock, Calendar, Globe, Film, Users, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SeatSelection from "@/components/SeatSelection";
import { movies, type ShowTime } from "@/data/movies";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const MovieDetail = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === id);
  const [selectedShow, setSelectedShow] = useState<ShowTime | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState<"showtime" | "seats" | "confirmed">("showtime");
  const [bookingLoading, setBookingLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  if (!movie) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <Link to="/movies" className="text-primary hover:underline">Browse all movies</Link>
        </div>
      </div>
    );
  }

  const handleConfirmBooking = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to sign in to book tickets.", variant: "destructive" });
      return;
    }
    setBookingLoading(true);
    const { error } = await supabase.from("movie_bookings").insert({
      user_id: user.id,
      movie_id: movie.id,
      movie_title: movie.title,
      show_time: selectedShow?.time || "",
      show_format: selectedShow?.format || "",
      seats: selectedSeats,
      total_price: totalPrice,
    });
    setBookingLoading(false);
    if (error) {
      toast({ title: "Booking failed", description: error.message, variant: "destructive" });
      return;
    }
    setStep("confirmed");
    toast({
      title: "Booking Confirmed! 🎬",
      description: `${selectedSeats.length} seat(s) booked for ${movie.title} at ${selectedShow?.time}`,
    });
  };

  const totalPrice = selectedSeats.length * (selectedShow?.price || 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          <Link
            to="/movies"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to movies
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Movie Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 space-y-4">
                <div className="overflow-hidden rounded-xl border border-border">
                  <img src={movie.poster} alt={movie.title} className="w-full object-cover" />
                </div>

                <div className="space-y-3">
                  <h1 className="text-2xl font-extrabold text-foreground">{movie.title}</h1>

                  <div className="flex items-center gap-2">
                    <Badge className="bg-accent text-accent-foreground gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {movie.rating}/10
                    </Badge>
                    <Badge variant="outline">{movie.certificate}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {[
                      { icon: Clock, label: movie.duration },
                      { icon: Film, label: movie.genre },
                      { icon: Globe, label: movie.language },
                      { icon: Calendar, label: movie.releaseDate },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-muted-foreground">
                        <item.icon className="h-3.5 w-3.5 text-primary" />
                        <span>{item.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground">{movie.description}</p>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Director: </span>
                    <span className="text-foreground font-medium">{movie.director}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Cast: </span>
                    <span className="text-foreground font-medium">{movie.cast.join(", ")}</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: Booking Flow */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              {step === "confirmed" ? (
                <div className="rounded-xl border border-border bg-card p-8 text-center space-y-4">
                  <div className="mx-auto h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <Ticket className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-card-foreground">Booking Confirmed!</h2>
                  <p className="text-muted-foreground">
                    <strong>{movie.title}</strong> — {selectedShow?.time} ({selectedShow?.format})
                  </p>
                  <p className="text-muted-foreground">
                    Seats: <strong>{selectedSeats.join(", ")}</strong>
                  </p>
                  <p className="text-xl font-bold text-accent">Total: ${totalPrice}</p>
                  <Button onClick={() => { setStep("showtime"); setSelectedShow(null); setSelectedSeats([]); }}
                    className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Book Another
                  </Button>
                </div>
              ) : step === "seats" ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-foreground">Select Your Seats</h2>
                    <Button variant="ghost" size="sm" onClick={() => setStep("showtime")}>
                      ← Change Show
                    </Button>
                  </div>

                  <div className="rounded-xl border border-border bg-card p-6">
                    <div className="text-center mb-4">
                      <Badge className="bg-primary text-primary-foreground">
                        {selectedShow?.time} • {selectedShow?.format} • ${selectedShow?.price}/seat
                      </Badge>
                    </div>

                    <SeatSelection onSelectionChange={setSelectedSeats} />
                  </div>

                  {selectedSeats.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="rounded-xl border border-border bg-card p-6 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {selectedSeats.length} seat(s): {selectedSeats.join(", ")}
                        </p>
                        <p className="text-2xl font-extrabold text-accent">${totalPrice}</p>
                      </div>
                      <Button
                        size="lg"
                        onClick={handleConfirmBooking}
                        className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg"
                      >
                        <Ticket className="mr-2 h-4 w-4" />
                        Confirm Booking
                      </Button>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Select Show Time
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {movie.showTimes.map((show) => (
                      <motion.button
                        key={show.id}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          setSelectedShow(show);
                          setStep("seats");
                        }}
                        className="rounded-xl border border-border bg-card p-4 text-left hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all group"
                      >
                        <div className="text-lg font-bold text-card-foreground group-hover:text-primary transition-colors">
                          {show.time}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-[10px]">{show.format}</Badge>
                          <span className="text-sm font-semibold text-accent">${show.price}</span>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetail;
