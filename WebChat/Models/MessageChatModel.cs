using System;
using System.Collections.Generic;
using System.Drawing.Printing;
using System.Linq;
using System.Web;

namespace WebChat.Models
{
    public class MessageChatModel
    {
        public Int64 MessageId { get; set; }
        public Int64 FromUserId { get; set; }
        public Int64 ToUserId { get; set; }
        public Int64 ToRoomId { get; set; }
        public string MessageContent { get; set; }
        public DateTime TimeSend { get; set; }
    }
}