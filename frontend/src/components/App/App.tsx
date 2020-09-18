import React, { useState } from 'react';
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

  const fetchOrderPrice = async (): Promise<void> => {
    const data: DataType = {
      postCode,
      bottlesQuantity,
      subscriptionType
    };

    try {
      const response = await postOrderData(data);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
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
              placeholder='Select a subscription package'
              options={subscriptionOptions}
              value={subscriptionType}
              onChange={(event, data: any) =>
                handleInputChange(data.value, setSubscriptionType)
              }
            />
          </Form.Field>
          <Button type='submit' primary>
            Calculate price
          </Button>
        </Form>
      </Segment>
    </Container>
  );
};

export default App;
