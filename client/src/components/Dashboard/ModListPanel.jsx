import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getModList } from "../../api/user-api"; // API riêng để lấy list mod

const ModListPanel = () => {
    const [mods, setMods] = useState([]);

    useEffect(() => {
        const fetchMods = async () => {
            const res = await getModList();
            if (res.EC === 0) {
                setMods(res.DT);
            }
        };
        fetchMods();
    }, []);

    return (
        <div>
            <h5>Danh sách Moderator</h5>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Ngày tạo</th>
                    </tr>
                </thead>
                <tbody>
                    {mods.map((mod, idx) => (
                        <tr key={idx}>
                            <td>{mod.username}</td>
                            <td>{mod.email}</td>
                            <td>{new Date(mod.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ModListPanel;
