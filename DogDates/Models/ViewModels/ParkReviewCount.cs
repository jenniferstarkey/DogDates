using DogDates.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.ViewModels
{
    public class ParkReviewCount
    {
     
       public int ParkId { get; set; }
       public int ReviewCount { get; set; }
       public int TotalReview { get; set; }
    }
}

