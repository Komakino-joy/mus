import './App.css';
import { Route, Switch } from 'react-router-dom';

import Homepage from './pages/homepage/homepage.component';

function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Homepage} />
      </Switch>
    </>
  );
};

export default App;
