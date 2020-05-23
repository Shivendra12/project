import React , {Component} from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from "mdbreact";
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Row, Col } from 'reactstrap'
import { rgbToHex } from '@coreui/coreui/dist/js/coreui-utilities'
import {apiBaseUrl} from '../../configs/config';
import axios from 'axios';
import {Link} from 'react-router-dom';

class CarouselPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      videoModel : [],
      image1 : '',
      image2 : '',

    };
    this.fetchMedia = this.fetchMedia.bind(this);
  }

  componentWillMount(){
    this.fetchMedia();
  }

  fetchMedia(){
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    console.log('localstorae',localStorage.getItem('token'));
    axios.post(apiBaseUrl+'api/fetchMedia').then((response)=>{
      console.log('response',response.data.img1);
      this.setState({
        videoModel : response.data.Media,
        image1 : response.data.img1,
        image2 : response.data.img2,
      })
    })
  }

render(){
  console.log('imge1',this.state.image1);
  return (
    <div className="animated fadeIn">
    <MDBContainer>
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={false}
        className="z-depth-1"
        slide
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView  >
              <img
              width = '300px' height = '300px'
                className="d-block w-100"
                src={apiBaseUrl+this.state.image1}
                alt="First slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
              width = '300px' height = '300px'
                className="d-block w-100"
                src={apiBaseUrl+this.state.image2}
                alt="Second slide"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
              width = '300px' height = '300px'
                className="d-block w-100"
                src="https://mdbootstrap.com/img/Photos/Slides/img%20(47).jpg"
                alt="Third slide"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer>



<div class="wrapper row2">

      <section class="hoc container clear"> 
        <div class="sectiontitle">
          <h6 class="heading">Ligula cursus ut aenean nec</h6>
          <p>Quam ullamcorper volutpat augue eu sodales augue</p>
        </div>
  
        <ul class="nospace group intro">
        {
   this.state.videoModel.map((e, i)=>{
    return(
     <React.Fragment key={i} >
          <li class="one_third first">
            <article><a href="#"><img src={apiBaseUrl+e.image} alt=""/></a>
              <div class="excerpt">
                  <h6 class="heading">{e.name}</h6>
                <p>{e.storyLines}</p>
              <footer><Link to = {{ pathname: `/video_detail/${e._id}`}} >View Details &raquo;</Link></footer>
              </div>
            </article>
          </li> 
            </React.Fragment>
                        )
                })
            }		       
        </ul>
      </section>
    
    </div>
  	
        
  {/* </Row>
</div>
 </div> */}
		
</div> 

  );
}
}

export default CarouselPage;