using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DogDates.ViewModels;

namespace DogDates.Models
{
    public class EventFavorites
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int EventId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Event Event { get; set; }
    }
}
