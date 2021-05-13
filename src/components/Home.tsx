import * as React from 'react';
import {Col, Row, Container, Jumbotron, Card, CardTitle, CardText, CardImg, CardImgOverlay} from 'reactstrap';
import './Home.css';
import NavHome from '../components/NavHome';
import Trackie from '../assets/trackie.png';
import TrackieSol from '../assets/trackie_sol.png';
import Bubble_L from '../assets/bubble_left.png';
import Bubble_R from '../assets/bubble_right.png';
import Feature from '../assets/feature.png';
import { RiStarFill, RiStarLine } from 'react-icons/ri';
import Footer from './Footer';

export interface HomeProps {
    
}
 
export interface HomeState {
    
}
 
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {   };
    }
    render() { 
        return ( 
            <>
            <NavHome menu={true} />
            <Jumbotron id="home" className="jumbotron"  fluid>
                <Container className="text-center mt-5" >
                <h1  className="h1-title-home font">Join Trackie</h1>
                <h4  className="h4-title-home">the companion for your job search journey.</h4>
                <img className="mt-4 img-trackie-home"  src={Trackie} alt="" />
                </Container>
                <br/>
            </Jumbotron>

            <div  className="custom-shape-divider-top-1618878871">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>

            {/* ***** */}
            {/* ABOUT */}
            <Jumbotron id="about" className="jumbotron" style={{backgroundColor: "white"}} fluid>
                <Container className="text-center container2" >
                <h2 className="h2-title-home font">How does it work?</h2>
                <Row className="mt-5">
                    <Col xs="2" sm="2" md="2" lg="2"></Col>
                    <Col xs="4" sm="4" md="3" lg="3">
                        <Card className="card-bg" >
                            <CardImg  src={Bubble_L} alt="Card image cap" />
                            <CardImgOverlay className="card-overlay">
                                <CardText tag="h5" className="text-bubble1">All-in-One.</CardText>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                    <Col xs="4" sm="4" md="3" lg="3">
                    <Card className="card-bg " >
                            <CardImg  src={Bubble_R} alt="Card image cap" />
                            <CardImgOverlay className="card-overlay">
                            <CardText tag="h5" className="text-bubble2">No more surveys or emails to alumni.</CardText>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col xs="2"sm="2" md="2"></Col>
                    <Col xs="4" sm="4" md="3" lg="3">
                        <Card className="card-bg">
                            <CardImg  src={Bubble_R} alt="Card image cap" />
                            <CardImgOverlay className="card-overlay">
                                <CardText tag="h5" className="text-bubble3">No more loose papers or worsksheets.</CardText>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                    <Col xs="6" sm="6" md="6" lg="7">
                        <img className="mt-4 img-trackiesol-home"  src={TrackieSol} alt="" />
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row className="justify-content-center">
                    <Col>
                        <h4 className="h4-title-home "> 
                            Start tracking your job applications and get all the stats calculated for you!
                        </h4>      
                        <h4 className="h4-title-home "> 
                            Work closely with Trackie only, or choose to share your job hunt progress with your school!
                        </h4>     
                    </Col>   
                </Row>
                </Container>
            </Jumbotron>
            <br/>
            <br/>
            <div  className="custom-shape-divider-top-1618879240 ">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>

            {/* ************ */}
            {/* THE FEATURES */}
            <Jumbotron id="features" className="jumbotron" style={{backgroundColor: "white"}} fluid>
                <Container  className="text-center mt-4" >
                <h1  className="h2-title-home font">The features!</h1>
                <Row className="justify-content-center">
                    <RiStarFill  className="spinnerClock"  />
                    <RiStarFill  className="spinner" />
                    <RiStarFill  className="spinnerClock"/>
                    <RiStarFill  className="spinner"/>
                </Row>
                <Row>                    
                    <Col md="6">
                        <br/>
                        <h4 className="h4-title-features font" >Job hunters can ....</h4>
                        <ul className="list-features ">
                            <li ><RiStarLine className="green-star-features"/> create an account <RiStarLine className="green-star-features"/></li>
                            <li ><RiStarLine className="green-star-features"/> log a job application <RiStarLine className="green-star-features"/></li>
                            <li ><RiStarLine className="green-star-features"/> view data statistics about the job hunt <RiStarLine className="green-star-features"/></li>
                            <li ><RiStarLine className="green-star-features"/> download a list of logged job applications <RiStarLine className="green-star-features"/></li>
                            <li ><RiStarLine className="green-star-features"/> sort job applications by status, by date or by job title <RiStarLine className="green-star-features"/></li>
                        </ul>
                    </Col>
                    <Col md="6">
                        <br/>
                        <h4 className="h4-title-features font">Schools can....</h4>
                        <ul className="list-features" >
                            <li><RiStarLine className="purple-star-features"/> create an account <RiStarLine className="purple-star-features"/></li>
                            <li><RiStarLine className="purple-star-features"/> create several cohorts <RiStarLine className="purple-star-features"/></li>
                            <li><RiStarLine className="purple-star-features"/> connect with alumni <RiStarLine className="purple-star-features"/></li>
                            <li><RiStarLine className="purple-star-features"/> get a list of the hiring companies <RiStarLine className="purple-star-features"/></li>
                            <li><RiStarLine className="purple-star-features"/> pull and view relevant data from alumni <RiStarLine className="purple-star-features"/></li>
                        </ul>                    
                    </Col>
                </Row>
                <br/>
                <Row className="justify-content-center">
                    <Col>
                    <img className="mt-4 img-features-home"  src={Feature} alt="" />
                    </Col>
                </Row>
                </Container>
            </Jumbotron>
            <br/>
            <br/>
            </>
         );
    }
}
 
export default Home;