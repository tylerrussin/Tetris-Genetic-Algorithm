import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { gameTests } from './gameFunctions/tests/gameTests';
import { aiTests } from './aiFunctions/tests/aiTests';


it('app renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

gameTests();
aiTests();



