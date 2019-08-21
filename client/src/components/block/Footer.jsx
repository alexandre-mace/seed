import React from "react";
import './Footer.scss'
import Typography from "@material-ui/core/Typography";

export default class Footer extends React.Component {
    render() {
        return (
            <>
              <div className="container-fluid mt-auto">
                <div className="row py-3">
                  <div className="col d-flex justify-center">
                    <div className="m-auto">
                      <Typography variant="h6" noWrap color={"primary"}>
                        Footer
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </>
        );
    }
}
