using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebChat.Models
{
    public class RoomModel
    {
        public Int64 RoomId { get; set; }
        public string RoomName { get; set; }
        public Int64 ManagerId { get; set; }
    }
}