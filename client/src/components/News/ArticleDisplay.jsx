import './tinymce.css'

const ArticleDisplay = ({ data }) => {
    const { title, content, createdAt, Account = {} } = data;
    return (
        <div className="container mt-4 text-white">
            <h2 className="mb-2">{title}</h2>

            <div className="d-flex flex-column mb-3" style={{ fontSize: '0.9rem' }}>
                <span className="mb-1">{new Date(createdAt).toLocaleString()}</span>
                <span style={{ fontStyle: 'italic' }}>Người đăng: {Account.username}</span>
            </div>

            <hr className="border-secondary" />

            <div className="tinymce-content" dangerouslySetInnerHTML={{ __html: content }} />

        </div>
    );
}
export default ArticleDisplay 