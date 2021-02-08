using DogDates.Data;
using DogDates.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Repositories
{
    public class EventFavoritesRepository : IEventFavoritesRepository
    {
        private ApplicationDbContext _context;
        public EventFavoritesRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<EventFavorites> GetByUserId(int userId)
        {
            return _context.EventFavorites
                .Where(e => e.UserProfileId == userId)
                .Include(e => e.favoritedEvent)
                .ToList();
        }
        public EventFavorites GetFavoriteById(int id)
        {
            return _context.EventFavorites
                .Where(e => e.Id == id)
                .FirstOrDefault();
        }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
               .FirstOrDefault(up => up.FirebaseId == firebaseUserId);
        }

        public bool CheckIfExists(int eventId, int userProfileId)
        {
            return _context.EventFavorites
                .Any(e => e.EventId == eventId && e.UserProfileId == userProfileId);
        }
        public void Add(EventFavorites fav)
        {
            _context.Add(fav);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var favoriteToDelete = GetFavoriteById(id);
            _context.Remove(favoriteToDelete);
            _context.SaveChanges();
        }
    }
}
