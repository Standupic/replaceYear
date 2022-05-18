import { AxiosRequestConfig } from 'axios';
import { IHelperList, IHelperListAPI } from '../store/calculatorSlice';

export const setDefaultHeadersRequest = (
  config: AxiosRequestConfig,
  options: Record<string, string>,
) => {
  for (const key in options) {
    if (config && config.headers) {
      config.headers[key] = options[key];
    }
  }
};

export const domElementGetter = () => {
  let div = document.getElementById('container');
  if (!div) {
    div = document.createElement('div');
    div.id = 'container';
  }
  return div;
};

export const getCurrency = (income: number) => {
  return income.toLocaleString('ru-Ru', { style: 'currency', currency: 'RUB' });
};

export const currentYear = new Date().getFullYear();

Number.prototype.getTotal = function (this: ThisType<any>) {
  // @ts-ignore
  return this / 730;
};

export const mappingHelperList = (years: IHelperListAPI[]) => {
  return years.map((item) => {
    item.year = Number(item.year);
    return item;
  });
};

export const getPreviousTwoYears = (years: IHelperList[]): IHelperList[] => {
  return years.filter((item) => {
    return item.year === currentYear - 1 || item.year === currentYear - 2;
  });
};

export const getMostBenefitYears = (years: IHelperList[]): IHelperList[] => {
  return years
    .filter((item) => {
      if (item.year !== currentYear - 1) return item;
      if (item.year !== currentYear - 2) return item;
    })
    .sort((a, b) => {
      if (a.Amount > b.Amount) {
        return -1;
      }
      if (a.Amount < b.Amount) {
        return 1;
      }
      return 0;
    })
    .slice(0, 2);
};

export const isMostBenefitYears = (
  top?: number,
  bottom?: number,
  years?: IHelperList[],
): boolean => {
  if (years && top && bottom) {
    if (top === years[0].year && bottom === years[1].year) {
      return true;
    }
  }
  return false;
};
