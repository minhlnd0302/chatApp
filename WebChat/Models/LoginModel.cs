using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebChat.Models
{
    public class LoginModel
    {
        [Required(ErrorMessage = "Vui lòng nhập User Name")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Vui lòng nhập Password")]
        public string Password { get; set; }
    }
}