using DogDates.Data;
using DogDates.Models;
using DogDates.Repositories;
using DogDates.ViewModels;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Repositories
{
    public class ParkRepository : IParkRepository
    {
        private ApplicationDbContext _context;

        public ParkRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        //Get all the parks for the lists. Should only include name of park, image, location
        public List<ParkFavorite> Get(string city)
        {
            if( city != null)
            {
                return _context.Park
                .Where(p => p.City == city)
                .Select(p => new ParkFavorite()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Street = p.Street,
                    City = p.City,
                    State = p.State,
                    ZipCode = p.ZipCode,
                    ParkImage = p.ParkImage,

                })
                .ToList();
            }
            else
            {

            return _context.Park
                .Select( p => new ParkFavorite()
                {
                    Id = p.Id,
                    Name = p.Name,
                    Street = p.Street,
                    City = p.City,
                    State = p.State,
                    ZipCode = p.ZipCode,
                    ParkImage = p.ParkImage,

                })
                .ToList();
            }
        }
    
        public Park GetParkById(int id)
        {
            return _context.Park
                //will need to include park events, reviews
                .Include(p => p.Events)
                    .ThenInclude(e => e.UserProfile)
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
               .FirstOrDefault(up => up.FirebaseId == firebaseUserId);
        }
        public void Add(Event taco)
        {
            _context.Add(taco);
            _context.SaveChanges();
        }



    }
}