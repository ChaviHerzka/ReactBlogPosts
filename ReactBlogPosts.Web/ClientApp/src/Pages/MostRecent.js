import { useHistory } from "react-router-dom"
import React, {useEffect} from 'react';
import axios from 'axios'

const MostRecent =() =>{
    const history = useHistory();
    useEffect(()=>{
        const mostRecent = async()=>{
            const {data} = await axios.get('/api/blogpost/mostrecentblogId')
            history.push(`/ViewBlog/${data}`)
        };
        mostRecent();
    });
    return(
        <>
        </>
    )
}
export default MostRecent;