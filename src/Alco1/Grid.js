import React from 'react';

const GridCell = props => {
  const style = {
    background: props.cell,
  };
  return (
    <div className="game-cell" style={style}/>
  )
};

const GridRow = props => {
  return (
    <div className="game-row">
      {
        props.row.map((cell, i) => (
          <GridCell key={i} cell={cell}/>
        ))
      }
    </div>
  )
};

const Grid = props => (
  <div>
    {
      props.grid.map((row, i) => {
        return <GridRow key={i} row={row}/>
      })
    }
  </div>
);

export default Grid;