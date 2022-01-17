

export class Advertisement {
    advertisementId: number;
    advertisementTitle: string;
    advertisementType: string;
    advertisementDesc: string;
    advertisementImageName: string;
    advRegistrationDate: any;
    advertisementImageFile: any;
    subscriptionPlan: string;
    advertisementSize: string;
    subscriber: string;
    agree: Boolean;
    subscriptionDays: number;
}


export const adSize: any[] = [{ name: '100X100', value: 1 }, { name: '200x200', value: 2 }, { name: '300x300', value: 3 }];


export const subPlan: any[] = [{ name: 'once', value: 1 }, { name: 'week', value: 7 }, { name: '1month', value: 30 }, { name: '3months', value: 90 }, { name: 'yearly', value: 365 }]