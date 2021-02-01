using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IEventRepository
    {
        List<Event> GetById(int parkId);
    }
}