function request(postUrl, postData) {
    return $.post(postUrl, postData,
        function (res, status) {
            return res;
        }
    )
}



//const request = async (url,dataSend) => {
//    try {
//        var res;
//        await $.ajax({
//            url: url,
//            success: function (data) {
//                res = data;
//            },
//            error: function (err) {
//                console.log(error);
//            }
//        })
//        return res;
//    }
//    catch (err) {
//        console.log(err);
//    }
//}


//async function request(postUrl, postData) {
//    return $.post(postUrl, postData,
//        function (res, status) {
//            return res;
//        }
//    )

//    const result = await
//}

function sendMessageToServer(fromUserId, toUserId, toRoomId, messageContent ) {
    postUrl_addMessage = '/Home/AddMessageToDatabase'
    var data_message = { 'fromUserId': fromUserId, 'toUserId': toUserId, 'toRoomId': toRoomId, 'messageContent': messageContent  };

    console.log(data_message);
   
    request(postUrl_addMessage,data_message).then(res => {
        if (res.status === 'F') {
            alert('Đã xảy ra lỗi')
        };
    }) 
} 

function convertDate(timeSend) {
    writeDate = timeSend.replace(/[^0-9 +]/g, '');
    writeDate = new Date(parseInt(writeDate));
    return writeDate;
}