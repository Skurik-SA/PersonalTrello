import {Fragment, useState} from "react";
import {Avatar, Box, Divider, IconButton, Menu, MenuItem, Tooltip} from "@mui/material";

const AccountMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{
                        ml: 2,
                        cursor: 'pointer',
                }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                </IconButton>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'auto',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        bgcolor: '#4D4C7D',
                        color: 'white',
                        mt: 1,
                        top: '0',
                        '& .MuiMenuItem-root': {
                            width: '250px'
                        },
                        '& .MuiMenuItem-root:hover': {
                            bgcolor: '#827397',
                            color: '#E9D5CA',
                        },

                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    Profile
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    Logout
                </MenuItem>
            </Menu>
        </Fragment>
    );
}

export default AccountMenu;