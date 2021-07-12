import { useState } from "react";

const useProfileState = () => {
  const [userData, setUserData] = useState({
    email: "",
    fname: "",
    lname: "",
    uninitialized: true,
  });

  const actions = (action) => {
    const { type, payload } = action;
    switch (type) {
      case "setUserData":
        return setUserData(payload);

      default:
        return userData;
    }
  };
  return { userData, actions };
};

// const updateUserData = () => {
//   const curUserId = Auth.getCurrentUserId();
//   const email = data.email;
//   const user = db.getUserProfile(curUserId);
//   actions({
//     type: "setUserData",
//     payload: {
//       ...userData,
//       email: email,
//       fname: user.fname,
//       lname: user.lname,
//       uninitialized: false,
//     },
//   });
// };

export default useProfileState;
