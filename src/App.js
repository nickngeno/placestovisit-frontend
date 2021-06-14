import "./App.css";
import { Container,Row, Col } from "react-bootstrap";
import Places from "./components/Places";
import Footer from "./components/Footer";
function App() {
  return (
    <div className="App">
      <Container className="content-section">
        <Row>
          <Col><h2>Places to visit</h2></Col>
        </Row>
        <Places />
        <Footer/>
      </Container>
    </div>
  );
}

export default App;
