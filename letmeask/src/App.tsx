import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from "./styles/GlobalStyles";
import { useTheme } from './styles/hook/theme';

import { Home } from "./pages/Home";
import { NewRoom } from './pages/NewRoom';
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';


function App() {
  const { theme } = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/rooms/new" component={NewRoom} />
            <Route path="/rooms/:id" component={Room} />
            <Route path="/admin/rooms/:id" component={AdminRoom} />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
