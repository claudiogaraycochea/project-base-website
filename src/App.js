import SignUp from './pages/auth/signUp/SignUp';
import Login from './pages/auth/login/Login';
import './ui/Styles.css';
import './Firebase';

function App() {
  return (
    <div>
      <Login />
      <hr/>
      <SignUp />
    </div>
  );
}

export default App;
