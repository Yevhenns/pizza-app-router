type WeatherApiResponse = {
  location: {
    name: string;
  };
  forecast: {
    forecastday: {
      date: string;
      day: {
        avgtemp_c: string;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
};

type FilteredApiResponse = {
  date: string;
  day: {
    avgtemp_c: string;
    condition: {
      text: string;
      icon: string;
    };
  };
}[];

type ForecastDay = {
  date: string;
  avgtemp: string;
  conditionText: string;
  icon: string;
};
