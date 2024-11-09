import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Skeleton } from "antd";
import { FaUserCircle } from "react-icons/fa";
import { BsPostcardHeartFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";

interface LayoutProps {
  isLoading: Boolean;
  children: ReactNode;
  isHome?: Boolean;
  button?: ReactNode;
}

const AppLayout: React.FC<LayoutProps> = ({
  isLoading = false,
  children,
  isHome = true,
  button,
}) => {
  const { user } = useSelector((state: RootState) => state);

  const 

  return (
    <section>
      <header className="w-full flex justify-between px-5 py-3 bg-red-600 sticky top-0 left-0 box-border">
        <div className="font-bold text-white flex justify-center items-center ">
          Connect Me!
        </div>
        {isHome ? (
          <div className="flex gap-2 justify-center items-center">
            <FaUserCircle size={24} color="#fff" />{" "}
            <span className="text-white font-bold">{user.username} </span>
          </div>
        ) : (
          button
        )}
      </header>
      <main className="w-full flex flex-col flex-1 justify-center items-center">
        {isLoading ? <Skeleton active={isLoading as boolean} /> : children}
      </main>
      {isHome && (
        <footer className="w-full flex justify-between px-5 py-3 bg-red-600 fixed bottom-0 left-0 box-border">
          <div className="flex flex-1 justify-center items-center gap-1 text-white flex-col">
            <BsPostcardHeartFill size={16} color="#fff" />
            <p className="text-xs font-semibold">My Posts</p>
          </div>
          <div className="flex flex-1 justify-center items-center gap-1 text-white flex-col">
            <IoMdAddCircle size={16} color="#fff" />
            <p className="text-xs font-semibold">Add Posts</p>
          </div>
          <div className="flex flex-1 justify-center items-center gap-1 text-white flex-col">
            <FaUserFriends size={16} color="#fff" />
            <p className="text-xs font-semibold">Add Friends</p>
          </div>
        </footer>
      )}
    </section>
  );
};

export default AppLayout;
