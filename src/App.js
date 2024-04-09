import { BrowserRouter as Router } from 'react-router-dom';
import Admin from './admin/admin'
function App() {
  return (
    <div className="App">
      <Router>    
        <Admin></Admin>
      </Router>
    </div>
  );
}

export default App;
