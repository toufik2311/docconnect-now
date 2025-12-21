import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Shield, Star } from "lucide-react";
import heroImage from "@/assets/hero-doctors.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] gradient-hero overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
              >
                <Shield className="w-4 h-4" />
                Trusted by 50,000+ Patients
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight">
                Your Health,{" "}
                <span className="text-gradient">Our Priority</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg">
                Book appointments with top-rated doctors in your area. Get expert medical care 
                from the comfort of your home or visit in-person.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button 
                variant="hero" 
                size="xl"
                onClick={() => document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" })}
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                onClick={() => document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" })}
              >
                Find Doctors
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50"
            >
              {[
                { value: "500+", label: "Expert Doctors" },
                { value: "50K+", label: "Happy Patients" },
                { value: "4.9", label: "Rating", icon: Star },
              ].map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-1">
                    <span className="text-2xl md:text-3xl font-display font-bold text-foreground">
                      {stat.value}
                    </span>
                    {stat.icon && <stat.icon className="w-5 h-5 text-warning fill-warning" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Professional medical team ready to help you"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
              </div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -left-8 bottom-24 bg-card p-4 rounded-xl shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Quick Booking</p>
                    <p className="text-sm text-muted-foreground">In just 2 minutes</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 top-20 bg-card p-4 rounded-xl shadow-lg border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Verified Doctors</p>
                    <p className="text-sm text-muted-foreground">100% Certified</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
