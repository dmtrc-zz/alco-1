import React from 'react';



const bestResults = results => (
  <div>
    <h4>Best results:</h4>
    <ol>
      { results.sort((a, b) => b - a).slice(0, 3).map(item => <li><strong>{item}</strong></li>) }
    </ol>
  </div>
);

const GameInfo = props => (
  <React.Fragment>
    <h1>Score: { props.score }</h1>
    { props.results.length > 0 && bestResults(props.results) }


  </React.Fragment>
);

export default GameInfo;