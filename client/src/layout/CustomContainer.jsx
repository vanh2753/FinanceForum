const CustomContainer = ({ children }) => {
    return (
        <div className="w-100 d-flex justify-content-center px-2">
            <div style={{ width: '100%', maxWidth: '1200px' }}>
                {/* React sẽ tự truyền component con vào {children} (tương tự Outlet trong Route) */}
                {children}
            </div>
        </div>
    );
};

export default CustomContainer;