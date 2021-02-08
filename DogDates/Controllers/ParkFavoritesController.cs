using DogDates.Models;
using DogDates.Repositories;
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
    public class ParkFavoritesController : ControllerBase
    {
        private IParkFavoritesRepository _parkFavoritesRepo;
        private IUserProfileRepository _userRepo;
    public ParkFavoritesController(IParkFavoritesRepository parkFavoritesRepo, IUserProfileRepository userRepo)
    {
        _parkFavoritesRepo = parkFavoritesRepo;
        _userRepo = userRepo;
    }
        
        [HttpGet("{userId}")]

        public IActionResult GetById(int userId)
        {
            var user = GetCurrentUserProfile();
            if(user.Id != userId)
            {
                return null;
            }
            List<ParkFavorites> favs = _parkFavoritesRepo.GetByUserId(userId);
            if (favs != null)
            {
                return Ok(favs);
            }
            else
            {
                return null;
            }
        }
        [HttpDelete("delete")]
        public IActionResult Delete(ParkFavorites fav)
        {
            var user = GetCurrentUserProfile();
            var favoriteToDelete = _parkFavoritesRepo.GetFavoriteToDelete(fav);
            if (favoriteToDelete.UserProfileId != user.Id)
            {
                return Unauthorized();
            }
            _parkFavoritesRepo.Delete(favoriteToDelete);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
        [HttpPost("addFavorite")]
        public IActionResult Add(ParkFavorites fav)
        {
            var user = GetCurrentUserProfile();
            fav.UserProfileId = user.Id;
            _parkFavoritesRepo.Add(fav);
            return Ok(fav);
        }
    }
}
