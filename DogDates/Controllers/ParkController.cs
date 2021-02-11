using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DogDates.Repositories;
using DogDates.Models;
using System.Security.Claims;
using DogDates.ViewModels;

namespace DogDates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkController : ControllerBase
    {
        private readonly IParkRepository _repo;
        private readonly IEventRepository _eventRepo;
        private readonly IUserProfileRepository _userRepo;
        private readonly IParkFavoritesRepository _parkFavRepo;
    public ParkController(IParkRepository repo, IUserProfileRepository userRepo, IEventRepository eventRepo, IParkFavoritesRepository parkFavRepo)
    {
        _repo = repo;
        _eventRepo = eventRepo;
        _userRepo = userRepo;
            _parkFavRepo = parkFavRepo;
    }
        [HttpGet]
        public IActionResult Get(bool q)
        {
            var user = GetCurrentUser();
            var parks = new List<ParkFavorite>();
            if( q == true) {
               parks = _repo.Get(user.City);
            }
            else
            {
            parks = _repo.Get(null);

            }
            foreach (ParkFavorite parkFavorite in parks)
            {
                parkFavorite.IsFavorited = _parkFavRepo.CheckIfExists(parkFavorite.Id, user.Id);
            }
            /*var review = ParkReview
                .Where(r => r.ParkId.Equals(id.Value))
                .ToList();
            if (review.Count() > 0)
            {
                var reviewSum = review.Sum(r => r.ParkReview.Value);
                ParkReviews.ReviewValue = reviewSum;
            }
            else
            {
                ParkReviews.ReviewValue = 0;
            }*/
            return Ok(parks);
        }
        [HttpGet("{id}")]
        public IActionResult GetParkById(int id)
        {
            var park = _repo.GetParkById(id);

            if (park == null)
            {
                return NotFound();
            }
            /*var reviewCounts = _repo.GetParkReviewsCount(id);
            if(reviewCounts.Count() >0)
            {
                var reviewSum = reviewCounts.Sum(r => r.ParkReviews.ReviewValue);
                var reviewCount = reviewCounts.Count();
            }
*/
            return Ok(park);
        }
        private UserProfile GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
        [HttpPost("addEvent")]
        public IActionResult Add(Event taco)
        {
            var user = GetCurrentUser();
            taco.UserProfileId = user.Id;
            taco.CreatedDateTime = DateTime.Now;
            _repo.Add(taco);
            return Ok(taco);
        }



    }
}
