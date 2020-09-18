export type SubscriptionValue =
  | 'One Off'
  | 'Rolling'
  | '6 months'
  | '12 months'
  | '18 months';

export type InputValue = string | number | SubscriptionValue;

export type SubscriptionOption = {
  key: number;
  text: SubscriptionValue;
  value: SubscriptionValue;
};

export type DataType = {
  postCode: string;
  bottlesQuantity: number;
  subscriptionType: SubscriptionValue;
};
