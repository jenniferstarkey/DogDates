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
                .Include(p => p.favoritedPark)
                .ToList();
        }
        public ParkFavorites GetFavoriteById(int id)
        {
            return _context.ParkFavorites
                .Where(p => p.Id == id)
                .FirstOrDefault();
        }
        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.UserProfile
               .FirstOrDefault(up => up.FirebaseId == firebaseUserId);
        }
        //public void Add(ParkFavorites parkFavorites)

        public bool CheckIfExists(int parkId, int userProfileId)
        {
            return _context.ParkFavorites
                .Any(p => p.ParkId == parkId && p.UserProfileId == userProfileId);
        }
        public void Add(ParkFavorites fav)
        {
            _context.Add(fav);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var favoriteToDelete = GetFavoriteById(id);
            _context.Remove(favoriteToDelete);
            _context.SaveChanges();
        }
    }
}
