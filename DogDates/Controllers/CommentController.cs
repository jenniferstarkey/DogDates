using DogDates.Models;
using DogDates.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace DogDates.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private ICommentRepository _commentRepo;
        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }
        private UserProfile GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _commentRepo.GetByFirebaseUserId(firebaseUserId);
        }
        [HttpGet("{eventId}")]
        public IActionResult GetById(int eventId)
        {
            var comments = _commentRepo.GetById(eventId);
            return Ok(comments);
        }
       [HttpPut("{id}")]
       public IActionResult Update(int id, Comment comment)
        {
            var existingComment = _commentRepo.GetCommentById(id);
            var user = GetCurrentUser();

            if (id != comment.Id)
            {
                return BadRequest();
            }
            if (existingComment.UserProfileId != user.Id)
            {
                return Unauthorized();
            }
            existingComment.Content = comment.Content;
            _commentRepo.Update(existingComment);
            return NoContent();
        }
    }
}
