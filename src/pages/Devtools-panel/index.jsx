import React from 'react';
import { render } from 'react-dom';
import { processMessageFromBg, buildConnectionWithBg } from './utils'
import App from './app';

const connection = buildConnectionWithBg();

connection.onMessage.addListener((message) => processMessageFromBg(message));

render(<App />, document.getElementById('app-container'));