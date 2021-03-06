﻿using DogDates.Models;

namespace DogDates.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        UserProfile GetByFirebaseUserId(string firebaseId);
        UserProfile GetByUserId(int id);
        void Update(UserProfile userProfile);
    }
}