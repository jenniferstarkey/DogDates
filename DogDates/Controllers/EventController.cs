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
        public EventController(IEventRepository eventRepo, IUserProfileRepository userRepo)
        {
            _eventRepo = eventRepo;
            _userRepo = userRepo;
        }
        [HttpGet("{eventId}")]
        public IActionResult GetById(int eventId)
        {
            var events = _eventRepo.GetEventById(eventId);
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
            var eventToDelete = _eventRepo.GetEventById(id);
            if(eventToDelete.UserProfileId != user.Id)
            {
                return Unauthorized();
            }
            _eventRepo.Delete(id);
                return NoContent();
        }
        [HttpPut("{id}")]
        public IActionResult Update(int id, Event taco)
            {
             _eventRepo.Update(taco);
                return NoContent();
            }
            
        
    }
}

