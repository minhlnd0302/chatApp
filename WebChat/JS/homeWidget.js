$(function () {
    $.widget("custom.homeWidget", {
        options: {
            treeData: {},
        },
        _create: function () {
            var self = this;

            debugger
            this.div_chat_container = $('<div>', { id: 'chat-container' }).appendTo(this.element);

            this.div_search_container = $('<div>', { id: 'search-container' }).appendTo(this.div_chat_container);
            this.input_search = $('<input>', { id: 'search', type: 'text', placeholder: 'Search' }).appendTo(this.div_search_container);
            this.input_search.keyup(function () {
                self._onchangeSearch(self)
            })

            this.div_conversation_list = $('<div>', { id: 'conversation-list' }).appendTo(this.div_chat_container);

            this.div_new_message_container = $('<div>', { id: 'new-message-container' }).appendTo(this.div_chat_container);
            this.a = $('<a>', { text: '+' }).appendTo(this.div_new_message_container);

            this.div_chat_title = $('<div>', { id: 'chat-title' }).appendTo(this.div_chat_container);

            // avatar   

            this.span_friend = $('<span>', { id: 'friend' }).appendTo(this.div_chat_title);
            this.img_delete = $('<img>', { src: '../images/delete.png', alt: 'Delete Conversation' }).appendTo(this.div_chat_title);

            this.div_messageList = $('<div>', { id: 'chat-message-list' }).appendTo(this.div_chat_container);

            this.div_chat_form = $('<div>', { id: 'chat-form' }).appendTo(this.div_chat_container);

            var tmp = this._getListAutoComplete(this.options.treeData)

            // auto complete
            //this.input_search.autocomplete({
            //    source: tmp
            //}) 


            // vẽ tree
            this.div_conversation_list.treeWidget({
                extensions: [],
                treeData: this.options.treeData,
                onClickNode: function (e, data) {
                    var toUserId = data.node.data.UserId;
                    var toRoomId = data.node.data.RoomId;

                    sessionStorage.setItem('ToUserId', toUserId);
                    sessionStorage.setItem('ToRoomId', toRoomId);

                    postUrl_getMessage = "/Home/GetMessages";


                    // delete chat
                    if ($('#chat-message-list > .message-content').length > 0) {
                        $('#chat-message-list > .message-content').remove();
                        //self.div_chat_form.children().remove();
                    }

                    debugger
                    if (toRoomId != undefined) {
                        data_getMessage = { "ToRoomId": toRoomId };
                        request(postUrl_getMessage, data_getMessage).then(response => {

                            var messagelist = response.Data.Messages;

                            debugger
                            self.div_messageList.chatWidget({
                                currentUserId: sessionStorage.getItem('currentUserId'),
                                Action: '2',
                                messageList: messagelist
                            })
                        })
                    }
                    else {
                        data_getMessage = { "ToUserId": toUserId };

                        request(postUrl_getMessage, data_getMessage).then(response => {
                            var messagelist = response.Data.Messages;
                            console.log(messagelist);
                            debugger
                            self.div_messageList.chatWidget({
                                currentUserId: sessionStorage.getItem('currentUserId'),
                                Action: '2',
                                messageList: messagelist
                            })
                        })
                    }

                    // vẽ text box
                    self.div_chat_form.inputMessageWidget({});


                    // event enter text box
                    $('#enterMessage').keypress(function (event) {
                        if (event.keyCode == 13 || event.which == 13) {

                            var messageContent = $('#enterMessage').val();

                            if (messageContent === '') return;

                            $('#enterMessage').val('');

                            var currentUserId = sessionStorage.getItem('currentUserId');
                            var ToUserId = sessionStorage.getItem('ToUserId');
                            var ToRoomId = sessionStorage.getItem('ToRoomId');

                            sendMessageToServer(currentUserId, ToUserId, ToRoomId, messageContent)

                            client.sendMessage({
                                "FromUserId": currentUserId,
                                "ToUserId": ToUserId,
                                "ToRoomId": ToRoomId,
                                "MessageContent": messageContent,
                                "TimeSend": new Date
                            })
                        }
                    })
                }
            });
            //this._onchangeSearch(self);
        },
        _getListAutoComplete: function (obj) {
            var usernameList = obj.InfoUser.map(x => {
                return x.FullName;
            })
            var roomnameList = obj.InfoRoom.map(x => {
                return x.RoomName;
            })
            return usernameList.concat(roomnameList);
        },
        // reDraw khi search
        _onchangeSearch: function (self) {

            var currentText = self.input_search.val().toLowerCase();
            var treeData = JSON.parse(sessionStorage.getItem('treeData'));

            // loc dữ liệu tree
            debugger
            //treeData = treeData.map(type => {
            //    return type.children.filter(x => {
            //        var name = x.title.toLowerCase();
            //        return name.indexOf(currentText) > -1;
            //    })
            //})

            treeData.InfoUser = treeData.InfoUser.filter(x => {
                var fullName = x.FullName.toLowerCase();
                return fullName.indexOf(currentText) > -1;
            })

            treeData.InfoRoom = treeData.InfoRoom.filter(x => {
                var roomName = x.RoomName.toLowerCase();
                return roomName.indexOf(currentText) > -1;
            })
            //self.div_conversation_list.children().remove();

            self.div_conversation_list.removeClass();
            self.div_conversation_list.remove();
            self.div_conversation_list.css('display', 'none');

            $('<div>', { id: 'conversation-list' }).appendTo(self.div_chat_container);

            $('#conversation-list').treeWidget({
                extensions: [],
                source: treeData,
            });

            //self.div_conversation_list.treeWidget({
            //    extensions: [],
            //    source: treeData,
            //});
 
        }
        
    });
})

//widget text box
$(function () {
    $.widget("custom.inputMessageWidget", {
        _create: function () {
            this.img = $('<img>', { src: '../images/paperclip.png', alt: 'Add Attachment' }).appendTo(this.element);
            this.img.click(_ => {
                this._onclickUpload();
            })
            this.inputMessage = $('<input>', { placeholder: "type a message", id: 'enterMessage' }).appendTo(this.element)
        },
        _onclickUpload: function () {
            $('#upload').addFile({});
        },
    });
})

$(function () {
    $.widget("custom.addFile", {
        _create: function () {

            this.element.dialog({ modal: true })

            debugger
            this.element.plupload({
                // General settings
                runtimes: 'html5,flash,silverlight,html4',
                url: "~/Files",

                // Maximum file size
                max_file_size: '2mb',

                chunk_size: '1mb',

                // Resize images on clientside if we can
                resize: {
                    width: 200,
                    height: 200,
                    quality: 90,
                    crop: true // crop to exact dimensions
                },

                // Specify what files to browse for
                filters: [
                    { title: "Image files", extensions: "jpg,gif,png" },
                    { title: "Zip files", extensions: "zip,avi" }
                ],

                // Rename files by clicking on their titles
                rename: true,

                // Sort files
                sortable: true,

                // Enable ability to drag'n'drop files onto the widget (currently only HTML5 supports that)
                dragdrop: true,

                // Views to activate
                views: {
                    list: true,
                    thumbs: true, // Show thumbs
                    active: 'thumbs'
                },

                // Flash settings
                flash_swf_url: '~/Scripts/plupload/js/Moxie.swf',

                // Silverlight settings
                silverlight_xap_url: '~/Scripts/plupload/js/Moxie.xap'
            });
        }
    })
})

