import React, { Component } from 'react';
import {  Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
class ContestCategory extends Component {

  constructor(props) {

    super(props);
    
    this.state = {
      QuizList: [],
      categorySearch: '',
      defaultSize: 30,
      defaultPage: 1,
      paginationData: {},
      loading: false
    };
  }


 
  loading(){
    if (this.state.loading) {
      return (
        <div><div className={"text-center"} colSpan="8"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        <span className="sr-only">Loading...</span></div></div>

      )
    }
  }

  render() {
    
    const QuizList = this.state.QuizList || [];
    const paginationData = this.state.paginationData || {};

    console.log('this',this.props);

    return (
      <div className="animated fadeIn">
        <Row className="contestcategory">
          <Col xl={12}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Video Categories <small className="text-muted"></small>
                
              </CardHeader>
              <CardBody>
              <Row>
                  <Col xs={12} sm={3} md={3} lg={3}><a className="btn btn-danger" href='#/video/add'>Add New Subject</a></Col>
                  <Col xs={3} sm={3} md={2} lg={2}>
                  </Col>
                  <Col xs={3} sm={3} md={2} lg={2}>
                  </Col>  
                </Row>
                
                <br />
                <br />              

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default ContestCategory;
