import * as React from 'react';
import {Col, Row, Container, Jumbotron, Card, CardTitle, CardText, CardImg, CardImgOverlay} from 'reactstrap';
import './Home.css';
import Navbar from '../components/NavHome';
import Trackie from '../assets/trackie.png';
import TrackieSol from '../assets/trackie_sol.png';
import Bubble_L from '../assets/bubble_left.png';
import Bubble_R from '../assets/bubble_right.png';

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
            <Navbar />
            <Jumbotron className="jumbotron"  fluid>
                <Container className="text-center mt-4" >
                <h1 className="display-2 font">Join Trackie</h1>
                <p className="lead">your companion, for your job search journey.</p>
                <img className="mt-4" style={{width: "450px"}} src={Trackie} alt="" />
                </Container>
                <br/>
            </Jumbotron>

            <div className="custom-shape-divider-top-1618878871">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>

            <Jumbotron className="jumbotron" style={{backgroundColor: "white"}} fluid>
                <Container className="text-center container2" >
                <h2 className="display-4 font">How does it work?</h2>
                <Row className="mt-5">
                    <Col md="2"></Col>
                    <Col md="3" lg="3">
                        <Card className="card-bg" >
                            <CardImg  src={Bubble_L} alt="Card image cap" />
                            <CardImgOverlay>
                            <CardTitle tag="h5"></CardTitle>
                            <CardText tag="h5" className="pt-4">All-in-One.</CardText>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                    <Col md="3" lg="3">
                    <Card className="card-bg " >
                            <CardImg  src={Bubble_R} alt="Card image cap" />
                            <CardImgOverlay>
                            <CardTitle tag="h4"></CardTitle>
                            <CardText tag="h5" className="pt-2">No more surveys or emails to alumini.</CardText>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                </Row>
                <Row>
                <Col></Col>
                    <Col md="3">
                        <Card className="card-bg">
                            <CardImg  src={Bubble_R} alt="Card image cap" />
                            <CardImgOverlay>
                            <CardTitle tag="h5"></CardTitle>
                            <CardText tag="h5">No more loose papers or worsksheets.</CardText>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                    <Col>
                    <img className="mt-4" style={{width: "400px"}} src={TrackieSol} alt="" />
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row>
                <p className="lead"> 
                    <text>Start tracking your job applications and get all the stats calculated for you!{"\n"}
                    Work closely with Trackie only, or choose to share your job hunt progress with your school!</text>
                </p>
                </Row>
                </Container>
            </Jumbotron>
            <br/>
            <br/>
            <div className="custom-shape-divider-top-1618879240 ">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>

            <Jumbotron className="jumbotron" style={{backgroundColor: "white"}} fluid>
                <Container className="text-center mt-4" >
                <h1 className="display-4 font">The features!</h1>
                <Row>
                    <Col md="6">
                    <p className="lead">Job hunters....</p>
                    </Col>
                    <Col md="6">
                    <p className="lead">School trackers....</p>
                    </Col>
                </Row>
                </Container>

            </Jumbotron>
            </>
         );
    }
}
 
export default Home;