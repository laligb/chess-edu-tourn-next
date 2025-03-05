import { useState } from "react";
// Not WORKING
interface UsePaginationResult<T> {
  filteredItems: T[];
  handlePaginationChange: (_: unknown, value: number) => void;
  usersPerPage: number;
}

function usePagination<T>({
  filtered,
}: {
  filtered: T[];
}): UsePaginationResult<T> {
  const [page, setPage] = useState(1);
  const usersPerPage = 6;

  const filteredItems = filtered.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  const handlePaginationChange = (_: unknown, value: number) => {
    setPage(value);
  };

  return { filteredItems, handlePaginationChange, usersPerPage };
}

export default usePagination;
