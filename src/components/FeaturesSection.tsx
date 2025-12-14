import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Video, Shield, Clock, UserCheck, HeartPulse } from "lucide-react";

const features = [
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book appointments in just a few clicks. Choose your preferred date and time slot.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Video,
    title: "Video Consultations",
    description: "Connect with doctors remotely through secure video calls from anywhere.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Shield,
    title: "Verified Doctors",
    description: "All our doctors are thoroughly verified and have excellent credentials.",
    color: "bg-success/10 text-success",
  },
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Get medical assistance any time of day or night with our round-the-clock service.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: UserCheck,
    title: "Personal Care",
    description: "Receive personalized treatment plans tailored to your specific needs.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HeartPulse,
    title: "Health Records",
    description: "Access and manage all your medical records securely in one place.",
    color: "bg-accent/10 text-accent",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Why Choose <span className="text-gradient">MediCare</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience healthcare reimagined with our comprehensive platform designed for your convenience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="interactive" className="h-full">
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mx-auto mb-4`}
                  >
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
