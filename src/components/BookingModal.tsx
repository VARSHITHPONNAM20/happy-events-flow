import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Check, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Event, type TicketTier } from "@/data/events";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface BookingModalProps {
  event: Event;
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ event, open, onClose }: BookingModalProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");
  const [bookingLoading, setBookingLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const updateQty = (ticketId: string, delta: number, max: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, Math.min(current + delta, max, 10));
      return { ...prev, [ticketId]: next };
    });
  };

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = event.tickets.reduce((sum, t) => sum + (quantities[t.id] || 0) * t.price, 0);

  const handleConfirm = async () => {
    if (!user) {
      toast({ title: "Please sign in", description: "You need to be signed in to book tickets.", variant: "destructive" });
      return;
    }
    setBookingLoading(true);
    try {
      const ticketsToBook = event.tickets.filter((t) => (quantities[t.id] || 0) > 0);
      const inserts = ticketsToBook.map((t) => ({
        user_id: user.id,
        event_title: event.title,
        event_date: event.date,
        event_venue: event.venue,
        event_location: event.location,
        ticket_tier_name: t.name,
        quantity: quantities[t.id],
        total_price: (quantities[t.id] || 0) * t.price,
      }));

      const { error } = await supabase.from("event_bookings").insert(inserts);
      if (error) throw error;

      setStep("success");
      toast({
        title: "Booking Confirmed! 🎉",
        description: `You've booked ${totalItems} ticket(s) for ${event.title}.`,
      });
    } catch (err: any) {
      toast({ title: "Booking failed", description: err.message, variant: "destructive" });
    } finally {
      setBookingLoading(false);
    }
  };

  const handleClose = () => {
    setStep("select");
    setQuantities({});
    onClose();
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h3 className="font-bold text-lg text-card-foreground">
              {step === "success" ? "Booking Confirmed" : "Select Tickets"}
            </h3>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">
            {step === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateX: 40 }}
                animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
                className="text-center py-8 space-y-5 relative overflow-hidden"
                style={{ perspective: "1000px" }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-amber-500/10 to-red-600/5 pointer-events-none" />

                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", bounce: 0.5 }}
                  className="mx-auto h-20 w-20 rounded-full bg-gradient-to-br from-amber-400 to-red-600 flex items-center justify-center shadow-lg shadow-amber-500/30"
                >
                  <Check className="h-10 w-10 text-white" />
                </motion.div>

                <motion.h4
                  initial={{ opacity: 0, y: 30, rotateX: 60 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-4xl font-black tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #FBBF24, #DC2626, #FBBF24)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3)) drop-shadow(0 8px 16px rgba(220, 38, 38, 0.2))",
                  }}
                >
                  Thank You!
                </motion.h4>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-amber-400 font-semibold text-lg"
                >
                  🎉 You're all set!
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-400 text-sm"
                >
                  {totalItems} ticket(s) for <strong className="text-white">{event.title}</strong> have been booked.
                  <br />Check your email for confirmation details.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <Button onClick={handleClose} className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 rounded-full shadow-lg shadow-red-600/30 mt-2">
                    Done
                  </Button>
                </motion.div>
              </motion.div>
            ) : step === "confirm" ? (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Review your order:</p>
                {event.tickets
                  .filter((t) => (quantities[t.id] || 0) > 0)
                  .map((t) => (
                    <div key={t.id} className="flex justify-between items-center py-2 border-b border-border">
                      <div>
                        <div className="font-medium text-card-foreground text-sm">{t.name}</div>
                        <div className="text-xs text-muted-foreground">× {quantities[t.id]}</div>
                      </div>
                      <div className="font-semibold text-card-foreground">${(quantities[t.id] || 0) * t.price}</div>
                    </div>
                  ))}
                <div className="flex justify-between items-center pt-2 text-lg font-bold text-card-foreground">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground mb-4">{event.title}</p>
                {event.tickets.map((tier) => (
                  <TicketRow
                    key={tier.id}
                    tier={tier}
                    quantity={quantities[tier.id] || 0}
                    onUpdate={(delta) => updateQty(tier.id, delta, tier.available)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {step !== "success" && (
            <div className="border-t border-border px-6 py-4 flex items-center justify-between">
              {step === "confirm" ? (
                <>
                  <Button variant="ghost" onClick={() => setStep("select")} disabled={bookingLoading}>Back</Button>
                  <Button onClick={handleConfirm} disabled={bookingLoading} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Ticket className="mr-2 h-4 w-4" />
                    {bookingLoading ? "Booking..." : "Confirm Booking"}
                  </Button>
                </>
              ) : (
                <>
                  <div className="text-sm text-muted-foreground">
                    {totalItems > 0 && <span className="font-semibold text-card-foreground">${totalPrice}</span>}
                  </div>
                  <Button
                    disabled={totalItems === 0}
                    onClick={() => setStep("confirm")}
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Continue ({totalItems})
                  </Button>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const TicketRow = ({
  tier,
  quantity,
  onUpdate,
}: {
  tier: TicketTier;
  quantity: number;
  onUpdate: (delta: number) => void;
}) => (
  <div className="rounded-lg border border-border p-4 space-y-2">
    <div className="flex justify-between items-start">
      <div>
        <div className="font-medium text-card-foreground">{tier.name}</div>
        <div className="text-xs text-muted-foreground">{tier.description}</div>
      </div>
      <div className="text-right">
        <div className="font-bold text-card-foreground">
          {tier.price === 0 ? "Free" : `$${tier.price}`}
        </div>
        <div className="text-xs text-muted-foreground">{tier.available} left</div>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onUpdate(-1)}
        disabled={quantity === 0}
      >
        <Minus className="h-3 w-3" />
      </Button>
      <span className="w-8 text-center font-medium text-card-foreground">{quantity}</span>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onUpdate(1)}
        disabled={quantity >= tier.available || quantity >= 10}
      >
        <Plus className="h-3 w-3" />
      </Button>
    </div>
  </div>
);

export default BookingModal;
