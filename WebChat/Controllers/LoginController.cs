using Dapper;
using Microsoft.Ajax.Utilities;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using WebChat.Models;
using System.Net.Mail;
using System.Net;
using System.Threading.Tasks;
using Facebook;

namespace WebChat.Controllers
{
    public class LoginController : Controller
    {

        private Uri RedirectUri
        {
            get
            {
                var uriBuilder = new UriBuilder(Request.Url);
                uriBuilder.Query = null;
                uriBuilder.Fragment = null;
                uriBuilder.Path = Url.Action("FacebookCallback");
                return uriBuilder.Uri;
            }
        }

        // GET: Login
        SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings["cn"].ToString());
        public ActionResult Index()
        {
            if (Session["user"] != null)
            {
                Response.Redirect("/Home/HomeIndex");
            }
            return View();
        }  
        /// <summary>
        /// Kiểm tra đăng nhập bằng AJAX
        /// </summary>
        /// <param name="collection"></param>
        /// <returns></returns>

        [HttpPost]
        public JsonResult CheckLogin(FormCollection collection)
        {
            string userName = collection["userName"];
            string password = collection["password"];

            var user = new UserChatModel();
            using (IDbConnection db = new SqlConnection(ConfigurationManager.ConnectionStrings["cn"].ConnectionString))
            {

                JsonResult jr = new JsonResult();

                try
                { 
                    string query = "select * from UserChats Where UserName = '" + userName + "'";
                    user = db.Query<UserChatModel>(query).SingleOrDefault();
               
                }
                catch {

                    jr.Data = new
                    {
                        status = "F"
                    };
                }  

                if (user == null)
                {
                    jr.Data = new
                    {
                        status = "F"
                    };
                }
                else
                {
                    if (user.MatKhau == password)
                    {
                        Session["userName"] = user.UserName;
                        Session["currentUserId"] = user.UserId;
                        Session.Timeout = 5;
                        jr.Data = new
                        {
                            status = "OK",
                            userId = user.UserId,
                        };
                    }
                    else
                    {
                        jr.Data = new
                        {
                            status = "F"
                        };
                    }
                }

                return Json(jr, JsonRequestBehavior.AllowGet);
            }
        } 

        public ActionResult LoginFacebook()
        {
            var fb = new FacebookClient();

            var loginUrl = fb.GetLoginUrl(new
            {
                client_id = ConfigurationManager.AppSettings["FbAppId"],
                client_secret = ConfigurationManager.AppSettings["FbAppSecret"],
                redirect_uri = RedirectUri.AbsoluteUri,
                response_type = "code",
                scope = "email",
            }) ;

            return Redirect(loginUrl.AbsoluteUri);
        }

        //public ActionResult FacebookCallback()
        //{

        //}


    }
}