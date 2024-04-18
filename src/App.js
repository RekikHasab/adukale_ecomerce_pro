import React, { useContext, useEffect } from 'react'; // Added React import
//import Routing from './Routing.jsx';
import Routing from './Routing.jsx'
import { DataContext } from './components/DataProvider/DataProvider.jsx';
import { auth } from './Utility/firebase.js';
import { Type } from './Utility/action.type.js';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => unsubscribe(); // Cleanup function for useEffect
  }, [dispatch]); // Added dispatch as dependency for useEffect

  return <Routing />;
}

export default App;
