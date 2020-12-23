import './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Timer from '../Timer/Timer.jsx';

function App() {
  return (
    <Container fluid>
      <Timer />
    </Container>
  );
}

export default App;
