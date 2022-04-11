import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './Pages/HomePage';
import MostRecent from './Pages/MostRecent';
import NewBlogPost from './Pages/NewBlogPost';
import ViewPost from './Pages/ViewPost';

const App= () =>{
    return (
        <Layout>
             <Route exact path='/' component={HomePage}/>
             <Route exact path='/NewBlogPost' component={NewBlogPost}/>
             <Route exact path='/ViewBlog/:blogPostId' component={ViewPost}/> 
             <Route exact path="/MostRecent" component={MostRecent}/>
             <Route exact path="/Page/:page" component={HomePage}/>
        </Layout>
    )

}
export default App