using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Models
{
    public class EventFavorites
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int EventId { get; set; }
        public UserProfile userProfile { get; set; }
        public Event favoritedEvent { get; set; }
    }
}
