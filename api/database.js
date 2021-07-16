import firebase from "./firebase";

const db = firebase.database();

export const updateProfile = (
  { userId, fname, lname, userImg },
  onSuccess,
  onError
) => {
  try {
    db.ref("users/" + userId).set({
      fname: fname,
      lname: lname,
      //email: email,
      //createdAt: db.Timestamp.fromDate(new Date()),
      userImg: userImg,
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

export const uploadImageAsync = async (userId, uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref().child(userId);
  const snapshot = await ref.put(blob);

  // We're done with the blob, close and release it
  blob.close();

  return await snapshot.ref.getDownloadURL();
};
