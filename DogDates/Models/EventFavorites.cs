using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using DogDates.ViewModels;

namespace DogDates.Models
{
    [Table("eventFavorites")]

    public class EventFavorites
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int EventId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Event Event { get; set; }
    }
}
