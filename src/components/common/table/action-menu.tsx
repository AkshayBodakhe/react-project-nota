import { Box, Menu, MenuItem, Typography, IconButton } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import theme from "../../../theme";

export interface menuItem {
  itemName: string;
  fun?: (data: any) => void;
}
interface ActionMenuProps {
  menuItems: menuItem[];
  rowData?: any;
}
const ActionMenu = ({ menuItems, rowData }: ActionMenuProps) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-haspopup="true"
          size="small"
          onClick={handleClick}
        >
          <MoreVertIcon
            sx={{
              color: "#101828",
            }}
          />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          PaperProps={{
            style: {
              boxShadow:
                "0px 2px 4px -2px rgba(16, 24, 40, 0.06), 0px 4px 8px -2px rgba(16, 24, 40, 0.32)",
              border: "1px solid #DAEAFF ",
              borderRadius: "8px",
              background: "#fff",
            },
          }}
        >
          {menuItems?.map((item, index) => (
            <MenuItem
              key={index}
              divider
              sx={{
                padding: "10px 16px",
              }}
              onClick={(_e:any) => {
                handleClose();
                item.fun && item.fun(rowData);
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                
                  fontWeight={500}
                >
                  {item.itemName}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Box>
  );
};

export default ActionMenu;
