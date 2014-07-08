using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Blog.Models
{
    public class Page
    {
        public int Id { get; set; }
        public DateTime CreatedAt { get; set; }

        public DateTime LastEditAt { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }
    }
}