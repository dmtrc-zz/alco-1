import React, {Component} from 'react';
import Grid from './Grid';
import GameOver from './GameOver';
import GameInfo from './GameInfo';

//images
import Bg from './images/bg1.png';
import SomeSpecial from './images/some-special.png';
import Beverage from './images/dikaya_utka_white.png';

import './alco1.css';

import {
  VIEWPORT_WIDTH,
  VIEWPORT_HEIGHT,
  GAME_SPEED,
  TOWERS,
  START_POSITION,
  JUMP_STEP
} from './settings';

class Alco1 extends Component {
  constructor(props) {
    super(props);

    // initial grid
    let grid = [];
    for (let i = 0; i < VIEWPORT_HEIGHT; i++) {
      grid.push(new Array(VIEWPORT_WIDTH).fill('transparent'))
    }

    // initial bird
    let bird = {
      height: START_POSITION.top,
      position: START_POSITION.left
    };

    grid[bird.height][bird.position] = `url(${SomeSpecial})`;

    // initial state
    this.state = {
      grid: grid,
      bird: bird,
      towers: TOWERS,
      crashed: false,
      results: [],
      score: 0,
      sound: localStorage.sound === undefined,
    };

    this.timerID = setInterval(() => {
      if (this.state.crashed) {
        return;
      }

      let gridCopy = [];
      let towersCopy = this.state.towers.slice();

      // create empty grid
      for (let i = 0; i < VIEWPORT_HEIGHT; i++) {
        gridCopy.push(new Array(VIEWPORT_WIDTH).fill('transparent'))
      }

      // create towers
      for (let i = 0; i < towersCopy.length; i++) {
        for (let j = 0; j < towersCopy[i].height; j++) {
          if (towersCopy[i].upright) {
            gridCopy[(VIEWPORT_HEIGHT - 1) - j][towersCopy[i].position] = `url(${Beverage})`;
          } else {
            gridCopy[j][towersCopy[i].position] = `url(${Beverage})`;
          }
        }
      }

      // make towers move
      for (let i = 0; i < towersCopy.length; i++) {
        towersCopy[i].position--;

        if (towersCopy[i].position < 0) {
          towersCopy[i].position = VIEWPORT_WIDTH - 1;
          towersCopy[i].height = Math.floor(Math.random() * 6) + 1;
        }
      }

      let birdCopy = this.state.bird;

      birdCopy.height++;

      let crashed = false;

      // bird fall down
      if (birdCopy.height > (VIEWPORT_HEIGHT - 1) || birdCopy.height < 0) {
        birdCopy.height = START_POSITION.top;
        crashed = true;
      }

      // bird crushes in tower
      for (let i = 0; i < VIEWPORT_HEIGHT; i++) {
        if (gridCopy[i][START_POSITION.left] === `url(${Beverage})` && birdCopy.height === i) {
          birdCopy.height = START_POSITION.top;
          crashed = true;
        }
      }

      // if crash
      crashed === true && this.setState({
        crashed: true,
        results: [...this.state.results, this.state.score],
        score: -1,
      });

      gridCopy[birdCopy.height][birdCopy.position] = `url(${SomeSpecial})`;

      this.setState({
        grid: gridCopy,
        bird: birdCopy,
        towers: towersCopy,
        score: this.state.score + 1,
      });

    }, GAME_SPEED);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.listenKeyboard, true);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.listenKeyboard, true);
  }

  listenKeyboard = (event) => {
    if (event.key === 'Space' || event.keyCode === 32 || event.key === 'ArrowUp' || event.keyCode === 38) {
      this.handleClick();
    }

    if ((event.key === 'Enter' || event.keyCode === 13)) {
      this.state.crashed && this.handleRestart();
    }
  };

  handleClick = () => {
    if (this.state.crashed) {
      return;
    }

    const birdCopy = this.state.bird;
    birdCopy.height -= JUMP_STEP;

    this.setState({
      bird: birdCopy,
    });
  };

  handleRestart = () => this.setState({ crashed: false });

  handleSound = sound => {
    this.setState({ sound: !sound });
    this.state.sound ? localStorage.setItem('sound', true): localStorage.removeItem('sound')
  };

  render() {
    return (
      <div className="game-container" onClick={this.handleClick}>
        <div className="game-viewport" style={{backgroundImage: `url(${Bg})`}}>
          <Grid grid={this.state.grid}/>
          { this.state.crashed && <div onClick={this.handleRestart}><GameOver sound={this.state.sound}/></div> }
        </div>
        <div className="game-info">
          <GameInfo
            score={this.state.score}
            results={this.state.results}
            sound={this.state.sound}
            handleSound={this.handleSound}
          />
        </div>
      </div>
    )
  }
}

export default Alco1;