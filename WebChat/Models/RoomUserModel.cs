using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebChat.Models
{
    public class RoomUserModel
    {
        public Int64 RoomId { get; set; }
        public Int64 UserId { get; set; }
    }
}