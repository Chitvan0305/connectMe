import React, { useState } from "react";
import PrimaryButton from "./Shared/Button";
import { RiUserFollowFill } from "react-icons/ri";
import { useMutation } from "@apollo/client";
import { notification } from "antd";
import { ADD_FOLLOWERS } from "../Mutations";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { addUserFollowers } from "../redux/slices/userSlice";

interface UserTabProps {
  _id: string;
  username: string;
}

const UserTab: React.FC<UserTabProps> = (user) => {
  const { _id, username } = user;
  const [alreadyFollower, setFollowed] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  const [addUser] = useMutation(ADD_FOLLOWERS, {
    variables: {
      targetUserId: _id,
    },
    onCompleted: (data) => {
      notification.success({
        message: "Successfully added",
        placement: "topRight",
      });
      setFollowed(true);
      dispatch(
        addUserFollowers(
          data?.addFollower?.followings.map((user: any) => user?._id)
        )
      );
      return;
    },
    onError: (error) => {
      notification.error({
        message: error?.message,
        placement: "topRight",
      });
    },
  });

  const addFollower = async () => {
    try {
      await addUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-between p-2 rounded-lg shadow-md bg-white items-center">
      <p className="font-semibold">{username}</p>
      <PrimaryButton
        type="submit"
        title={<RiUserFollowFill color="#fff" size={16} />}
        className="bg-red-600 text-white p-3 rounded-lg text-center font-bold !border-0 active:bg-red-800"
        onClick={addFollower}
        disabled={alreadyFollower}
      />
    </div>
  );
};

export default UserTab;
