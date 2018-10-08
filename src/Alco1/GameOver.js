import React from 'react';
import Sound from 'react-sound';
import Button from '@material-ui/core/Button';
import Dancing from './images/funny-dancing.gif';
import Track from './files/Blizzard.mp3';

const GameOver = props => (
  <div className="game-over">
    <h2>Good job! Try again!</h2>
    <img src={Dancing} alt=""/>
    <Button
      variant="contained"
      className="game-over-button"
      color="primary">
      Start!
    </Button>

    {props.sound && (
      <Sound
        url={Track}
        loop
        autoLoad
        playStatus={Sound.status.PLAYING}
        playFromPosition={300 /* in milliseconds */}
        // onLoading={this.handleSongLoading}
        // onPlaying={this.handleSongPlaying}

        // onFinishedPlaying={this.handleSongFinishedPlaying}
      />
    )}
  </div>
);

export default GameOver;