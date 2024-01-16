import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';

import { saveIdUserToken } from '../features/appSetting/userSettingSlice';

export default function useAuth() {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        const jwtToken = await user.auth.currentUser.getIdToken();
        dispatch(saveIdUserToken(jwtToken));
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return { currentUser };
}
