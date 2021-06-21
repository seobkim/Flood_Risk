//최종점수합산

var weightList = null;
var totalFlood = null;

var defaultTotalColorArr = ['rgba(255, 255, 233,0.8)', 'rgba(255, 236, 179,0.8)','rgba(255, 213, 79,0.8)','rgba(255, 193, 7,0.8)','rgba(255, 160, 0,0.8)'];

		function resetColorTotal(){
			defaultTotalColorArr =['rgba(255, 255, 233,0.8)', 'rgba(255, 236, 179,0.8)','rgba(255, 213, 79,0.8)','rgba(255, 193, 7,0.8)','rgba(255, 160, 0,0.8)'];
			if(getLayerByName("totalLayer")!==null && getLayerByName("totalLayer").getVisible()){
		    	riskCalc()
		    }
		}
		
		function totalColSetting (hex) {
		    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

		    var r = parseInt(result[1], 16);
		    var g = parseInt(result[2], 16);
		    var b = parseInt(result[3], 16);
    
		    r /= 255, g /= 255, b /= 255;
		    var max = Math.max(r, g, b), min = Math.min(r, g, b);
		    var h, s, l = (max + min) / 2;

		    if(max == min){
		        h = s = 0; // achromatic
		    } else {
		        var d = max - min;
		        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		        switch(max) {
		            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
		            case g: h = (b - r) / d + 2; break;
		            case b: h = (r - g) / d + 4; break;
		        }
		        h /= 6;
		    }

		    s = s*100;
		    s = Math.round(s);
		    var l = l*100;
		    var l = Math.round(l);
		    h = Math.round(360*h);

		    var colorInHSL;
		    for(var i=0 ; i<defaultColorArr.length; i++){
		    	colorInHSL = 'hsl(' + h + ', ' + s + '%, ' + l + '%'+',0.8)';
		    	defaultTotalColorArr[i]=colorInHSL;
		    	l=l-15;
		    }
		    
		    if(getLayerByName("totalLayer")!==null && getLayerByName("totalLayer").getVisible()){
		    	riskCalc()
		    }
		}
		
		
		
		
function riskCalc() {
	
//	if($("input[name='grp1']:checked")[0] != null) {
//		$("input[name='grp1']:checked")[0].checked = false;
//	}
	
	var selectFloodTotal = document.getElementById("selectFloodTotal");
	var selectFactorCheck = document.getElementsByClassName("check");
	var weightList = document.getElementsByClassName("weight");
	var weightSum = 0;
	
	if(selectFloodTotal.value == "") {
		alert("침수 시뮬레이션을 선택해야 합니다.")
		return ;
	}
	
	for(var i=0; i<weightList.length; i++) {
		weightSum += weightListDf[i];
	}
	
	console.log(weightSum)
	
	if(weightSum < 0.99999999999999 || weightSum > 1.00000000000001) {
		alert("가중치의 합을 확인해주세요");
		return ;
	}

	var selectList = {
			"selectFlood" : selectFloodTotal.value,
			"floodWeight" : weightListDf[0]
	};
	
	var checkStack = 0;
	
	for (i = 0; i < selectFactorCheck.length; i++) {
		if(selectFactorCheck[i].checked == true) {
			switch(i) {
			case 0:
				selectList.floodWeight = weightListDf[0];
				break;
			case 1:
				selectList.popWeight = weightListDf[1];
				break;
			case 2:
				selectList.liveWeight = weightListDf[2];
				break;
			case 3:
				selectList.commerWeight = weightListDf[3];
				break;
			case 4:
				selectList.indusWeight = weightListDf[4];
				break;
			case 5:
				selectList.natureWeight = weightListDf[5];
				break;
			case 6:
				selectList.buildWeight = weightListDf[6];
				break;
			case 7:
				selectList.protectWeight = weightListDf[7];
				break;
			case 8:
				selectList.roadWeight = weightListDf[8];
				break;
			}
			checkStack++;
		}
	}
	
	if(checkStack <= 1) {
		alert("두개 이상의 인자를 선택해야 합니다.")
		return;
	}
	
	console.log(selectList)
	createTotalLayer(selectList);
}

function createTotalLayer(param) {

	var jsonData = JSON.stringify(param);
	
	if (getLayerByName("factorLayer")) {
		getLayerByName("factorLayer").setVisible(false);
	}
	
	if(getLayerByName("floodLayer")){
		getLayerByName("floodLayer").setVisible(false);
	}

	if (getLayerByName("nullLayer")) {
		getLayerByName("nullLayer").setVisible(false);
	}
	
	if (getLayerByName("totalLayer")) {
		getLayerByName("totalLayer").getSource().clear();
	}
	
	if(getLayerByName("borderLayer")) {
		getLayerByName("borderLayer").getSource().clear();
	}

//	if (getLayerByName("pipeLayer")) {
//		getLayerByName("pipeLayer").getSource().clear();
//	}

	var vectorSource = new ol.source.Vector({
		loader : function(extent, resolution) {

			console.log(extent);

			url = "./totalScore.do";
			var xhr = new XMLHttpRequest();
			xhr.open('POST', url);
			var onError = function() {
				vectorSource.removeLoadedExtent(extent);
			}
			xhr.onerror = onError;
			xhr.onload = function() {
				if (xhr.status == 200) {
					console.log(xhr);
					
					getLayerByName("totalLayer").getSource().clear();
					var result = JSON.parse(xhr.responseText);
					var testVOResult = result.testVOResult;
					weightList = result.weightList;
					totalFlood = result.selectFlood;
					var format = new ol.format.WKT();
					console.log(testVOResult)
					console.log(weightList)
					for (var i = 0; i < testVOResult.length; i++) {
						// wkt 객체 생성

						// 반환값을 wkt값으로 geom값 추출
						var geom = format.readGeometry(result.testVOResult[i].wkt);
						// 추출된 geom의 값으로 feature객체 생성
						var feature = new ol.Feature({
							geometry : geom,
						});
						
						// feature에 geom값 제외한 나머지 column 데이터 설정
						feature.setProperties(result.testVOResult[i]);

						// 벡터레이어의 벡터소스에 feature추가
						vectorSource.addFeature(feature);

					}
					
					if(totalFilterArr) {
						console.log(totalFilterArr)
					}
					if(totalFilterArr.length ==2){
						totalSimulFilter("totalScore");
						totalFilterArr=[];
					}else{
						
//					if(totalBool == true) {
						totalCacl("totalScore");
//					}else {
//						totalCaclRelative("totalScore");
//					}
						
					}
				} else {
					onError();
				}
			}
			xhr.send(jsonData);
		},
	});

	var vector = new ol.layer.Vector({
		name : "totalLayer",
		source : vectorSource,
	});

	map.addLayer(vector);

	//침수 테두리
	var vectorSource2 = new ol.source.Vector(
			{
				loader : function(extent, resolution) {
					
					url ="./borderView.do";
					var xhr = new XMLHttpRequest();
					xhr.open('POST', url);
					var onError = function() {
						vectorSource2.removeLoadedExtent(extent);
					}
					xhr.onerror = onError;
					xhr.onload = function() {
						if (xhr.status == 200) {
							var result =JSON.parse(xhr.responseText);
							var format = new ol.format.WKT();										
								for(var i=0; i<result.length;i++){
								// wkt 객체 생성
									
								//반환값을 wkt값으로 geom값 추출
								var geom = format.readGeometry(result[i].wkt);
								//추출된 geom의 값으로 feature객체 생성
								var feature2 = new ol.Feature({
									geometry : geom,
								});
								
								//feature에 geom값 제외한 나머지 column 데이터 설정
					            feature2.setProperties(result[i]);
								
								//벡터레이어의 벡터소스에 feature추가
					            vectorSource2.addFeature(feature2);
								}

						} else {
							onError();
						}
					}
					xhr.send();
				},
			});

	var vector2 = new ol.layer.Vector({
		name : "borderLayer",
		source : vectorSource2,
		style : new ol.style.Style({
			stroke : new ol.style.Stroke({
				color : 'rgba(255,0,0,1)',
				width : 5.5
			}),
		})
	});

	
	map.addLayer(vector2);
	
}

var totalFilterArr = [];
				
function totalFilter(val){
	
	totalFilterArr = [];
	switch($('select[name="totalSearch"]').val()){
	case "범위지정":
		if($('#totalLange1').val()!="" && $('#totalLange2').val() != ""){
		if(parseFloat($('#totalLange1').val()) < parseFloat($('#totalLange2').val())){
				totalFilterArr[0]= parseFloat($('#totalLange1').val());
				totalFilterArr[1]= parseFloat($('#totalLange2').val());
				
				riskCalc();
			}
		else{
			alert("범위가 잘못되었습니다");
		}
		}
		else{
			alert("범위를 입력하세요");
		}
		break;
	case "over":
		if($('#totalLange1').val() != ""){
				totalFilterArr[0]= parseFloat($('#totalLange1').val());
				totalFilterArr[1]= 0;
				
				riskCalc();
			}
		else{
			alert("범위를 입력하세요");
		}
		break;
	case "under": 
		if($('#totalLange2').val() != ""){
				totalFilterArr[0]= 0;
				totalFilterArr[1]= parseFloat($('#totalLange2').val());
				
				riskCalc();
			}
		else{
			alert("범위를 입력하세요");
		}
		break;
		
	
	}
}

function totalCacl(param) {

	var layerSize = getLayerByName("totalLayer").getSource().getFeatures().length;
	var feat = getLayerByName("totalLayer").getSource().getFeatures();

	// 인구수 0 이상인 값 추출해서 정렬하기 위해 배열에 삽입
	var arr = new Array();
	
	for (var i = 0; i < layerSize; i++) {
		feat[i].setStyle("");
		if (feat[i].get(param) > 0) {
			arr.push(feat[i].get(param));
		}
		;

	}
	console.log(arr);

	// 정렬
	arr.sort(function(a, b) { // 오름차순
		return a - b;
	});

	for (var i = 0; i < layerSize; i++) {

//		if (feat[i].get(param) >= 0
//				&& feat[i].get(param) < arr[0]) {
//			feat[i].setStyle(new ol.style.Style({
//				fill : new ol.style.Fill({
//					color : defaultTotalColorArr[0],
//		
//				}),
//				stroke : new ol.style.Stroke({
//					color : '#3399CC',
//					width : 1,
//				}),
//		
//			}))
//			
//			}else 
				if (feat[i].get(param) > 0
					&& feat[i].get(param) <= arr[Math.floor(arr.length / 4)]) {
				feat[i].setStyle(new ol.style.Style({
					fill : new ol.style.Fill({
						color : defaultTotalColorArr[1],

					}),
					stroke : new ol.style.Stroke({
						color : '#3399CC',
						width : 1,
					}),
//				text : new ol.style.Text({
//					scale : 2,
//					text : String(feat[i].get("gid")),
//				})

				}))

			} else if (feat[i].get(param) > arr[Math.floor(arr.length / 4)]
					&& feat[i].get(param) <= arr[Math.floor(arr.length / 4) * 2]) {
				feat[i].setStyle(new ol.style.Style({
					fill : new ol.style.Fill({
						color : defaultTotalColorArr[2],
					}),
					stroke : new ol.style.Stroke({
						color : '#3399CC',
						width : 1,
					}),
//				text : new ol.style.Text({
//					scale : 2,
//					text : String(feat[i].get("gid")),
//				})
				}))
			}

			else if (feat[i].get(param) > arr[Math.floor(arr.length / 4) * 2]
					&& feat[i].get(param) <= arr[Math.floor(arr.length / 4) * 3]) {
				feat[i].setStyle(new ol.style.Style({
					fill : new ol.style.Fill({
						color : defaultTotalColorArr[3],
					}),
					stroke : new ol.style.Stroke({
						color : '#3399CC',
						width : 1,
					}),
//				text : new ol.style.Text({
//					scale : 2,
//					text : String(feat[i].get("gid")),
//				})

				}))
			} else if (feat[i].get(param) > arr[Math.floor(arr.length / 5) * 3]) {
				feat[i].setStyle(new ol.style.Style({
					fill : new ol.style.Fill({
						color : defaultTotalColorArr[4],
					}),
					stroke : new ol.style.Stroke({
						color : '#3399CC',
						width : 1,
					}),

				}))
			} else {
			feat[i].setStyle(new ol.style.Style({
				stroke : new ol.style.Stroke({
					color : '#3399CC',
					width : 1,
				}),
//				text : new ol.style.Text({
//					scale : 2,
//					text : String(feat[i].get("gid")),
//				})

			}))
		}
		divTotalLegend(arr);

	}
}

//function totalCaclRelative(param) {
//
//	var layerSize = getLayerByName("totalLayer").getSource().getFeatures().length;
//	var feat = getLayerByName("totalLayer").getSource().getFeatures();
//
//	// 인구수 0 이상인 값 추출해서 정렬하기 위해 배열에 삽입
//	var arr = new Array();
//	
//	for (var i = 0; i < layerSize; i++) {
//		feat[i].setStyle("");
//		if (feat[i].get(param) > 0) {
//			arr.push(feat[i].get(param));
//		}
//		;
//
//	}
//	console.log(arr);
//
//	// 정렬
//	arr.sort(function(a, b) { // 오름차순
//		return a - b;
//	});
//
//	for (var i = 0; i < layerSize; i++) {
//
//		if (feat[i].get(param) >= arr[0]
//				&& feat[i].get(param) < arr[Math.floor(arr.length / 4)]) {
//			feat[i].setStyle(new ol.style.Style({
//				fill : new ol.style.Fill({
//					color : 'rgb(255, 204, 204, 0.8)',
//
//				}),
//				stroke : new ol.style.Stroke({
//					color : '#3399CC',
//					width : 1,
//				}),
//
//			}))
//
//		} else if (feat[i].get(param) >= arr[Math.floor(arr.length / 4)]
//				&& feat[i].get(param) < arr[Math.floor(arr.length / 4) * 2]) {
//			feat[i].setStyle(new ol.style.Style({
//				fill : new ol.style.Fill({
//					color : 'rgb(255, 153, 153,0.8)',
//				}),
//				stroke : new ol.style.Stroke({
//					color : '#3399CC',
//					width : 1,
//				}),
//
//			}))
//		}
//
//		else if (feat[i].get(param) >= arr[Math.floor(arr.length / 4) * 2]
//				&& feat[i].get(param) < arr[Math.floor(arr.length / 4) * 3]) {
//			feat[i].setStyle(new ol.style.Style({
//				fill : new ol.style.Fill({
//					color : 'rgb(255, 102, 102,0.8)',
//				}),
//				stroke : new ol.style.Stroke({
//					color : '#3399CC',
//					width : 1,
//				}),
//
//			}))
//		} else if (feat[i].get(param) >= arr[Math.floor(arr.length / 5) * 3]) {
//			feat[i].setStyle(new ol.style.Style({
//				fill : new ol.style.Fill({
//					color : 'rgb(255, 51, 51,0.8)',
//				}),
//				stroke : new ol.style.Stroke({
//					color : '#3399CC',
//					width : 1,
//				}),
//
//			}))
//		}
//
//	}
//	divTotalLegend(arr);
//
//}

//var totalBool = true; // 절대 false, 상대 true
//// 상대/절대 작동시키는 버튼
//function totalLegendBtn() {
//
//	if (!$("#tgBtn2").is(':checked')) {
//		totalBool = false;
//		totalRadioBtn();
//	} else {
//		totalBool = true;
//		totalRadioBtn();
//	}
//}

//function totalRadioBtn(){
//	
//	if ($("#tgBtn2").is(':checked') == false) {
//		simulBool = false;
//		$("#tgBtn2").prop("checked", false);
//		
//	} else {
//		$("#tgBtn2").prop("checked", true);
//	}
//	
//	riskCalc();
//}

//-조건별 분포 보기
function totalSimulFilter(param){
	   
	   
   	var layerSize=getLayerByName("totalLayer").getSource().getFeatures().length;
		var feat = getLayerByName("totalLayer").getSource().getFeatures();
   	//인구수 0 이상인 값 추출해서 정렬하기 위해 배열에 삽입
		
		if($('select[name="totalSearch"]').val()=="범위지정"){
		for(var i=0 ; i<layerSize; i++){
			
			if(feat[i].get(param)>totalFilterArr[0] && feat[i].get(param)<=totalFilterArr[1]){
				feat[i].setStyle(new ol.style.Style({
					fill : new ol.style.Fill({
						color : 'rgb(159, 201, 60, 0.8)',
						
					}),
					    	    	  stroke: new ol.style.Stroke({
					    	    	    color: '#3399CC',
					    	    	    width: 1,
					    	    	  }),
					
				}))
		            
			}
			else{
				feat[i].setStyle(new ol.style.Style({
					
					   stroke: new ol.style.Stroke({
					   color: 'rgba(150,150,150,0)',
					   width: 1,
					  }),
					
				}))
				
			}
			
		}
		}
		else if($('select[name="totalSearch"]').val()=="over"){
			for(var i=0 ; i<layerSize; i++){
				
				
				if(feat[i].get(param)>totalFilterArr[0]){
					feat[i].setStyle(new ol.style.Style({
						fill : new ol.style.Fill({
							color : 'rgb(159, 201, 60, 0.8)',
							
						}),
						    	    	  stroke: new ol.style.Stroke({
						    	    	    color: '#3399CC',
						    	    	    width: 1,
						    	    	  }),
						
					}))
			            
				}
				else{
					feat[i].setStyle(new ol.style.Style({
						
						   stroke: new ol.style.Stroke({
						   color: 'rgba(150,150,150,0)',
						   width: 1,
						  }),
						
					}))
					
				}
				
			}
			}
		if($('select[name="totalSearch"]').val()=="under"){
			for(var i=0 ; i<layerSize; i++){
				
				
				if(feat[i].get(param)<=totalFilterArr[1]){
					feat[i].setStyle(new ol.style.Style({
						fill : new ol.style.Fill({
							color : 'rgb(159, 201, 60, 0.8)',
							
						}),
						    	    	  stroke: new ol.style.Stroke({
						    	    	    color: '#3399CC',
						    	    	    width: 1,
						    	    	  }),
						
					}))
			            
				}
				else{
					feat[i].setStyle(new ol.style.Style({
						
						   stroke: new ol.style.Stroke({
						   color: 'rgba(150,150,150,0)',
						   width: 1,
						  }),
						
					}))
					
				}
				
			}
			}
		$("#factorLegendDiv").css("display","none");
   }

function divTotalLegend(arr) {

	if(arr.length!=0){
		var cell = document.getElementById("factorLegendDiv");
		while (cell.hasChildNodes()) {
			cell.removeChild(cell.firstChild);
		}

		$("#legendDiv").css("display","none");
		$("#factorLegendDiv").css("display", "block");
		
//		if(totalBool == true) {
		
		var div0 = document.createElement("div");
		div0.setAttribute("id", "divTitle");
		div0.style.width = "320px";
		div0.style.height = "20px";
		div0.innerHTML = "<b>종합점수</b>(백점기준)";
		
//		if(totalBool == true) {
		
			var div1Legend = document.createElement("div");
			div1Legend.setAttribute("id", "legendTitle");
			div1Legend.style.width = "50px";
			div1Legend.style.height = "25px";
			div1Legend.innerHTML = "1등급";
			
			var div2Legend = document.createElement("div");
			div2Legend.setAttribute("id", "legendTitle");
			div2Legend.style.width = "50px";
			div2Legend.style.height = "25px";
			div2Legend.innerHTML = "2등급";
			
			var div3Legend = document.createElement("div");
			div3Legend.setAttribute("id", "legendTitle");
			div3Legend.style.width = "50px";
			div3Legend.style.height = "25px";
			div3Legend.innerHTML = "3등급";
			
			var div4Legend = document.createElement("div");
			div4Legend.setAttribute("id", "legendTitle");
			div4Legend.style.width = "50px";
			div4Legend.style.height = "25px";
			div4Legend.innerHTML = "4등급";
		
			var div5Legend = document.createElement("div");
			div5Legend.setAttribute("id", "legendTitle");
			div5Legend.style.width = "50px";
			div5Legend.style.height = "25px";
			div5Legend.innerHTML = "5등급";
			
			var div1 = document.createElement("div");
			div1.innerHTML = "<div id='factorElement' style= 'width:80px; text-align:right; background-color:"+defaultTotalColorArr[4]+"'>"+(arr[Math.floor(arr.length / 4) * 3]).toFixed(1)+"</div>"+
			"<div class='factorElement' id='factorElement' style='width:180px; text-align:left; background-color:"+defaultTotalColorArr[4]+"'>"+"&nbsp;초과</div>";
		
			var div2 = document.createElement("div");
			div2.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultTotalColorArr[3]+"'>"+(arr[Math.floor(arr.length / 4) * 2]).toFixed(1)+"</div>"+
			"<div class='factorElement' id='factorElement' style='width:40px; text-align:left; background-color:"+defaultTotalColorArr[3]+"'>"+
			"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultTotalColorArr[3]+"'>~</div>"+
			"<div id='factorElement' style='text-align:right; width:40px; background-color:"+defaultTotalColorArr[3]+"'>"+(arr[Math.floor(arr.length / 4) * 3]).toFixed(1)+"</div>"+
			"<div id='factorElement' class='factorElement' style='text-align:left;  width:90px;background-color:"+defaultTotalColorArr[3]+"'>"+"&nbsp;이하</div>";
			
			var div3 = document.createElement("div");
			div3.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultTotalColorArr[2]+"'>"+(arr[Math.floor(arr.length / 4)]).toFixed(1)+"</div>"+
			"<div id='factorElement' class='factorElement' style='width:40px; text-align:left; background-color:"+defaultTotalColorArr[2]+"'>"+
			"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultTotalColorArr[2]+"'>~</div>"+
			"<div id='factorElement' style='text-align:right; width:40px; background-color:"+defaultTotalColorArr[2]+"'>"+(arr[Math.floor(arr.length / 4) * 2]).toFixed(1)+"</div>"+
			"<div id='factorElement' class='factorElement' style='text-align:left;  width:90px;background-color:"+defaultTotalColorArr[2]+"'>"+"&nbsp;이하</div>";
			
			var div4 = document.createElement("div");
			div4.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultTotalColorArr[1]+"'>0</div>"+
			"<div id='factorElement' class='factorElement' style='width:40px; text-align:left; background-color:"+defaultTotalColorArr[1]+"'>"+
			"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultTotalColorArr[1]+"'>~</div>"+
			"<div id='factorElement' style='text-align:right; width:40px; background-color:"+defaultTotalColorArr[1]+"'>"+(arr[Math.floor(arr.length / 4)]).toFixed(1)+"</div>"+
			"<div id='factorElement' class='factorElement' style='text-align:left;  width:90px;background-color:"+defaultTotalColorArr[1]+"'>"+"&nbsp;이하</div>";
			
			var div5 = document.createElement("div");
			div5.innerHTML = "<div style='width: 260px; height:25px; text-align:center; background-color:"+defaultTotalColorArr[0]+"'>0</div>" +
					"<div style='text-align:right; font-size:12px; margin-right:12px;'>격자크기: 100×100m</div>";
		
		
			this.document.getElementById("factorLegendDiv").appendChild(div0);
			this.document.getElementById("factorLegendDiv").appendChild(document.createElement("hr"));
			this.document.getElementById("factorLegendDiv").appendChild(div1Legend);
			this.document.getElementById("factorLegendDiv").appendChild(div1);
			this.document.getElementById("factorLegendDiv").appendChild(div2Legend);
			this.document.getElementById("factorLegendDiv").appendChild(div2);
			this.document.getElementById("factorLegendDiv").appendChild(div3Legend);
			this.document.getElementById("factorLegendDiv").appendChild(div3);
			this.document.getElementById("factorLegendDiv").appendChild(div4Legend);
			this.document.getElementById("factorLegendDiv").appendChild(div4);
			this.document.getElementById("factorLegendDiv").appendChild(div5Legend);
			this.document.getElementById("factorLegendDiv").appendChild(div5);
	
//		}else {
//			
//			var div2 = document.createElement("div");
//			div2.style.width = "180px"
//			div2.style.height = "25px"
//			div2.innerHTML = "0 ~ 25";
//			div2.style.backgroundColor = "#FFFF36";
//	
//			var div3 = document.createElement("div");
//			div3.style.width = "180px"
//			div3.style.height = "25px"
//			div3.innerHTML = "25 ~ 50";
//			div3.style.backgroundColor = "#FFBB00";
//	
//			var div4 = document.createElement("div");
//			div4.style.width = "180px"
//			div4.style.height = "25px"
//			div4.innerHTML = "50 ~ 75";
//			div4.style.backgroundColor = "#FF0000";
//			
//			var div5 = document.createElement("div");
//			div5.style.width = "180px"
//			div5.style.height = "25px"
//			div5.innerHTML = "75 ~ 100";
//			div5.style.backgroundColor = "#FF0099";
//			
//			this.document.getElementById("legendDiv").appendChild(div0);
//			this.document.getElementById("legendDiv").appendChild(document.createElement("hr"));
//			this.document.getElementById("legendDiv").appendChild(div2);
//			this.document.getElementById("legendDiv").appendChild(div3);
//			this.document.getElementById("legendDiv").appendChild(div4);
//			this.document.getElementById("legendDiv").appendChild(div5);
//		}
	}else {
		$("#factorLegendDiv").css("display","none");
	}
}
