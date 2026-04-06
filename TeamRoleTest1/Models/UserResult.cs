using System.ComponentModel.DataAnnotations;

namespace TeamRoleTest1.Models
{
    public class UserResult
    {
        public int Id {get; set;}

        [Required, MaxLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required, MaxLength(50)]
        public string LastName {get; set;} = string.Empty;
        
        [Required]
        public int CreativeThinker {get; set;}

        [Required]
        public int TeamSupporter {get; set;}

        [Required]
        public int Organiser {get; set;}

        [Required]
        public int Driver {get; set;}

        [Required]
        public int Finisher {get; set;}

        [Required]
        public int Analyst {get; set;}

        [Required]
        public int Coordinator {get; set;}

        [Required]
        public int Explorer {get; set;}

        [Required]
        public int Specialist {get; set;}
    }
}
