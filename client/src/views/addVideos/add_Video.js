import React, {Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import validator from 'validator';
import axios from 'axios';
import swal from 'sweetalert';
import {apiBaseUrl} from '../../configs/config';
import AuthService from '../../Authentication/AuthService';


class VideoCategoryAdd extends Component{
    constructor(props){
        super(props);
        this.state ={ 
            image : null,
            name : {value : '', isValidate : true, message : ''},
            tags : {value : '', isValidate : true , message : ''},
            release_date : {value : '', isValidate : true , message : ''},
            director : {value : '', isValidate : true , message : ''},
            user_rating : {value : '', isValidate : true , message : ''},
            storyLines : {value : '', isValidate : true , message : ''},
            casts : {value : '', isValidate : true , message : ''},
            video_url : {value : '', isValidate : true , message : ''},           
        }
        this.handleChange = this.handleChange.bind(this);
        this.submit = this.submit.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
	this.Auth = new AuthService();

    };


    onFileSelect(e){
        this.setState({image : e.target.files[0]});
    }

    handleChange(event){
        const{name, value} = event.target;
        let state = this.state;
        state[name].message = '';
        state[name].value = value;
        this.setState(state);
    }

    validate(){
        let state = this.state;
        if (validator.isEmpty(state.name.value)){
            state.name.isValidate = false;
            state.name.message = 'Movie Name Can Not Be Blank';
            this.setState(state);
            return false;
        }
        if (validator.isEmpty(state.tags.value)){
            state.tags.isValidate = false;
            state.tags.message = 'Tags Can Not Be Blank';
            this.setState(state);
            return false;
        };

        if (validator.isEmpty(state.release_date.value)){
            state.release_date.isValidate = false;
            state.release_date.message = 'Date Can Not Be Blank';
            this.setState(state);
            return false;

        };
         if (validator.isEmpty(state.director.value)){
            state.director.isValidate = false;
            state.director.message = 'Director Name Can Not Be Blank';
            this.setState(state);
            return false;

        }; 
         if (validator.isEmpty(state.user_rating.value)){
            state.user_rating.isValidate = false;
            state.user_rating.message = 'Column Can Not Be Blank';
            this.setState(state);
            return false;

        };  
        
        if (validator.isEmpty(state.storyLines.value)){
            state.storyLines.isValidate = false;
            state.storyLines.message = 'Column Can Not Be Blank';
            this.setState(state);
            return false;
        };
        
        if (validator.isEmpty(state.casts.value)){
            state.casts.isValidate = false;
            state.casts.message = 'Column Can Not Be Blank';
            this.setState(state);
            return false;
        };
        if (validator.isEmpty(state.video_url.value)){
            state.video_url.isValidate = false;
            state.video_url.message = 'Column Can Not Be Blank';
            this.setState(state);
            return false;
        };
   
       return true;
    }
    submit(event){
        event.preventDefault();
        let isValid = this.validate();
        if(isValid){
         const formData = new FormData();
         formData.append('image',this.state.image);
         formData.append('name',this.state['name'].value);
         formData.append('tags',this.state['tags'].value);
         formData.append('release_date',this.state['release_date'].value);
         formData.append('director',this.state['director'].value);
         formData.append('user_rating',this.state['user_rating'].value);
         formData.append('storyLines',this.state['storyLines'].value);
         formData.append('casts',this.state['casts'].value);
         formData.append('video_url',this.state['video_url'].value);

            console.log('event',formData.get('image'));
            console.log('name',formData.get('name'));
            console.log('tags',formData.get('tags'));
            console.log('release_date',formData.get('release_date'));
            console.log('director',formData.get('director'));
            console.log('user_rating',formData.get('user_rating'));
            console.log('storyLines',formData.get('storyLines'));
            console.log('casts',formData.get('casts'));
            console.log('video_url',formData.get('video_url'));

            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    console.log('localstorae',localStorage.getItem('token'));

            axios({
                method : 'post',
                url : apiBaseUrl+'api/addVideo',
                data : formData
            }).then((response)=>{
            console.log('response',response);
                if(response.data.statusCode === 200){
                    swal({
                        title: "Success!",
                        text : response.data.message,
                        icon : "success",
                        dangerMode : false,
                        closeOnClickOutside : false
                    }).then((d)=>{
                        if(d){
                            return this.props.history.push('/video');
                        }
                    })
                }else{
                    swal(
                        "Error",
                        `${response.data.message}`,
                        "error",
                    ).then((d)=>{
                        if(d){
                            
                        }
                    })
                }
            })
        }
    }

    render(){
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
                                 <Form onSubmit = {this.submit}>
                                     <FormGroup>
                                         <Label>*All fields are required</Label>
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="name">Image</Label>
                                         <Input type="file" name="image" ref={this.fileInput} onChange={this.onFileSelect}  />
                                     
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="name">Movie Name</Label>
                                         <Input type="text" name="name" value = {state.name.value} onChange = {this.handleChange}  />
                                     <div style = {{fontSize : 13 , color : 'red'}}>
                                         {state.name.message}
                                     </div>
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="name">Tags</Label>
                                         <Input type="text" name="tags" value = {state.tags.value} onChange = {this.handleChange}   />
                                     <div style = {{fontSize : 13 , color : 'red'}}>
                                         {state.tags.message}
                                     </div>
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="name">Release Date</Label>
                                         <Input  type="text" name="release_date" value = {state.release_date.value} onChange = {this.handleChange}   />
                                     <div style = {{fontSize : 13 , color : 'red'}}>
                                         {state.release_date.message}
                                     </div>
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="name">Director</Label>
                                         <Input  type="text" name="director"  value = {state.director.value} onChange = {this.handleChange}   />
                                     <div style = {{fontSize : 13 , color : 'red'}}>
                                         {state.director.message}
                                     </div>
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="name">User Rating</Label>
                                         <Input  type="text" name="user_rating"  value = {state.user_rating.value} onChange = {this.handleChange}   />
                                     <div style = {{fontSize : 13 , color : 'red'}}>
                                         {state.user_rating.message}
                                     </div>
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="name">Story Lines</Label>
                                         <Input  type="text" name="storyLines"  value = {state.storyLines.value} onChange = {this.handleChange}   />
                                     <div style = {{fontSize : 13 , color : 'red'}}>
                                         {state.storyLines.message}
                                     </div>
                                     </FormGroup>
                                     <FormGroup>
                                         <Label for="name">Casts</Label>
                                         <Input  type="text" name="casts" value = {state.casts.value} onChange = {this.handleChange}  />
                                     <div style = {{fontSize : 13 , color : 'red'}}>
                                         {state.casts.message}
                                     </div>
                                     </FormGroup>

                                     <FormGroup>
                                         <Label for="name">Video Url</Label>
                                         <Input  type="text" name="video_url" value = {state.video_url.value} onChange = {this.handleChange}  />
                                     <div style = {{fontSize : 13 , color : 'red'}}>
                                         {state.video_url.message}
                                     </div>
                                     </FormGroup>

                                    <Button color="primary">Create Quiz</Button>
                                 </Form>
                             </CardBody>
                         </Card>
                     </Col>
                 </Row>
                 {/* <h1>Hello</h1> */}
             </div>
            </div>
        )
    }
}

export default VideoCategoryAdd;


 