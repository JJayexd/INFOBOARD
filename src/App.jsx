import { useState } from 'react'
import { Header } from './Components/Header/Header'
import { Container } from './Components/Container/Container'
import { TestBus } from './Components/TestBus/TestBus'
import { TestMeals } from './Components/TestMeals/TestMeals'
import { Activities } from './Components/Activities/Activities'
import { Clock } from './Components/Clock/Clock'

function App() {

  return (
    <>
      <Header />
      <Container>
      <div className="col-start-1 col-end-2 row-start-1 row-end-4">
        <TestMeals />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 text-center m-auto">
        <Clock />
      </div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-4">
        <TestBus />
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-4">
        <Activities />
      </div>
      </Container>
    </>
  )
}

export default App
