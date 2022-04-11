import React, {useState } from 'react';
import axios from 'axios';
 import {useHistory} from 'react-router-dom'

function NewBlogPost () {
    const [blogpost, setBlogPost] = useState({});
    const history = useHistory();

    const onTextChange = e => {
        const copy = { ...blogpost};
        copy[e.target.name] = e.target.value;
        setBlogPost(copy)
    }
    const onSubmitClick = async () => {
        await axios.post('/api/blogpost/addblogpost', blogpost);
         history.push('/')
    }
    const { title, body } = blogpost
    return (
        <div className="col-md-8 offset-md-2 jumbotron">
            <h2>Add a new post</h2>
        <input type="text" className="form-control" placeholder="Title" value={title} name="title" onChange={onTextChange} />
        <br />
        <textarea name="body" placeholder="Type your blog here..." className="form-control" rows="20" value={body} onChange={onTextChange} ></textarea>
        <br />
        <button className="btn btn-primary btn-block"  disabled={title === "" || body === ""} onClick={onSubmitClick}>Submit</button>            
    </div>
        )
}
export default NewBlogPost;