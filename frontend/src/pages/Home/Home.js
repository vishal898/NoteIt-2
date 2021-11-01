import Navbar from '../../Components/Navbar/Navbar';
import Demo from '../../Components/Demo';
const Home = () => {
  return (
    <>
    <Navbar/>
    <section className="hero-section">
      <p>Welcome to </p>
      <h1>NoteIt</h1>
      <Demo></Demo>
    </section>
  </>
  )
}
export default Home;