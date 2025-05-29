import './error.css';
import HomeHeader from "../../components/HomeHeader/homeHeader";
import Footer from "../../components/Footer/footer";
import {Link} from "react-router-dom";

function ErrorPage() {
    return (
        <>
            <HomeHeader />
            <div className='error'>
                <div className='error__container'>
                    <h1 className='error__title'>Error: 404</h1>
                    <p className='error__text'>Page not found</p>
                    <Link to='/' className='error__link'>Go to main page</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default ErrorPage;