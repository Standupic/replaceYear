import { addLeadingZeros } from 'juicyfront';

export const MONTH_NAME: string[] = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
];

export const parseDateRange = (date1: number, date2: number): string => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const dd1 = addLeadingZeros(d1.getDate());
  const mm1 = MONTH_NAME[d1.getMonth()].slice(0, 3).toLowerCase();

  const dd2 = addLeadingZeros(d2.getDate());
  const mm2 = MONTH_NAME[d2.getMonth()].slice(0, 3).toLowerCase();

  const yyyy = d2.getFullYear();
  return `${dd1} ${mm1} - ${dd2} ${mm2} ${yyyy}`;
};
