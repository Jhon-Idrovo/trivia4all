import firebase from 'firebase';

import { IUser } from '../lib/trivia';

export const mapUserData = (user: firebase.User) => {
  const { uid, email, refreshToken, photoURL, displayName } = user;
  return {
    id: uid,
    email,
    token: refreshToken,
    name: displayName,
    profilePic: photoURL,
  } as IUser;
};
