import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { produce } from 'immer';
import { format } from 'date-fns';
import CommentRow from '../components/CommentRow';

const ViewPost = () => {
    const [comment, setComment] = useState({ name: localStorage.getItem('user'), text: "" })
    const [blogPost, setBlogPost] = useState({id: "", name: "", text: "", date: "", comments: [] });
 
    const { blogPostId } = useParams(); 
  

    useEffect(() => {
        const getPost = async () => {
            const { data } = await axios.get(`/api/blogpost/viewpost?blogPostId=${blogPostId}`);
            setBlogPost(data);
        }
        getPost();
    }, []);

    const submitComment = async () => {
        localStorage.setItem('user', comment.name)
         let c = { ...comment }
        c.blogPostId = blogPostId;
        await axios.post(`/api/blogpost/addcomment`, c)
        const { data } = await axios.get(`/api/blogpost/viewpost?blogPostId=${blogPostId}`);
        setBlogPost(data);
        setComment({ name: localStorage.getItem('user'), text: "" })

    }

    const onTextChange = (e) => {
        const nextState = produce(comment, draftState => {
            draftState[e.target.name] = e.target.value;
        });
        setComment(nextState);
    }

    return (
        <>
            <div className='row'>
                <div className='col-lg-8'>
                    <h1 className='mt-4'>{blogPost.title}</h1>
                    <hr />
                    {blogPost.date && <p>Posted on {format(new Date(blogPost.date), 'cccc MMMM do, yyyy')}</p>}
                    <hr />
                    <p>{blogPost.body}</p>
                    <div className='card my-4'>
                        <h5 className='card-header'>Leave a Comment</h5>
                        <div className='card-body'>
                            <div className='form-group'>
                                <input type="text" value={comment.name} className="form-control" onChange={onTextChange} placeholder="Please enter your name" name="name" />
                            </div>
                            <div>
                                <textarea rows="3" value={comment.text} className="form-control" onChange={onTextChange} placeholder="Type your comment here but remember to be nice..." name="text"></textarea>
                            </div>
                            <br/>
                            <div>
                                <button className='btn btn-primary' disabled={comment.name === "" || comment.text === ""} onClick={submitComment}>Submit</button>
                            </div>
                        </div>
                    </div>
                        {blogPost.comments != null && blogPost.comments.map(c => <CommentRow key={c.id} comment={c}/>)} 
                </div>

            </div>

        </>
    )
}
export default ViewPost;
