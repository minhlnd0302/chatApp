using Newtonsoft.Json;
using SuperWebSocket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatabaseProvider
{
    public class UserRequest
    {
        public String FromUserId { get; set; }
        public String ToUserId { get; set; }
        public String ToRoomId { get; set; }
        public string MessageContent { get; set; }
    }
    public class UserResult
    {
        public string FromUserId { get; set; }
        public string ToUserId { get; set; }
        public string ToRoomId { get; set; }
        public string MessageContent { get; set; }
        public DateTime TimeSend { get; set; }

    }
    class Program
    {
        private static WebSocketServer wsServer;
        static void Main(string[] args)
        {
            wsServer = new WebSocketServer();
            int port = 8088;
            wsServer.Setup(port);
            wsServer.NewSessionConnected += WsServer_NewSessionConnected;
            wsServer.NewMessageReceived += WsServer_NewMessageReceived;
            wsServer.NewDataReceived += WsServer_NewDataReceived;
            wsServer.SessionClosed += WsServer_SessionClosed;

            wsServer.Start();
            Console.WriteLine("Server is running on port " + port + ". Press ENTER to exit....");

            Console.ReadKey();
            wsServer.Stop();
        }
        private static void WsServer_SessionClosed(WebSocketSession session, SuperSocket.SocketBase.CloseReason value)
        {
            Console.WriteLine("Disconnected");
        }

        private static void WsServer_NewDataReceived(WebSocketSession session, byte[] value)
        {
            Console.WriteLine("WsServer_NewDataReceived");

        }
        private static void WsServer_NewMessageReceived(WebSocketSession session, string data)
        {

            var userRequest = JsonConvert.DeserializeObject<UserRequest>(data);

            var userResult = new UserResult
            {
                FromUserId = userRequest.FromUserId,
                ToUserId = userRequest.ToUserId,
                ToRoomId = userRequest.ToRoomId,
                TimeSend = DateTime.Now,
                MessageContent = userRequest.MessageContent,
            };

            data = JsonConvert.SerializeObject(userResult);


            foreach (var item in wsServer.GetAllSessions())
            {
                Console.WriteLine(data);
                item.Send(data);
            }
        }

        private static void WsServer_NewSessionConnected(WebSocketSession session)
        {
            Console.WriteLine("WsServer_NewDataReceived");
        }
    }
}
