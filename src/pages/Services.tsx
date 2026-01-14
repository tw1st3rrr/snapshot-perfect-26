import { motion } from "framer-motion";
import { Zap, Car, Navigation2, Crown } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import evChargingImage from "@/assets/ev-charging.jpg";
import valetImage from "@/assets/valet.jpg";
import requestVehicleImage from "@/assets/request-vehicle.jpg";

const services = [
  {
    id: "ev-charging",
    icon: Zap,
    title: "EV Charging",
    description: "Fast charging stations for electric vehicles",
    image: evChargingImage,
  },
  {
    id: "valet",
    icon: Car,
    title: "Valet Parking",
    description: "Professional valet service at your convenience",
    image: valetImage,
  },
  {
    id: "request-vehicle",
    icon: Navigation2,
    title: "Request Vehicle",
    description: "Have your car ready when you leave",
    image: requestVehicleImage,
  },
];

const exclusiveServices = ["Lounge", "Stylist", "Transfer"];

const Services = () => {
  return (
    <PageLayout>
      <div className="px-4 pt-16 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Services
          </h1>
          <p className="text-muted-foreground mt-1">
            Premium services for your comfort
          </p>
        </motion.div>

        {/* Service Cards - with image on right side */}
        <div className="mt-6 space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="relative h-32 rounded-2xl overflow-hidden cursor-pointer group bg-card border border-border shadow-sm flex"
              >
                {/* Left side - Text content */}
                <div className="flex-1 p-4 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Icon className="w-5 h-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Image */}
                <div className="w-2/5 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-card via-card/20 to-transparent" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Exclusive Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div className="bg-card border border-border rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                <Crown className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-foreground">
                  Exclusive Services
                </h3>
                <p className="text-sm text-muted-foreground">
                  Available for Platinum members
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              {exclusiveServices.map((item) => (
                <button
                  key={item}
                  className="flex-1 bg-muted hover:bg-muted/80 border border-border rounded-xl py-2.5 px-3 transition-colors"
                >
                  <span className="text-sm font-medium text-muted-foreground">
                    {item}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Services;
