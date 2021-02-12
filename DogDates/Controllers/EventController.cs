using DogDates.Models;
using DogDates.Repositories;
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
    public class EventController : ControllerBase
    {
        private IEventRepository _eventRepo;
        private readonly IUserProfileRepository _userRepo;
        private readonly IEventFavoritesRepository _eventFavRepo;
        public EventController(IEventRepository eventRepo, IUserProfileRepository userRepo, IEventFavoritesRepository eventFavRepo)
        {
            _eventRepo = eventRepo;
            _userRepo = userRepo;
            _eventFavRepo = eventFavRepo;
        }
        [HttpGet("{eventId}")]
        public IActionResult GetById(int eventId)
        {
            var events = _eventRepo.GetEventById(eventId);
            var user = GetCurrentUser();
            events.IsFavorited = _eventFavRepo.CheckIfExists(events.Id, user.Id);
            return Ok(events);
        }
        private UserProfile GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _eventRepo.GetByFirebaseUserId(firebaseUserId);
        }
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var user = GetCurrentUser();
            var eventToDelete = _eventRepo.GetSingleEventById(id);
            if(eventToDelete.UserProfile.Id != user.Id)
            {
                return Unauthorized();
            }
            _eventRepo.Delete(id);
                return NoContent();
        }
        [HttpPut("{eventId}")]
        public IActionResult Update(int EventId, Event taco)
            {
            var user = GetCurrentUser();

            if (taco.UserProfileId != user.Id)
            {
                return Unauthorized();
            }
            _eventRepo.Update(taco);
                return NoContent();
            }
         [HttpPost("addComment")]
         public IActionResult Add(Comment comment)
        {
            var user = GetCurrentUser();
            comment.UserProfileId = user.Id;
            comment.CreatedDateTIme = DateTime.Now;
            _eventRepo.Add(comment);
            return Ok(comment);
        }
        
    }
}

