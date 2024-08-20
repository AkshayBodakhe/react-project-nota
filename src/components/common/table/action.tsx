import { ButtonBase, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import React from "react"
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { buttonBaseStyle } from '../../core/view-provider-details/provider-profile-details';
import { ActionType } from '../enums-and-interfaces/enums';
import { commonWidget } from "../../../styles/common";

type Props = {
    type: ActionType;
    handleActionClick: any;
    isDisabled?: boolean;
    editData: any;
    options?: string[];
}

const buttonBaseStyle = {
    editBtn: {
        border: '1px solid #36588C !important',
        borderRadius: '5px !important',
        width: '70px',
        height: '30px',
        background: '#CCECFF80'
    }
};

const Action = (props: Props) => {

    const {
        isDisabled,
        type,
        handleActionClick,
        editData,
        options
    } = props;

    const classes = commonWidget();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleOption = (option: any) => {
        setAnchorEl(null);
        handleActionClick(option, editData);
    }

    return (
        <React.Fragment key={'action'}>
            {(() => {
                switch (type) {
                    case ActionType.ACTION_WITH_EDIT_BTN:
                        return (
                            <ButtonBase sx={buttonBaseStyle.editBtn} disabled={isDisabled} onClick={() => handleActionClick(editData)}>
                                <span className={classes.addButtonTypo}>
                                    <ModeEditOutlineOutlinedIcon sx={{ width: '0.8em' }} />
                                </span>
                                <Typography variant="h5" className={classes.addUserRoleBtnTypo}>
                                    {'Edit'}
                                </Typography>
                            </ButtonBase>
                        )
                    case ActionType.ACTION_WITH_MOREVERTICON:
                        return (
                            <>
                                <IconButton
                                    aria-label="more"
                                    id="long-button"
                                    aria-controls={
                                        open ? "long-menu" : undefined
                                    }
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                    sx={{
                                        padding: '4px !important'
                                    }}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "long-button",
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleCloseMenu}
                                    slotProps={{
                                        paper: {
                                            style: {
                                                width: "10ch",
                                                border: "1px solid #e8e8e8",
                                                color: "#1A1A1A99",
                                            },

                                        }
                                    }}
                                >
                                    {options?.length !== 0 && options?.map((option) => (
                                        <MenuItem
                                            key={option}
                                            selected={option === "Pyxis"}
                                            onClick={() => handleOption(option)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        )
                    default:
                        return <></>
                }
            })()}
        </React.Fragment>
    )
}

export default Action
