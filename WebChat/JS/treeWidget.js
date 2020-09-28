$(function () {
    $.widget("custom.treeWidget", {
        options: {
            extensions: [],
            treeData: {},
            selectMode: 1,
            //checkbox: true,
            onClickNode: function () { }
        },
        _create: function () { 
            debugger
            this.options.activate = function (e, data) {
                this.options.onClickNode && this.options.onClickNode(e, data);
            }.bind(this);

            this.options.source = this._handlerTreeData(this.options.treeData);
            this.element.fancytree(this.options);
        },
        _refresh: function () {

            debugger
            this.options.activate = function (e, data) {
                this.options.onClickNode && this.options.onClickNode(e, data);
            }.bind(this);  

            debugger
            //this.element.children().remove();

            //this.options.source = this._handlerTreeData(this.options.treeData);
            this.element.fancytree(this.options); 

            this.element.css('display', 'block');



        },
        _handlerTreeData: function (data) {
            var SOURCE = [
                {
                    "key": "1",
                    "title": "Singer Chat",
                    "folder": true,
                    "expanded": true,
                    "children": []
                },
                {
                    "key": "2",
                    "title": "Group Chat",
                    "folder": true,
                    "expanded": true,
                    "children": []
                }
            ]

            for (let m of data.InfoUser) {
                var tmpId = 1
                var tmp = { "key": m.UserId, "title": m.FullName, type: 'user', 'data': m };
                SOURCE[0].children.push(tmp);
                tmpId++;
            }
            for (let m of data.InfoRoom) {
                var tmpId = 1
                var tmp = { "key": m.RoomId, "title": m.RoomName, type: 'room', 'data': m };
                SOURCE[1].children.push(tmp);
                tmpId++;
            }
        
            //sessionStorage.setItem('treeData',JSON.stringify(SOURCE)); 
            return SOURCE;
        },
        _setOptions: function () {
            // _super and _superApply handle keeping the right this-context
            debugger
            this._superApply(arguments);
            this._refresh();
        },

        // _setOption is called for each individual option that is changing
        _setOption: function (key, value) {
            this._super(key, value);
        }
    })
})

