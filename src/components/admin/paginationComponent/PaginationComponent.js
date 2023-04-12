import { Pagination, PaginationItem } from "@mui/material";
import "./PaginationComponent.css";

export default function PaginationComponent({ count, page, onChange }) {
    return (
        <div className="paginationWrapper">
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                renderItem={(item) => (
                    <PaginationItem
                        component="a"
                        {...item}
                    />
                )}
            />
        </div>
    );
}