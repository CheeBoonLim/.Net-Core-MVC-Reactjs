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

        public JsonResult FetchCustomer()
        {
            List<Customers> customers = db.Customers.ToList();
            return Json(customers);
        }

        public JsonResult FetchProduct()
        {
            List<Products> products = db.Products.ToList();
            return Json(products);
        }

        public JsonResult FetchStore()
        {
            List<Stores> stores = db.Stores.ToList();
            return Json(stores);
        }

        public ActionResult SaveNewSale(Sales sale)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Sales.Add(sale);
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

        public ActionResult SaveEditedSale(Sales sale)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var editedSale = db.Sales.FirstOrDefault(x => x.Id == sale.Id);
                    editedSale.CustomerId = sale.CustomerId;
                    editedSale.ProductId = sale.ProductId;
                    editedSale.StoreId = sale.StoreId;
                    editedSale.DateSold = sale.DateSold;
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

        public ActionResult DeleteSale(Sales sale)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var deleteSale = db.Sales.FirstOrDefault(x => x.Id == sale.Id);
                    db.Sales.Remove(deleteSale);
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