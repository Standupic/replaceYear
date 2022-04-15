import { IUser as U } from 'juicyfront/types/projects.types';

export interface IUser extends U {
    phone?: string;
    token?: string;
    manager?: boolean;
    myTeam?: boolean;

    /** Оклад */
    salary: number;
    /** Надбавки */
    payment: number;
    /** Корп номер телефона */
    mobilePhoneCorporate?: string;
    /** Личный номер телефона */
    mobilePhonePrivate?: string;
    /** Внутренний номер */
    internalPhone?: string;
}

export interface IService {
    /** id сервиса */
    serviceID: string;
    /** Имя сервиса */
    serviceName: string;
    /** Описание сервиса */
    serviceDesc: string;
    /** Полномочия на создание заявки */
    authCreate: boolean;
    /** Полномочия на согласование заявки */
    authApprove: boolean;
}
