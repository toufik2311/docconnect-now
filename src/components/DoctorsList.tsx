import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import DoctorCard, { Doctor } from "./DoctorCard";
import SearchFilters from "./SearchFilters";
import BookingModal from "./BookingModal";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <section id="doctors" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Find Your <span className="text-gradient">Perfect Doctor</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse our network of certified healthcare professionals and book your appointment today.
          </p>
        </motion.div>

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
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onBook={handleBookDoctor}
                index={index}
              />
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
      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        doctor={selectedDoctor}
      />
    </section>
  );
};

export default DoctorsList;
