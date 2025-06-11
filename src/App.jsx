import { useState } from 'react'
import { Header } from './Components/Header/Header'
import { Container } from './Components/Container/Container'
import { Bus } from './Components/Bus/Bus'
import { Meals } from './Components/Meals/Meals'
import { News } from './Components/News/News'

function App() {

  return (
    <>
      <Header />
      <Container>
        <Meals />
        <News />
        <Bus />
      </Container>
    </>
  )
}

export default App
