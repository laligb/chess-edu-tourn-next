// "use client";

// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/redux/store";
// import { useDispatch } from "react-redux";
// import { fetchProfessors } from "@/redux/slices/professors/professorSlice";
// import ProfessorsUI from "./ProfessorsUI";

// const Professors = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const professors = useSelector((state: RootState) => state.professors.list);
//   const loading = useSelector((state: RootState) => state.professors.loading);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//     dispatch(fetchProfessors()); // Fetch professors on mount
//   }, [dispatch]);

//   if (!isClient || loading) return <p>Loading professors...</p>;

//   return <ProfessorsUI professors={professors} />;
// };

// export default Professors;
"use client";

import { useEffect, useState } from "react";
import ProfessorsUI from "./ProfessorsUI";

const mockProfessors = [
  {
    id: "1",
    name: "Dr. Alice Johnson",
    email: "alice.johnson@example.com",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&q=80",
  },
  {
    id: "2",
    name: "Prof. Bob Smith",
    email: "bob.smith@example.com",
    avatar:
      "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=500&q=80",
  },
  {
    id: "3",
    name: "Dr. Emily Carter",
    email: "emily.carter@example.com",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  {
    id: "4",
    name: "Prof. Michael Brown",
    email: "michael.brown@example.com",
    avatar: "https://randomuser.me/api/portraits/men/40.jpg",
  },
  {
    id: "5",
    name: "Dr. Sarah Lee",
    email: "sarah.lee@example.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80",
  },
  {
    id: "6",
    name: "Prof. James Miller",
    email: "james.miller@example.com",
    avatar: "https://randomuser.me/api/portraits/men/33.jpg",
  },
  {
    id: "7",
    name: "Dr. Olivia Martinez",
    email: "olivia.martinez@example.com",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&q=80",
  },
  {
    id: "8",
    name: "Prof. David Wilson",
    email: "david.wilson@example.com",
    avatar: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    id: "9",
    name: "Dr. Sophia Taylor",
    email: "sophia.taylor@example.com",
    avatar:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=500&q=80",
  },
  {
    id: "10",
    name: "Prof. William Anderson",
    email: "william.anderson@example.com",
    avatar: "https://randomuser.me/api/portraits/men/88.jpg",
  },
  {
    id: "11",
    name: "Dr. Emma White",
    email: "emma.white@example.com",
    avatar:
      "https://images.unsplash.com/photo-1600180758890-6bd89f67b52c?w=500&q=80",
  },
  {
    id: "12",
    name: "Prof. Daniel Harris",
    email: "daniel.harris@example.com",
    avatar: "https://randomuser.me/api/portraits/men/70.jpg",
  },
];

const Professors = () => {
  const [isClient, setIsClient] = useState(false);
  const [professors] = useState(mockProfessors); // Using mock data

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <p>Loading professors...</p>;

  return <ProfessorsUI professors={professors} />;
};

export default Professors;
