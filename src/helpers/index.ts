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
  if (income) return income.toLocaleString('ru-Ru', { style: 'currency', currency: 'RUB' });
  return '';
};

export const currentYear = new Date().getFullYear();

export const controllerArrow = (a: number, b: number[]) => {
  const right = a !== b[1];
  const left = a !== b[0];
  return {
    left,
    right,
  };
};

export const minMaxYears = (years: IHelperListAPI[]) => {
  const arr = years.map((item) => item.year).sort();
  if (arr.length === 3) {
    return {
      top: [arr[arr.length - 2], arr[arr.length - 1]],
      bottom: [arr[0], arr[arr.length - 2]],
    };
  }
  return {
    top: [arr[1], arr[arr.length - 1]],
    bottom: [arr[0], arr[arr.length - 2]],
  };
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
