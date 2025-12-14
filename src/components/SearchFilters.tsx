import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";

interface SearchFiltersProps {
  onSearch: (query: string) => void;
  onSpecialtyFilter: (specialty: string) => void;
  onAvailabilityFilter: (availability: string) => void;
}

const specialties = [
  "All Specialties",
  "General Physician",
  "Cardiologist",
  "Dermatologist",
  "Pediatrician",
  "Orthopedic",
  "Neurologist",
  "Psychiatrist",
  "ENT Specialist",
];

const SearchFilters = ({
  onSearch,
  onSpecialtyFilter,
  onAvailabilityFilter,
}: SearchFiltersProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-6 shadow-card border border-border/50"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search doctors, specialties, or conditions..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 h-12 bg-background"
          />
        </div>

        {/* Specialty Filter */}
        <Select onValueChange={onSpecialtyFilter}>
          <SelectTrigger className="w-full lg:w-48 h-12">
            <SelectValue placeholder="Specialty" />
          </SelectTrigger>
          <SelectContent>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty.toLowerCase()}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Availability Filter */}
        <Select onValueChange={onAvailabilityFilter}>
          <SelectTrigger className="w-full lg:w-48 h-12">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Times</SelectItem>
            <SelectItem value="today">Available Today</SelectItem>
            <SelectItem value="tomorrow">Tomorrow</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Button */}
        <Button variant="outline" size="lg" className="h-12 gap-2">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">More Filters</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default SearchFilters;
