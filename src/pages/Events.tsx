import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EventCard from "@/components/EventCard";
import CategoryFilter from "@/components/CategoryFilter";
import { events, type EventCategory } from "@/data/events";

const Events = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get("category") as EventCategory) || "all";
  const [category, setCategory] = useState<EventCategory | "all">(initialCategory);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchCat = category === "all" || e.category === category;
      const matchSearch =
        !search ||
        e.title.toLowerCase().includes(search.toLowerCase()) ||
        e.location.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [category, search]);

  const handleCategoryChange = (cat: EventCategory | "all") => {
    setCategory(cat);
    if (cat === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-950 via-gray-900 to-gray-950 py-16 border-b border-yellow-600/20">
          <div className="container">
            <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2">
              Discover Events
            </h1>
            <p className="text-gray-400 mb-6">Find your next unforgettable experience</p>
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-yellow-500/60" />
              <Input
                placeholder="Search events or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-gray-900 border-yellow-600/20 text-white placeholder:text-gray-500 focus-visible:ring-yellow-500/40"
              />
            </div>
          </div>
        </div>

        <div className="container py-8">
          <CategoryFilter selected={category} onSelect={handleCategoryChange} />

          <div className="mt-8">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No events found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((event, i) => (
                  <EventCard key={event.id} event={event} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Events;
