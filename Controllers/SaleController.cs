using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnboardingTask.Models;

namespace OnboardingTask.Controllers
{
    public class SaleController : Controller
    {
        private OnboardingTaskContext db = new OnboardingTaskContext();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult FetchSale()
        {
            List<Sales> sales = db.Sales.Select(x => new Sales
            {
                Id = x.Id,
                ProductId = x.ProductId,
                CustomerId = x.CustomerId,
                StoreId = x.StoreId,
                DateSold = x.DateSold,
                Customer = x.Customer,
                Product = x.Product,
                Store = x.Store
            }).ToList();
            return Json(sales);
        }

        public ActionResult SaveNewCustomer(Customers customer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Customers.Add(customer);
                    db.SaveChanges();
                    return RedirectToAction(nameof(Index));
                }
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return RedirectToAction(nameof(Index));
            }
        }

        public ActionResult SaveEditedCustomer(Customers customer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var editedCustomer = db.Customers.FirstOrDefault(x => x.Id == customer.Id);
                    editedCustomer.Name = customer.Name;
                    editedCustomer.Address = customer.Address;
                    db.SaveChanges();
                    return RedirectToAction(nameof(Index));
                }
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return RedirectToAction(nameof(Index));
            }
        }

        public ActionResult DeleteCustomer(Customers customer)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var deleteCustomer = db.Customers.FirstOrDefault(x => x.Id == customer.Id);
                    db.Customers.Remove(deleteCustomer);
                    db.SaveChanges();
                    return RedirectToAction(nameof(Index));
                }
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return RedirectToAction(nameof(Index));
            }
        }
    }
}