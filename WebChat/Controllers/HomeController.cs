using Dapper;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Mvc;
using System.Web.Services.Description;
using WebChat.Models;

namespace WebChat.Controllers
{
    public class HomeController : Controller
    {
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["cn"].ToString());
        // GET: Home
        public ActionResult HomeIndex()
        {
            if (Session["userName"] == null)
            {
                Response.Redirect("/Login/Index");
            }
            else
            {
                Int64 currentUserId = (Int64)Session["currentUserId"];

                var TreeData = new TreeDataModel();

                string queryGetUserList = "select UserId, FullName from UserChats where UserId <> " + currentUserId + "";

                string queryGetGroup = "select r.RoomId ,r.RoomName from RoomUsers ru join Rooms r on ru.RoomId = r.RoomId where ru.UserId = " + currentUserId + "";

                using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["cn"].ConnectionString))
                {
                    TreeData.InfoUser = db.Query<InfoUser>(queryGetUserList).ToList();
                    TreeData.InfoRoom = db.Query<InfoRoom>(queryGetGroup).ToList();
                }
                ViewBag.TreeData = TreeData;
                ViewBag.currentUser = conn.Query<string>("select FullName from UserChats where UserId =" + currentUserId + "").SingleOrDefault();
            }
            return View();
        }

        public JsonResult GetMessages(FormCollection collection)
        {
            var jr = new JsonResult();

            var currentUserId = Session[("currentUserId")];


            var ToRoomId = collection["ToRoomId"];

            List<MessageChatModel> messages = new List<MessageChatModel>();

            if (ToRoomId != null)
            {
                string query_getMessageRoom = "select * from MessageChats where ToRoomId = " + ToRoomId;

                messages = conn.Query<MessageChatModel>(query_getMessageRoom).ToList();

                jr.Data = new
                {
                    Messages = messages,
                    type = "group"
                };
            }
            else
            {
                var ToUserId = collection["ToUserId"];

                string query_getMessageSinger = "select * from MessageChats where ( FromUserId = " + currentUserId + " and ToUserId = " + ToUserId + " ) or (FromUserId = " + ToUserId + " and ToUserId = " + currentUserId + " ) ";
                messages = conn.Query<MessageChatModel>(query_getMessageSinger).ToList();

                jr.Data = new
                {
                    Messages = messages,
                    type = "singer",
                }; 
            }
            return Json(jr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult getIdFromFullName(FormCollection collection)
        {
            var jr = new JsonResult();

            string fullName = collection["fullName"];

            try
            {
                string query_getUserId = "select UserId from UserChats where FullName = N'" + fullName + "'";
                Int64 friendid = conn.Query<Int64>(query_getUserId).SingleOrDefault();

                if (friendid != 0)
                {
                    jr.Data = new
                    {
                        friendId = friendid,
                        roomId = 0
                    };
                }
                else
                {
                    var query_getRoomId = "select RoomId from Rooms where RoomName = N'" + fullName + "'";
                    Int64 roomid = conn.Query<Int64>(query_getRoomId).SingleOrDefault();

                    jr.Data = new
                    {
                        friendId = 0,
                        roomId = roomid
                    };
                }
            }
            catch
            {
                jr.Data = new
                {
                    friendId = 0
                };
            }
            return Json(jr, JsonRequestBehavior.AllowGet);
        }

        public JsonResult AddMessageToDatabase(FormCollection collection)
        {
            var jr = new JsonResult();

            try
            { 
                var FromUserId = Int64.Parse(collection["fromUserId"]);
                var ToUserId = new Int64();
                Int64.TryParse(collection["toUserId"], out ToUserId);

                var ToRoomId = new Int64();
                Int64.TryParse(collection["toRoomId"], out ToRoomId);
                var TimeSend = DateTime.Now;
                var MessageContent = collection["messageContent"];

                string query_selectMaxId = "select Max(MessageId) maxId from MessageChats";
                var maxMessageId = conn.Query(query_selectMaxId).FirstOrDefault().maxId + 1;

                if (ToRoomId == 0)
                {
                    string query_insertMessage_singer = "insert into MessageChats (MessageId ,FromUserId, ToUserId , MessageContent, TimeSend) values (@MessageId ,@FromUserId, @ToUserId, @MessageContent, @TimeSend) ;";
                    conn.Execute(query_insertMessage_singer, new { MessageId = maxMessageId, FromUserId = FromUserId, ToUserId = ToUserId, MessageContent = MessageContent, TimeSend = TimeSend });
                }
                else
                {
                    string query_insertMessage_group = "insert into MessageChats (MessageId ,FromUserId, ToRoomId , MessageContent, TimeSend) values (@MessageId ,@FromUserId, @ToRoomId, @MessageContent, @TimeSend) ;";
                    conn.Execute(query_insertMessage_group, new { MessageId = maxMessageId, FromUserId = FromUserId, ToRoomId = ToRoomId, MessageContent = MessageContent, TimeSend = TimeSend });
                }
            }
            catch
            {
                jr.Data = new
                {
                    status = "F"
                };
            }

            return Json(jr, JsonRequestBehavior.AllowGet);
        }

    }
}