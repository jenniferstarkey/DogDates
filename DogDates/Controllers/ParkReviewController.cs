using DogDates.Models;
using DogDates.Repositories;
using DogDates.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DogDates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ParkReviewController : ControllerBase
    {
        private readonly IParkReviewRepository _parkReviewRepo;
        private readonly IUserProfileRepository _userRepo;

        public ParkReviewController(IParkReviewRepository parkReviewRepo, IUserProfileRepository userRepo)
        {
            _parkReviewRepo = parkReviewRepo;
            _userRepo = userRepo;
        }
        [HttpPost("addReview")]
        public IActionResult Add(ParkReview parkReviews)
        {
            var user = GetCurrentUserProfile();
            parkReviews.UserProfileId = user.Id;
            _parkReviewRepo.Add(parkReviews);
            return NoContent();
        }
        [HttpGet("{parkId}")]
        public IActionResult Get(int parkId)
        {
            var rating = _parkReviewRepo.GetParkReviewsCount(parkId);
            return Ok(rating);
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }

    }
}
