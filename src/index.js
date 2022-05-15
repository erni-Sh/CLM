import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CLM from './components/clm/clm';

const rootElement = document.getElementById("root");

function App() {
	return (
		<CLM />
	)
}

ReactDOM.render(
	<App />,
	rootElement
);
