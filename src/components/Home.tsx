import * as React from 'react';
import {Col, Row, Container, Jumbotron, Card, CardTitle, CardText, CardImg, CardImgOverlay, Spinner} from 'reactstrap';
import './Home.css';
import NavHome from '../components/NavHome';
import Trackie from '../assets/trackie.png';
import TrackieSol from '../assets/trackie_sol.png';
import Bubble_L from '../assets/bubble_left.png';
import Bubble_R from '../assets/bubble_right.png';
import Feature from '../assets/feature.png';
import { RiStarFill, RiStarLine } from 'react-icons/ri';

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
                <Container className="text-center mt-4" >
                <h1  className="display-2 font">Join Trackie</h1>
                <h4 >the companion for your job search journey.</h4>
                <img className="mt-4" style={{width: "450px"}} src={Trackie} alt="" />
                </Container>
                <br/>
            </Jumbotron>

            <div id="about" className="custom-shape-divider-top-1618878871">
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
                <h4 > 
                    <text>Start tracking your job applications and get all the stats calculated for you!{"\n"}
                    Work closely with Trackie only, or choose to share your job hunt progress with your school!</text>
                </h4>                
                </Row>
                </Container>
            </Jumbotron>
            <br/>
            <br/>
            <br/>
            <br/>
            <div id="features" className="custom-shape-divider-top-1618879240 ">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className="shape-fill"></path>
                </svg>
            </div>

            <Jumbotron  className="jumbotron" style={{backgroundColor: "white"}} fluid>
                <Container className="text-center mt-4" >
                <h1  className="display-4 font">The features!</h1>
                <Row className="justify-content-center">
                    <RiStarFill  className="spinnerClock" style={{color: "#d4c4fb"}} size={40}/>
                    <RiStarFill  className="spinner" style={{color: "#dafbc6"}} size={40}/>
                    <RiStarFill  className="spinnerClock" style={{color: "#d4c4fb"}} size={40}/>
                    <RiStarFill  className="spinner" style={{color: "#dafbc6"}} size={40}/>
                </Row>
                <Row>
                    <Col md="6">
                    <h4 className="font" style={{textTransform: "uppercase", marginBottom: "40px"}}>Job hunters can ....</h4>
                    <ul className="list-features " style={{textAlign: "left"}}>
                        <li ><RiStarLine style={{color: "#aac499"}}/> create their account <RiStarLine style={{color: "#aac499"}}/></li>
                        <li ><RiStarLine style={{color: "#aac499"}}/> log their job applications <RiStarLine style={{color: "#aac499"}}/></li>
                        <li ><RiStarLine style={{color: "#aac499"}}/> view data statistics about their search <RiStarLine style={{color: "#aac499"}}/></li>
                        <li ><RiStarLine style={{color: "#aac499"}}/> download a list of their logged job applications <RiStarLine style={{color: "#aac499"}}/></li>
                        <li ><RiStarLine style={{color: "#aac499"}}/> sort their job applications by status, by date or by job title <RiStarLine style={{color: "#aac499"}}/></li>
                    </ul>
                    </Col>
                    <Col md="6">
                    <h4 className="font" style={{textTransform: "uppercase", marginBottom: "40px"}}>Schools can....</h4>
                    <ul className="list-features" style={{textAlign: "right"}}>
                        <li><RiStarLine style={{color: "#876ac7"}}/> create an account <RiStarLine style={{color: "#876ac7"}}/></li>
                        <li><RiStarLine style={{color: "#876ac7"}}/> create several cohorts <RiStarLine style={{color: "#876ac7"}}/></li>
                        <li><RiStarLine style={{color: "#876ac7"}}/> connect with their alumini <RiStarLine style={{color: "#876ac7"}}/></li>
                        <li><RiStarLine style={{color: "#876ac7"}}/> get a list of the hiring companies <RiStarLine style={{color: "#876ac7"}}/></li>
                        <li><RiStarLine style={{color: "#876ac7"}}/> pull and view specific data from their alumini <RiStarLine style={{color: "#876ac7"}}/></li>
                    </ul>                    
                    </Col>
                </Row>
                <br/>
                <br/>
                <Row className="justify-content-center">
                    <img className="mt-4" style={{width: "160px"}} src={Feature} alt="" />
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