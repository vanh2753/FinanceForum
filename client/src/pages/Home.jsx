import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Home.scss";
import ForumPreviewSection from "../components/Forum/ForumPreviewSection";
import NewsCarousel from "../components/News/NewsCarousel";
import homeBanner from "../assets/images/home-banner.jpg";
import { Link } from "react-router-dom";
import ExpertViewSection from "../components/ExpertView/ExpertViewSection";
const Home = () => {
  return (
    <div className="home-container ">
      <div className="container">
        <div className="home-content">
          <div className="banner container">
            <img src={homeBanner} className="banner-img" />
            <div className="banner-text">
              <h2 className="display-4 fw-bold">Diễn đàn Tài Chính</h2>
              <p className="lead">Nơi kết nối nhà đầu tư, chia sẻ kiến thức và cập nhật xu hướng mới nhất.</p>
              <Link to="/forum" className="btn btn-warning btn-lg mt-3 text-white">
                Khám phá ngay
              </Link>
            </div>
          </div>

          <div className="forum">
            <ForumPreviewSection />
          </div>
          <div className="news">
            <NewsCarousel />
          </div>
          <hr className="mx-auto mt-5" style={{ color: "white", backgroundColor: "white", height: "3px", border: "none", width: "80%" }} />
          <div className="expert-view">
            <ExpertViewSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
