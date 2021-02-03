using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IEventRepository
    {
        List<Event> GetById(int parkId);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        Event GetEventById(int id);
        public void Delete(int id);
        void Update(Event taco);
        void Add(Comment comment);

    }
}