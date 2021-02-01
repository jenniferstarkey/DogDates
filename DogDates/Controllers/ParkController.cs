using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DogDates.Repositories;

namespace DogDates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ParkController : ControllerBase
    {
        private readonly IParkRepository _repo;
    public ParkController(IParkRepository repo)
    {
        _repo = repo;
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
    }
}
