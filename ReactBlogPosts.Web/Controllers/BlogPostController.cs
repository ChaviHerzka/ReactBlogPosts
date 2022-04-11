using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ReactBlogPosts.Data;
using System.Collections.Generic;

namespace ReactBlogPosts.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogPostController : ControllerBase
    {
        private string _connectionString;
        public BlogPostController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }
        [HttpGet]
        [Route("GetBlogPosts")]
        public List<BlogPost> GetBlogPosts(int page)
        {
            var repo = new BlogPostRepository(_connectionString);
            return repo.GetBlogPosts(page); 
        }
        
        [HttpPost]
        [Route("AddBlogPost")]
        public void AddBlogPost(BlogPost bp)
        {
            bp.Date = System.DateTime.Now;
            var repo = new BlogPostRepository(_connectionString);
            repo.AddBlogPost(bp);
        }
        [HttpGet]
        [Route("ViewPost")]
        public BlogPost GetById(int blogPostId)
        {
            var repo = new BlogPostRepository(_connectionString);
            return repo.GetBlogPostForId(blogPostId);
        }
        [HttpGet]
        [Route("MostRecentBlogId")]
        public int MostRecentBlogId()
        {
            var repo = new BlogPostRepository(_connectionString);
            return repo.GetMostRecentBlogId();
        }
        [HttpPost]
        [Route("AddComment")]

        public void AddComment(Comment c)
        {
            c.Date = System.DateTime.Now;
            var repo = new BlogPostRepository(_connectionString);
            repo.AddComment(c);
        }
        [HttpGet]
        [Route("GetHighestPage")]
        public int GetHighestPage() 
        {
            var repo = new BlogPostRepository(_connectionString);
            return repo.GetHighestPage();
        }
    }

}
       

