import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Star, MapPin, Clock } from "lucide-react";

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number | null;
  reviews: number | null;
  experience: string;
  location: string;
  availability: string | null;
  image: string | null;
  available: boolean | null;
}

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
  index: number;
}

const DoctorCard = ({ doctor, onBook, index }: DoctorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card variant="interactive" className="h-full">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Doctor Image */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-muted">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {doctor.available && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card" />
              )}
            </div>

            {/* Doctor Info */}
            <div className="flex-1 space-y-3">
              <div>
                <h3 className="text-lg font-display font-semibold text-foreground">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium">{doctor.specialty}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant="success">
                  <Star className="w-3 h-3 fill-current mr-1" />
                  {doctor.rating || "N/A"} ({doctor.reviews || 0})
                </Badge>
                <Badge variant="muted">{doctor.experience}</Badge>
              </div>

              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{doctor.availability || "Check availability"}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex sm:flex-col gap-2 sm:justify-center">
              <Button 
                variant="hero" 
                size="sm" 
                className="flex-1 sm:flex-none"
                onClick={() => onBook(doctor)}
              >
                <Calendar className="w-4 h-4" />
                Book Now
              </Button>
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                View Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DoctorCard;
