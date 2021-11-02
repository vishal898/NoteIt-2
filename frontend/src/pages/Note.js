import Navbar from '../../Components/Navbar/Navbar';
import Notecard from '../../Components/Notecard/Notecard';
import Preview from '../../Components/Preview/Preview';

import Demo from '../../Components/Demo';
const Home = () => {
  return (
    <>
    <Navbar/>
    <section className="hero-section">
      <p>Welcome to </p>
      <h1>NoteIt</h1>
      
      <Demo></Demo>
      <Preview/>
    </section>
  </>
  )
}
export default Home;