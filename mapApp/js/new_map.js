function getPosition(){
    	AMap.plugin('AMap.Geolocation', function() {
        var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：5s
            buttonPosition:'RB',    //定位按钮的停靠位置
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            zoomToAccuracy: true,   //定位成功后是否自动调整地图视野到定位点

        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition(function(status,result){
        	alert(status+"_----")
        	alert(result)
            if(status=='complete'){
            	//定位成功
            	onComplete(result)  //解析定位结果
            	lnglat=result.position  //获取经纬度
//          	console.log(lnglat)  
//          	console.log(result.position.getLng())
//          	console.log(result.position.getLat())
            	addMarker(lnglat)  //添加点标记
                searchInfo(undefined,lnglat)   //周边搜索  没有参数值 用undefined 代替
            }else{
            	//定位失败
                onError(result)
            }
        });
    });
    }   
    //解析定位结果
    function onComplete(data) {
        document.getElementById('status').innerHTML='定位成功'
        var positionObj={};
		positionObj.lng=data.position.getLng();
		positionObj.lat=data.position.getLat();
    }
    //解析定位错误信息
    function onError(data) {
        document.getElementById('status').innerHTML='定位失败'
        document.getElementById('result').innerHTML = '失败原因排查信息:'+data.message;
    }
    // 添加点标记
    function addMarker(lnglat) {
        marker = new AMap.Marker({
            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
            position: lnglat,
            offset: new AMap.Pixel(-13, -30)
        });
        marker.setMap(map);
    }
    //创建信息窗体的         参数  文本内容    经纬度
	function createInfoWindow(_content,_lnglat){
		var infoWindow = new AMap.InfoWindow({
            content: _content //使用默认信息窗体框样式，显示信息内容
        });

        infoWindow.open(map, _lnglat);
        
        return infoWindow;
	}