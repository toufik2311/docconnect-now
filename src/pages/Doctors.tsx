import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DoctorCard, { Doctor } from "@/components/DoctorCard";
import SearchFilters from "@/components/SearchFilters";
import BookingModal from "@/components/BookingModal";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Doctors = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data, error } = await supabase
        .from("doctors")
        .select("*")
        .order("rating", { ascending: false });

      if (error) {
        console.error("Error fetching doctors:", error);
      } else {
        setDoctors(data || []);
      }
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSpecialty =
        !specialtyFilter ||
        specialtyFilter === "all specialties" ||
        doctor.specialty.toLowerCase() === specialtyFilter;

      const matchesAvailability =
        !availabilityFilter ||
        availabilityFilter === "all" ||
        (availabilityFilter === "today" && doctor.availability?.includes("Today")) ||
        (availabilityFilter === "tomorrow" && doctor.availability?.includes("Tomorrow"));

      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [doctors, searchQuery, specialtyFilter, availabilityFilter]);

  const handleBookDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">
                Book Appointment
              </h1>
              <p className="text-sm text-muted-foreground">
                Choose a doctor and schedule your visit
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters
            onSearch={setSearchQuery}
            onSpecialtyFilter={setSpecialtyFilter}
            onAvailabilityFilter={setAvailabilityFilter}
          />
        </div>

        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredDoctors.length}</span> doctors
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex gap-6">
                  <Skeleton className="w-32 h-32 rounded-xl" />
                  <div className="flex-1 space-y-3">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-64" />
                    <Skeleton className="h-10 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && (
          <div className="grid gap-6">
            {filteredDoctors.map((doctor, index) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <DoctorCard
                  doctor={doctor}
                  onBook={handleBookDoctor}
                  index={0}
                />
              </motion.div>
            ))}

            {filteredDoctors.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-lg text-muted-foreground">No doctors found matching your criteria.</p>
                <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters.</p>
              </motion.div>
            )}
          </div>
        )}
      </main>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={selectedDoctor}
      />
    </div>
  );
};

export default Doctors;
