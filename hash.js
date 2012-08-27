/*yaya template 1.0.0 under MIT License 2011.4.21*/
var YayaHash = (function(){	
		var HashEvt = {};
		var nowItem ="";
		function isArray(source) {
    		return '[object Array]' == Object.prototype.toString.call(source);
		}
		function queryToJson(url) {
		    var query   = url.substr(url.lastIndexOf('?') + 1),
		        params  = query.split('&'),
		        len     = params.length,
		        result  = {},
		        i  = 0,
		        key, value, item, param;
		    for (; i < len; i++) {
		        param   = params[i].split('=');
		        key     = param[0];
		        value   = param[1];
		        item = result[key];
		        if ('undefined' == typeof item) {
		            result[key] = value;
		        } else if (baidu.lang.isArray(item)) {
		            item.push(value);
		        } else {
		            result[key] = [item, value];
		        }
		    }
		    return result;
		}
		function callback(){
			var hasharray = window.location.hash.split("#");
			if (hasharray.length==1){
				return;
			}
			var hashitem = location.href.match(/#(.*)/);
			if (hashitem==null)
			{
				return;
			}
			hashitem=hashitem[0];
			var query = hashitem.match(/#(\w*)/);
			/*重复query请求会被忽略*/
			if (nowItem==hashitem)
			{
				return;
			}
			var event=null,json=null;
			if (query){
				event=query[1];
				json=queryToJson(hashitem);
				
			}
			if (event&&json&&HashEvt[event]){
				HashEvt[event](json);
				nowItem = hashitem;
			}
		}
		//fix old ie hash bug（hash不认"?"号）
		function h2hash(href)
		{
				var hashM = href.match(/#(.*)/);
				return hashM?hashM[0]:"";
		}

		/*for ie：创建iframe来实现前进后退按钮*/
		if (document.all)
		{
			var f = document.createElement("iframe");
			f.scr="javascript:0;";
			f.style.display="none";
			document.getElementsByTagName("head")[0].appendChild(f);
			var iframe = f.contentWindow.document;
				iframe.open().close();
				iframe.location.hash=location.hash;
			var temphash =h2hash(f.contentWindow.document.location.href);
			var hashlog = h2hash(location.href);
		}
		setInterval(function(){
			/*for ie：同步与iframe的hash*/
			if (document.all)
			{
					if (hashlog!=h2hash(location.href))
					{
						var iframe = f.contentWindow.document;
						iframe.open().close();
						hashlog = temphash=iframe.location.hash=h2hash(location.href);
					}
					else{
						if (temphash!=h2hash(f.contentWindow.document.location.href))
						{
							 hashlog = temphash = location.hash=h2hash(f.contentWindow.document.location.href);
						}
					}
			}
			callback();
		},100);
		return {
			"bind":function(map){
				for (var item in map){
					HashEvt[item]=map[item];
				}
			},
			"unbind":function(array){
				if (!isArray(event))
				{
					array = [array];
				}
				for (var i=0;i<array.length;i++){
					if (HashEvt[array[i]]){
						delete HashEvt[array[i]];
					}
				}
			}
		};	
})();