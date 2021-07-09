import firebase, { firebaseAuth } from "./firebase";

const auth = firebase.auth();

export const signIn = async ({ email, password }, onSuccess, onError) => {
  try {
    const { user } = await auth.signInWithEmailAndPassword(email, password);
    return onSuccess(user);
  } catch (error) {
    return onError(error);
  }
};

export const createAccount = async (
  { email, password },
  onSuccess,
  onError
) => {
  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);
    if (user) {
      await user.sendEmailVerification();

      return onSuccess(user);
    }
  } catch (error) {
    return onError(error);
  }
};

export const signOut = async (onSuccess, onError) => {
  try {
    await auth.signOut();
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
};

export const signInAnon = async (onSuccess, onError) => {
  try {
    await auth.signInAnonymously();
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
};

const reauthenticate = (currentPassword) => {
  const user = auth.currentUser;
  const cred = firebaseAuth.EmailAuthProvider.credential(
    user.email,
    currentPassword
  );
  return user.reauthenticateWithCredential(cred);
};

export const updateUserEmail = async (newEmail, curPwd, onSuccess, onError) => {
  try {
    const reauth = await reauthenticate(curPwd);
    if (reauth) {
      await auth.currentUser.updateEmail(newEmail);
      return onSuccess();
    }
  } catch (error) {
    return onError(error);
  }
};

export const updateUserPassword = async (
  newPwd,
  curPwd,
  onSuccess,
  onError
) => {
  try {
    const reauth = await reauthenticate(curPwd);
    if (reauth) {
      await auth.currentUser.updatePassword(newPwd);
      return onSuccess();
    }
  } catch (error) {
    return onError(error);
  }
};

export const getCurrentUserId = () =>
  auth.currentUser ? auth.currentUser.uid : null;

export const getCurrentUserName = () =>
  auth.currentUser ? auth.currentUser.displayName : null;

export const getCurrentUserEmail = () =>
  auth.currentUser ? auth.currentUser.email : null;

export const setOnAuthStateChanged = (onUserAuthenticated, onUserNotFound) =>
  auth.onAuthStateChanged((user) => {
    if (user) {
      return onUserAuthenticated(user);
    } else {
      return onUserNotFound(user);
    }
  });
