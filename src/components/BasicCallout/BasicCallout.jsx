import React from 'react';
import { Callout, Colors } from 'react-foundation';

import './style.css';

const BasicCallout = ({ title }) => {

    return (
      <Callout color={Colors.SECONDARY}>
        <h5>{title}</h5>
      </Callout>
    )
  };
  
  export default BasicCallout;