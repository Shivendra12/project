import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import {apiBaseUrl} from '../../configs/config';
// const URL = process.env.REACT_APP_LOCAL

class QuizCategoryEdit extends Component{
    constructor(props){
        super(props);
        this.state ={ 
            image : null,
            name : '',
            tags : '',
            release_date : '',
            director : '',
            user_rating : '',
            storyLines : '',
            casts : '',
            video_url : '',           
            editQuizCategory : {},
        }
        // this.handleChange = this.handleChange.bind(this);
        this.onFormEdit = this.onFormEdit.bind(this);
        this.handlenameChange = this.handlenameChange.bind(this);
        this.handletagsChange  = this.handletagsChange.bind(this);
        this.handlerelease_dateChange  = this.handlerelease_dateChange.bind(this);
        this.handledirectorChange  = this.handledirectorChange.bind(this);
        this.handleuser_ratingChange = this.handleuser_ratingChange.bind(this);
        this.handlestoryLinesChange = this.handlestoryLinesChange.bind(this);
        this.handlecastsChange = this.handlecastsChange.bind(this);
        this.handlevideo_urlchange = this.handlevideo_urlchange.bind(this);
    };


    componentWillMount(){
        this.onFormEdit();
    }

    onFileSelect(e){
        this.setState({file : e.target.files[0]});
    }


    onFormEdit(e){
        let obj = {};
        obj.mediaId = this.props.match.params.id;

        console.log('id',obj);

      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');

        axios.post(apiBaseUrl+'api/fetchMediaById',obj).then((response)=>{
            console.log('BusinessResponse',response.data);
            let categoryData =  response.data.Media;
            console.log('categoryData',categoryData);
            this.setState({
                editQuizCategory : categoryData,
                image : categoryData[0].image,
                name : categoryData[0].name,
                tags   : categoryData[0].tags,
                release_date   : categoryData[0].release_date,
                director  : categoryData[0].director,
                user_rating  : categoryData[0].user_rating,
                storyLines  : categoryData[0].storyLines,
                casts  : categoryData[0].casts,
                video_url  : categoryData[0].video_url,

            })
          })
    }


    handlenameChange(event) {
        this.setState({ name: event.target.value });
    }
    handletagsChange(event) {
        this.setState({ tags: event.target.value });
    }  
    handlerelease_dateChange(event) {
        this.setState({ release_date: event.target.value });
    }  
    handledirectorChange(event) {
        this.setState({ director: event.target.value });
    }  
    handleuser_ratingChange(event) {
        this.setState({ user_rating: event.target.value });
    }  
    handlestoryLinesChange(event) {
        this.setState({ storyLines: event.target.value });
    }  
    handlecastsChange(event) {
        this.setState({ casts: event.target.value });
    }  
    handlevideo_urlchange(event) {
        this.setState({ video_url: event.target.value });
    }


    render(){
        console.log('this',this.state.question);
       
        let state = this.state;
        return(
            <div>
               <div className="animated fadeIn">
               <Row>
                     <Col lg={12}>
                         <Card>
                             <CardHeader>
                                 <i className="fa fa-align-justify"></i><small className="text-muted"></small>
                             </CardHeader>
                             <CardBody>
                                 <Form >
                                 <FormGroup>
                                         <Label for="option4">video_url</Label>
                                         <br/>
                                         <img src = {apiBaseUrl + this.state.image} width = '400px'/>
                                         
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="question">name</Label>
                                         <Input type="text" name="question" 
                                          value = {this.state.name} onChange = {this.handlenameChange} 
                                           id="question"readOnly />
                                     
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="answer">tags</Label>
                                         <Input type="text" name="answer" 
                                          value = {this.state.tags} onChange = {this.handletagsChange} 
                                           id="answer" readOnly />
                                    
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="marks">release_date</Label>
                                         <Input type="text" name="marks" 
                                          value = {this.state.release_date} onChange = {this.handlerelease_dateChange} 
                                           id="marks" readOnly />

                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="explanation">director</Label>
                                         <Input type="text" name="explanation" 
                                          value = {this.state.director} onChange = {this.handledirectorChange} 
                                           id="explanation"readOnly  />
                                  
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="option1">user_rating</Label>
                                         <Input type="text" name="option1"
                                          value = {this.state.user_rating} onChange = {this.handleuser_ratingChange}
                                           id="option1" readOnly />
                                    
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="option2">storyLines</Label>
                                         <Input type="text" name="option2" 
                                         value = {this.state.storyLines} onChange = {this.handlestoryLinesChange} 
                                         id="option2" readOnly />
                                   
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="option3">casts</Label>
                                         <Input type="text" name="option3" 
                                         value = {this.state.casts} onChange = {this.handlecastsChange} 
                                         id="option3"  readOnly/>
                                         
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="option4">video_url</Label>
                                         <br/>
                                         <iframe src = {this.state.video_url} width = '400px'></iframe>
                                         
                                     </FormGroup>
                                  
                                 </Form>
                             </CardBody>
                         </Card>
                     </Col>
                 </Row>
             </div>
            </div>
        )
    }
}

export default QuizCategoryEdit;
  
