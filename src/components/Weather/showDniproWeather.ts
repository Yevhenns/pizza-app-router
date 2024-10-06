const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

export async function showDniproWeather(): Promise<WeatherApiResponse> {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=Dnipropetrovsk&days=3&lang=uk&key=${WEATHER_API_KEY}`
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
}
