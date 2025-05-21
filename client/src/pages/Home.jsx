import Header from "../components/Header/Header"
import Footer from "../components/Footer/Footer"
import "./Home.scss"
import ForumPreviewSection from "../components/Forum/ForumPreviewSection"
const Home = () => {
    return (
        <div className="home-container ">
            <div className="container">
                <div className="home-content">
                    <div className="forum"><ForumPreviewSection /></div>
                    <div className="news">Tin Tức</div>
                    <div className="expert-view">Góc nhìn chuyên gia</div>
                </div>
                <div><Footer /></div>
            </div>
        </div>
    )
}

export default Home
