import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, FormControl, Button, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ placeholder = "Tìm kiếm...", searchPath = "/search" }) => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        const trimmed = query.trim(); //bỏ khoảng trắng trong chuỗi
        if (trimmed) {
            navigate(`${searchPath}?searchInput=${encodeURIComponent(trimmed)}`);
        }
    };

    return (
        <div className="mb-3 d-flex justify-content-center"  >
            <Form onSubmit={handleSearch} style={{ width: '500px' }} >
                <InputGroup >
                    <FormControl
                        type="search"
                        placeholder={placeholder}
                        aria-label="Search"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button type="submit" className="" >
                        <FaSearch className="color-dark" />
                    </Button>
                </InputGroup>
            </Form>
        </div>

    );
};

export default SearchBar;
