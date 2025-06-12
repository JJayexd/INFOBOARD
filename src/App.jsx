import { useState } from 'react'
import { Header } from './Components/Header/Header'
import { Container } from './Components/Container/Container'
import { TestBus } from './Components/TestBus/TestBus'
import { TestMeals } from './Components/TestMeals/TestMeals'

function App() {

  return (
    <>
      <Header />
      <Container>
        <TestMeals />
        <TestBus />
      </Container>
    </>
  )
}

export default App
