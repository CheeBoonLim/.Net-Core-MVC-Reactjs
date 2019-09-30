using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OnboardingTask.Models;

namespace OnboardingTask.Controllers
{
    public class StoreController : Controller
    {
        private OnboardingTaskContext db = new OnboardingTaskContext();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult FetchStore()
        {
            List<Stores> stores = db.Stores.ToList();
            return Json(stores);
        }

        public ActionResult SaveNewStore(Stores store)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    db.Stores.Add(store);
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

        public ActionResult SaveEditedStore(Stores store)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var editedStore = db.Stores.FirstOrDefault(x => x.Id == store.Id);
                    editedStore.Name = store.Name;
                    editedStore.Address = store.Address;
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

        public ActionResult DeleteStore(Stores store)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var deleteStore = db.Stores.FirstOrDefault(x => x.Id == store.Id);
                    db.Stores.Remove(deleteStore);
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