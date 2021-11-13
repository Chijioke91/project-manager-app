import { createContext, useEffect, useReducer } from 'react';
import { auth } from '../firebase/config';
import { IS_AUTHENTICATED, LOGIN, LOGOUT } from './constants';

const AuthContext = createContext();

const authReducer = (state, { type, payload }) => {
  switch (type) {
    case LOGIN:
      return { ...state, user: payload };

    case LOGOUT:
      return { ...state, user: null };

    case IS_AUTHENTICATED:
      return { ...state, user: payload, isAuthenticated: true };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const unSub = auth.onAuthStateChanged((user) => {
      dispatch({ type: IS_AUTHENTICATED, payload: user });
      unSub();
    });
  }, []);

  // console.log('Auth context state', state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
