import { Icon } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

export function Back() {
    const navigate = useNavigate()
    return <span onClick={() => navigate(-1)}><Icon>arrow_back_ios</Icon></span>
}