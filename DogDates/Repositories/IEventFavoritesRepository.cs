using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IEventFavoritesRepository
    {
        void Add(EventFavorites fav);
        bool CheckIfExists(int eventId, int userProfileId);
        void Delete(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        List<EventFavorites> GetByUserId(int userId);
        EventFavorites GetFavoriteById(int id);
    }
}