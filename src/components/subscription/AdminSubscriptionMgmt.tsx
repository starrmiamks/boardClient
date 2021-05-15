import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

type AcceptedProps = {};

const AdminSubscriptionMgmt: FC<AcceptedProps> = (props) => {
  return (
    <div>
      <Link to="/admin/subscriptionCreate">
        <Button
          variant="contained"
          color="secondary"
          style={{ height: "4rem", width: "10rem", margin: "2rem" }}
        >
          Add a Subscription
        </Button>
      </Link>
      <br />
      <Link to="/admin/subscriptionList">
        <Button
          variant="contained"
          color="primary"
          style={{ height: "4rem", width: "10rem" }}
        >
          View All Subscriptions
        </Button>
      </Link>
    </div>
  );
};
export default AdminSubscriptionMgmt;
