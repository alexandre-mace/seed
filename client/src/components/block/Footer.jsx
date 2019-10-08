import React from "react";
import {Link} from "react-router-dom";

export default class Footer extends React.Component {
    render() {
        return (
            <div className="container mt-auto">
                <div className="row py-3 mt-5">
                    <div className="col">
                        <div className="d-flex justify-content-center">
                            <ul>
                                <li>
                                    <Link to="/info">Qui est Together</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
