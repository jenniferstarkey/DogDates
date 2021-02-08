using DogDates.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tabloid_Fullstack.Models.ViewModels
{
    public class EventFavorite
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime EventDateTime { get; set; }
        public int ParkId { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public List<Comment> Comments { get; set; }
        public bool IsFavorited { get; set; }

    }
}
