import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Share2, CalendarPlus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { useToast } from "@/hooks/use-toast";

const eventsData = [
  { id: 1, title: "New Year Sale", date: "Until Jan 15", time: "10:00 - 22:00", image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop", location: "All Floors", description: "Enjoy massive discounts across all stores during our New Year Sale event. Up to 70% off on selected items from your favorite brands.", organizer: "Tashir Mall Management" },
  { id: 2, title: "Kids Workshop", date: "Dec 28", time: "14:00", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=400&fit=crop", location: "Floor 3, Kids Zone", description: "Interactive creative workshop for children aged 5-12. Arts, crafts, and fun activities supervised by professional educators.", organizer: "Kids Club" },
  { id: 3, title: "Live Concert", date: "Dec 31", time: "20:00", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=400&fit=crop", location: "Central Atrium", description: "Ring in the New Year with a spectacular live concert featuring popular artists. Free entry for all mall visitors.", organizer: "Tashir Entertainment" },
  { id: 4, title: "Fashion Show", date: "Jan 5", time: "18:00", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop", location: "Floor 2, Fashion Hall", description: "Witness the latest fashion trends from top designers. Exclusive previews of upcoming collections.", organizer: "Fashion Week Moscow" },
  { id: 5, title: "Art Exhibition", date: "Jan 10", time: "11:00", image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&h=400&fit=crop", location: "Floor 4, Gallery Space", description: "Contemporary art exhibition featuring works by emerging local artists. Free admission.", organizer: "Moscow Art Foundation" },
];

const EventDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const event = eventsData.find((e) => e.id === Number(id)) || eventsData[0];

  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: `${event.title} has been added to your calendar.`,
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: `Check out ${event.title} at Tashir Mall!`,
        url: window.location.href,
      });
    } else {
      toast({
        title: "Link Copied",
        description: "Event link has been copied to clipboard.",
      });
    }
  };

  return (
    <PageLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-24 bg-background min-h-screen"
      >
        {/* Header Image */}
        <div className="relative h-64">
          <img src={event.image} alt={event.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <button onClick={() => navigate(-1)} className="absolute top-12 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <button onClick={handleShare} className="absolute top-12 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
            <Share2 className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 -mt-8 relative z-10">
          <div className="bg-card rounded-2xl p-4 border border-border shadow-sm">
            <h1 className="text-2xl font-bold text-foreground">{event.title}</h1>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-foreground font-medium">{event.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-foreground">{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-foreground">{event.location}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">About This Event</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
          </div>

          {/* Organizer */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-2">Organizer</h2>
            <p className="text-muted-foreground text-sm">{event.organizer}</p>
          </div>

          {/* Action Button */}
          <div className="mt-8">
            <button 
              onClick={handleAddToCalendar}
              className="w-full flex items-center justify-center gap-2 h-14 bg-foreground text-background rounded-xl font-semibold"
            >
              <CalendarPlus className="w-5 h-5" />
              Add to Calendar
            </button>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default EventDetail;
