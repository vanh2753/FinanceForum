import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";

const SearchBar = ({ placeholder = "Tìm kiếm...", searchPath = "/search" }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = query.trim(); //bỏ khoảng trắng trong chuỗi
        if (trimmed) {
            navigate(`${searchPath}?title=${encodeURIComponent(trimmed)}`);
        }
    };

    return (
        <Form onSubmit={handleSearch} className="mb-3" style={{ maxWidth: "500px" }}>
            <InputGroup>
                <FormControl
                    type="search"
                    placeholder={placeholder}
                    aria-label="Search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit" variant="outline-light">
                    🔍
                </Button>
            </InputGroup>
        </Form>
    );
};

export default SearchBar;
