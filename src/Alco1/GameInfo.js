import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const bestResults = results => (
  <div>
    <h4>Best results:</h4>
    <ol>
      { results.sort((a, b) => b - a).slice(0, 3).map((item, i) => <li key={i}><strong>{item}</strong></li>) }
    </ol>
  </div>
);

const GameInfo = props => (
  <React.Fragment>
    <h1>Score: { props.score }</h1>
    { props.results.length > 0 && bestResults(props.results) }
    <FormControlLabel
      control={
        <Switch
          checked={props.sound}
          onChange={() => props.handleSound(props.sound)}
          color="primary"
        />
      }
      label="Sound"
    />
  </React.Fragment>
);

export default GameInfo;