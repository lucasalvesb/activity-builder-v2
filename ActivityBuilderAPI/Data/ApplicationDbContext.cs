using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActivityBuilderAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace ActivityBuilderAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
       : base(options) { }

        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
    }
}