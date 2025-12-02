import React from 'react'
import TicTacToe from './TicTacToe'
import DataTable from './Table'
import Tree from './Tree'
import TrafficLight from './TrafficLight'
import BoxSequenceGame from './BoxSequenceGame'
import CurrentCountAndPreviousCount from './CurrentCountAndPreviousCount'

const Index = () => {

  return (
    <>
      <TicTacToe />
      <br />
      <Tree />
      <br />
      <DataTable />
      <br />
      <TrafficLight />
      <br />
      <BoxSequenceGame />
      <br />
      <CurrentCountAndPreviousCount />
      <br />
    </>
  )
}

export default Index
