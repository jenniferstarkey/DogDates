using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IParkFavoritesRepository
    {
        List<ParkFavorites> GetByUserId(int userId);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
    }
}