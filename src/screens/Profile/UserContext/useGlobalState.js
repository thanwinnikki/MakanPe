import { useState } from "react";

import * as db from "../../../../api/database";
import * as Auth from "../../../../api/auth";

const useGlobalState = () => {
  const [userData, setUserData] = useState({
    email: "",
    fname: "",
    lname: "",
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

export default useGlobalState;
