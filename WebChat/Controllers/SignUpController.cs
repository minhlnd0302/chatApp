using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebChat.Models;

namespace WebChat.Controllers
{
    public class SignUpController : Controller
    {
        // GET: SignUp

        IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["cn"].ConnectionString);
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult CreateAccount(FormCollection collection)
        {
            JsonResult jr = new JsonResult(); 
            
            try
            {
                var userInfo = new UserChatModel
                {
                    UserName = collection["userName"],
                    MatKhau = collection["passWord"],
                    FullName = collection["fullName"],
                    Birthday = DateTime.Parse(collection["birthday"]),
                    Email = collection["email"],
                    Phone = collection["phone"],
                };

                var query_selectMaxUserId = "select Max(UserId) maxUserId from UserChats";
                var newUserId = db.Query(query_selectMaxUserId).FirstOrDefault().maxUserId + 1;

                //var userId =  tmpUserId.maxUserId ;

                string query_insertUser = "insert into UserChats (UserId ,FullName, Birthday, Phone, Email, UserName, MatKhau) values (@UserId ,@FullName, @Birthday, @Phone, @Email, @UserName, @MatKhau) ;";

                db.Execute(query_insertUser, new { UserId = newUserId, FullName = userInfo.FullName, Birthday = userInfo.Birthday, Phone = userInfo.Phone, Email = userInfo.Email, UserName = userInfo.UserName, MatKhau = userInfo.MatKhau });

                jr.Data = new
                {
                    status = "Success"
                };

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

        public JsonResult SelectUserName()
        {
            JsonResult jr = new JsonResult();

            try
            {
                string query_usernameList = " select UserName from UserChats ";

                List<string> usernameList = db.Query<string>(query_usernameList).ToList();

                jr.Data = new
                {
                    status = "OK",
                    usernameList = usernameList
                };

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