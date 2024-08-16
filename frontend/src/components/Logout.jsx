import logout_icon from "@/assets/icons/logout_icon.svg";
import { resetTodoSlice } from "@/redux/todoSlice";
import { resetUserSlice } from "@/redux/userSlice";
import { logoutUser } from "@/services/api/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "./Loader";
/**
 * `Logout` component for logging out the user:
 * - Handles the user logout process by calling the `logoutUser` API.
 * - Resets the user and todo slices in the Redux store upon successful logout.
 * - Displays a logout icon that triggers the logout process when clicked.
 * - Conditionally shows a loading spinner (`Loader` component) while the logout request is in progress.
 * 
 */
function Logout() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      dispatch(resetUserSlice());
      dispatch(resetTodoSlice());
    } catch (error) {
      console.log("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <img
          src={logout_icon}
          className="absolute right-4 top-6 w-8 cursor-pointer"
          onClick={handleLogout}
        />
      )}
    </div>
  );
}

export default Logout;
