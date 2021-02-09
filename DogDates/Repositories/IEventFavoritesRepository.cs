using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IEventFavoritesRepository
    {
        void Add(EventFavorites fav);
        bool CheckIfExists(int eventId, int userProfileId);
        void Delete(EventFavorites favoriteToDelete);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<Event> GetByUserId(int userId);
        EventFavorites GetFavoriteById(int id);
        EventFavorites GetFavoriteToDelete(EventFavorites fav);
    }
}