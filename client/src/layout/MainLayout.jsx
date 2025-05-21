import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
const MainLayout = () => {
    return (
        <div className='main-layout ' style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Header />
            <div className='content '>
                <Outlet />
            </div>
        </div>
    );
};


export default MainLayout