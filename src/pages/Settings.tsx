import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Ticket, Clock, MapPin, CreditCard, Gift, Bell, HelpCircle,
  Headphones, Mail, Phone, MessageCircle, ChevronRight, Star,
  Calendar, DollarSign, Shield, User, Settings as SettingsIcon, Film,
  Plus, Trash2, QrCode, Smartphone, Scan, CheckCircle2, X,
} from "lucide-react";
import { motion } from "framer-motion";

interface EventBooking {
  id: string;
  event_title: string;
  event_date: string;
  event_venue: string;
  event_location: string;
  ticket_tier_name: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
}

interface MovieBooking {
  id: string;
  movie_id: string;
  movie_title: string;
  show_time: string;
  show_format: string;
  seats: string[];
  total_price: number;
  status: string;
  created_at: string;
}

interface SavedCard {
  id: string;
  type: "visa" | "mastercard" | "rupay";
  last4: string;
  expiry: string;
  name: string;
}

interface SavedUPI {
  id: string;
  upiId: string;
}

const FakeUPIScanner = ({ onClose }: { onClose: () => void }) => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animFrame: number;
    let lineY = 0;
    let direction = 1;

    const draw = () => {
      ctx.clearRect(0, 0, 280, 280);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, 280, 280);
      ctx.strokeStyle = "rgba(220,38,38,0.08)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 280; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 280); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(280, i); ctx.stroke();
      }
      ctx.strokeStyle = "#dc2626"; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(20, 60); ctx.lineTo(20, 20); ctx.lineTo(60, 20); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(220, 20); ctx.lineTo(260, 20); ctx.lineTo(260, 60); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(20, 220); ctx.lineTo(20, 260); ctx.lineTo(60, 260); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(260, 220); ctx.lineTo(260, 260); ctx.lineTo(220, 260); ctx.stroke();
      if (scanning && !scanned) {
        const gradient = ctx.createLinearGradient(20, lineY, 260, lineY);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, "rgba(220,38,38,0.8)");
        gradient.addColorStop(1, "transparent");
        ctx.strokeStyle = gradient; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(30, lineY + 20); ctx.lineTo(250, lineY + 20); ctx.stroke();
        ctx.shadowColor = "#dc2626"; ctx.shadowBlur = 15;
        ctx.strokeStyle = "rgba(220,38,38,0.3)"; ctx.lineWidth = 6;
        ctx.beginPath(); ctx.moveTo(30, lineY + 20); ctx.lineTo(250, lineY + 20); ctx.stroke();
        ctx.shadowBlur = 0;
        lineY += direction * 2;
        if (lineY > 240) direction = -1;
        if (lineY < 0) direction = 1;
      }
      ctx.fillStyle = "rgba(220,38,38,0.15)";
      for (let x = 80; x < 200; x += 16)
        for (let y = 80; y < 200; y += 16)
          ctx.fillRect(x, y, 10, 10);
      animFrame = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animFrame);
  }, [scanning, scanned]);

  const handleScan = () => { setScanning(true); setTimeout(() => { setScanned(true); setScanning(false); }, 3000); };

  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <div className="relative rounded-xl overflow-hidden border-2 border-border">
          <canvas ref={canvasRef} width={280} height={280} className="block" />
          {scanned && (
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="font-bold text-foreground">QR Code Detected!</p>
              <p className="text-xs text-muted-foreground">Demo scan — no payment processed</p>
            </div>
          )}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">Point your camera at a UPI QR code to scan</p>
      {!scanning && !scanned && <Button className="w-full" onClick={handleScan}><Scan className="h-4 w-4 mr-2" /> Start Scanning</Button>}
      {scanning && <Button className="w-full" variant="secondary" disabled><div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" /> Scanning...</Button>}
      {scanned && (
        <div className="space-y-2">
          <div className="p-3 rounded-lg bg-muted/30 border border-border text-sm space-y-1">
            <p className="text-foreground font-medium">Merchant: EventHub Tickets</p>
            <p className="text-muted-foreground text-xs">UPI ID: eventhub@upi</p>
            <p className="text-muted-foreground text-xs">This is a demo — no real transaction</p>
          </div>
          <Button className="w-full" variant="outline" onClick={() => setScanned(false)}>Scan Again</Button>
          <Button className="w-full" variant="outline" onClick={onClose}>Done</Button>
        </div>
      )}
    </div>
  );
};

const PaymentTab = ({ toast }: { toast: ReturnType<typeof useToast>["toast"] }) => {
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    { id: "c1", type: "visa", last4: "4242", expiry: "12/28", name: "Personal Visa" },
    { id: "c2", type: "mastercard", last4: "8888", expiry: "06/27", name: "Business Card" },
  ]);
  const [savedUPIs, setSavedUPIs] = useState<SavedUPI[]>([{ id: "u1", upiId: "user@okicici" }]);
  const [showAddCard, setShowAddCard] = useState(false);
  const [showAddUPI, setShowAddUPI] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvv: "", name: "" });
  const [newUPI, setNewUPI] = useState("");

  const cardBrands: Record<string, { color: string; label: string }> = {
    visa: { color: "from-blue-600 to-blue-800", label: "VISA" },
    mastercard: { color: "from-orange-500 to-red-600", label: "Mastercard" },
    rupay: { color: "from-green-600 to-teal-700", label: "RuPay" },
  };

  const addCard = () => {
    if (!newCard.number || !newCard.expiry || !newCard.name) return;
    const last4 = newCard.number.replace(/\s/g, "").slice(-4);
    const type: SavedCard["type"] = newCard.number.startsWith("4") ? "visa" : newCard.number.startsWith("5") ? "mastercard" : "rupay";
    setSavedCards((prev) => [...prev, { id: `c${Date.now()}`, type, last4, expiry: newCard.expiry, name: newCard.name }]);
    setNewCard({ number: "", expiry: "", cvv: "", name: "" });
    setShowAddCard(false);
    toast({ title: "Card Added", description: `Card ending in ${last4} has been saved.` });
  };

  const addUPI = () => {
    if (!newUPI || !newUPI.includes("@")) return;
    setSavedUPIs((prev) => [...prev, { id: `u${Date.now()}`, upiId: newUPI }]);
    setNewUPI("");
    setShowAddUPI(false);
    toast({ title: "UPI Added", description: `${newUPI} has been linked.` });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-primary" /> Saved Cards</CardTitle>
          <CardDescription>Your debit and credit cards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {savedCards.map((card) => (
            <div key={card.id} className={`relative rounded-xl p-4 bg-gradient-to-r ${cardBrands[card.type].color} text-white overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-8 translate-x-8" />
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <p className="text-xs opacity-80">{card.name}</p>
                  <p className="font-mono text-lg tracking-widest">•••• •••• •••• {card.last4}</p>
                  <p className="text-xs opacity-80">Expires {card.expiry}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="font-bold text-sm">{cardBrands[card.type].label}</span>
                  <button onClick={() => { setSavedCards((p) => p.filter((c) => c.id !== card.id)); toast({ title: "Card Removed" }); }} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                </div>
              </div>
            </div>
          ))}
          {showAddCard ? (
            <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/10">
              <Input placeholder="Card Number" value={newCard.number} onChange={(e) => setNewCard((p) => ({ ...p, number: e.target.value }))} />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" value={newCard.expiry} onChange={(e) => setNewCard((p) => ({ ...p, expiry: e.target.value }))} />
                <Input placeholder="CVV" type="password" maxLength={4} value={newCard.cvv} onChange={(e) => setNewCard((p) => ({ ...p, cvv: e.target.value }))} />
              </div>
              <Input placeholder="Cardholder Name" value={newCard.name} onChange={(e) => setNewCard((p) => ({ ...p, name: e.target.value }))} />
              <div className="flex gap-2"><Button onClick={addCard} className="flex-1">Save Card</Button><Button variant="outline" onClick={() => setShowAddCard(false)}>Cancel</Button></div>
            </div>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setShowAddCard(true)}><Plus className="h-4 w-4 mr-2" /> Add New Card</Button>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5 text-primary" /> UPI Payments</CardTitle>
          <CardDescription>Link your UPI IDs or scan QR codes</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {savedUPIs.map((upi) => (
            <div key={upi.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center"><Smartphone className="h-5 w-5 text-primary" /></div>
              <div className="flex-1">
                <p className="font-medium text-foreground text-sm">{upi.upiId}</p>
                <p className="text-xs text-muted-foreground">UPI ID Linked</p>
              </div>
              <Badge variant="outline" className="text-green-500 border-green-500/30">Verified</Badge>
              <button onClick={() => { setSavedUPIs((p) => p.filter((u) => u.id !== upi.id)); toast({ title: "UPI Removed" }); }} className="p-1.5 rounded-full hover:bg-destructive/10 transition-colors"><Trash2 className="h-4 w-4 text-muted-foreground" /></button>
            </div>
          ))}
          {showAddUPI ? (
            <div className="space-y-3 p-4 rounded-lg border border-border bg-muted/10">
              <Input placeholder="Enter UPI ID (e.g. name@bank)" value={newUPI} onChange={(e) => setNewUPI(e.target.value)} />
              <div className="flex gap-2"><Button onClick={addUPI} className="flex-1">Link UPI</Button><Button variant="outline" onClick={() => setShowAddUPI(false)}>Cancel</Button></div>
            </div>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => setShowAddUPI(true)}><Plus className="h-4 w-4 mr-2" /> Add UPI ID</Button>
          )}
          <Dialog open={showScanner} onOpenChange={setShowScanner}>
            <DialogTrigger asChild><Button variant="secondary" className="w-full gap-2"><QrCode className="h-4 w-4" /> Scan UPI QR Code</Button></DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader><DialogTitle className="flex items-center gap-2"><Scan className="h-5 w-5" /> UPI QR Scanner</DialogTitle></DialogHeader>
              <FakeUPIScanner onClose={() => setShowScanner(false)} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Accepted Payment Methods</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[{ name: "Visa", icon: "💳" }, { name: "Mastercard", icon: "💳" }, { name: "RuPay", icon: "🇮🇳" }, { name: "Google Pay", icon: "📱" }, { name: "PhonePe", icon: "📲" }, { name: "Paytm", icon: "💰" }].map((m) => (
              <div key={m.name} className="flex items-center gap-2 p-3 rounded-lg border border-border"><span className="text-lg">{m.icon}</span><span className="text-sm font-medium text-foreground">{m.name}</span></div>
            ))}
          </div>
          <div className="flex items-center gap-2 p-3 mt-4 rounded-lg bg-muted/20 text-xs text-muted-foreground"><Shield className="h-4 w-4 shrink-0" /> All transactions are encrypted and secured with SSL</div>
        </CardContent>
      </Card>
    </div>
  );
};

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<EventBooking[]>([]);
  const [movieBookings, setMovieBookings] = useState<MovieBooking[]>([]);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    promotions: false,
    reminders: true,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    setLoadingBookings(true);
    const [eventsRes, moviesRes] = await Promise.all([
      supabase
        .from("event_bookings")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("movie_bookings")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false }),
    ]);

    if (!eventsRes.error && eventsRes.data) setBookings(eventsRes.data as unknown as EventBooking[]);
    if (!moviesRes.error && moviesRes.data) setMovieBookings(moviesRes.data as unknown as MovieBooking[]);
    setLoadingBookings(false);
  };

  if (loading || !user) return null;

  const fadeIn = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.3 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8 max-w-4xl">
        <motion.div {...fadeIn}>
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {user.user_metadata?.full_name || user.email?.split("@")[0]}
              </h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 h-auto gap-1">
              <TabsTrigger value="bookings" className="gap-1.5 text-xs">
                <Ticket className="h-3.5 w-3.5" /> Bookings
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-1.5 text-xs">
                <Bell className="h-3.5 w-3.5" /> Notifications
              </TabsTrigger>
              <TabsTrigger value="rewards" className="gap-1.5 text-xs">
                <Gift className="h-3.5 w-3.5" /> Rewards
              </TabsTrigger>
              <TabsTrigger value="payment" className="gap-1.5 text-xs">
                <CreditCard className="h-3.5 w-3.5" /> Payment
              </TabsTrigger>
              <TabsTrigger value="location" className="gap-1.5 text-xs">
                <MapPin className="h-3.5 w-3.5" /> Location
              </TabsTrigger>
              <TabsTrigger value="support" className="gap-1.5 text-xs">
                <HelpCircle className="h-3.5 w-3.5" /> Support
              </TabsTrigger>
            </TabsList>

            {/* BOOKINGS TAB */}
            <TabsContent value="bookings">
              <div className="space-y-6">
                {/* Event Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Ticket className="h-5 w-5 text-primary" /> Event Bookings
                    </CardTitle>
                    <CardDescription>Your event ticket bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingBookings ? (
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="h-20 rounded-lg bg-muted/30 animate-pulse" />
                        ))}
                      </div>
                    ) : bookings.length === 0 ? (
                      <div className="text-center py-8 space-y-3">
                        <Ticket className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                        <p className="text-muted-foreground text-sm">No event bookings yet</p>
                        <Button variant="outline" size="sm" onClick={() => navigate("/events")}>
                          Browse Events
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {bookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                          >
                            <div className="h-14 w-14 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <Calendar className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-foreground truncate">
                                {booking.event_title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking.event_date} • {booking.event_venue}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {booking.ticket_tier_name} × {booking.quantity}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-bold text-foreground">${booking.total_price}</p>
                              <Badge
                                variant={booking.status === "confirmed" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Movie Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Film className="h-5 w-5 text-primary" /> Movie Bookings
                    </CardTitle>
                    <CardDescription>Your movie ticket bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loadingBookings ? (
                      <div className="space-y-3">
                        {[1, 2].map((i) => (
                          <div key={i} className="h-20 rounded-lg bg-muted/30 animate-pulse" />
                        ))}
                      </div>
                    ) : movieBookings.length === 0 ? (
                      <div className="text-center py-8 space-y-3">
                        <Film className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                        <p className="text-muted-foreground text-sm">No movie bookings yet</p>
                        <Button variant="outline" size="sm" onClick={() => navigate("/movies")}>
                          Browse Movies
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {movieBookings.map((mb) => (
                          <div
                            key={mb.id}
                            className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/20 transition-colors"
                          >
                            <div className="h-14 w-14 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                              <Film className="h-6 w-6 text-accent" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-foreground truncate">{mb.movie_title}</p>
                              <p className="text-xs text-muted-foreground">
                                {mb.show_time} • {mb.show_format}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                Seats: {mb.seats.join(", ")}
                              </p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-bold text-foreground">${mb.total_price}</p>
                              <Badge
                                variant={mb.status === "confirmed" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {mb.status}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* NOTIFICATIONS TAB */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-primary" /> Notification Preferences
                  </CardTitle>
                  <CardDescription>Manage how you receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { key: "email", label: "Email Notifications", desc: "Receive booking confirmations and updates via email", icon: Mail },
                    { key: "push", label: "Push Notifications", desc: "Get instant alerts on your device", icon: Bell },
                    { key: "promotions", label: "Promotional Offers", desc: "Receive exclusive deals and early access offers", icon: Gift },
                    { key: "reminders", label: "Event Reminders", desc: "Get reminded before your booked events", icon: Clock },
                  ].map(({ key, label, desc, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-lg border border-border">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-primary" />
                        <div>
                          <Label className="font-medium">{label}</Label>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications[key as keyof typeof notifications]}
                        onCheckedChange={(checked) =>
                          setNotifications((prev) => ({ ...prev, [key]: checked }))
                        }
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* REWARDS TAB */}
            <TabsContent value="rewards">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-primary" /> Rewards & Points
                  </CardTitle>
                  <CardDescription>Earn points with every booking and redeem for discounts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-6 text-center space-y-2">
                    <Star className="h-10 w-10 text-primary mx-auto" />
                    <p className="text-3xl font-bold text-foreground">{bookings.length * 50}</p>
                    <p className="text-sm text-muted-foreground">Total Reward Points</p>
                    <Badge variant="outline" className="mt-2">
                      {bookings.length >= 5 ? "Gold" : bookings.length >= 2 ? "Silver" : "Bronze"} Member
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">How to Earn</h4>
                    {[
                      { label: "Book an event", points: "50 pts" },
                      { label: "Leave a review", points: "20 pts" },
                      { label: "Refer a friend", points: "100 pts" },
                      { label: "Attend 5 events", points: "200 pts bonus" },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center p-3 rounded-lg border border-border">
                        <span className="text-sm text-foreground">{item.label}</span>
                        <Badge variant="secondary">{item.points}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* PAYMENT TAB */}
            <TabsContent value="payment">
              <PaymentTab toast={toast} />
            </TabsContent>

            {/* LOCATION TAB */}
            <TabsContent value="location">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> Location Settings
                  </CardTitle>
                  <CardDescription>Set your location to discover nearby events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Your City</Label>
                    <Input placeholder="e.g. Los Angeles, CA" />
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Popular Locations</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Los Angeles, CA", "New York, NY", "San Francisco, CA", "Chicago, IL", "Austin, TX", "Portland, OR"].map(
                        (city) => (
                          <Badge key={city} variant="outline" className="cursor-pointer hover:bg-primary/10 transition-colors">
                            <MapPin className="h-3 w-3 mr-1" /> {city}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => toast({ title: "Location Saved", description: "Your location preferences have been updated." })}
                  >
                    Save Location
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* HELP & SUPPORT TAB */}
            <TabsContent value="support">
              <div className="space-y-6">
                {/* 24/7 Customer Care Banner */}
                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Headphones className="h-7 w-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">24/7 Customer Care</h3>
                      <p className="text-sm text-muted-foreground">
                        Our support team is available round the clock to help you
                      </p>
                    </div>
                    <Badge className="bg-success text-success-foreground shrink-0">Online</Badge>
                  </CardContent>
                </Card>

                {/* Contact Options */}
                <Card>
                  <CardHeader>
                    <CardTitle>Get in Touch</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { icon: Phone, label: "Call Us", value: "+1 (800) 555-0199", desc: "Available 24/7" },
                      { icon: Mail, label: "Email Support", value: "support@eventhub.com", desc: "Response within 2 hours" },
                      { icon: MessageCircle, label: "Live Chat", value: "Start a conversation", desc: "Instant response" },
                    ].map(({ icon: Icon, label, value, desc }) => (
                      <button
                        key={label}
                        className="w-full flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/20 transition-colors text-left"
                        onClick={() => toast({ title: label, description: `${value} — ${desc}` })}
                      >
                        <Icon className="h-5 w-5 text-primary shrink-0" />
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* FAQ */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {[
                        { q: "How do I cancel a booking?", a: "You can cancel a booking up to 24 hours before the event. Go to My Bookings, select the booking, and click Cancel. Refunds are processed within 5-7 business days." },
                        { q: "Can I transfer my ticket to someone else?", a: "Yes! You can transfer tickets from your booking details page. The recipient will receive an email with their new ticket." },
                        { q: "What payment methods are accepted?", a: "We accept Visa, Mastercard, American Express, Apple Pay, and Google Pay. All payments are securely processed." },
                        { q: "How do reward points work?", a: "You earn points with every booking and activity. Points can be redeemed for discounts on future bookings. Check the Rewards tab for details." },
                        { q: "Is my personal data secure?", a: "Absolutely. We use industry-standard encryption and never share your personal information with third parties without consent." },
                      ].map((item, i) => (
                        <AccordionItem key={i} value={`faq-${i}`}>
                          <AccordionTrigger className="text-sm text-left">{item.q}</AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Settings;
