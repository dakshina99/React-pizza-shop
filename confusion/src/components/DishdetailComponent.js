/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Col } from 'reactstrap';
import { Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }

    render() {
        return (

            <div className='row'>
                <Button className='click' onClick={this.toggleModal}><span className='fa fa-pencil'></span> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating"
                                        className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" name="author"
                                        className="form-control"
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    ></Control.text>
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" name="comment"
                                        className="form-control"
                                        rows='6'>
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={2}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}


function RenderComments({ comments }) {
    if (comments == null) {
        return (<div></div>)
    } else {
        const comm = comments.map((c) => {
            return (
                <li key={c.id}>
                    <div className="row">
                        {c.comment}
                    </div>
                    <div className="row">
                        {"-- " + c.author + " , " + new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(c.date)))}
                    </div>
                    <br></br>
                </li>
            );
        });

        return (
            <div className="col-12 col-md-5 m-1">
                <div className='row'><h4>Comments</h4></div>
                <ul className="list-unstyled m-1">
                    {comm}
                </ul>
                <CommentForm></CommentForm>
            </div>
            
        );
    }
}

function RenderDish({ dish }) {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

const Dishdetail = (props) => {
    if (props.selectedDish != null) {
        return (
            <div className='container'>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.selectedDish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderDish dish={props.selectedDish} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>)
    } else {
        return (
            <div></div>
        );
    }
}

export default Dishdetail;