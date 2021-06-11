import "./App.css";
import { Container } from "react-bootstrap";
import Places from "./components/Places";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Container className="content-section">
        <h2 style={{textAlign:"center"}}>Places to visit</h2>
        <Places />
        <Footer/>
      </Container>
    </div>
  );
}

export default App;
