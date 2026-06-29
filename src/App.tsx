import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import SuccessShowcase from './components/SuccessShowcase'
import About from './components/About'
import Locations from './components/Locations'
import Careers from './components/Careers'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PrimexusAiChat from './components/PrimexusAiChat'
import { AiChatProvider } from './context/AiChatContext'

export default function App() {
  return (
    <AiChatProvider>
      <Header />
      <main>
        <Hero />
        <Services />
        <SuccessShowcase />
        <About />
        <Locations />
        <Careers />
        <Contact />
      </main>
      <Footer />
      <PrimexusAiChat />
    </AiChatProvider>
  )
}
