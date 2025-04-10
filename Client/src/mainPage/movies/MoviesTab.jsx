/* eslint-disable react/prop-types */
import { useState } from "react";
import AllMovies from "./AllMovies";
import AddMovie from "./AddMovie";
import { Box } from "@mui/material";

const MoviesTab = ({ user }) => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <Box sx={{ padding: 2 }}>
      <Box>
        {showAdd ? (
          <AddMovie setSelectedTab={() => setShowAdd(false)} />
        ) : (
          <AllMovies user={user} setShowAdd={setShowAdd} />
        )}
      </Box>
    </Box>
  );
};

export default MoviesTab;
