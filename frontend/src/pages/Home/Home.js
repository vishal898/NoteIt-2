import Navbar from '../../Components/Navbar/Navbar';
import Notecard from '../../Components/Notecard/Notecard';

const Home = () => {
  return (
    <>
    <Navbar/>
    <section className="hero-section">
      <p>Welcome to </p>
      <h1>NoteIt</h1>
      <Notecard/>
    </section>
  </>
  )
}
export default Home;