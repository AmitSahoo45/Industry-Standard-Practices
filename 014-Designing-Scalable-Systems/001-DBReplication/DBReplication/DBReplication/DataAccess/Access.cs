using DBReplication.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace DBReplication.DataAccess
{
    public class PublisherContext : DbContext
    {
        public PublisherContext(DbContextOptions<PublisherContext> options) : base(options) { }
        public DbSet<Order> Orders { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder) { base.OnModelCreating(modelBuilder); }
    }

    public class SubscriberContext : DbContext
    {
        public SubscriberContext(DbContextOptions<SubscriberContext> options) : base(options) { }
        public DbSet<Order> Orders { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
