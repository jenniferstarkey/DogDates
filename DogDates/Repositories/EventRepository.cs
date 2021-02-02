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
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
               .FirstOrDefault(up => up.FirebaseId == firebaseUserId);
        }
        public List<Event> GetById(int parkId)
        {
            return _context.Event
                .Include(e => e.UserProfile)
                .Where(e => e.ParkId == parkId)
                .ToList();
        }
        public Event GetEventById(int id)
        {
            return _context.Event
                .Include(e => e.UserProfile)
                .Include(e => e.Comments)
                .ThenInclude(c => c.userProfile)
                .FirstOrDefault(e => e.Id == id);
        }
        public void Delete(int id)
        {
            var eventToDelete = GetEventById(id);
                _context.Remove(eventToDelete);
                _context.SaveChanges();
        }
        public void Update(Event taco)
        {
            _context.Entry(taco).State = EntityState.Modified;
            _context.SaveChanges();
        }
       
    }
}
