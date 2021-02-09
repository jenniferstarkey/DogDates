using DogDates.Models;
using DogDates.ViewModels;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IParkRepository
    {
        List<ParkFavorite> Get(string city);
        public Park GetParkById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Add(Event taco);

      
       
    }
}