import { Droplets, Wind, Thermometer, Eye } from "lucide-react";
import { WeatherData, getWeatherIconUrl } from "@/lib/weather";

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay = ({ data }: WeatherDisplayProps) => {
  return (
    <div className="animate-fade-in flex flex-col items-center gap-6 w-full max-w-md mx-auto">
      {/* Main weather card */}
      <div className="glass-strong rounded-2xl p-8 w-full text-center">
        <p className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
          {data.city}, {data.country}
        </p>

        <div className="flex items-center justify-center -my-2">
          <img
            src={getWeatherIconUrl(data.icon)}
            alt={data.description}
            className="w-28 h-28 drop-shadow-lg"
          />
        </div>

        <p className="text-7xl font-light text-foreground tracking-tight">
          {data.temp}°
        </p>

        <p className="text-muted-foreground capitalize mt-1 text-lg">
          {data.description}
        </p>

        <p className="text-muted-foreground text-sm mt-2">
          H:{data.tempMax}° L:{data.tempMin}°
        </p>
      </div>

      {/* Details grid */}
      <div className="grid grid-cols-2 gap-3 w-full">
        <DetailCard
          icon={<Thermometer className="w-4 h-4 text-primary" />}
          label="Feels Like"
          value={`${data.feelsLike}°`}
        />
        <DetailCard
          icon={<Droplets className="w-4 h-4 text-primary" />}
          label="Humidity"
          value={`${data.humidity}%`}
        />
        <DetailCard
          icon={<Wind className="w-4 h-4 text-primary" />}
          label="Wind"
          value={`${data.windSpeed} km/h`}
        />
        <DetailCard
          icon={<Eye className="w-4 h-4 text-primary" />}
          label="Condition"
          value={data.condition}
        />
      </div>
    </div>
  );
};

const DetailCard = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) => (
  <div className="glass rounded-xl p-4 flex flex-col gap-1">
    <div className="flex items-center gap-2 text-muted-foreground text-xs font-medium">
      {icon}
      {label}
    </div>
    <p className="text-foreground text-lg font-semibold">{value}</p>
  </div>
);

export default WeatherDisplay;
