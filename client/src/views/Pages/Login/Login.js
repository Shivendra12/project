import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import validator from 'validator';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import swal from 'sweetalert';
import {apiBaseUrl} from '../../../configs/config';
import AuthService from '../../../Authentication/AuthService';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email : {value : '',isValidate : true, message : ''},
      password : {value : '',isValidate : true , message :''}
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
    this.Auth = new AuthService();
  }
    handleChange(event){
      const {name,value} = event.target;
      let state = this.state;
      state[name].message = '';
      state[name].value = value;
      this.setState(state);
    }

    validate(){
      let state = this.state;
      if(validator.isEmpty(state.email.value)){
        state.email.isValidate = false;
        state.email.message = "Please Fill The E-mail Address";
        this.setState(state);
        return false;
      }

      if(!validator.isEmail(state.email.value)){
        state.email.isValidate = false;
        state.email.message = "Invalid E-mail";
        this.setState(state);
        return false;
      }

      if(validator.isEmpty(state.password.value)){
        state.password.isValidate = false;
        state.password.message = "Please Fill The Password";
        this.setState(state);
        return false;
      }
      return true;
    }

    submit(event){
      event.preventDefault();
      let isValid = this.validate();
      if(isValid){
        let obj  = {};
        obj.email = this.state['email'].value;
        obj.password = this.state['password'].value;
        console.log('object',obj);
        axios.post(apiBaseUrl+'api/signin',obj).then((response)=>{
          console.log('object',response);
            if(response.data.status === true){
              swal("Successful",
              `${response.data.message}`,
              "success",
              ).then((d)=>{
                if(d){
                  localStorage.setItem("token", response.data.token);
                  return this.props.history.replace('/dashboard');							
                }
              })  
            }else{
              swal("Error",
              `${response.data.message}`,
              "error",
              ).then((d)=>{
                if(d){
                  return this.props.history.replace('/login');
                }
              })
            }
        })
      }
    }

  render() {
    const state = this.state;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form onSubmit = {this.submit}>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" name = "email" value = {state.email.value} onChange = {this.handleChange} autoComplete="username" />
                        <div style={{ fontSize: 13, color: "red" }} >
                          {state.email.message}
                        </div>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" name = "password" value = {state.password.value} onChange = {this.handleChange} autoComplete="current-password" />
                        <div style={{ fontSize: 13, color: "red" }} >
                          {state.password.message}
                        </div>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                      
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
