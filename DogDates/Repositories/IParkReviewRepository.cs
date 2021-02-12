using DogDates.Models;
using DogDates.ViewModels;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IParkReviewRepository
    {
        void Add(ParkReview parkReview);
        List<ParkReviewCount> GetParkReviewsCount(int parkId);
    }
}