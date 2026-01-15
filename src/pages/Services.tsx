import { motion, AnimatePresence } from "framer-motion";
import { Zap, Car, Navigation2, Crown, HelpCircle, ArrowLeft, MapPin, Clock, Star, CreditCard, Plug, Users } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import evChargingImage from "@/assets/ev-charging.jpg";
import valetImage from "@/assets/valet.jpg";
import requestVehicleImage from "@/assets/request-vehicle.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface Service {
  id: string;
  icon: any;
  title: string;
  description: string;
  image: string;
  details: ServiceDetails;
}

interface ServiceDetails {
  fullDescription: string;
  features: { icon: any; label: string; value: string }[];
  pricing?: { label: string; price: string }[];
  cta: string;
}

const services: Service[] = [
  {
    id: "ev-charging",
    icon: Zap,
    title: "EV Charging",
    description: "Fast charging stations for electric vehicles",
    image: evChargingImage,
    details: {
      fullDescription: "Our mall features state-of-the-art electric vehicle charging stations located on parking level P1. Charge your EV while you shop with our fast and reliable charging infrastructure.",
      features: [
        { icon: Plug, label: "Connector Types", value: "Type 2, CCS, CHAdeMO" },
        { icon: Zap, label: "Power Output", value: "Up to 150 kW" },
        { icon: Clock, label: "Average Charge Time", value: "30-60 min" },
        { icon: MapPin, label: "Location", value: "Parking Level P1" },
      ],
      pricing: [
        { label: "Standard Charging (22 kW)", price: "8 ₽/kWh" },
        { label: "Fast Charging (50 kW)", price: "12 ₽/kWh" },
        { label: "Ultra-Fast (150 kW)", price: "15 ₽/kWh" },
      ],
      cta: "Start Charging",
    },
  },
  {
    id: "valet",
    icon: Car,
    title: "Valet Parking",
    description: "Professional valet service at your convenience",
    image: valetImage,
    details: {
      fullDescription: "Experience premium valet parking service at our mall. Our professional valets will take care of your vehicle while you enjoy a worry-free shopping experience.",
      features: [
        { icon: Clock, label: "Response Time", value: "5-10 minutes" },
        { icon: Users, label: "Professional Staff", value: "Trained valets" },
        { icon: MapPin, label: "Pick-up Points", value: "Main entrances" },
        { icon: Star, label: "Rating", value: "4.9/5.0" },
      ],
      pricing: [
        { label: "First 2 hours", price: "300 ₽" },
        { label: "Each additional hour", price: "100 ₽" },
        { label: "Full day (max)", price: "800 ₽" },
      ],
      cta: "Order Valet",
    },
  },
  {
    id: "request-vehicle",
    icon: Navigation2,
    title: "Request Vehicle",
    description: "Have your car ready when you leave",
    image: requestVehicleImage,
    details: {
      fullDescription: "Request your vehicle in advance and it will be waiting for you at the exit. No more waiting in the parking lot - your car will be ready when you are.",
      features: [
        { icon: Clock, label: "Advance Notice", value: "15 min recommended" },
        { icon: MapPin, label: "Pick-up Location", value: "Any mall exit" },
        { icon: Car, label: "Vehicle Types", value: "All registered vehicles" },
        { icon: Star, label: "Included with", value: "Valet service" },
      ],
      cta: "Request Vehicle",
    },
  },
];

const exclusiveServices = [
  { id: "lounge", name: "Lounge", description: "Private relaxation area with complimentary refreshments and Wi-Fi" },
  { id: "stylist", name: "Stylist", description: "Complimentary personal shopping and fashion consultation" },
  { id: "transfer", name: "Transfer", description: "Luxury car service to and from the mall" },
];

const Services = () => {
  const [vipInfoOpen, setVipInfoOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <PageLayout>
      <AnimatePresence mode="wait">
        {selectedService ? (
          <ServiceDetail 
            service={selectedService} 
            onBack={() => setSelectedService(null)} 
          />
        ) : (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 pt-16 pb-4"
          >
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

            {/* Service Cards */}
            <div className="mt-6 space-y-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    onClick={() => setSelectedService(service)}
                    className="relative w-full h-32 rounded-2xl overflow-hidden cursor-pointer group bg-card border border-border shadow-sm flex text-left"
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
                    <div className="w-2/5 relative overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-card via-card/20 to-transparent" />
                    </div>
                  </motion.button>
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
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-semibold text-foreground">
                        Exclusive Services
                      </h3>
                      <Dialog open={vipInfoOpen} onOpenChange={setVipInfoOpen}>
                        <DialogTrigger asChild>
                          <button className="w-5 h-5 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors">
                            <HelpCircle className="w-3.5 h-3.5 text-muted-foreground" />
                          </button>
                        </DialogTrigger>
                        <DialogContent className="rounded-2xl">
                          <DialogHeader>
                            <DialogTitle>Exclusive Services Access</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3 text-sm text-muted-foreground">
                            <p>
                              These services are available only for <strong className="text-foreground">Platinum</strong> loyalty program members.
                            </p>
                            <p>
                              To gain access, you need to reach the maximum level of the loyalty program by accumulating 150,000+ points.
                            </p>
                            <div className="bg-muted/50 rounded-xl p-4 mt-4">
                              <p className="font-semibold text-foreground mb-2">Platinum Benefits:</p>
                              <ul className="space-y-1.5">
                                {exclusiveServices.map((svc) => (
                                  <li key={svc.id} className="flex items-start gap-2">
                                    <span className="text-primary">•</span>
                                    <span><strong>{svc.name}</strong> — {svc.description}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Available for Platinum members
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {exclusiveServices.map((item) => (
                    <button
                      key={item.id}
                      className="flex-1 bg-muted hover:bg-muted/80 border border-border rounded-xl py-2.5 px-3 transition-colors"
                    >
                      <span className="text-sm font-medium text-muted-foreground">
                        {item.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

// Service Detail Component
const ServiceDetail = ({ service, onBack }: { service: Service; onBack: () => void }) => {
  const Icon = service.icon;
  
  return (
    <motion.div
      key="detail"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="pb-24 bg-background min-h-screen"
    >
      {/* Hero Image */}
      <div className="relative h-64">
        <img
          src={service.image}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-12 left-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
        >
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 -mt-8 relative z-10">
        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center shadow-sm">
            <Icon className="w-6 h-6 text-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">{service.title}</h1>
        </div>

        {/* Description */}
        <p className="mt-4 text-muted-foreground leading-relaxed">
          {service.details.fullDescription}
        </p>

        {/* Features */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {service.details.features.map((feature, idx) => {
            const FeatureIcon = feature.icon;
            return (
              <div key={idx} className="bg-card border border-border rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <FeatureIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{feature.label}</span>
                </div>
                <p className="font-semibold text-foreground">{feature.value}</p>
              </div>
            );
          })}
        </div>

        {/* Pricing */}
        {service.details.pricing && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold text-foreground mb-3">Pricing</h2>
            <div className="bg-card border border-border rounded-xl divide-y divide-border">
              {service.details.pricing.map((price, idx) => (
                <div key={idx} className="flex items-center justify-between p-3">
                  <span className="text-muted-foreground">{price.label}</span>
                  <span className="font-semibold text-foreground">{price.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <button className="w-full mt-6 h-14 bg-foreground text-background font-semibold rounded-xl hover:bg-foreground/90 transition-colors">
          {service.details.cta}
        </button>
      </div>
    </motion.div>
  );
};

export default Services;
