import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import CustomContainer from './CustomContainer'
const MainLayout = () => {
    return (
        <div className='main-layout' style={{ backgroundColor: '#0F172A', minHeight: '100vh' }}>
            <Header />
            <CustomContainer>
                <Outlet />
            </CustomContainer>
            <Footer />
        </div>
    );
};


export default MainLayout