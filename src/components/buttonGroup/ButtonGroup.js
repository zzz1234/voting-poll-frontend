import React, { useState } from 'react';

import Button from '../button/Button.js';

export default function ButtonGroup({onClick}) {

    const [page, setPage] = useState('home');
  
    return (
      <div className="button-group">
        <Button label="Create Poll" handleClick={() => onClick('create')}/>
        <Button label="Join Poll" handleClick={() => onClick('join')}/>
      </div>
    );
  }