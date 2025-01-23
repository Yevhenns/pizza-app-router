import Image from 'next/image';

import { cn } from '@/helpers/combineClasses';
import { formattedDate } from '@/helpers/formattedDate';
import { showDniproWeather } from '@/utils/showDniproWeather';

import css from './Weather.module.scss';

export async function Weather() {
  const data = await showDniproWeather();

  const weather = data?.forecast?.forecastday.map(item => {
    return {
      date: formattedDate(item.date),
      avgtemp: Math.round(Number(item.day.avgtemp_c)).toString(),
      conditionText: item.day.condition.text,
      icon: 'https:' + item.day.condition.icon,
    };
  });

  if (!weather) {
    return <></>;
  }

  return (
    <div className={css.wrapper}>
      <h2 className={css.heading}>Погода в Дніпрі</h2>
      <div className={css.weatherList}>
        {weather.map((item, index) => {
          return (
            <div key={item.date} className={css.weatherListitem}>
              <p className={css.text}>{item.avgtemp} C°</p>
              {index === 0 && <p className={css.text}>Сьогодні</p>}
              {index === 1 && <p className={css.text}>Завтра</p>}
              {index === 2 && <p className={css.text}>Післязавтра</p>}
              <p className={css.text}>{item.date}</p>
              <p className={cn(css.text, css.condition)}>
                {item.conditionText}
              </p>
              <Image
                src={item.icon}
                alt="weather icon"
                width={100}
                height={100}
                priority
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
