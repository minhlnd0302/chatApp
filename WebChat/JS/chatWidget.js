$(function () {
    $.widget("custom.chatWidget", {
        options: {
            currentUserId: '', 
            Action: '',
            messageList: [],
        },
        _create: function () {
       
            this.options.messageList = this.options.messageList.reverse();
            this.options.currentUserId = parseInt(this.options.currentUserId);

            var idMess = this.options.messageList.length;
            sessionStorage.setItem('idMess', idMess) 

            if (this.options.Action == '2') {
                for (var m in this.options.messageList) { 
                    this.message_content = $('<div>', { id: idMess }).appendTo(this.element);
                    this.message_content.addClass('message-content'); 

                    var writeDate = convertDate(this.options.messageList[m]['TimeSend']); 

                    var timeNow = new Date;

                    // set time  
                    var timeWrite = '';

                    var minute = writeDate.getMinutes() < 10 ? "0" + writeDate.getMinutes() : writeDate.getMinutes();
                    if (writeDate.getMonth() === timeNow.getMonth() && timeNow.getDate() == writeDate.getDate()) {

                        timeWrite = writeDate.getHours() + ':' + minute;
                    }
                    else {
                        timeWrite = writeDate.getDate() + '/' + writeDate.getMonth() + '/' + writeDate.getFullYear() + '  ' + writeDate.getHours() + ':' + minute;
                    }
  
                    if (this.options.currentUserId === this.options.messageList[m]['FromUserId']) {

                        this.message_row_you = $('<div>').appendTo(this.message_content);
                        this.message_row_you.addClass('message-row you-message');

                        this.message_text = $('<div>', { text: this.options.messageList[m]['MessageContent'] }).appendTo(this.message_row_you);
                        this.message_text.addClass('message-text')

                        this.time = $('<div>', { text: timeWrite }).appendTo(this.message_row_you)
                        this.time.addClass('message-time')
                    }
                    else {
                        this.img = $('<img>', { 'src': '../images/otherUser.png' }).appendTo(this.message_content);

                        this.message_row_other = $('<div>').appendTo(this.message_content);
                        this.message_row_other.addClass('message-row other-message');

                        this.message_text = $('<div>', { text: this.options.messageList[m]['MessageContent'] }).appendTo(this.message_row_other);
                        this.message_text.addClass('message-text')

                        this.time = $('<div>', { text: timeWrite }).appendTo(this.message_row_other)
                        this.time.addClass('message-time')
                    }

                    idMess--;
                }
            }

        },
        _refresh: function () { //có tin nhắn mới  
            this.options.currentUserId = parseInt(this.options.currentUserId);
            var idMess = parseInt(sessionStorage.getItem('idMess'));

            if (this.options.messageList.FromUserId != sessionStorage.getItem('currentUserId')) {
                if (sessionStorage.getItem('ToUserId') != undefined) {
                    if (this.options.messageList.FromUserId != sessionStorage.getItem('ToUserId')) {
                        return;
                    }
                }
                else if (sessionStorage.getItem('ToRoomId') != undefined) {
                    if (sessionStorage.getItem('ToRoomId') != this.options.messageList.ToRoomId) {
                        return;
                    }
                }
            }

            if (this.options.Action == "1") {

                var writeDate = new Date(this.options.messageList.TimeSend);

                var minute = writeDate.getMinutes() < 10 ? "0" + writeDate.getMinutes() : writeDate.getMinutes();

                var timeWrite = writeDate.getHours() + ':' + minute;

                this.message_content = $('<div>', { id: idMess + 1 }).appendTo($('#chat-message-list')).insertBefore($('#' + idMess));
                this.message_content.addClass('message-content'); 

                if (this.options.messageList.FromUserId == this.options.currentUserId) {

                    console.log(this.options.messageList.FromUserId);
                    console.log(this.options.currentUserId);

                    this.message_row_you = $('<div>').appendTo(this.message_content);
                    this.message_row_you.addClass('message-row you-message');

                    this.message_text = $('<div>', { text: this.options.messageList.MessageContent }).appendTo(this.message_row_you);
                    this.message_text.addClass('message-text')

                    this.time = $('<div>', { text: timeWrite }).appendTo(this.message_row_you)
                    this.time.addClass('message-time')
                } else {

                    this.img = $('<img>', { 'src': '../images/otherUser.png' }).appendTo(this.message_content);

                    this.message_row_other = $('<div>').appendTo(this.message_content);
                    this.message_row_other.addClass('message-row other-message');

                    this.message_text = $('<div>', { text: this.options.messageList.MessageContent }).appendTo(this.message_row_other);
                    this.message_text.addClass('message-text')

                    this.time = $('<div>', { text: timeWrite }).appendTo(this.message_row_other)
                    this.time.addClass('message-time')
                }

                sessionStorage.setItem('idMess', idMess + 1)
            }
        },
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
            this._super(key, value);
        },

    });
})


$(function () {
    $.widget("custom.messageContentWidget", {
        options: {
            currentUserId: '',
            messageInfo: {},
            messageId: '',
        },
        _create: function () {

            this.options.messageId = parseInt(this.options.messageId) 
            if (this.options.messageId === 1) {
                this.message_content = $('<div>', { id: this.options.messageId }).appendTo(this.element);
                console.log(this.element);
            }
            else {
                this.message_content = $('<div>', { id: this.options.messageId }).appendTo(this.element).insertAfter($('#' + this.options.messageId - 1));
            }

            this.message_content.addClass('message-content');

            var timeWrite = "test time";

            if (this.options.currentUserId === this.options.messageInfo.FromUserId) {

                this.message_row_you = $('<div>').appendTo(this.message_content);
                this.message_row_you.addClass('message-row you-message');

                this.message_text = $('<div>', { text: this.options.messageInfo.MessageContent }).appendTo(this.message_row_you);
                this.message_text.addClass('message-text')

                this.time = $('<div>', { text: timeWrite }).appendTo(this.message_row_you)
                this.time.addClass('message-time')
            }
            else {
                this.img = $('<img>', { 'src': '../images/otherUser.png' }).appendTo(this.message_content);

                this.message_row_other = $('<div>').appendTo(this.message_content);
                this.message_row_other.addClass('message-row other-message');

                this.message_text = $('<div>', { text: this.options.messageInfo.MessageContent }).appendTo(this.message_row_other);
                this.message_text.addClass('message-text')

                this.time = $('<div>', { text: timeWrite }).appendTo(this.message_row_other)
                this.time.addClass('message-time')
            }
        },

        _refresh: function () { //có tin nhắn mới  

        },
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            this._superApply(arguments);
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
            this._super(key, value);
        }

    })
})

var client = new WebSocketClient({
    onMessage: function (evt) {
        var data = JSON.parse(evt.data);
        console.log(data);
        debugger
        $('#chat-message-list').chatWidget({
            currentUserId: sessionStorage.getItem('currentUserId'),
            Action: '1',
            messageList: data
        })
    }
});