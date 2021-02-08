using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IParkFavoritesRepository
    {
        List<ParkFavorites> GetByUserId(int userId);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        bool CheckIfExists(int parkId, int userProfileId);
        void Add(ParkFavorites fav);
        ParkFavorites GetFavoriteById(int id);
        void Delete(ParkFavorites favoriteToDelete);
        ParkFavorites GetFavoriteToDelete(ParkFavorites fav);
    }
}