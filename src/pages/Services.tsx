import { motion } from "framer-motion";
import { Zap, Car, Navigation2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import evChargingImage from "@/assets/ev-charging.jpg";
import valetImage from "@/assets/valet.jpg";
import requestVehicleImage from "@/assets/request-vehicle.jpg";

const services = [
  {
    id: "ev-charging",
    icon: Zap,
    title: "EV Charging",
    description: "Зарядка электромобилей",
    image: evChargingImage,
  },
  {
    id: "valet",
    icon: Car,
    title: "Valet Parking",
    description: "Услуги парковщика",
    image: valetImage,
  },
  {
    id: "request-vehicle",
    icon: Navigation2,
    title: "Request Vehicle",
    description: "Заказ трансфера",
    image: requestVehicleImage,
  },
];

const Services = () => {
  return (
    <PageLayout>
      <div className="px-4 pt-16 pb-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-2xl font-bold text-foreground">
            Сервисы
          </h1>
          <p className="text-muted-foreground mt-1">
            Премиальные услуги для вашего комфорта
          </p>
        </motion.div>

        <div className="mt-6 space-y-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="relative h-48 rounded-3xl overflow-hidden cursor-pointer group"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-background/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-primary-foreground">
                        {service.title}
                      </h3>
                      <p className="text-sm text-primary-foreground/80">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 border-2 border-accent/0 rounded-3xl transition-colors duration-300 group-hover:border-accent/50"
                />
              </motion.div>
            );
          })}
        </div>

        {/* VIP Section Teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6"
        >
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-gold flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">VIP</span>
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold text-foreground">
                  Эксклюзивные сервисы
                </h3>
                <p className="text-sm text-muted-foreground">
                  Доступны для уровня Платина
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              {["Lounge", "Stylist", "Transfer"].map((item) => (
                <div
                  key={item}
                  className="bg-muted rounded-xl py-2 px-3"
                >
                  <span className="text-xs font-medium text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
};

export default Services;
