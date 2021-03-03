using DogDates.Models;
using DogDates.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DogDates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _repo;

        public UserProfileController( IUserProfileRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_repo.GetByFirebaseUserId(firebaseUserId));
        }
        [HttpGet("edit/{userId}")]
        public IActionResult GetUserById(int userId)
        {
            return Ok(_repo.GetByUserId(userId));
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            _repo.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseId },

                userProfile);
        }
        private UserProfile GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _repo.GetByFirebaseUserId(firebaseUserId);
        }
        [HttpPut("userProfile/{id}")]
        public IActionResult Update(int id, UserProfile userProfile)
        {
            var user = GetCurrentUser();
            user.Id = userProfile.Id;
            user.FirstName = userProfile.FirstName;
            user.LastName = userProfile.LastName;
            user.DisplayName = userProfile.DisplayName;
            user.Email = userProfile.Email;
            user.City = userProfile.City;
            user.State = userProfile.State;
            user.ZipCode = userProfile.ZipCode;
            user.ProfileImage = userProfile.ProfileImage;
            user.Bio = userProfile.Bio;
            if(id != user.Id)
            {
                return Unauthorized();
            }
            _repo.Update(user);
            return NoContent(); 
        }
        [HttpGet("details/{userId}")]
        public IActionResult GetByUserId(int userId)
        {
            return Ok(_repo.GetByUserId(userId));
        }
    }
}
