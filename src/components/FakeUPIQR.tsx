import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Smartphone, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FakeUPIQRProps {
  amount: number;
  onPaymentComplete: () => void;
  onBack: () => void;
}

const FakeUPIQR = ({ amount, onPaymentComplete, onBack }: FakeUPIQRProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [paid, setPaid] = useState(false);

  // Draw fake QR code
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 200;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    // Draw QR-like pattern
    const cellSize = 8;
    const grid = size / cellSize;
    
    // Seed-based pseudo-random for consistent pattern
    let seed = 42;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    ctx.fillStyle = "#000000";

    // Corner markers (QR standard)
    const drawMarker = (x: number, y: number) => {
      ctx.fillRect(x, y, cellSize * 7, cellSize * 7);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5);
      ctx.fillStyle = "#000000";
      ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3);
    };

    drawMarker(0, 0);
    drawMarker(size - cellSize * 7, 0);
    drawMarker(0, size - cellSize * 7);

    // Random data cells
    for (let i = 0; i < grid; i++) {
      for (let j = 0; j < grid; j++) {
        // Skip corner marker areas
        if ((i < 8 && j < 8) || (i >= grid - 8 && j < 8) || (i < 8 && j >= grid - 8)) continue;
        if (rand() > 0.55) {
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }

    // UPI logo in center
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(size / 2 - 20, size / 2 - 20, 40, 40);
    ctx.fillStyle = "#5F259F";
    ctx.font = "bold 12px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("UPI", size / 2, size / 2);
  }, []);

  const handleScanPay = () => {
    setScanning(true);
    setTimeout(() => {
      setPaid(true);
      setTimeout(() => {
        onPaymentComplete();
      }, 1500);
    }, 2500);
  };

  if (paid) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 space-y-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="mx-auto h-16 w-16 rounded-full bg-green-500 flex items-center justify-center"
        >
          <CheckCircle2 className="h-8 w-8 text-white" />
        </motion.div>
        <p className="text-lg font-bold text-green-400">Payment Successful!</p>
        <p className="text-sm text-muted-foreground">₹{amount} paid via UPI</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-primary">
          <QrCode className="h-5 w-5" />
          <h3 className="font-bold text-lg text-card-foreground">Pay via UPI</h3>
        </div>
        <p className="text-2xl font-extrabold text-accent">₹{amount}</p>
      </div>

      <div className="flex justify-center">
        <div className="relative rounded-xl border-2 border-dashed border-primary/30 p-4 bg-white">
          <canvas ref={canvasRef} className="rounded-lg" />
          {scanning && (
            <motion.div
              initial={{ top: 0 }}
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute left-2 right-2 h-0.5 bg-green-500 shadow-lg shadow-green-500/50"
            />
          )}
        </div>
      </div>

      <div className="text-center space-y-1">
        <p className="text-xs text-muted-foreground">Scan with any UPI app</p>
        <div className="flex justify-center gap-3 text-xs text-muted-foreground">
          <span>Google Pay</span>
          <span>•</span>
          <span>PhonePe</span>
          <span>•</span>
          <span>Paytm</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack} className="flex-1" disabled={scanning}>
          Back
        </Button>
        <Button
          onClick={handleScanPay}
          disabled={scanning}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Smartphone className="mr-2 h-4 w-4" />
          {scanning ? "Processing..." : "Simulate Payment"}
        </Button>
      </div>

      <p className="text-[10px] text-center text-muted-foreground/60">
        ⚠️ This is a demo UPI scanner. No real money will be charged.
      </p>
    </div>
  );
};

export default FakeUPIQR;
