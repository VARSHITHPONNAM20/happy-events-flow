import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Film, Camera, Clapperboard, Play, Ticket, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import bgImage from "@/assets/get-started-bg.jpg";

const GetStarted = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background */}
      <img
        src={bgImage}
        alt="Cinematic red curtain with film reels"
        className="absolute inset-0 h-full w-full object-cover opacity-60"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-red-950/30 to-black/80" />

      {/* Floating film icons */}
      {[Film, Camera, Clapperboard, Star].map((Icon, i) => (
        <motion.div
          key={i}
          className="absolute text-red-400/20"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, -20, 0],
          }}
          transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
          style={{
            top: `${20 + i * 18}%`,
            left: i % 2 === 0 ? `${8 + i * 5}%` : undefined,
            right: i % 2 !== 0 ? `${8 + i * 5}%` : undefined,
          }}
        >
          <Icon className="h-12 w-12 sm:h-16 sm:w-16" />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-600/20 border border-red-500/30 backdrop-blur-sm mb-4">
            <Ticket className="h-10 w-10 text-red-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight"
        >
          Your Next
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
            Experience
          </span>
          <br />
          Starts Here
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 text-lg sm:text-xl text-white/60 max-w-md mx-auto"
        >
          Discover concerts, movies, workshops & more. Book tickets instantly and never miss a moment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/home">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 text-lg px-10 py-6"
            >
              <Play className="mr-2 h-5 w-5" />
              Get Started
            </Button>
          </Link>
          <Link to="/auth">
            <Button
              size="lg"
              variant="outline"
              className="border-red-500/30 text-red-400 hover:bg-red-600/10 text-lg px-10 py-6"
            >
              Sign In
            </Button>
          </Link>
        </motion.div>

        {/* Film strip decoration */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex justify-center gap-2"
        >
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="w-8 h-6 rounded-sm border border-red-500/20 bg-red-900/10 backdrop-blur-sm"
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;
