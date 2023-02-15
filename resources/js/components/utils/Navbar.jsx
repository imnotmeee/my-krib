import SearchIcon from "@mui/icons-material/Search";
import Close from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React, { useState } from "react";
import AuthDialog from "./form/AuthDialog";

import { useDispatch } from "react-redux";
import { setKeywordUri, clearKeywordUri } from "../../store/reducers/uri_slice";
import useAuth from "../../hooks/useAuth";
import { red } from "@mui/material/colors";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
    border: "1px solid #e3e3e3",
    flexGrow: 1,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "50ch",
        },
    },
}));

export default function Navbar() {
    const { user, destroy } = useAuth();
    const [searchVal, setSearchVal] = useState("");
    const dispatch = useDispatch();

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setKeywordUri(`keywords=${searchVal}&`));
    };

    const handleClear = () => {
        dispatch(clearKeywordUri());
        setSearchVal("");
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                sx={{
                    background: "transparent",
                    color: "#333333",
                    boxShadow: 0,
                }}
            >
                <Toolbar>
                    <Grid flexDirection="row">
                        <img src="/krib.png" width={80} />
                    </Grid>
                    <form onSubmit={handleSearch}>
                        <Search>
                            <IconButton onClick={handleSearch} type="submit">
                                <SearchIcon />
                            </IconButton>
                            <StyledInputBase
                                placeholder="City, Address, MLS#, or Building Name"
                                inputProps={{ "aria-label": "search" }}
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                            />
                            {searchVal && (
                                <IconButton
                                    onClick={handleClear}
                                    sx={{
                                        color: red[300],
                                        ":hover": { color: red[400] },
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            )}
                        </Search>
                    </form>
                    {user ? (
                        <button onClick={() => destroy()}>
                            Logout: {user.name}
                        </button>
                    ) : (
                        <AuthDialog />
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
