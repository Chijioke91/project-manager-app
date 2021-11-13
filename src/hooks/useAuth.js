import { useMutation, useQueryClient } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOGIN, LOGOUT } from '../contexts/constants';
import { auth } from '../firebase/config';
import useAuthContext from './useAuthContext';

const signUp = async (formData) => {
  const { email, password, displayName } = formData;

  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);

    if (!res) {
      throw new Error('Signup Failed');
    }

    await res.user.updateProfile({ displayName });

    return res.user;
  } catch (e) {
    throw new Error(e.message);
  }
};

const logout = async () => {
  try {
    await auth.signOut();
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (formData) => {
  const { email, password } = formData;

  try {
    const res = await auth.signInWithEmailAndPassword(email, password);

    if (!res) {
      throw new Error('Unable to login');
    }

    return res.user;
  } catch (e) {
    throw new Error(e.message);
  }
};

export function useLogin() {
  const { dispatch } = useAuthContext();
  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || '/';

  return useMutation(login, {
    onSuccess: (data) => {
      dispatch({
        type: LOGIN,
        payload: data,
      });
      navigate(from, { replace: true });
    },
  });
}
export function useSignUp() {
  const { dispatch } = useAuthContext();

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || '/';

  return useMutation(signUp, {
    onSuccess: (data) => {
      dispatch({
        type: LOGIN,
        payload: data,
      });

      navigate(from, { replace: true });
    },
  });
}

export function useLogout() {
  const { dispatch } = useAuthContext();
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: () => {
      queryClient.removeQueries();
      dispatch({
        type: LOGOUT,
      });
    },
  });
}
