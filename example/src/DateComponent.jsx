import React, { Fragment } from 'react';

const Datecomponent = (props) => {
  return (
    <Fragment>
      <input type='date' {...props} />
      <label>date</label>
    </Fragment>
  );
};

export default Datecomponent;
