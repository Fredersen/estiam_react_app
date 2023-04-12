import {Button} from "@mui/material";
import {Link} from "react-router-dom";

export default function CreateButton({label, link}) {
    return (
        <Link to={link}>
            <Button variant="contained" color="primary">
                {label}
            </Button>
        </Link>
    )
}