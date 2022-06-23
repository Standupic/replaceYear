import { AxiosRequestConfig } from 'axios';
import {
  CalculatorState,
  IHelperList,
  IHelperListAPI,
  IMinMaxYear,
  ITwoPreviousYears,
  IYear,
  YEARS_KEY,
} from '../store/calculatorSlice';
import { InitData } from '../store/globalStateSlice';
import { IApplications } from '../middlewares/receiveApplications';
import { IApplicationMapped, IApplicationsMapped } from '../store/applicationsSlice';

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
  if (income) {
    return income.toLocaleString('ru-Ru', {
      style: 'currency',
      currency: 'RUB',
      maximumFractionDigits: 2,
    });
  }
  return '';
};

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

export const convertRubToPennyHelperList = (years: IHelperListAPI[]) => {
  return years.map((item) => {
    item.Amount = item.Amount * 100;
    return item;
  });
};

export const getPreviousTwoYears = (
  years: IHelperList[],
  twoPreviousYears: ITwoPreviousYears,
): IHelperList[] => {
  const { previousYear, beforePreviousYear } = twoPreviousYears;
  return years.filter((item) => {
    return item.year === previousYear || item.year === beforePreviousYear;
  });
};

export const checkIsThereMoreThanOneNotSelectableYear = (
  years: IHelperList[],
  twoPreviousYears: ITwoPreviousYears,
) => {
  const { previousYear, beforePreviousYear } = twoPreviousYears;
  return years.filter((item) => {
    return (
      (item.year === previousYear && !item.selectable) ||
      (item.year === beforePreviousYear && !item.selectable)
    );
  });
};

export const checkIsThereNotSelectableYear = (
  years: IHelperList[],
  twoPreviousYears: ITwoPreviousYears,
): { year: number; value: string } | false => {
  const { previousYear, beforePreviousYear } = twoPreviousYears;
  const filtered = years.filter((item) => {
    return (
      (item.year === previousYear && !item.selectable) ||
      (item.year === beforePreviousYear && !item.selectable)
    );
  });
  if (filtered.length) {
    return filtered.reduce((acc: any, item) => {
      return {
        ...acc,
        year: item.year,
        value: previousYear - item.year === 1 ? YEARS_KEY.bottomYear : YEARS_KEY.topYear,
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

export const getMostBenefitYears = (
  years: IHelperList[],
  twoPreviousYears: ITwoPreviousYears,
): IHelperList[] => {
  const { previousYear, beforePreviousYear } = twoPreviousYears;
  return years
    .filter((item) => {
      return item.year !== previousYear || item.year !== beforePreviousYear;
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
    if (bottom.value === years[0].year) {
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
    previousYear: Number(data.CurrentYear1),
    beforePreviousYear: Number(data.CurrentYear2),
  };
};

export const savePdfFile = (base64: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = base64 || '';
  a.download = fileName;
  a.click();
};

export const mappingApplications = (data: IApplications[]): IApplicationsMapped[] => {
  return data?.reduce((acc: any, item) => {
    return [
      ...acc,
      {
        id: item.Id,
        date: new Date(item.createDateTime).toLocaleDateString(),
        timeStamp: item.createDateTime,
        title: `Заявка на замену лет для расчёта больничного на ${new Date(
          item.createDateTime,
        ).getFullYear()} год`,
        requestNumber: item.reqId,
        statusText: item.statusText,
        statusColor: item.statusId === '10' ? 'yellow' : 'blue',
        user: item.initiator,
        scenarioStage: item.scenarioStage,
      },
    ];
  }, []);
};

export const totalActiveYears = (topYear: IYear, bottomYear: IYear, helperList: IHelperList[]) => {
  return helperList
    .filter((item) => {
      return item.year === topYear.value || item.year === bottomYear.value;
    })
    .reduce((acc: any, item) => {
      return acc + item.Amount / 730 / 100;
    }, 0);
};

export const totalNotActiveYears = (items: IHelperList[]) => {
  return items?.reduce((acc: any, item) => {
    return acc + item.Amount / 730 / 100;
  }, 0);
};

export const getDelta = (active: number, notActive: number) => {
  return Number((active - notActive).toFixed(2));
};

export const mappingGetStatement = (data: any) => {
  return data.attachments.reduce((acc: any, item: any) => {
    return { ...acc, ...item };
  }, {});
};

export const mappingGetApplication = (data: any): IApplicationMapped => {
  return {
    previousYear: data.CurrentYear1,
    beforePreviousYear: data.CurrentYear2,
    topActiveYear: data.NextYear1,
    bottomActiveYear: data.NextYear2,
    totalNotActive: data.CurrentAmount,
    totalActive: data.NextAmount,
    attachment: data.attachments[0],
    scenarioStage: data.scenarioStage,
    id: data.Id,
    timeStamp: data.createDateTime,
  };
};

interface IComputingDraftProps {
  notActiveYear: number;
  notActiveYearValue: string;
  topActiveYear: number;
  bottomActiveYear: number;
}

export const computingDraftTwoYearActive = (
  state: CalculatorState,
  params: Omit<IComputingDraftProps, 'notActiveYear' | 'notActiveYearValue'>,
) => {
  const { topActiveYear, bottomActiveYear } = params;
  state.topActiveYear.value = topActiveYear;
  state.bottomActiveYear.value = bottomActiveYear;
  state.minMaxYears = minMaxYears(state.helperList);
  state.mostBenefitYears = getMostBenefitYears(mappingHelperList(state.helperList), {
    previousYear: state.previousYear,
    beforePreviousYear: state.beforePreviousYear,
  });
};

export const computingDraftOnlyOneYearActive = (
  state: CalculatorState,
  params: IComputingDraftProps,
) => {
  const { notActiveYear, notActiveYearValue, topActiveYear, bottomActiveYear } = params;
  state.isOnlyOneYearActive = true;
  const mostBenefitYear = getMostBenefitYear(state.helperList, notActiveYear);
  if (mostBenefitYear.length) {
    state.mostBenefitYears = mostBenefitYear;
  }
  state.minMaxYears = minMaxYear(state.helperList);
  switch (notActiveYearValue) {
    case YEARS_KEY.bottomYear:
      state.bottomActiveYear.value = notActiveYear;
      state.bottomActiveYear.isSelectable = false;
      state.topActiveYear.value = topActiveYear;
      state.topActiveYear.stepLimitYear = state.minMaxYears.top.max - 2;
      return state;
    case YEARS_KEY.topYear:
      state.topActiveYear.value = notActiveYear;
      state.topActiveYear.isSelectable = false;
      state.bottomActiveYear.value = bottomActiveYear;
      return state;
    default:
      return state;
  }
};

export const computingOnlyOneYearActive = (state: CalculatorState, year: number, value: string) => {
  state.isOnlyOneYearActive = true;
  const mostBenefitYear = getMostBenefitYear(state.helperList, year);
  if (mostBenefitYear.length) {
    state.mostBenefitYears = mostBenefitYear;
  }
  state.minMaxYears = minMaxYear(state.helperList);
  switch (value) {
    case YEARS_KEY.bottomYear:
      state.bottomActiveYear.value = year;
      state.bottomActiveYear.isSelectable = false;
      state.topActiveYear.value = mostBenefitYear[0].year;
      state.topActiveYear.stepLimitYear = state.minMaxYears.top.max - 2;
      return state;
    case YEARS_KEY.topYear:
      state.topActiveYear.value = year;
      state.topActiveYear.isSelectable = false;
      state.bottomActiveYear.value = mostBenefitYear[0].year;
      return state;
    default:
      return state;
  }
};

export const computingTwoYearsActive = (state: CalculatorState) => {
  const theBestYears = getMostBenefitYears(mappingHelperList(state.helperList), {
    previousYear: state.previousYear,
    beforePreviousYear: state.beforePreviousYear,
  });
  if (theBestYears.length) {
    state.topActiveYear.value = theBestYears[0].year;
    state.bottomActiveYear.value = theBestYears[1].year;
  }
  state.minMaxYears = minMaxYears(state.helperList);
  state.mostBenefitYears = theBestYears;
};
