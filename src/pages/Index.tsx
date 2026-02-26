import { useState, useEffect, useCallback } from "react";
import { CloudRain } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import WeatherDisplay from "@/components/WeatherDisplay";
import { WeatherData, fetchWeatherByCity, fetchWeatherByCoords } from "@/lib/weather";
import weatherBg from "@/assets/weather-bg.jpg";

const Index = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = (err: unknown) => {
    setError(err instanceof Error ? err.message : "Something went wrong.");
    setWeather(null);
  };

  const searchCity = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const locateUser = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const data = await fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude);
          setWeather(data);
        } catch (err) {
          handleError(err);
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location access denied. Please search for a city instead.");
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    locateUser();
  }, [locateUser]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden">
      {/* Background */}
      <img
        src={weatherBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-background/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-lg mx-auto px-4 py-12 flex flex-col items-center gap-8">
        {/* Header */}
        <div className="flex items-center gap-3 animate-fade-in">
          <CloudRain className="w-8 h-8 text-primary" />
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Weather
          </h1>
        </div>

        {/* Search */}
        <SearchBar onSearch={searchCity} onLocate={locateUser} isLoading={loading} />

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground text-sm">Fetching weather...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="glass rounded-xl p-6 text-center animate-fade-in w-full">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* Weather */}
        {weather && !loading && <WeatherDisplay data={weather} />}
      </div>
    </div>
  );
};

export default Index;
