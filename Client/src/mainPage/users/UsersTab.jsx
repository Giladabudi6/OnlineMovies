import { useState } from "react";
import AllUsers from "./AllUsers";
import AddUser from "./AddUser";
import { Box } from "@mui/material";

const UsersTab = () => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <Box sx={{ padding: 2 }}>
      {showAdd ? (
        <AddUser setSelectedTab={() => setShowAdd(false)} />
      ) : (
        <AllUsers setShowAdd={setShowAdd} />
      )}
    </Box>
  );
};

export default UsersTab;
