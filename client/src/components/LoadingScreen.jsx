import React from 'react'

const LoadingScreen = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0F172A',
            color: 'white',
            fontSize: '1.5rem',
            fontWeight: 'bold'
        }}>
            Đang tải dữ liệu...
        </div>
    )
}

export default LoadingScreen
