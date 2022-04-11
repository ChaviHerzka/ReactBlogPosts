using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace ReactBlogPosts.Data
{
    public class Comment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
        public int BlogPostId { get; set; }
        [JsonIgnore]
        public BlogPost BlogPost { get; set; }
    }
}
