import React, { useState, useEffect } from 'react';
import {
  Container,
  Segment,
  Form,
  Header,
  Label,
  Input,
  Select,
  Button
} from 'semantic-ui-react';

import Notification from '../Notification/Notification';

import './App.css';

import { subscriptionOptions } from './utils/constants';
import { SubscriptionValue, InputValue, DataType } from './utils/types';
import { postOrderData } from './utils/API';

const App: React.FC = () => {
  //INPUT STATES
  const [postCode, setPostCode] = useState<string>('');
  const [bottlesQuantity, setBottlesQuantity] = useState<number>(1);
  const [subscriptionType, setSubscriptionType] = useState<SubscriptionValue>(
    'One Off'
  );
  const [isDisabled, setDisabled] = useState<boolean>(true);

  //RESPONSE STATES
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [grandTotal, setGrandTotal] = useState<number>(0);

  //useEffect to enable button
  useEffect(() => {
    !postCode ? setDisabled(true) : setDisabled(false);
  }, [postCode]);

  const fetchOrderPrice = async (): Promise<void> => {
    setSubmitting(true);

    const data: DataType = {
      postCode,
      bottlesQuantity,
      subscriptionType
    };

    try {
      const response = await postOrderData(data);

      if (response.data.status !== 200) {
        setErrorState(response.data.message);
      } else {
        setSuccessState(response.data.grandTotal);
      }
    } catch (error) {
      setErrorState(error);
    }
  };

  const setErrorState = (error: string) => {
    setGrandTotal(0);
    setSuccess(false);
    setError(true);
    setErrorMessage(error);
    setSubmitting(false);
  };

  const setSuccessState = (grandTotal: number) => {
    setGrandTotal(grandTotal);
    setSuccess(true);
    setError(false);
    setErrorMessage('');
    setSubmitting(false);
  };

  const handleInputChange = (
    value: InputValue,
    stateUpdater: Function
  ): void => {
    stateUpdater(value);
  };

  return (
    <Container className='container'>
      <Segment padded='very'>
        <Form onSubmit={fetchOrderPrice}>
          <Header as='h2'>Order Details</Header>
          <Form.Field>
            <Label>Postcode</Label>
            <Input
              focus
              disabled={isSubmitting}
              placeholder='Enter postcode'
              value={postCode}
              onChange={event =>
                handleInputChange(event.target.value, setPostCode)
              }
            />
          </Form.Field>
          <Form.Field>
            <Label>Bottles per Month</Label>
            <Input
              min={1}
              disabled={isSubmitting}
              type='number'
              placeholder='Enter amount of bottles'
              value={bottlesQuantity}
              onChange={event =>
                handleInputChange(event.target.value, setBottlesQuantity)
              }
            />
          </Form.Field>
          <Form.Field>
            <Label>Subscription Package</Label>
            <Select
              disabled={isSubmitting}
              placeholder='Select a subscription package'
              options={subscriptionOptions}
              value={subscriptionType}
              onChange={(event, data: any) =>
                handleInputChange(data.value, setSubscriptionType)
              }
            />
          </Form.Field>
          <Button
            type='submit'
            primary
            loading={isSubmitting}
            disabled={isDisabled}>
            Calculate price
          </Button>
          {success && (
            <Notification
              isSuccess={true}
              isError={false}
              grandTotal={grandTotal}
            />
          )}
          {error && (
            <Notification
              isSuccess={false}
              isError={true}
              errorMessage={errorMessage}
            />
          )}
        </Form>
      </Segment>
    </Container>
  );
};

export default App;
