///////////////获取经纬度
    function getPosition(callback){
		//使用了高德地图的插件
	    AMap.plugin('AMap.Geolocation', function() {
	    	console.log("当前插件已经加载成功了")
	        var geolocation = new AMap.Geolocation({
	            enableHighAccuracy: true,//是否使用高精度定位，默认:true
	            timeout: 10000,          //超过10秒后停止定位，默认：5s
	            buttonPosition:'RB',    //定位按钮的停靠位置
	            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
	            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点
	
	        });
	        map.addControl(geolocation);
	        geolocation.getCurrentPosition(function(status,result){
	            if(status=='complete'){
	            	//定位成功了
	                getPositionOnComplete(result)
	            }else{
	                getPositionOnError(result)
	            }
	        });
	    });
	    
	    
	     //解析定位结果
	    function getPositionOnComplete(data) {
//	  	alert(data.position.getLng()+"===="+data.position.getLat());
	  		var posiArr={};
			posiArr["lng"]=data.position.getLng();
			posiArr["lat"]=data.position.getLat();
	    	
	    	
			//调用不同的业务层的方法
			callback(posiArr);
			
	    }
	    //解析定位错误信息
	    function getPositionOnError(data) {
	        document.getElementById('status').innerHTML='定位失败'
	        document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
	    }
	    
	}
    

////////////////////////获取地址的
    function regeoCode(lnglat,callback) {
    	console.log("------------")
        if(!geocoder){
            geocoder = new AMap.Geocoder({
//              city: "010", //城市设为北京，默认：“全国”
                radius: 1000 //范围，默认：500
            });
        }

        var result=geocoder.getAddress(lnglat, getData);
        
      
        function getData(status, result){
        	
        	if (status === 'complete') {
            	console.log("具体的信息");
            
            	//在当前经纬度处添加点标记
    			callback(result.regeocode);
            	
            	//

            }else{
                log.error('根据经纬度查询地址失败')
            }
        	
        	
        }
    }
    

//创建点标记到地图上
	function addMarker(lnglat){
    	
    	var marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: lnglat,
            offset: new AMap.Pixel(-13, -30)
        });
        marker.setMap(map);
        
        return marker; 
    }
	
	//创建信息窗体的
	function createInfoWindow(_content,_lnglat){
		var infoWindow = new AMap.InfoWindow({
            content: _content //使用默认信息窗体框样式，显示信息内容
        });

        infoWindow.open(map, _lnglat);
        
        return infoWindow;
	}
