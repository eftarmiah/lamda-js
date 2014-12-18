//  lamda.js 0.1
//  (c) 2014-2015 Eftar Miah
var λ = lamda = function() {

};

lamda.from =function(list) {
    var l = new lamda();
    l.list = list.slice(0);//clone list
    return l;
};

lamda.prototype = {

    _generateFn: function (str, isReturn) {
        var tuple = str.split("->");
        var params = tuple.length >1 ? tuple[0]:"it";
        var body = tuple.length > 1 ? tuple[1]: tuple[0];
        var returnStmt = isReturn === true ? "return" : "";

        var fnStr = "(function ("+params+") { "+returnStmt+" "+body+";})";
        var fn = eval(fnStr);
        return fn;
    },

    filter: function(predicate) {
        var fn = this._generateFn(predicate, true);

        var newlist = [];
        for (var n=0; n<this.list.length; n++) {
            if (fn.call(this, this.list[n])) {
                newlist.push(this.list[n]);
            }
        }
        this.list = newlist;
        return this;
    },

    map: function(func) {
        var fn = this._generateFn(func, true);
        var newlist = [];
        for (var n=0; n<this.list.length; n++) {
            newlist[n] = fn.call(this, this.list[n]);
        }
        this.list = newlist;
        return this;
    },

    limit: function(num) {
        this.list = this.list.slice(0,num);
        return this;
    },

    forEach:function (consumer) {
        var fn = this._generateFn(consumer, true);
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
        var fn = this._generateFn(func, true);

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

