using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Models
{
    [Table("parkFavorites")]

    public class ParkFavorites
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int ParkId { get; set; }
        public UserProfile userProfile { get; set; }
        public Park favoritedPark { get; set; }
    }
}
