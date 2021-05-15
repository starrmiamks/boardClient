import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

type AcceptedProps = {};

const AdminProfileMgmt: FC<AcceptedProps> = (props) => {
  return (
    <div>
      <Link to="/admin/profileCreate">
        <Button
          variant="contained"
          color="secondary"
          style={{ height: "4rem", width: "10rem", margin: "2rem" }}
        >
          Add a Board
        </Button>
      </Link>
      <br />
      <Link to="/admin/profileList">
        <Button
          variant="contained"
          color="primary"
          style={{ height: "4rem", width: "10rem" }}
        >
          View All Boards
        </Button>
      </Link>
    </div>
  );
};
export default AdminProfileMgmt;