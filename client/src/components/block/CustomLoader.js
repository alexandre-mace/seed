import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const CustomLoader = ({size = 40}) => {
  return (
    <div className="d-flex mt-3">
      <div className="m-auto">
        <CircularProgress size={size}/>
      </div>
    </div>
  )
}
