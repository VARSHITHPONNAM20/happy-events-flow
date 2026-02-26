import { cn } from "@/lib/utils";
import { categories, type EventCategory } from "@/data/events";

interface CategoryFilterProps {
  selected: EventCategory | "all";
  onSelect: (cat: EventCategory | "all") => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect("all")}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all",
          selected === "all"
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
        )}
      >
        All Events
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all",
            selected === cat.id
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          <span className="mr-1.5">{cat.icon}</span>
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
