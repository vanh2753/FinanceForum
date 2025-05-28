
const ArticleDisplay = ({ data }) => {
    const { title, content, createdAt, Account = {} } = data;
    return (
        <div className="container mt-4 text-white">
            <h2 className="mb-2">{title}</h2>

            <div className="d-flex justify-content-between  mb-3" style={{ fontSize: '0.9rem' }}>
                <span>{new Date(createdAt).toLocaleString()}</span>
                <span style={{ fontStyle: 'italic' }}>Tác giả: {Account.username}</span>
            </div>

            <hr className="border-secondary" />

            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    );
}
export default ArticleDisplay