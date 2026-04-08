import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Ticket, Clock, MapPin, CreditCard, Gift, Bell, HelpCircle,
  Headphones, Mail, Phone, MessageCircle, ChevronRight, Star,
  Calendar, DollarSign, Shield, User, Settings as SettingsIcon,
} from "lucide-react";
import { motion } from "framer-motion";

interface Booking {
  id: string;
  event_id: string;
  quantity: number;
  total_price: number;
  status: string;
  created_at: string;
  ticket_tier_id: string;
  event?: { title: string; date: string; venue: string; location: string; image_url: string | null };
  ticket_tier?: { name: string };
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

const Settings = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bookings, setBookings] = useState<Booking[]>([]);
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
        .from("bookings")
        .select("*, event:events(title, date, venue, location, image_url), ticket_tier:ticket_tiers(name)")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false }),
      supabase
        .from("movie_bookings")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false }),
    ]);

    if (!eventsRes.error && eventsRes.data) setBookings(eventsRes.data as unknown as Booking[]);
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5 text-primary" /> My Bookings
                  </CardTitle>
                  <CardDescription>View your previous and upcoming event bookings</CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingBookings ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-lg bg-muted/30 animate-pulse" />
                      ))}
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="text-center py-12 space-y-3">
                      <Ticket className="h-12 w-12 text-muted-foreground/40 mx-auto" />
                      <p className="text-muted-foreground">No bookings yet</p>
                      <Button variant="outline" onClick={() => navigate("/events")}>
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
                              {booking.event?.title || "Event"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.event?.date} • {booking.event?.venue}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {booking.ticket_tier?.name} × {booking.quantity}
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
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" /> Payment Methods
                  </CardTitle>
                  <CardDescription>Manage your saved payment options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Saved cards placeholder */}
                  <div className="rounded-xl border-2 border-dashed border-border p-8 text-center space-y-3">
                    <CreditCard className="h-10 w-10 text-muted-foreground/40 mx-auto" />
                    <p className="text-muted-foreground">No saved payment methods</p>
                    <Button
                      variant="outline"
                      onClick={() =>
                        toast({ title: "Coming Soon", description: "Payment method management will be available soon." })
                      }
                    >
                      Add Credit / Debit Card
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Accepted Payment Methods</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { name: "Visa", icon: "💳" },
                        { name: "Mastercard", icon: "💳" },
                        { name: "Apple Pay", icon: "🍎" },
                        { name: "Google Pay", icon: "📱" },
                      ].map((method) => (
                        <div key={method.name} className="flex items-center gap-2 p-3 rounded-lg border border-border">
                          <span className="text-lg">{method.icon}</span>
                          <span className="text-sm font-medium text-foreground">{method.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/20 text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 shrink-0" />
                    All transactions are encrypted and secured with SSL
                  </div>
                </CardContent>
              </Card>
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
