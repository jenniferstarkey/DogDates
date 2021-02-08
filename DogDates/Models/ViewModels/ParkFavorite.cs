using DogDates.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.ViewModels
{
    public class ParkFavorite
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Street { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public int ZipCode { get; set; }
        public string ParkImage { get; set; }
        public List<Event> Events { get; set; }
        public bool IsFavorited { get; set; }
    }
}
