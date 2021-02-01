using DogDates.Data;
using DogDates.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Repositories
{
    public class EventRepository : IEventRepository
    {
        private ApplicationDbContext _context;
        public EventRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Event> GetById(int parkId)
        {
            return _context.Event
                .Include(e => e.UserProfile)
                .Where(e => e.ParkId == parkId)
                .ToList();
        }
    }
}
