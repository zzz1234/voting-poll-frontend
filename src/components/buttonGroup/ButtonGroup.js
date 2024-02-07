import React from 'react';

import Button from '../button/Button.js';

export default function ButtonGroup({onClick}) {
  
    return (
      <div className="button-group">
        <Button label="Create Poll" handleClick={() => onClick('create')}/>
        <Button label="Join Poll" handleClick={() => onClick('join')}/>
        <Button label="Results" handleClick={() => onClick('results')} />
      </div>
    );
  }