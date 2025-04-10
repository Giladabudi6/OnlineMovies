/* eslint-disable react/prop-types */
import { useState } from "react";
import AllMembers from "./AllMembers";
import AddMember from "./AddMember";
import { Box } from "@mui/material";

const SubscriptionsTab = ({ user }) => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <Box sx={{ padding: 2 }}>
      {showAdd ? (
        <AddMember setShowAdd={setShowAdd} />
      ) : (
        <AllMembers user={user} setShowAdd={setShowAdd} />
      )}
    </Box>
  );
};

export default SubscriptionsTab;
