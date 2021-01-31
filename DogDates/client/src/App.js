import { BrowserRouter as Router } from "react-router-dom";
import ApplicationViews from "./components/ApplicationViews";
import { UserProfileProvider } from "./providers/UserProfileProvider";
import AppHeader from "./components/Header"
import "./App.css";

function App() {
  return (
    <div className="App">
      <UserProfileProvider>
        <Router>
          <AppHeader />
          <ApplicationViews />
        </Router>
      </UserProfileProvider>
    </div>
  );
}

export default App;
