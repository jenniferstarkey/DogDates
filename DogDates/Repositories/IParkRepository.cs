using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IParkRepository
    {
        List<Park> Get();
        public Park GetParkById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Add(Event taco);

      
       
    }
}