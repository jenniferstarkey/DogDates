using DogDates.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DogDates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private IEventRepository _eventRepo;
        public EventController(IEventRepository eventRepo)
        {
            _eventRepo = eventRepo;
        }
        [HttpGet("{parkId}")]
        public IActionResult GetById(int parkId)
        {
            var events = _eventRepo.GetById(parkId);
            return Ok(events);
        }
        
    }
}
