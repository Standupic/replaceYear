import { AxiosRequestConfig } from 'axios';
import {
  IHelperList,
  IHelperListAPI,
  IMinMaxYear,
  IYear,
  YEARS_KEY,
} from '../store/calculatorSlice';
import { InitData } from '../store/globalStateSlice';

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

export const minMaxYear = (years: IHelperListAPI[]): IMinMaxYear => {
  const arr = years.map((item) => item.year).sort();
  return {
    top: { min: arr[0], max: arr[arr.length - 1] },
    bottom: { min: arr[0], max: arr[arr.length - 2] },
  };
};

export const minMaxYears = (years: IHelperListAPI[]): IMinMaxYear => {
  const arr = years.map((item) => item.year).sort();
  return {
    top: { min: arr[1], max: arr[arr.length - 1] },
    bottom: { min: arr[0], max: arr[arr.length - 2] },
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

export const checkIsThereMoreThanOneNotSelectableYear = (years: IHelperList[]) => {
  return years.filter((item) => {
    return (
      (item.year === currentYear - 1 && !item.selectable) ||
      (item.year === currentYear - 2 && !item.selectable)
    );
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
        value: currentYear - item.year === 1 ? YEARS_KEY.topYear : YEARS_KEY.bottomYear,
      };
    }, {});
  }
  return false;
};

const sortAmount = (a: IHelperList, b: IHelperList) => {
  if (a.Amount > b.Amount) {
    return -1;
  }
  if (a.Amount < b.Amount) {
    return 1;
  }
  return 0;
};
export const getMostBenefitYear = (
  years: IHelperList[],
  notSelectableYear: number,
): IHelperList[] => {
  return years
    .filter((item) => {
      return item.year !== notSelectableYear;
    })
    .sort(sortAmount)
    .slice(0, 1);
};

export const getMostBenefitYears = (years: IHelperList[]): IHelperList[] => {
  return years
    .filter((item) => {
      return item.year !== currentYear - 1 || item.year !== currentYear - 2;
    })
    .sort(sortAmount)
    .slice(0, 2);
};

interface IMostBenefitYear {
  top: IYear;
  bottom: IYear;
  years: IHelperList[];
}

export const checkMostBenefitYear = (isOnlyOneYear: boolean, data: IMostBenefitYear) => {
  if (!data.years.length) return false;
  if (isOnlyOneYear) {
    return mostBenefitYear(data);
  } else {
    return mostBenefitYears(data);
  }
};

export const mostBenefitYear = (data: IMostBenefitYear): boolean => {
  const { years, top, bottom } = data;
  if (top && top.isSelectable) {
    if (top.value === years[0].year) {
      return true;
    }
  }
  if (bottom && bottom.isSelectable) {
    if (bottom.value === years[1].year) {
      return true;
    }
  }
  return false;
};

export const mostBenefitYears = (data: IMostBenefitYear): boolean => {
  const { years, top, bottom } = data;
  if (years && top.isSelectable && bottom.isSelectable) {
    if (top.value === years[0].year && bottom.value === years[1].year) {
      return true;
    }
  }
  return false;
};

export const mappingInitData = (data: any): InitData => {
  return {
    reqId: data.reqId,
    statusId: data.statusId,
    CurrentYear1: data.CurrentYear1,
    CurrentYear1Repl: data.CurrentYear1Repl,
    CurrentYear2: data.CurrentYear2,
    CurrentYear2Repl: data.CurrentYear2Repl,
    CurrentAmount: data.CurrentAmount,
  };
};

export const savePdfFile = (base64: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = base64 || '';
  a.download = fileName;
  a.click();
};
