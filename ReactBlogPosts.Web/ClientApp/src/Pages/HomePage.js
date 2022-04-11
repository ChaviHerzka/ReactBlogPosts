import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import PostRow from '../components/PostRow';

const HomePage = () => {
    const [blogPosts, setBlogPost] = useState();
    const [highestPage, setHighestPage] = useState();
    const params = useParams();
    let { page } = params;
    if (!page) {
        page = 1;
    }
    page = parseInt(page);

    useEffect(() => {
        const getBlogPosts = async () => {
            const { data } = await axios.get(`/api/blogpost/getblogposts?page=${page}`)
            setBlogPost(data);
        }
        const getHighestPageNumber = async () => {
            const {data} = await axios.get(`/api/blogpost/gethighestpage`);
            setHighestPage(data);
        }
        getBlogPosts();
        getHighestPageNumber();
    }, [page]);

    return (
        <div>
            <h1>Blog Site</h1>
            {console.log(blogPosts)}
            {blogPosts && blogPosts.map(b => <PostRow blogPost={b} key={b.id} />)}
            <ul className="pagination justify-content-center mb-4">
                {page < highestPage  && <li className='page-item'>
                    <Link className='page-link' to={`/page/${page + 1 }`}>&larr; Older</Link>
                </li>}
                {page > 1 && <li className='page-item'>
                    <Link className='page-link' to={`/page/${page - 1 }`}>Newer &rarr;</Link>
                </li>}
            </ul>
        </div>
    );
}
export default HomePage;
