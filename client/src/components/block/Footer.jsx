import React from "react";
import './Footer.scss'
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";

export default class Footer extends React.Component {
    render() {
        return (
            <>
              <div className="container-fluid mt-auto">
                <div className="row py-3">
                  <div className="col d-flex justify-center">
                    <div className="m-auto">
                        <ul>
                          <li className="mr-5">
                              <Link to="/info">Qui est Together</Link>
                          </li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </>
        );
    }
}
