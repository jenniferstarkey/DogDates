using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Models
{
    [Table("comment")]

    public class Comment
    {
        public int Id { get; set; }
        public DateTime CreatedDateTIme { get; set; }
        public string Content { get; set; }
        public int EventId { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile userProfile { get; set; }
    }
}
