import { SubscriptionOption } from './types';

//INPUT OPTIONS
export const subscriptionOptions: SubscriptionOption[] = [
  { key: 1, text: 'One Off', value: 'One Off' },
  { key: 2, text: 'Rolling', value: 'Rolling' },
  { key: 3, text: '6 months', value: '6 months' },
  { key: 4, text: '12 months', value: '12 months' },
  { key: 5, text: '18 months', value: '18 months' }
];

//SERVER
export const SERVER_ENDPOINT = '/orders/calculate_price';
export const SERVER_URL = `http://localhost:4000${SERVER_ENDPOINT}`;
