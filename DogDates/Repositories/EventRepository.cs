using DogDates.Data;
using DogDates.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DogDates.ViewModels;

namespace DogDates.Repositories
{
    public class EventRepository : IEventRepository
    {
        private ApplicationDbContext _context;
        public EventRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<EventFavorite> Get()
        {
            return _context.Event
                .Select(e => new EventFavorite()
                {
                    Id = e.Id,
                    UserProfileId = e.UserProfileId,
                    Title = e.Title,
                    Details = e.Details,
                    EventDateTime = e.EventDateTime,
                    ParkId = e.ParkId,
                    CreatedDateTime = e.CreatedDateTime

                })
                .ToList();
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
                .Include(e => e.EventFavorite)
                .ToList();
        }
        public Event GetSingleEventById(int id)
        {
            return _context.Event
                .Include(e => e.Comments)
                .Include(e => e.EventFavorite)
                .FirstOrDefault(e => e.Id == id);
        }
        public EventFavorite GetEventById(int id)
        {
            return _context.Event
                .Include(e => e.UserProfile)
                .Include(e => e.Comments)
                .ThenInclude(c => c.userProfile)
                .Include(e => e.EventFavorite)
                .Where(e => e.Id == id)
                .Select(e => new EventFavorite
                {
                    Id = e.Id,
                    UserProfile = e.UserProfile,
                    Title = e.Title,
                    Details = e.Details,
                    EventDateTime = e.EventDateTime,
                    ParkId = e.ParkId,
                    CreatedDateTime = e.CreatedDateTime,
                    Comments = e.Comments,
                })
                .FirstOrDefault();
        }
        public void Delete(int id)
        {
            var oneEvent = GetSingleEventById(id);

            var comments = oneEvent.Comments;
            foreach (Comment comment in comments)
            {
                _context.Comment.Remove(comment);
            }
            _context.Remove(oneEvent);
                _context.SaveChanges();
        }
        public void Update(Event taco)
        {
            _context.Entry(taco).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public void Add(Comment comment)
        {
            _context.Add(comment);
            _context.SaveChanges();
        }
       
    }
}
