import { useContext } from "react";

import AuthContext from "../Components/Context/AuthContext/AuthProvider";

const useAuth = () => {
  return useContext(AuthContext);
};
//this is essentially a custom hook to use the AuthContext initialized in every single
//children component by combining useContext with a global context
export default useAuth;
