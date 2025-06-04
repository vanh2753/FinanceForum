import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./Home.scss";
import ForumPreviewSection from "../components/Forum/ForumPreviewSection";
import NewsCarousel from "../components/News/NewsCarousel";
import homeBanner from "../assets/images/home-banner.jpg";
const Home = () => {
  return (
    <div className="home-container ">
      <div className="container">
        <div className="home-content">
          <div className="banner container">
            <img src={homeBanner} className="banner-img" />
          </div>
          <div className="forum">
            <ForumPreviewSection />
          </div>
          <div className="news">
            <NewsCarousel />
          </div>
          <div className="expert-view">Góc nhìn chuyên gia</div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
