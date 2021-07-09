import { faTasks } from "@fortawesome/free-solid-svg-icons";
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
      //email: email,
      //createdAt: db.Timestamp.fromDate(new Date()),
      //userImg: null,
    });
    return onSuccess();
  } catch (error) {
    return onError(error);
  }
};

export const getUserProfile = (userId, setData) => {
  const data = db.ref("users/" + userId);
  data.on("value", (snapshot) => {
    setData(snapshot.val());
  });
  return () => data.off("value");
};
