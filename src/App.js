import React, { useContext, useEffect } from 'react';
import Routing from './Routing.jsx'; // Importing the Routing component
import { DataContext } from './components/DataProvider/DataProvider.jsx'; // Importing DataContext from DataProvider
import { auth } from './Utility/firebase.js'; // Importing auth from firebase.js
import { Type } from './Utility/action.type.js'; // Importing Type from action.type.js

function App() {
  // Using the useContext hook to access the DataContext
  // and destructuring the 'dispatch' function from the context
  const [, dispatch] = useContext(DataContext);

  // Using the useEffect hook to perform side effects in the component
  useEffect(() => {
    // Subscribing to authentication state changes with onAuthStateChanged
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Dispatching an action to set the user if authenticated
        dispatch({
          type: Type.SET_USER,
          user: authUser
        });
      } else {
        // Dispatching an action to set the user to null if not authenticated
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // Returning a cleanup function to unsubscribe from the auth listener
    return () => unsubscribe();
  }, [dispatch]); // Dependency array ensures useEffect runs only when dispatch changes

  // Rendering the Routing component, which handles navigation
  return <Routing />;
}

export default App; // Exporting the App component as the default export
