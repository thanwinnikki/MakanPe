import firebase from "./firebase";

const db = firebase.database();

export const updateProfile = (
  { userId, fname, lname, email },
  onSuccess,
  onError
) => {
  try {
    db.ref("users/" + userId).set({
      fname: fname,
      lname: lname,
      email: email,
      //createdAt: db.Timestamp.fromDate(new Date()),
      //userImg: null,
    });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
};

export const getUserProfile = (userId, onProfileChange) => {
  const profile = db.ref("users/" + userId);
  profile.on("value", (snapshot) => {
    onProfileChange(snapshot.val());
  });
  return () => profile.off("value");
};
