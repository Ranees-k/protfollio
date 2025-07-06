import About from './aboutme';
import './App.css'
import Header from './Header';
import Landing from './LandingPage'
import Projects from './projects';
import Contact from './contact';

function App() {
  return (
    <div className="w-full">
      <Header />
      <main className='w-full'>
        <Landing />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  )
}

export default App
