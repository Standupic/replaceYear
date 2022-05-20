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

export const minMaxYear = (years: IHelperListAPI[]) => {
  const arr = years.map((item) => item.year).sort();
  return {
    top: [arr[0], arr[arr.length - 1]],
    bottom: [arr[0], arr[arr.length - 2]],
  };
};

export const minMaxYears = (years: IHelperListAPI[]) => {
  const arr = years.map((item) => item.year).sort();
  // if (arr.length === 3) {
  //   return {
  //     top: [arr[arr.length - 2], arr[arr.length - 1]],
  //     bottom: [arr[0], arr[arr.length - 2]],
  //   };
  // }
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

export const checkIsThereNotSelectableYear = (
  years: IHelperList[],
): { year: number; value: string } | false => {
  const filtered = years.filter((item) => {
    return (
      (item.year === currentYear - 1 && !item.selectable) ||
      (item.year === currentYear - 2 && !item.selectable)
    );
  });
  if (filtered.length) {
    return filtered.reduce((acc: any, item) => {
      return {
        ...acc,
        year: item.year,
        value: currentYear - item.year === 1 ? 'topYear' : 'bottomYear',
      };
    }, {});
  }
  return false;
};

export const getMostBenefitYear = (
  years: IHelperList[],
  isNotSelectableYear: number,
): IHelperList[] => {
  return years
    .filter((item) => {
      return item.year !== isNotSelectableYear;
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
    .slice(0, 1);
};

export const getMostBenefitYears = (years: IHelperList[]): IHelperList[] => {
  return years
    .filter((item) => {
      return item.year !== currentYear - 1 || item.year !== currentYear - 2;
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
  top: { value: number; isSelectable: boolean; step: number },
  bottom: { value: number; isSelectable: boolean; step: number },
  years: IHelperList[],
): boolean => {
  if (years.length > 1 && !top.isSelectable && !bottom.isSelectable) {
    if (top.value === years[0].year && bottom.value === years[1].year) {
      return true;
    }
  }
  if (years && top.isSelectable) {
    if (top.value === years[0].year) {
      return true;
    }
  }
  if (years && bottom.isSelectable) {
    if (bottom.value === years[0].year) {
      return true;
    }
  }
  return false;
};
