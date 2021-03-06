using System;
using System.Collections.Generic;

namespace ReactBlogPosts.Data
{
    public class BlogPost
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public List<Comment> Comments { get; set; }
    }
}

