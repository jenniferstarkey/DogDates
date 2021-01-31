using DogDates.Models;
using System.Collections.Generic;

namespace DogDates.Repositories
{
    public interface IParkRepository
    {
        List<Park> Get();
    }
}