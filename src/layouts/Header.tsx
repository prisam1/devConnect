import { Link } from "react-router-dom";
import { logout as logoutAction } from "../redux/slices/authSlice"
import { UserSelector } from "../redux/slices/userSlice"
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";


export default function Header() {

  const dispatch = useDispatch();
  const user = useSelector(UserSelector);

  const HandleLogout = () => {
    dispatch(logoutAction());
  }

  return (
    <nav className="bg-gray-900 text-white px-4 py-3">
      <div className="max-w-full mx-auto flex justify-between">
        <Link to="/" className="font-bold text-xl">DevConnect</Link>
        <div className="flex flex-row space-x-4 ">
          <Link to="/profile">Hi,{user.username}</Link>
          <button
            onClick={HandleLogout}
            className="flex items-center gap-2 cursor-pointer">
            <LogOut className="w-6 h-6 text-sm" />
            <p className="font-medium">Sign out</p>
          </button>

        </div>
      </div>
    </nav>
  );
}