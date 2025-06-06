import expertBanner from '../../assets/images/expert-banner.png'
import { Link } from 'react-router-dom'
import './expertSection.scss'
import { FaDownload } from "react-icons/fa";
const ExpertViewSection = () => {
    return (
        <div className="expert-banner p-4 rounded-3  mb-4 d-flex justify-content-end">
            <div className='expert-banner-content'>
                <h3 className="mb-2 mt-4 text-light fw-bold " style={{ fontStyle: 'italic' }}>Không phải chỉ đọc – Là đầu tư cho tư duy</h3>
                <p className="mb-3 text-light d-flex justify-content-center">
                    --- Các bài phân tích biên soạn bởi chuyển gia ---
                </p>
                <Link to="/expert" className="btn custom-btn d-flex justify-content-center align-items-center ">
                    <FaDownload className='me-3' />
                    Tải về & sở hữu vĩnh viễn
                </Link>
            </div>
        </div>
    )
}

export default ExpertViewSection