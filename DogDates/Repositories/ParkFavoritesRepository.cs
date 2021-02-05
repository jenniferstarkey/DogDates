﻿using DogDates.Data;
using DogDates.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DogDates.Repositories
{
    public class ParkFavoritesRepository : IParkFavoritesRepository
    {
        private ApplicationDbContext _context;
        public ParkFavoritesRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<ParkFavorites> GetByUserId(int userId)
        {
            return _context.ParkFavorites
                .Where(p => p.UserProfileId == userId)
                .Include(p => p.favortiedPark)
                .ToList();
        }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
               .FirstOrDefault(up => up.FirebaseId == firebaseUserId);
        }
     
    }
}
