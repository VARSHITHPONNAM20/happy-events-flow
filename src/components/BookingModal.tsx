import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Check, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Event, type TicketTier } from "@/data/events";
import { useToast } from "@/hooks/use-toast";

interface BookingModalProps {
  event: Event;
  open: boolean;
  onClose: () => void;
}

const BookingModal = ({ event, open, onClose }: BookingModalProps) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [step, setStep] = useState<"select" | "confirm" | "success">("select");
  const { toast } = useToast();

  const updateQty = (ticketId: string, delta: number, max: number) => {
    setQuantities((prev) => {
      const current = prev[ticketId] || 0;
      const next = Math.max(0, Math.min(current + delta, max, 10));
      return { ...prev, [ticketId]: next };
    });
  };

  const totalItems = Object.values(quantities).reduce((a, b) => a + b, 0);
  const totalPrice = event.tickets.reduce((sum, t) => sum + (quantities[t.id] || 0) * t.price, 0);

  const handleConfirm = () => {
    setStep("success");
    toast({
      title: "Booking Confirmed! 🎉",
      description: `You've booked ${totalItems} ticket(s) for ${event.title}.`,
    });
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
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-success/10 flex items-center justify-center">
                  <Check className="h-8 w-8 text-success" />
                </div>
                <h4 className="text-xl font-bold text-card-foreground">You're all set!</h4>
                <p className="text-muted-foreground text-sm">
                  {totalItems} ticket(s) for <strong>{event.title}</strong> have been booked.
                  Check your email for confirmation details.
                </p>
                <Button onClick={handleClose} className="bg-accent text-accent-foreground hover:bg-accent/90 mt-4">
                  Done
                </Button>
              </div>
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
                  <Button variant="ghost" onClick={() => setStep("select")}>Back</Button>
                  <Button onClick={handleConfirm} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Ticket className="mr-2 h-4 w-4" />
                    Confirm Booking
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
