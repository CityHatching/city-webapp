import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet'
import { Button, Col, Form } from 'react-bootstrap';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class GeoTarget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          target: null,
          comments: [],
          name: "",
          email: "",
          comment: ""
        };
    }

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    submitComment = (e) => {
        let { id } = this.props.params;
        e.preventDefault()
        const commentData = {
            "author": {
                "id": `${this.state.email}`,
                "name": this.state.name,
                "email": this.state.email,
                "avatar": null
            },
            "content": this.state.comment,
        }
        console.log(commentData)
        fetch(`https://city-cms.yerzham.com/api/comments/api::geo-target.geo-target:${id}`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(
            (result) => {
                this.updateComments()
            },
            (error) => {
                console.log(error);
            }
        )
    }

    updateComments() {
        let { id } = this.props.params;
        fetch(`https://city-cms.yerzham.com/api/comments/api::geo-target.geo-target:${id}?filters[blocked][$eq]=false`)
        .then(res => res.json())
        .then(
            (result) => {
            this.setState({
                comments: result
            });
            },
            (error) => {
            this.setState({
                error
            });
            }
        )
    }
    
    componentDidMount() {
        let { id } = this.props.params;
        fetch(`https://city-cms.yerzham.com/api/geo-targets/${id}?populate=*`)
            .then(res => res.json())
            .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    target: result.data
                });
            },
            (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            }
            )
        this.updateComments()
    }

    render() { 
        const { error, isLoaded, target, comments } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
            <>
                <div className="container mt-5">
                    <Link to="/">Go Back</Link>
                    <h1>{target.attributes.Title}</h1> 
                    <p>{target.attributes.Desription}</p>
                    <div>
                        <img
                        width="700px"
                        src={'https://city-cms.yerzham.com'+target.attributes.Image.data.attributes.url}>
                        </img>
                    </div>
                    
                    {target.attributes.FeedbackUrl ? 
                        <a className="btn btn btn-primary mt-4" target="_blank" role="button" href={target.attributes.FeedbackUrl}> 
                            Feedback Form
                        </a>
                        : <></>
                    }
                    <h2 className="mt-5">Comments</h2>
                    
                    <Form onSubmit={this.submitComment}>
                        <Form.Group controlId="form.Name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required type="text" name="name" placeholder="Your name" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="form.Email">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control required type="email" name="email" placeholder="name@example.com" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group controlId="form.Textarea">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control required as="textarea" name="comment" rows={3} onChange={this.handleChange}/>
                        </Form.Group>
                        <Button type="submit" variant="primary mt-3">Submit Comment</Button>
                    </Form>
                    
                    {comments != null || comments != undefined ? comments.map((comment, i) => {
                        return (
                        <div key={comment.id}>
                            <h5 className="mt-4">{comment.author.name} <br/>
                            <small className="text-muted">{comment.author.email}</small>
                            </h5>
                            <p>{comment.content}</p>
                        </div>
                        )
                    }) : <></>}
                </div>
            </>
            )
        }
    }
}
 
export default withParams(GeoTarget);