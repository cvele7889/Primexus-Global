import Header from './components/Header'
import Hero from './components/Hero'
import Trusted from './components/Trusted'
import Services from './components/Services'
import About from './components/About'
import Locations from './components/Locations'
import Careers from './components/Careers'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trusted />
        <Services />
        <About />
        <Locations />
        <Careers />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
