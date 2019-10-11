import React from 'react';
import {Link} from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function MobileMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogoutFromMobileMenu = () => {
        setAnchorEl(null);
        props.handleLogout()
    }

    return (
        <div>
            <IconButton
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
            <MoreVertIcon />
            </IconButton>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/initier-un-projet">
                    Ajouter un projet
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/help">
                    Nous supporter
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/mes-demandes">
                    Mes demandes
                    </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link to="/info">
                    Qui est Together
                    </Link>
                </MenuItem>
                {props.user ? (
                    <MenuItem onClick={() => handleLogoutFromMobileMenu()}>
                        Se déconnecter
                    </MenuItem>
                ) : (
                    <MenuItem onClick={handleClose}>
                        <Link to="/tableau-de-bord">
                            Se connecter
                        </Link>
                    </MenuItem>
                )}
            </Menu>
        </div>
    );
}
