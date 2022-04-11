using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactBlogPosts.Data
{
    public class BlogPostRepository
    {
        private readonly string _connectionString;
        public BlogPostRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public List<BlogPost> GetBlogPosts(int page)
        {
            using var context = new BlogPostsDbContext(_connectionString);
            return context.BlogPosts.Include(b => b.Comments).OrderByDescending(b => b.Date).Skip((page - 1) * 3).Take(3).ToList();

        }
        public BlogPost GetBlogPostForId(int id)
        {
            using var context = new BlogPostsDbContext(_connectionString);
            return context.BlogPosts.Include(b=>b.Comments).FirstOrDefault(b => b.Id == id);
        }
        
        public void AddBlogPost (BlogPost bp) 
        {
            using var context = new BlogPostsDbContext (_connectionString);
            context.BlogPosts.Add(bp);
            context.SaveChanges();
        }   
        public void AddComment(Comment c)
        {
            using var context = new BlogPostsDbContext(_connectionString);
            context.Comments.Add(c);
            context.SaveChanges();
        }
        public int GetMostRecentBlogId()
        { 
            using var context = new BlogPostsDbContext(_connectionString); 
            BlogPost bp = context.BlogPosts.OrderByDescending(b => b.Id).First(b => b.Id != 0);
            return bp.Id;
        }
        public int GetHighestPage()
        { 
            using var context = new BlogPostsDbContext(_connectionString);
            var total = context.BlogPosts.Count();
            if (total % 3 == 0)
            { 
                return total / 3;
            }
            return (total / 3) + 1;
        }
    }
}
