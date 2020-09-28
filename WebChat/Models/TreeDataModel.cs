using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebChat.Models
{
    public class TreeDataModel
    {
        //public List<UserChatModel> UserList { get; set; }
        //public List<RoomModel> GroupList { get; set; } 
        public List<InfoUser> InfoUser { get; set; }
        public List<InfoRoom> InfoRoom { get; set; }
    }

    public class InfoUser
    {
        public Int64 UserId { get; set; }
        public string FullName { get; set; }
    }

    public class InfoRoom
    {
        public Int64 RoomId { get; set; }
        public string RoomName { get; set; }
    }
}