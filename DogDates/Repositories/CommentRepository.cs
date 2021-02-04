using DogDates.Data;
using DogDates.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Repositories
{
    public class CommentRepository : ICommentRepository
    {
        private ApplicationDbContext _context;
        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
               .FirstOrDefault(up => up.FirebaseId == firebaseUserId);
        }
        public List<Comment> GetById(int eventId)
        {
            return _context.Comment
                .Include(c => c.userProfile)
                .Where(c => c.EventId == eventId)
                .ToList();
        }
        public Comment GetCommentById(int id)
        {
            return _context.Comment
                .FirstOrDefault(c => c.Id == id);
        }
        public void Update(Comment comment)
        {
            _context.Entry(comment).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var commentToDelete = GetCommentById(id);
            _context.Remove(commentToDelete);
            _context.SaveChanges();
        }
    }
}
