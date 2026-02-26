import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { categories } from "@/data/events";

const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Browse by Category</h2>
          <p className="text-muted-foreground mt-2">Find events that match your interests</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/events?category=${cat.id}`}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:shadow-md hover:-translate-y-1 hover:border-accent/30"
              >
                <span className="text-4xl">{cat.icon}</span>
                <span className="text-sm font-medium text-card-foreground">{cat.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
