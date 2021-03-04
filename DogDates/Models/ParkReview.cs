using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Models
{
    [Table("parkReview")]

    public class ParkReview
    {
        public int Id { get; set; }
        public int ParkId { get; set; }
        public int UserProfileId { get; set; }
        public int ReviewValue { get; set; }
        public Park Park { get; set; }
        public UserProfile UserProfile { get; set; }
    }
}
