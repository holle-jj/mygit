 init();
    function init() {
         window.on("load",show)
        $("#write").on("click",addBlogs)
    }
    function show () {
        var storage=localStorage.getItem("attr")
         // {#缓存不存在时#}
            if(storage==null){
              $("#add").html("当前列表为空");
				return
            }
           // 缓存存在时
           var _add=$("#add").html();
           var attrlistArr=JSON.parse(storage);
           str="";
			for (var i=0;i<attrlistArr.length;i++) {
				var _title=attrlistArr[i]["titleName"];
				var _author=attrlistArr[i]["author"];
				var _time=attrlistArr[i]["time"];

				str+="<div><h3>"+_title+"</h3><h5>"+_author+"</h5><time>"+_time+"</time></div>"
				$("#add").html(str);
			}
        }
    function addBlogs() {
        location.href="/user/addblogs"
    }