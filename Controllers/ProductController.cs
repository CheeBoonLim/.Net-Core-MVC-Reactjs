using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnboardingTask.Models;

namespace OnboardingTask.Controllers
{
    public class ProductController : Controller
    {
        private OnboardingTaskContext db = new OnboardingTaskContext();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult FetchProduct()
        {
            List<Products> products = db.Products.ToList();
            return Json(products);
        }

        public ActionResult SaveNewProduct(Products product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Products.Add(product);
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

        public ActionResult SaveEditedProduct(Products product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var editedProduct = db.Products.FirstOrDefault(x => x.Id == product.Id);
                    editedProduct.Name = product.Name;
                    editedProduct.Price = product.Price;
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

        public ActionResult DeleteProduct(Products product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var deleteProduct = db.Products.FirstOrDefault(x => x.Id == product.Id);
                    db.Products.Remove(deleteProduct);
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