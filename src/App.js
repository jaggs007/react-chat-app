import { AppLayout } from './layout/AppLayout';
import ChatMessage from './pages/ChatMessage';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppLayout>
        <ChatMessage />
      </AppLayout>
    </div>
  );
}

export default App;
