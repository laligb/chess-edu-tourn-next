import { useEffect, useState } from "react";
import ProfessorsUI from "./ProfessorsUI";
import { useDispatch, useSelector } from "react-redux";
// import useChat from "@/hooks/useChat";
import { Group, User } from "@/types";
import { getUsers } from "@/redux/slices/users/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { getGroups } from "@/redux/slices/groups/groupSlice";

const Professors = () => {
  const [isClient, setIsClient] = useState(false);
  // const { setMessage, message, openChat, handleOpenChat, handleCloseChat } =
  //   useChat();

  const dispatch = useDispatch<AppDispatch>();

  const users = useSelector((state: RootState) => state.user.users);
  const groups = useSelector(
    (state: RootState) => state.group.groups
  ) as Group[];

  const professors: User[] = users.filter((user) => user.role === "professor");

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsClient(true);
    if (users.length === 0) {
      dispatch(getUsers());
    }

    if (!groups || groups.length === 0) {
      dispatch(getGroups());
    }
  }, [dispatch, users.length, groups]);

  if (!isClient) return <p>Loading professors...</p>;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const filteredProfessors = professors.filter((professor) =>
    professor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStudentCount = (professorId: string) => {
    let studentCount = 0;

    const professor = professors.find((prof) => prof._id === professorId);
    if (!professor) {
      console.log(`Professor with ID ${professorId} not found`);
      return 0;
    }

    if (!professor.groups || professor.groups.length === 0) {
      console.log(`No groups found for professor with ID ${professorId}`);
      return 0;
    }

    professor.groups.forEach((groupId) => {
      const group = groups.find((group) => group._id === groupId);
      if (group) {
        if (group.students) {
          studentCount += group.students.length;
        } else {
          console.log(`No students in group: ${group.name}`);
        }
      } else {
        console.log(`Group with ID ${groupId} not found`);
      }
    });

    return studentCount;
  };

  return (
    <ProfessorsUI
      professors={filteredProfessors}
      searchQuery={searchQuery}
      handleClearSearch={handleClearSearch}
      handleSearchChange={handleSearchChange}
      // handleOpenChat={handleOpenChat}
      //openChat={openChat}
      //handleCloseChat={handleCloseChat}
      // setMessage={setMessage}
      //message={message}
      getStudentCount={getStudentCount}
      groups={groups}
    />
  );
};

export default Professors;
