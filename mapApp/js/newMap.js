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
            if(status=='complete'){
            	//定位成功
            	onComplete(result)  //解析定位结果
            	alert("成功")
            }else{
            	//定位失败
                onError(result)
            }
        });
    });
    }   
    //解析定位结果
    function onComplete(data) {
    	alert("定位成功")
        $('#status').html('定位成功')
        arrinfo={};
        lnglat=data.position   //经纬度
//      city=data.addressComponent.city;   //城市
//		arrinfo.lng=data.position.getLng();
//		arrinfo.lat=data.position.getLat();
    	arrinfo.province=data.addressComponent.province;
        arrinfo.city=data.addressComponent.city;
		arrinfo.formattedAddress=data.formattedAddress;	
		alert(arrinfo)
    	addMarker(lnglat)  //添加点标记
        searchINfo(undefined,lnglat,arrinfo.city)   //周边搜索  没有参数值 用undefined 代替	
        return arrinfo
        
    }
    //解析定位错误信息
    function onError(data) {
        $('#status').html('定位失败')
        $('#result').html('失败原因排查信息:'+data.message)
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
	//周边搜索
	 function searchINfo(_type,lnglat,city){
    	AMap.service(["AMap.PlaceSearch"], function() {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({ 
            type: _type, // 兴趣点类别
            pageSize: 5, // 单页显示结果条数
            pageIndex: 1, // 页码
//          city: "010", // 兴趣点城市
//          citylimit: true,  //是否强制限制在设置的城市内搜索
            map: map, // 展现结果的地图实例
            panel: "panel", // 结果列表将在此容器中进行展示。
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        
        var cpoint = lnglat; //中心点坐标
        placeSearch.searchNearBy('', cpoint, 1000, function(status, result) {
        	if (status=="complete") {
        		//poiList  兴趣点列表   pois数组
        		console.log(result.poiList.pois)
        		for (var i=0;i<result.poiList.pois.length;i++) {
        			var _items=result.poiList.pois[i];
        			//商家名+商家电话+商家地址+商家经纬度+商家距离中心距离
			console.log(_items.name+"--"+_items.tel+"--"+_items.address+"--"+_items.loction+_items.distance)
			var shopLnglat=_items.loction    //商家经纬度
        		}
        	} else if(status=="no_data"){
        		//搜索结果为0
        		$("#serchrResult").html("没有搜索到结果")
        	}else{
        		$("#serchrResult").html("搜索不正确")
        	}
        });
    });   
    }  