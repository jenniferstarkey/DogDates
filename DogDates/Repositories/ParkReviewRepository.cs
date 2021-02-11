using DogDates.Data;
using DogDates.Models;
using DogDates.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Repositories
{
    public class ParkReviewRepository : IParkReviewRepository
    {
        private ApplicationDbContext _context;
        public ParkReviewRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void Add(ParkReview parkReview)
        {
            _context.Add(parkReview);
            _context.SaveChanges();
        }
        public List<ParkReviewCount> GetParkReviewsCount(int parkId)
        {
            return _context.ParkReview
                .Where(r => r.ParkId == parkId)
                .GroupBy(r => r.ParkId)
                .Select(r => new ParkReviewCount()
                {
                    ParkId = r.Key,
                    ReviewCount = r.Count(),
                    TotalReview = r.Sum(pr => pr.ReviewValue)
                })
            .ToList();
        }
    }
}
