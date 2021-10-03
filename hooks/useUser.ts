import 'firebase/auth';

import firebase from 'firebase/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import initFirebase from '../firebase/initFirebase';
import { mapUserData } from '../firebase/mapUserData';
import { getUserFromCookie, removeUserCookie, setUserCookie } from '../firebase/userCookies';
import { IUser } from '../lib/trivia';

initFirebase();

const useUser = () => {
  const [user, setUser] = useState<undefined | IUser>();
  const router = useRouter();

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
        router.push("/auth");
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    // Firebase updates the id token every hour, this
    // makes sure the react state and the cookie are
    // both kept up to date
    // This is trigered on sign-in, sign-out, and token refresh events. https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#onidtokenchanged
    const cancelAuthListener = firebase.auth().onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser(undefined);
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      router.push("/");
      return;
    }
    setUser(userFromCookie);

    return () => {
      // Kills the listener
      cancelAuthListener();
    };
  }, []);

  return { user, logout };
};

export default useUser;
