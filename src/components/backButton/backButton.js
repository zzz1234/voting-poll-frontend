import React from 'react';
import './backButton.css';

const handleBack = (historyStack, setHistoryStack, setPage) => {
    if (historyStack.length > 0) {
      const lastPage = historyStack[historyStack.length - 2];
      setHistoryStack(historyStack.slice(0, -1));
      setPage(lastPage);
    }
  }

export default function BackButton({historyStack, setHistoryStack, setPage}) {
    return <button className="backButton" onClick={() => handleBack(historyStack, setHistoryStack, setPage)}>Back</button>
}