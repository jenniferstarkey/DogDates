using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DogDates.Repositories;
using DogDates.Models;
using System.Security.Claims;

namespace DogDates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkController : ControllerBase
    {
        private readonly IParkRepository _repo;
        private readonly IEventRepository _eventRepo;
        private readonly IUserProfileRepository _userRepo;
    public ParkController(IParkRepository repo, IUserProfileRepository userRepo, IEventRepository eventRepo)
    {
        _repo = repo;
        _eventRepo = eventRepo;
        _userRepo = userRepo;
    }
        [HttpGet]
        public IActionResult Get()
        {
            var parks = _repo.Get();
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
