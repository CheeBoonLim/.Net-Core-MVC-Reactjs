using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace OnboardingTask.Models
{
    public partial class Sales
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "ProductId is required")]
        public int ProductId { get; set; }
        [Required(ErrorMessage = "CustomerId is required")]
        public int CustomerId { get; set; }
        [Required(ErrorMessage = "StoreId is required")]
        public int StoreId { get; set; }
        [Required(ErrorMessage = "DateSold is required")]
        public DateTime DateSold { get; set; }

        public virtual Customers Customer { get; set; }
        public virtual Products Product { get; set; }
        public virtual Stores Store { get; set; }
    }
}
