import { useState } from "react";
import { motion } from "framer-motion";
import { Monitor } from "lucide-react";

interface SeatSelectionProps {
  onSelectionChange: (seats: string[]) => void;
  maxSeats?: number;
}

type SeatStatus = "available" | "booked" | "selected";

interface Seat {
  id: string;
  row: string;
  number: number;
  status: SeatStatus;
}

const generateSeats = (): Seat[] => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const seatsPerRow = 12;
  const bookedSeats = new Set([
    "A-3", "A-4", "A-7", "B-2", "B-5", "B-6", "B-9",
    "C-1", "C-8", "C-10", "D-3", "D-4", "D-5", "D-11",
    "E-2", "E-6", "E-7", "F-1", "F-9", "F-10",
    "G-4", "G-5", "G-8", "H-3", "H-6", "H-7", "H-11",
  ]);

  const seats: Seat[] = [];
  rows.forEach((row) => {
    for (let i = 1; i <= seatsPerRow; i++) {
      const id = `${row}-${i}`;
      seats.push({
        id,
        row,
        number: i,
        status: bookedSeats.has(id) ? "booked" : "available",
      });
    }
  });
  return seats;
};

const SeatSelection = ({ onSelectionChange, maxSeats = 10 }: SeatSelectionProps) => {
  const [seats, setSeats] = useState<Seat[]>(generateSeats);

  const toggleSeat = (seatId: string) => {
    setSeats((prev) => {
      const selectedCount = prev.filter((s) => s.status === "selected").length;
      const updated = prev.map((s) => {
        if (s.id !== seatId || s.status === "booked") return s;
        if (s.status === "selected") return { ...s, status: "available" as SeatStatus };
        if (selectedCount >= maxSeats) return s;
        return { ...s, status: "selected" as SeatStatus };
      });
      onSelectionChange(updated.filter((s) => s.status === "selected").map((s) => s.id));
      return updated;
    });
  };

  const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];

  return (
    <div className="space-y-6">
      {/* Screen */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Monitor className="h-3 w-3" />
          SCREEN
        </div>
      </div>

      {/* Seats Grid */}
      <div className="flex flex-col items-center gap-2 py-4">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-1">
            <span className="w-6 text-xs text-muted-foreground font-medium">{row}</span>
            <div className="flex gap-1">
              {seats
                .filter((s) => s.row === row)
                .map((seat) => (
                  <motion.button
                    key={seat.id}
                    whileHover={seat.status !== "booked" ? { scale: 1.2 } : {}}
                    whileTap={seat.status !== "booked" ? { scale: 0.9 } : {}}
                    onClick={() => toggleSeat(seat.id)}
                    disabled={seat.status === "booked"}
                    className={`w-7 h-7 rounded-t-lg text-[10px] font-bold transition-colors
                      ${seat.status === "available"
                        ? "bg-green-500 hover:bg-green-400 text-white cursor-pointer"
                        : seat.status === "booked"
                        ? "bg-red-500/80 text-red-200 cursor-not-allowed"
                        : "bg-yellow-400 text-black cursor-pointer ring-2 ring-yellow-300"
                      }`}
                    title={`${seat.row}${seat.number}`}
                  >
                    {seat.number}
                  </motion.button>
                ))}
            </div>
            <span className="w-6 text-xs text-muted-foreground font-medium">{row}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-t-md bg-green-500" />
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-t-md bg-red-500/80" />
          <span className="text-muted-foreground">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-t-md bg-yellow-400" />
          <span className="text-muted-foreground">Selected</span>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;
