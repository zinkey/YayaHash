yaya hash,简单好用的hash事件处理类


## 介绍

yaya hash是一个轻量级无依赖的hash事件处理类(压缩版1.41kb;完整版2.93kb)。当ria应用越来越复杂的时候，当触发异步请求事件繁多且复用性不佳的时候，当前进后退按钮在ria中成为摆设的时候，当...的时候（省略n种情况）,你需要yaya hash来帮忙。

## 使用方法

1.bind:绑定事件。只有一个参数：map对象。map里的key/value分为为action名称以及action行为。当hash变化促发action事件时，会将url里面的参数作为json传入执行。如果重复bind，会覆盖原有bind的事件。
	
	<a href="#getdata?id=1&page=1">a</a>
	<a href="#getdata?id=2&page=2">b</a>

	<script>
		YayaHash.bind({
			"getdata":function(json){
		    	alert(json.id); 
		    },
		    "test":function(json){
		     	alert(json);
		    }
		});
	</script>

2.unbind:取消绑定事件，只有一个参数（字符串或数组），表示要去掉绑定的事件名。

	YayaHash.unbind("test");

## 说明

1.只有当第一次载入页面或者hash发生变化时候才会促发事件。
2.yaya hash只作为ria资源定位所用，并不能取代普通事件绑定方式。

## 例子

例 bind,unbind用法

	<a href="#getdata?id=1">1</a>
	<a href="#getdata?id=2">2</a>

	YayaHash.bind({
	        "getdata":function(json){
	                baidu.ajax.get("data"+json.id,function(x,r){
	                    baidu.g("testdata").innerHTML=r;
	                });
	         },
	         "test":function(json){
	                alert(json);
	         }
	});
	YayaHash.unbind("test");	

## 更多

地址：http://uloveit.com.cn/hash/

© uloveit.com.cn 