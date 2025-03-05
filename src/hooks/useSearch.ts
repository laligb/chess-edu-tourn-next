import { useState } from "react";

function useSearch() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };
  return {
    searchQuery,
    setSearchQuery,
    handleSearchChange,
    handleClearSearch,
  };
}

export default useSearch;
