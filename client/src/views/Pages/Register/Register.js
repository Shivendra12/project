import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import validator from 'validator';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import axios from 'axios';
import swal from 'sweetalert';
import {apiBaseUrl} from '../../../configs/config';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fullName : {value : '' , isValidate: true , message : ''},
      email : {value : '',isValidate : true, message : ''},
      password : {value : '',isValidate : true , message :''}
    }
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
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

      if(validator.isEmpty(state.fullName.value)){
        state.fullName.isValidate = false;
        state.fullName.message = "Please Fill The FullName";
        this.setState(state);
        return false;
      }

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
        obj.fullName = this.state['fullName'].value;
        obj.email = this.state['email'].value;
        obj.password = this.state['password'].value;
        console.log('object',obj);
        axios.post(apiBaseUrl+'api/register',obj).then((response)=>{
          console.log('object',response.data);
            if(response.data.status === true){
              swal("Successful",
              `${response.data.message}`,
              "success",
              ).then((d)=>{
                if(d){
                  return this.props.history.replace('/login');							
                }
              })
            }else{
              swal("Error",
              `${response.data.message}`,
              "error",
              ).then((d)=>{
                if(d){
                  return this.props.history.replace('/register');
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
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit = {this.submit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Username" name = "fullName" value = {state.fullName.value} onChange = {this.handleChange} autoComplete="username" />
                        <div style={{ fontSize: 13, color: "red" }} >
                          {state.fullName.message}
                        </div>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>@</InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="E-mail" name = "email" value = {state.email.value} onChange = {this.handleChange} autoComplete="username" />
                        <div style={{ fontSize: 13, color: "red" }} >
                          {state.email.message}
                        </div>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" placeholder="Password" name = "password" value = {state.password.value} onChange = {this.handleChange} autoComplete="username" />
                        <div style={{ fontSize: 13, color: "red" }} >
                          {state.password.message}
                        </div>
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
               
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Register;
