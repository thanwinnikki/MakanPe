import { useState } from "react";
import { data, makanLists } from "../../../data/dummyData";

const useListState = () => {
  const [listData, setListData] = useState(makanLists);

  const actions = (action) => {
    const { type, payload } = action;
    switch (type) {
      case "setListData":
        return setListData(payload);
      default:
        return listData;
    }
  };
  return { listData, actions };
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

export default useListState;
