import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import EditPostForm from "../Post/EditPostForm";
import DeleteModal from "./DeleteModal";
import EditCommentForm from "../Comment/EditCommentForm";
const EditDelButton = (props) => {
    const { data, type } = props
    const [showEditModal, setShowEditModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)

    const renderEditComponent = () => {
        switch (type) {
            case 'post':
                return <EditPostForm show={showEditModal} handleClose={() => setShowEditModal(false)} postData={data} />;
            case 'comment':
                return <EditCommentForm show={showEditModal} handleClose={() => setShowEditModal(false)} commentData={data} />;
            default:
                return null;
        }
    }

    return (
        <div className="d-flex gap-2">
            <div >
                <MdEdit onClick={() => setShowEditModal(true)} />
                {showEditModal && renderEditComponent()}

            </div>
            <div>
                <MdDelete onClick={() => setShowDeleteModal(true)} />
                <DeleteModal show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} data={data} type={type} />
            </div>
        </div>
    )
}

export default EditDelButton