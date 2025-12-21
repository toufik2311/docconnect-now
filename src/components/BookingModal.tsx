import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import type { Doctor } from "./DoctorCard";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
}

const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

const BookingModal = ({ isOpen, onClose, doctor }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!user) {
      toast.error("Please sign in to book an appointment");
      onClose();
      navigate("/auth");
      return;
    }

    if (!doctor || !date || !time) {
      toast.error("Please select a date and time");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("appointments").insert({
      patient_id: user.id,
      doctor_id: doctor.id,
      appointment_date: date.toISOString().split("T")[0],
      appointment_time: time,
      reason: reason || null,
      status: "scheduled",
    });

    setLoading(false);

    if (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
      return;
    }

    toast.success("Appointment booked successfully!", {
      description: `Your appointment with ${doctor.name} is confirmed for ${date.toLocaleDateString()} at ${time}`,
    });

    setStep(3);
  };

  const resetAndClose = () => {
    setStep(1);
    setDate(undefined);
    setTime("");
    setReason("");
    onClose();
  };

  if (!doctor) return null;

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">
            {step === 3 ? "Booking Confirmed!" : "Book Appointment"}
          </DialogTitle>
          <DialogDescription>
            {step === 3
              ? "Your appointment has been scheduled"
              : `Schedule your visit with ${doctor.name}`}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Auth Check */}
              {!user && (
                <div className="p-4 bg-warning/10 border border-warning/20 rounded-xl">
                  <p className="text-sm text-warning-foreground">
                    You'll need to sign in to complete your booking.
                  </p>
                </div>
              )}

              {/* Doctor Info */}
              <div className="flex items-center gap-4 p-4 bg-muted rounded-xl">
                <img
                  src={doctor.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face"}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-semibold text-foreground">{doctor.name}</h4>
                  <p className="text-sm text-primary">{doctor.specialty}</p>
                  <p className="text-sm text-muted-foreground">{doctor.location}</p>
                </div>
              </div>

              {/* Date Selection */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Select Date
                </Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => date < new Date() || date.getDay() === 0}
                  className="rounded-xl border mx-auto pointer-events-auto"
                />
              </div>

              {/* Time Selection */}
              <div className="space-y-3">
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Select Time
                </Label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((slot) => (
                    <Button
                      key={slot}
                      variant={time === slot ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTime(slot)}
                      className="text-xs"
                    >
                      {slot}
                    </Button>
                  ))}
                </div>
              </div>

              <Button
                variant="hero"
                className="w-full"
                disabled={!date || !time}
                onClick={() => setStep(2)}
              >
                Continue
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Appointment Summary */}
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-sm text-muted-foreground">Appointment Details</p>
                <p className="font-semibold text-foreground">
                  {date?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {time}
                </p>
                <p className="text-sm text-primary">with {doctor.name}</p>
              </div>

              {/* Reason for Visit */}
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit (Optional)</Label>
                <Textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Briefly describe your symptoms or reason for the visit..."
                  rows={3}
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handleSubmit} 
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6 py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 mx-auto gradient-primary rounded-full flex items-center justify-center"
              >
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-xl font-display font-semibold text-foreground">
                  Appointment Confirmed!
                </h3>
                <p className="text-muted-foreground">
                  We've saved your appointment. You can view it in your dashboard.
                </p>
              </div>

              <div className="p-4 bg-muted rounded-xl">
                <p className="font-semibold text-foreground">{doctor.name}</p>
                <p className="text-sm text-primary">{doctor.specialty}</p>
                <p className="text-sm text-muted-foreground mt-2">
                  {date?.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  at {time}
                </p>
              </div>

              <Button variant="hero" onClick={resetAndClose} className="w-full">
                Done
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
