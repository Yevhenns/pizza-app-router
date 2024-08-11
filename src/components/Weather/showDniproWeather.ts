const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export const showDniproWeather = async () => {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=Dnipropetrovsk&days=3&lang=uk&key=${WEATHER_API_KEY}`
    );
    const data: WeatherApiResponse = await res.json();
    return data.forecast.forecastday;
  } catch (error: any) {
    return error.message;
  }
};
