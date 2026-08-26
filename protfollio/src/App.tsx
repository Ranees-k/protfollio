import About from './aboutme';
import './App.css';
import Header from './Header';
import Landing from './LandingPage';
import Projects from './projects';
import Contact from './contact';

function App() {
  return (
    <div className="w-full overflow-x-hidden bg-canvas text-ink antialiased">
      <Header />
      <main className="w-full">
        <Landing />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
