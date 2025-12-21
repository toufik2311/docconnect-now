import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, CheckCircle, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    scheduledAppointments: 0,
    completedAppointments: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [doctorsRes, appointmentsRes] = await Promise.all([
        supabase.from("doctors").select("id", { count: "exact" }),
        supabase.from("appointments").select("id, status"),
      ]);

      const appointments = appointmentsRes.data || [];
      
      setStats({
        totalDoctors: doctorsRes.count || 0,
        totalAppointments: appointments.length,
        scheduledAppointments: appointments.filter(a => a.status === "scheduled").length,
        completedAppointments: appointments.filter(a => a.status === "completed").length,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Doctors", value: stats.totalDoctors, icon: Users, color: "text-primary" },
    { title: "Total Appointments", value: stats.totalAppointments, icon: Calendar, color: "text-accent" },
    { title: "Scheduled", value: stats.scheduledAppointments, icon: Clock, color: "text-warning" },
    { title: "Completed", value: stats.completedAppointments, icon: CheckCircle, color: "text-success" },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-20 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-display">{stat.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Welcome to the Admin Panel</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar to navigate between sections. You can manage doctors, 
            view appointments, and monitor your healthcare platform from here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
