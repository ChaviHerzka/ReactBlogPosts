import React from 'react';
import {Link} from 'react-router-dom'
import { format } from 'date-fns';


const PostRow = ({blogPost}) => {
    console.log(blogPost)
    const {id, title, body, date, comments} = blogPost

    return(
    <div className="card mb-4">
        <div className='card-body'>
            <h2 className="card-title"></h2>
                <Link to = {`/ViewBlog/${id}`}>
                    <h3>{title}</h3>
                </Link>
                    <p className="card-text">{body.length > 200 ? `${body.substring(1, 200)}...` : body}</p> 
                <div className="mb-3">
                    <small>
                         {!comments  ? '0': comments.length} comment(s)
                    </small>
                </div>
                <div>
                    <Link to = {`/ViewBlog/${id}`}>
                        <button className="btn btn-primary">Read More &rarr;</button>
                    </Link>
                </div>
                <div  className="Card-Footer text-muted">
                        Posted on {format(new Date(date), 'cccc MMMM do yyyy')}
                        {console.log(date)}
                </div>
            </div>
        </div>
    );
}
    
export default PostRow;