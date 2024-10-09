using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ratelimiting.Models
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int empId { get; set; }

        [Required]
        public string empName { get; set; }

        [Required]
        public string role { get; set; }

        [Required]
        [StringLength(50)]
        public string company  { get; set; }
    }
}
