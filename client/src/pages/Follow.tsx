import { useCallback, useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../Queries";
import SearchBar from "../components/Shared/SearchBar";
import { GetProps, Input } from "antd";
import AppLayout from "../Layout/AppLayout";
import UserTab from "../components/UserTab";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface UserInfoProps {
  _id: string;
  username: string;
}

type SearchProps = GetProps<typeof Input.Search>;

const Follow = () => {
  const [users, setUsers] = useState<UserInfoProps[]>([]);
  const { user } = useSelector((state: RootState) => state);

  console.log({user})

  const filterFollwedUser = useCallback(
    (users: UserInfoProps[]) => {
      return users?.filter(
        (userInfo) =>
          !user.followings.includes(userInfo?._id)
      );
    },
    [user]
  );

  const [getAllUsers, { loading }] = useLazyQuery(GET_ALL_USERS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      console.log({ data });
      if (data?.getAllUsers) {
        const filteredUser = filterFollwedUser(data.getAllUsers);
        setUsers(filteredUser);
      }
    },
    onError: (error) => {
      console.error("Error fetching users:", error);
    },
  });

  const searchUser: SearchProps["onSearch"] = async (value: string) => {
    try {
      await getAllUsers({
        variables: { name: value },
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user.followings && user.followings.length > 0) {
      getAllUsers();
    }
  }, [user.followings, getAllUsers]);

  return (
    <AppLayout isLoading={loading} isHome={true}>
      <section className="flex flex-col gap-2 w-full px-4">
        <div className="w-full mx-auto my-3">
          <SearchBar
            placeholder="Search for User"
            onSearch={searchUser}
            styles="!border-0 outline-0"
          />
        </div>
        <div className="flex flex-col w-full gap-1 overflow-y-auto flex-1">
          {users &&
            Array.isArray(users) &&
            users.map((user: UserInfoProps) => (
              <UserTab
                username={user?.username}
                _id={user?._id}
                key={user._id}
              />
            ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default Follow;
