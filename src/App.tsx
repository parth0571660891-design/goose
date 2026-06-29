import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import PhysicalCharacteristics from './components/PhysicalCharacteristics';
import Habitat from './components/Habitat';
import Diet from './components/Diet';
import Behaviour from './components/Behaviour';
import CareGuide from './components/CareGuide';
import Conservation from './components/Conservation';
import InterestingFacts from './components/InterestingFacts';
import Gallery from './components/Gallery';
import AudioGuide from './components/AudioGuide';
import EducationalImportance from './components/EducationalImportance';
import QuickFacts from './components/QuickFacts';
import FAQ from './components/FAQ';
import ConservationTips from './components/ConservationTips';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />
      <Hero />
      <About />
      <PhysicalCharacteristics />
      <Habitat />
      <Diet />
      <Behaviour />
      <CareGuide />
      <Conservation />
      <InterestingFacts />
      <Gallery />
      <AudioGuide />
      <EducationalImportance />
      <QuickFacts />
      <FAQ />
      <ConservationTips />
      <Footer />
    </div>
  );
}

export default App;
