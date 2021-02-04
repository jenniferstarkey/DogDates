using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface ICommentRepository
    {
        List<Comment> GetById(int eventId);
        Comment GetCommentById(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Update(Comment comment);
        void Delete(int id);
    }
}