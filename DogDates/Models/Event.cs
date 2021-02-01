using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Models
{
    public class Event
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public string Title { get; set; }
        public string Details { get; set; }
        public DateTime EventDateTime { get; set; }
        public int ParkId { get; set; }
        public DateTime CreatedDateTime { get; set; }
    }
}
