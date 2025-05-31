import './home.css';
import HomeHeader from '../../components/HomeHeader/homeHeader';
import Footer from "../../components/Footer/footer";
import {Link} from "react-router-dom";
import Swiper from "../../components/Swiper/swiper";

function Home() {

    let swiperData = [
        {
            image: '/png/hot1.png',
            title: 'Your Voice Matters',
            description: 'Learn how every vote influences the future. Make your voice count today.',
            link: '/blog/1'
        },
        {
            image: '/png/hot2.png',
            title: 'Secure Digital Voting',
            description: 'Explore how blockchain ensures fair and tamper-proof elections.',
            link: '/blog/2'
        },
        {
            image: '/png/hot3.png',
            title: 'Election 2025: What’s New?',
            description: 'Discover the new features and improvements in the bVoting platform.',
            link: '/blog/3'
        },
        {
            image: '/png/hot4.png',
            title: 'Meet the Candidates',
            description: 'A closer look at the people you can vote for. Get informed before you vote.',
            link: '/blog/4'
        },
        {
            image: '/png/hot5.png',
            title: 'Voting Transparency',
            description: 'How bVoting makes election results publicly verifiable and trusted.',
            link: '/blog/5'
        },
        {
            image: '/png/hot6.png',
            title: 'Behind the Ballot',
            description: 'Understand the technology and systems that power digital elections.',
            link: '/blog/6'
        },
        {
            image: '/png/hot7.png',
            title: 'Get Ready to Vote!',
            description: 'Step-by-step guide to registering and casting your vote in the upcoming election.',
            link: '/blog/7'
        }
    ];

    return (
        <div className="home">
            <HomeHeader />
            <main className="home__content">

                <section className='home__section-white section'>
                    <div className='section__item-list section__item--margin-r'>
                        <h2 className='title'>Let your voice be part of history!</h2>
                        <p className='subtitle'>bVoting is blockchain-based electronic voting, your vote is secure, which means your vote is definitely yours.</p>
                        <Link to='/learn-more/blockchain' className='link--underline right-arrow'>Learn more</Link>
                    </div>
                    <div className='section__item-picture'>
                        <div className='section__item-picture-box'>
                            <img src='/png/voting_demo.png' alt='Demonstration of election power' />
                        </div>
                    </div>
                </section>

                <section className='home__section-gray section'>
                    <div className='section__item-list'>
                        <div className='title-box'>
                            <p className='top-title'>For those who want to know the news</p>
                            <h2 className='title'>Hot topics</h2>
                            <p className='bottom-title'>Stay up to date with all the news. Read our blog and vote with everyone else.</p>
                            <button className='button'>Learn more</button>
                        </div>
                        <Swiper items={swiperData}/>
                    </div>
                </section>

                <section className='home__section-white section--column'>
                    <div className='title-box'>
                        <p className='top-title'>For those who want to create an election</p>
                        <h2 className='title'>Simple election creation</h2>
                        <p className='bottom-title'>Freely create elections in a few clicks.</p>
                        <button className='button'>Learn more</button>
                    </div>
                    <div className='section'>
                        <div className='section__item-picture'>
                            <div className='section__item-picture-box'>
                                <img src='/png/upload.png' alt='Upload button' />
                            </div>
                        </div>
                        <div className='section__item-list section__item--margin-l'>
                            <hr className='section__item-list__hr' />
                            <p className='section__item-list__topic'>Anonymous or non-anonymous</p>
                            <hr className='section__item-list__hr' />
                            <p className='section__item-list__topic'>Private or public</p>
                            <hr className='section__item-list__hr' />
                            <p className='section__item-list__topic'>Digital or mixed</p>
                            <hr className='section__item-list__hr' />
                        </div>
                    </div>
                </section>

                <section className='home__section-gray'>
                    <div className='title-box'>
                        <p className='top-title'>For those who want to vote</p>
                        <h2 className='title'>Reliable voting</h2>
                        <p className='bottom-title'>Vote easily and rest assured that your vote is secure.</p>
                        <button className='button'>Learn more</button>
                    </div>
                    <div className='section'>
                        <div className='section__item-picture'>
                            <div className='section__item-picture-box'>
                                <img src='/png/relibale_voting.png' alt='Blockchain chain' />
                            </div>
                        </div>
                    <div className='section__item-list section__item--margin-l'>
                            <hr className='section__item-list__hr' />
                            <p className='section__item-list__topic'>Blockchain</p>
                            <hr className='section__item-list__hr' />
                            <p className='section__item-list__topic'>Proof of Work</p>
                            <hr className='section__item-list__hr' />
                            <p className='section__item-list__topic'>Cryptography</p>
                            <hr className='section__item-list__hr' />
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}

export default Home;
