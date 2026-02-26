import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="container py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-bold text-lg mb-4">
              <Ticket className="h-5 w-5 text-accent" />
              EventHub
            </div>
            <p className="text-sm text-primary-foreground/60">
              Your gateway to unforgettable experiences. Discover, book, and enjoy events worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><Link to="/events" className="hover:text-accent transition-colors">All Events</Link></li>
              <li><Link to="/events?category=concert" className="hover:text-accent transition-colors">Concerts</Link></li>
              <li><Link to="/events?category=conference" className="hover:text-accent transition-colors">Conferences</Link></li>
              <li><Link to="/events?category=workshop" className="hover:text-accent transition-colors">Workshops</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><span className="hover:text-accent transition-colors cursor-pointer">About Us</span></li>
              <li><span className="hover:text-accent transition-colors cursor-pointer">Contact</span></li>
              <li><span className="hover:text-accent transition-colors cursor-pointer">Careers</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/60">
              <li><span className="hover:text-accent transition-colors cursor-pointer">Help Center</span></li>
              <li><span className="hover:text-accent transition-colors cursor-pointer">Terms of Service</span></li>
              <li><span className="hover:text-accent transition-colors cursor-pointer">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} EventHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
