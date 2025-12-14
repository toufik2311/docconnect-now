import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import DoctorCard, { Doctor } from "./DoctorCard";
import SearchFilters from "./SearchFilters";
import BookingModal from "./BookingModal";

// Sample doctors data
const doctorsData: Doctor[] = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.9,
    reviews: 234,
    experience: "15 years",
    location: "Downtown Medical Center",
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 189,
    experience: "12 years",
    location: "Westside Clinic",
    availability: "Available Tomorrow",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    rating: 4.9,
    reviews: 312,
    experience: "10 years",
    location: "Children's Health Center",
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "General Physician",
    rating: 4.7,
    reviews: 445,
    experience: "20 years",
    location: "City Health Hub",
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
  {
    id: 5,
    name: "Dr. Amanda Foster",
    specialty: "Neurologist",
    rating: 4.8,
    reviews: 156,
    experience: "14 years",
    location: "Neuro Care Center",
    availability: "Available in 2 days",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop&crop=face",
    available: false,
  },
  {
    id: 6,
    name: "Dr. Robert Kim",
    specialty: "Orthopedic",
    rating: 4.9,
    reviews: 278,
    experience: "18 years",
    location: "Bone & Joint Clinic",
    availability: "Available Tomorrow",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop&crop=face",
    available: true,
  },
];

const DoctorsList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDoctors = useMemo(() => {
    return doctorsData.filter((doctor) => {
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
        (availabilityFilter === "today" && doctor.availability.includes("Today")) ||
        (availabilityFilter === "tomorrow" && doctor.availability.includes("Tomorrow"));

      return matchesSearch && matchesSpecialty && matchesAvailability;
    });
  }, [searchQuery, specialtyFilter, availabilityFilter]);

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

        {/* Doctors Grid */}
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
