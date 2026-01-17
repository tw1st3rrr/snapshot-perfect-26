import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const upcomingEvents = [
  { id: 1, title: "New Year Sale", date: "Until Jan 15", time: "10:00 - 22:00", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=200&fit=crop" },
  { id: 2, title: "Kids Workshop", date: "Dec 28", time: "14:00", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=300&h=200&fit=crop" },
  { id: 3, title: "Live Concert", date: "Dec 31", time: "20:00", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop" },
  { id: 4, title: "Fashion Show", date: "Jan 5", time: "18:00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
  { id: 5, title: "Art Exhibition", date: "Jan 10", time: "11:00", image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=300&h=200&fit=crop" },
  { id: 6, title: "Food Festival", date: "Jan 15", time: "12:00", image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=200&fit=crop" },
  { id: 7, title: "Tech Expo", date: "Jan 20", time: "10:00", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&h=200&fit=crop" },
  { id: 8, title: "Winter Carnival", date: "Jan 25", time: "15:00", image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&h=200&fit=crop" },
];

const AllEvents = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="px-4 pt-16 pb-24 bg-background min-h-screen"
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Upcoming Events</h1>
            <p className="text-sm text-muted-foreground">Don't miss these exciting events</p>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/event/${event.id}`)}
              className="flex bg-card rounded-2xl overflow-hidden border border-border shadow-sm cursor-pointer hover:border-muted-foreground transition-colors"
            >
              <img src={event.image} alt={event.title} className="w-28 h-28 object-cover flex-shrink-0" />
              <div className="p-3 flex flex-col justify-center">
                <h3 className="font-semibold text-foreground">{event.title}</h3>
                <div className="flex items-center gap-1 mt-2 text-muted-foreground">
                  <Calendar className="w-3.5 h-3.5" />
                  <span className="text-xs">{event.date}</span>
                </div>
                <div className="flex items-center gap-1 mt-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-xs">{event.time}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default AllEvents;
