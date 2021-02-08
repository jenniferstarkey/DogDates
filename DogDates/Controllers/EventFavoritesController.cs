using DogDates.Models;
using DogDates.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Tabloid_Fullstack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventFavoritesController : ControllerBase
    {
        private IEventFavoritesRepository _eventFavoritesRepo;
        private IUserProfileRepository _userRepo;
        public EventFavoritesController(IEventFavoritesRepository eventFavoritesRepo, IUserProfileRepository userRepo)
        {
            _eventFavoritesRepo = eventFavoritesRepo;
            _userRepo = userRepo;
        }

        [HttpGet("{userId}")]

        public IActionResult GetById(int userId)
        {
            var user = GetCurrentUserProfile();
            if (user.Id != userId)
            {
                return null;
            }
            List<EventFavorites> favs = _eventFavoritesRepo.GetByUserId(userId);
            if (favs != null)
            {
                return Ok(favs);
            }
            else
            {
                return null;
            }
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUserProfile();
            var favoriteToDelete = _eventFavoritesRepo.GetFavoriteById(id);
            if (favoriteToDelete.UserProfileId != user.Id)
            {
                return Unauthorized();
            }
            _eventFavoritesRepo.Delete(id);
            return NoContent();
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepo.GetByFirebaseUserId(firebaseUserId);
        }
        [HttpPost("addFavorite")]
        public IActionResult Add(EventFavorites fav)
        {
            var user = GetCurrentUserProfile();
            fav.UserProfileId = user.Id;
            _eventFavoritesRepo.Add(fav);
            return Ok(fav);
        }
    }
}
