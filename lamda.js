//  lamda.js 0.1
//  (c) 2014-2015 Eftar Miah (এফতার মিয়া)
(function(){

    //polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
        (function() {
            // Make sure we trim BOM and NBSP
            var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
            String.prototype.trim = function() {
                return this.replace(rtrim, '');
            };
        })();
    }

    //polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
    if (!Array.isArray) {
        Array.isArray = function(arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }

    var lamda2Function = function (str, isReturn) {
        var tuple = str.split("->");
        var params = tuple.length >1 ? tuple[0]:"it";
        var body = tuple.length > 1 ? tuple[1]: tuple[0];
        var returnStmt = isReturn === true ? "return" : "";

        var fnStr = "(function ("+params+") { "+returnStmt+" "+body+";})";
        var fn = eval(fnStr);
        return fn;
    };

    var lamda = function() {};

    lamda.from = function(list) {
        var l = new lamda();
        l.list = Array.isArray(list)? list.slice(0) : [];
        return l;
    };

    lamda.prototype = {

        filter: function(predicate) {
            var fn = lamda2Function(predicate, true);

            var newList = [];
            for (var n=0; n<this.list.length; n++) {
                if (fn.call(this, this.list[n])) {
                    newList.push(this.list[n]);
                }
            }
            this.list = newList;
            return this;
        },

        map: function(func) {
            var fn = lamda2Function(func, true);
            var newList = [];
            for (var n=0; n<this.list.length; n++) {
                newList[n] = fn.call(this, this.list[n]);
            }
            this.list = newList;
            return this;
        },

        limit: function(num) {
            this.list = this.list.slice(0,num);
            return this;
        },

        forEach:function (consumer) {
            var fn = lamda2Function(consumer, false);
            for (var n=0; n<this.list.length; n++) {
                fn.call(this, this.list[n]);
            }
            return this;
        },

        toList: function() {
            return this.list;
        },

        first: function(defaultVal){
            var val = defaultVal || null;
            return this.list.length > 0 ? this.list[0]: val;
        },

        groupBy: function(func) {
            var fn = lamda2Function(func, true);

            var map = {};
            for (var n=0; n<this.list.length; n++) {
                var key =fn.call(this, this.list[n]);
                if (!map[key]) {
                    map[key]=[];
                }
                map[key].push(this.list[n]);
            }
            return map;
        }

    };
    this.lamda = this.λ = this.লামদা = lamda;

}.call(this));
