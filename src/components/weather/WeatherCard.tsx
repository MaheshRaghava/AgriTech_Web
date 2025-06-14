
import { useState, useEffect } from 'react';
import { Sun, CloudRain, Wind, Droplets, CloudSnow, CloudFog, Cloud } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { WeatherData } from '@/services/WeatherService';
import { format } from 'date-fns';

interface WeatherCardProps {
  weatherData: WeatherData;
}

const WeatherCard = ({ weatherData }: WeatherCardProps) => {
  const [weatherIcon, setWeatherIcon] = useState<JSX.Element>(<Sun className="h-12 w-12 text-yellow-500" />);

  useEffect(() => {
    // Set appropriate weather icon based on condition
    const condition = weatherData.current.condition.text.toLowerCase();
    
    if (condition.includes('rain') || condition.includes('drizzle')) {
      setWeatherIcon(<CloudRain className="h-12 w-12 text-blue-500" />);
    } else if (condition.includes('sunny') || condition.includes('clear')) {
      setWeatherIcon(<Sun className="h-12 w-12 text-yellow-500" />);
    } else if (condition.includes('snow') || condition.includes('sleet')) {
      setWeatherIcon(<CloudSnow className="h-12 w-12 text-blue-200" />);
    } else if (condition.includes('fog') || condition.includes('mist')) {
      setWeatherIcon(<CloudFog className="h-12 w-12 text-gray-400" />);
    } else if (condition.includes('cloud')) {
      setWeatherIcon(<Cloud className="h-12 w-12 text-gray-500" />);
    }
  }, [weatherData]);

  const formatDate = (dateString: string) => {
    try {
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      // Create a valid date object
      const date = new Date(dateString);
      
      // Check if date is valid before formatting
      if (isNaN(date.getTime())) {
        console.error("Invalid date:", dateString);
        return "Invalid Date";
      }
      
      return format(date, 'EEEE, MMMM d, yyyy h:mm a');
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <Card className="w-full overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl bg-white border-0">
      <CardContent className="p-0">
        <div className="bg-gradient-to-r from-vista-blue to-caper text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">{weatherData.location.name}</h2>
              <p className="text-farm-50">
                {weatherData.location.region}, {weatherData.location.country}
              </p>
              <p className="text-farm-100 text-sm mt-1">
                {formatDate(weatherData.location.localtime)}
              </p>
            </div>
            <div className="text-center">
              {weatherIcon}
              <div className="mt-2 text-4xl font-bold">{weatherData.current.temp_c}°C</div>
              <div>{weatherData.current.condition.text}</div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
          <div className="text-center p-3 bg-farm-50 rounded-lg">
            <Droplets className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-sm text-gray-500">Humidity</p>
            <p className="font-bold">{weatherData.current.humidity}%</p>
          </div>
          
          <div className="text-center p-3 bg-farm-50 rounded-lg">
            <Wind className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-sm text-gray-500">Wind</p>
            <p className="font-bold">{weatherData.current.wind_kph} km/h</p>
          </div>
          
          <div className="text-center p-3 bg-farm-50 rounded-lg">
            <Sun className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
            <p className="text-sm text-gray-500">Feels Like</p>
            <p className="font-bold">{weatherData.current.feelslike_c}°C</p>
          </div>
          
          <div className="text-center p-3 bg-farm-50 rounded-lg">
            <CloudRain className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="text-sm text-gray-500">Precipitation</p>
            <p className="font-bold">{weatherData.current.precip_mm} mm</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
