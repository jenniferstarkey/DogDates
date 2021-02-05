﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Models
{
    public class ParkFavorites
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public int ParkId { get; set; }
        public UserProfile userProfile { get; set; }
        public Park favortiedPark { get; set; }
    }
}
