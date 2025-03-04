export const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "red";
    case "professor":
      return "blue";
    case "student":
      return "green";
    default:
      return "gray";
  }
};
