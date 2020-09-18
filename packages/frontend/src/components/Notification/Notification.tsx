import React from 'react';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';

const CURRENCY_SYMBOL = '£';
const ERROR_TEXT = 'An error occurred';

const Notification = (props: any) => (
  <Message positive={props.isSuccess} negative={props.isError}>
    <Message.Header>
      {props.isError ? ERROR_TEXT : `${CURRENCY_SYMBOL + props.grandTotal}`}
    </Message.Header>
    {props.isError && <p>{props.errorMessage}</p>}
  </Message>
);

Notification.propTypes = {
  isSuccess: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  grandTotal: PropTypes.number,
  errorMessage: PropTypes.string
};

Notification.defaultProps = {
  errorMessage: ERROR_TEXT,
  grandTotal: 0
};

export default Notification;
