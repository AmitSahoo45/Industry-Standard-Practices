using DBReplication.DataAccess;
using DBReplication.Models;
using Microsoft.AspNetCore.Mvc;

namespace DBReplication.Controllers
{
    public class OrdersController : Controller
    {
        private readonly PublisherContext _publisherContext;
        private readonly SubscriberContext _subscriberContext;

        public OrdersController(PublisherContext publisherContext, SubscriberContext subscriberContext)
        {
            _publisherContext = publisherContext;
            _subscriberContext = subscriberContext;
        }

        public IActionResult Index()
        {
            var orders = _subscriberContext.Orders
                .OrderByDescending(o => o.CreatedAt)
                .ToList();

            return View(orders);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Order order)
        {
            if (ModelState.IsValid)
            {
                order.CreatedAt = DateTime.UtcNow;

                _publisherContext.Orders.Add(order);
                _publisherContext.SaveChanges();

                return RedirectToAction(nameof(Index));
            }

            return View(order);
        }
    }
}
