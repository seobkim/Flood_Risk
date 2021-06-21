		
	
var defaultColorArr = ['rgba(255, 255, 233,0.8)', 'rgba(255, 236, 179,0.8)','rgba(255, 213, 79,0.8)','rgba(255, 193, 7,0.8)','rgba(255, 160, 0,0.8)'];

		function resetFactorColor(){
			
			defaultColorArr = ['rgba(255, 255, 233,0.8)', 'rgba(255, 236, 179,0.8)','rgba(255, 213, 79,0.8)','rgba(255, 193, 7,0.8)','rgba(255, 160, 0,0.8)'];
			
			if($('select[name=selectFactors]').val() =="거주인구" ||
					$('select[name=selectFactors]').val() =="주거지역" ||
					$('select[name=selectFactors]').val() =="상업지역" ||
					$('select[name=selectFactors]').val() =="공업지역" ||
					$('select[name=selectFactors]').val() =="자연녹지" ||
					$('select[name=selectFactors]').val() =="취약건물" ||
					$('select[name=selectFactors]').val() =="보호대상" ||
					$('select[name=selectFactors]').val() =="도로연장"){
				$('#colorPic2').val("#ebecb3");
				
				factorSelected($('select[name=selectFactors]').val());
//				$("#factor option:selected").click();
		    }
		}
		
		function factorColSetting(hex) {
			
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
		    	defaultColorArr[i]=colorInHSL;
		    	l=l-15;
		    }
		    
			if($('select[name=selectFactors]').val() =="거주인구" ||
					$('select[name=selectFactors]').val() =="주거지역" ||
					$('select[name=selectFactors]').val() =="상업지역" ||
					$('select[name=selectFactors]').val() =="공업지역" ||
					$('select[name=selectFactors]').val() =="자연녹지" ||
					$('select[name=selectFactors]').val() =="취약건물" ||
					$('select[name=selectFactors]').val() =="보호대상" ||
					$('select[name=selectFactors]').val() =="도로연장"){
				
//				$("#factor option:selected").click();
				factorSelected($('select[name=selectFactors]').val());
		    }
		} 

		//인자 5분위 표출
	    function factorSelected(name){
	    	
			var param;
			switch(name){
			
			case "선택없음": 
				
				$("#factorLegendDiv").css("display","none");
				
		    	if(getLayerByName("floodLayer")){
		    		getLayerByName("floodLayer").setVisible(false)
		    	}
		    	
		    	if(getLayerByName("totalLayer")){
		    		getLayerByName("totalLayer").setVisible(false)
		    	}
		    	
		    	map.removeLayer(getLayerByName("factorLayer"));

		    	if(getLayerByName("factorLayer")){
					getLayerByName("factorLayer").getSource().clear();
				}
			break;
			
			case "거주인구": param ="popCnt";
			createFactorLayer(param);
			break;
			
			case "취약건물": param = "buildCnt";
			createFactorLayer(param);
			break;
			
			case "공업지역": param = "indusArea";
			createFactorLayer(param);
			break;
			
			case "주거지역": param = "liveArea";
			createFactorLayer(param);
			break;
			
			case "상업지역": param = "commerArea";
			createFactorLayer(param);
			break;
			
			case "자연녹지지역": param = "natureArea";
			createFactorLayer(param);
			break;
			
			case "보호대상": param = "protectFacilityCnt";
			createFactorLayer(param);
			break ;
			
			case "도로연장": param = "roadLen";
			createFactorLayer(param);
			break;
			}
			
	    }
	    
	    function createFactorLayer(param){
	    	
	    	if(getLayerByName("floodLayer")){
	    		getLayerByName("floodLayer").setVisible(false)
	    	}
	    	
	    	if(getLayerByName("totalLayer")){
	    		getLayerByName("totalLayer").setVisible(false)
	    	}
	    	
//	    	if (getLayerByName("pipeLayer")) {
//	    		getLayerByName("pipeLayer").setVisible(false)
//	    	}
	    	
	    	if (getLayerByName("nullLayer")) {
	    		getLayerByName("nullLayer").setVisible(false);
	    	}

	    	map.removeLayer(getLayerByName("factorLayer"));
	    	
	    	map.removeLayer(getLayerByName("nullLayer"));
	    	
	    	map.removeLayer(getLayerByName("borderLayer"));

	    	if(getLayerByName("factorLayer")){
				getLayerByName("factorLayer").getSource().clear();
			}
	    	
			if(getLayerByName("nullLayer")){
				getLayerByName("nullLayer").getSource().clear();
			}
				
			if(getLayerByName("borderLayer")){
				getLayerByName("borderLayer").getSource().clear();
			}
			
			//빈 격자
			var vectorSource3 = new ol.source.Vector(
						{
							loader : function(extent, resolution) {
								
								url ="./nullView.do";
								var xhr = new XMLHttpRequest();
								xhr.open('POST', url);
								var onError = function() {
									vectorSource3.removeLoadedExtent(extent);
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
											var feature3 = new ol.Feature({
												geometry : geom,
											});
											
											//feature에 geom값 제외한 나머지 column 데이터 설정
								            feature3.setProperties(result[i]);
											
											//벡터레이어의 벡터소스에 feature추가
								            vectorSource3.addFeature(feature3);
											}
	
									} else {
										onError();
									}
								}
								xhr.send();
							},
						});
	
				
				var vector3 = new ol.layer.Vector({
					name : "nullLayer",
					source : vectorSource3,
					style : new ol.style.Style({
						stroke: new ol.style.Stroke({
			    	    	color: '#3399CC',
			    	    	width: 1,
			    	    	}),
					})
				});
			
				map.addLayer(vector3);
			
			
				var vectorSource = new ol.source.Vector(
					{
						loader : function(extent, resolution) {
							
							url ="./"+param+".do";
							var xhr = new XMLHttpRequest();
							xhr.open('POST', url);
							var onError = function() {
								vectorSource.removeLoadedExtent(extent);
							}
							xhr.onerror = onError;
							xhr.onload = function() {
								if (xhr.status == 200) {
									getLayerByName("factorLayer").setVisible(bool);
									getLayerByName("factorLayer").getSource().clear();
									var result =JSON.parse(xhr.responseText);
									
									var format = new ol.format.WKT();
										for(var i=0; i<result.length;i++){
										// wkt 객체 생성
										
										
										//반환값을 wkt값으로 geom값 추출
										var geom = format.readGeometry(result[i].wkt);
										//추출된 geom의 값으로 feature객체 생성
										var feature = new ol.Feature({
											geometry : geom,
										});
										
										//feature에 geom값 제외한 나머지 column 데이터 설정
							            feature.setProperties(result[i]);
										//벡터레이어의 벡터소스에 feature추가
							            vectorSource.addFeature(feature);
										}
										
										if(factorFilterArr.length ==2){
											factorCalcFilter(param);
										}else{
											if(param=="protectFacilityCnt"){
											    factorProtectCalc(param);
											}else{
												factorCalc(param);
											} 
										}
									
									}
								else {
									onError();
								}
							}
							
							xhr.send();
						},						
					});

			var vector = new ol.layer.Vector({
				name : "factorLayer",
				source : vectorSource,
			});
			map.addLayer(vector);
			
			//침수 테두리
			var vectorSource4 = new ol.source.Vector(
					{
						loader : function(extent, resolution) {
							
							url ="./borderView.do";
							var xhr = new XMLHttpRequest();
							xhr.open('POST', url);
							var onError = function() {
								vectorSource3.removeLoadedExtent(extent);
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
										var feature4 = new ol.Feature({
											geometry : geom,
										});
										
										//feature에 geom값 제외한 나머지 column 데이터 설정
							            feature4.setProperties(result[i]);
										
										//벡터레이어의 벡터소스에 feature추가
							            vectorSource4.addFeature(feature4);
										}

								} else {
									onError();
								}
							}
							xhr.send();
						},
					});

			var vector4 = new ol.layer.Vector({
				name : "borderLayer",
				source : vectorSource4,
				style : new ol.style.Style({
					stroke : new ol.style.Stroke({
						color : 'rgba(255,0,0,1)',
						width : 5.5
					}),
				})
			});
		
			
			map.addLayer(vector4);
			
		}
	   
  			function factorCalc(param){ 
 	    	
 	    	var layerSize=getLayerByName("factorLayer").getSource().getFeatures().length;
			var feat = getLayerByName("factorLayer").getSource().getFeatures();
			
 	    	//인구수 0 이상인 값 추출해서 정렬하기 위해 배열에 삽입
			var arr = new Array();
			for(var i=0 ; i<layerSize; i++){
				feat[i].setStyle("");
				if(feat[i].get(param)>0){
					
					arr.push(feat[i].get(param));
					};
				
			}
			// 정렬

			arr.sort(function(a, b) { // 오름차순
		    return a - b;
		});
			
			for(var i=0 ; i<layerSize; i++){
				
//				
//				if(feat[i].get(param)== 0){
//					feat[i].setStyle(new ol.style.Style({
//						fill : new ol.style.Fill({
//							color : defaultColorArr[0],
//						}),
//						    	    	  stroke: new ol.style.Stroke({
//						    	    	    color: '#3399CC',
//						    	    	    width: 1,
//						    	    	  }),
//						
//					}))
//			            
//				}else 
				
				if(feat[i].get(param)>=arr[0] && feat[i].get(param)<=arr[Math.floor(arr.length/4)]){
					feat[i].setStyle(new ol.style.Style({
						fill : new ol.style.Fill({
							color : defaultColorArr[1],
						}),
						    	    	  stroke: new ol.style.Stroke({
						    	    	    color: '#3399CC',
						    	    	    width: 1,
						    	    	  }),
						
					}))
			            
				}
				else if(feat[i].get(param)>arr[Math.floor(arr.length/4)] && feat[i].get(param)<=arr[Math.floor(arr.length/4)*2])
					{
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color : defaultColorArr[2],
							}),
							    	    	  stroke: new ol.style.Stroke({
							    	    	    color: '#3399CC',
							    	    	    width: 1,
							    	    	  }),
							
						}))
	 	    }
				
				else if(feat[i].get(param)>arr[Math.floor(arr.length/4)*2] && feat[i].get(param)<=arr[Math.floor(arr.length/4)*3])
				{
					feat[i].setStyle(new ol.style.Style({
						fill : new ol.style.Fill({
							color : defaultColorArr[3],
						}),
						    	    	  stroke: new ol.style.Stroke({
						    	    	    color: '#3399CC',
						    	    	    width: 1,
						    	    	  }),
						
					}))
		    }
				else if(feat[i].get(param)>arr[Math.floor(arr.length/5)*3])
				{
					feat[i].setStyle(new ol.style.Style({
						fill : new ol.style.Fill({
							color : defaultColorArr[4],
						}),
						    	    	  stroke: new ol.style.Stroke({
						    	    	    color: '#3399CC',
						    	    	    width: 1,
						    	    	  }),
						
					}))
		    }
			}
			
			divLegned(arr,param);
 	    }
  			var factorFilterArr=[];
  			
  		    function factorSelectedFilter(name){  		//인자 선택 시 필터
  		    	factorFilterArr=[];
  		    	if($('select[name=selectFactors]').val() == '선택없음'){
  		    		alert("인자선택을 해주세요");
  		    	}else{
  		    		
  					switch($("#search3 option:selected").val()){
  					case "범위지정":
  						if($('#factorRange1').val()!="" && $('#factorRange2').val() != ""){
  							if(parseFloat($('#factorRange1').val()) < parseFloat( $('#factorRange2').val())){
  								factorFilterArr[0]= parseFloat($('#factorRange1').val());
  								factorFilterArr[1]= parseFloat($('#factorRange2').val());
  									
  								factorSelected(name);
  								} else{ 
  									alert("범위가 잘못되었습니다"); 
  									}
  						}
  						
  						else{ 
  							alert("범위를 입력하세요"); 
  							}
  						break;
  					case "over":
  						if($('#factorRange1').val()!= ""){
								factorFilterArr[0]= parseFloat($('#factorRange1').val());
  								factorFilterArr[1]= 0;
  				  		    	
  								factorSelected(name);
  							}else{
  								alert("범위를 입력하세요");
  								}
  						break;
  					case "under": 
  						if($('#factorRange1').val()!= ""){
  							factorFilterArr[0]= 0;
  							factorFilterArr[1]= parseFloat($('#factorRange2').val());
							factorSelected(name);
  							}
  						else{
  							alert("범위를 입력하세요");
  						}
  						break;
  					}
  		    	}
  		    }
  		    
  		    
  			function factorCalcFilter(param){     //인자별 범례 필터
  				
  				 var testDiv = document.getElementById("infoDiv");
  				 
  	 	    	var layerSize=getLayerByName("factorLayer").getSource().getFeatures().length;
  				var feat = getLayerByName("factorLayer").getSource().getFeatures();
//  				
  				if($('select[name="factorSearch"]').val() == '범위지정'){
  					
  					for(var i=0 ; i<layerSize; i++){
  						
  						if(Math.round(feat[i].get(param)*10)/10>factorFilterArr[0] && Math.round(feat[i].get(param)*10)/10<=factorFilterArr[1]){
  							
							feat[i].setStyle(new ol.style.Style({
								fill : new ol.style.Fill({
									color : 'rgb(159, 201, 60, 0.8)',
								}),
				    	    	stroke: new ol.style.Stroke({
				    	    	color: '#3399CC',
				    	    	width: 1,
				    	    	}),
							}))
							}else{
								feat[i].setStyle(new ol.style.Style({
									
									   stroke: new ol.style.Stroke({
									   color: 'rgba(150,150,150,0)',
									   width: 1,
									  }),
									
								}))
							}
  					}
  				}else if($('select[name="factorSearch"]').val() == 'over'){
  					
  					for(var i=0 ; i<layerSize; i++){
  						if(Math.round(feat[i].get(param)*10)/10>factorFilterArr[0]){
  							feat[i].setStyle(new ol.style.Style({
								fill : new ol.style.Fill({
									color : 'rgb(159, 201, 60, 0.8)',
									
								}),
								    	    	  stroke: new ol.style.Stroke({
								    	    	    color: '#3399CC',
								    	    	    width: 1,
								    	    	  }),
								
							}))
							}else{
								feat[i].setStyle(new ol.style.Style({
									
									   stroke: new ol.style.Stroke({
									   color: 'rgba(150,150,150,0)',
									   width: 1,
									  }),
									
								}))
							}
  					}
  				}else if($('select[name="factorSearch"]').val() == 'under'){
  					c
  					for(var i=0 ; i<layerSize; i++){
  						if(Math.round(feat[i].get(param)*10)/10<=factorFilterArr[1]){
							feat[i].setStyle(new ol.style.Style({
								fill : new ol.style.Fill({
								color : defaultColorArr[2],
								}),
				    	    	stroke: new ol.style.Stroke({
				    	    	color: '#3399CC',
				    	    	width: 1,
				    	    	}),
							}))
							}else{
								feat[i].setStyle(new ol.style.Style({
									
									   stroke: new ol.style.Stroke({
									   color: 'rgba(150,150,150,0)',
									   width: 1,
									  }),
									
								}))
							}
  					}
  				}
  				
  				factorFilterArr=[];
  				
				$("#factorLegendDiv").css("display","none");
  	 	    }  			
  			
  			function factorProtectCalc(param){  
  	 	    	var layerSize=getLayerByName("factorLayer").getSource().getFeatures().length;
  				var feat = getLayerByName("factorLayer").getSource().getFeatures();
  				
  				
  				for(var i=0 ; i<layerSize; i++){
  					if(feat[i].get(param)==1){
  						
  						feat[i].setStyle(new ol.style.Style({
  							fill : new ol.style.Fill({
  								color : defaultColorArr[1],
  							}),
  							    	    	  stroke: new ol.style.Stroke({
  							    	    	    color: '#3399CC',
  							    	    	    width: 1,
  							    	    	  }),
  							
  						}))
  				            
  					}
  					else if(feat[i].get(param)==2)
  						{
  							feat[i].setStyle(new ol.style.Style({
  								fill : new ol.style.Fill({
  									color : defaultColorArr[2],
  								}),
  								    	    	  stroke: new ol.style.Stroke({
  								    	    	    color: '#3399CC',
  								    	    	    width: 1,
  								    	    	  }),
  								
  							}))
  		 	    }
  					
  					else if(feat[i].get(param)==3)
  					{
  						feat[i].setStyle(new ol.style.Style({
  							fill : new ol.style.Fill({
  								color : defaultColorArr[3],
  							}),
  							    	    	  stroke: new ol.style.Stroke({
  							    	    	    color: '#3399CC',
  							    	    	    width: 1,
  							    	    	  }),
  							
  						}))
  			    }
  					
  					
  				}
  				protectDivLegned(feat);
  	 	    }	
  			
  			function divLegned(arr,param){
  				
		if(arr.length!=0){
 		  var cell = document.getElementById("factorLegendDiv");
 		  while ( cell.hasChildNodes() ) { 
 			  cell.removeChild( cell.firstChild ); 
 			  }

 		  $("#legendDiv").css("display","none");
 		  $("#factorLegendDiv").css("display","block");
			
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
			
 		 if(param=="popCnt"){
	 		 	var div0 = document.createElement("div");
	 		 	div0.setAttribute("id", "divTitle");
	 		 	div0.style.width="320px";
	 			div0.style.height="20px";
	 			div0.innerHTML = "<b>거주인구</b>"+" (인)";
	 		  }
	 		  else if(param=="buildCnt"){
		 		 	var div0 = document.createElement("div");
		 		 	div0.setAttribute("id", "divTitle");
		 		 	div0.style.width="320px";
		 			div0.style.height="20px";
		 			div0.innerHTML = "<b>취약건물</b>"+" (갯수)";
		 		  }
	 		  else if(param=="liveArea" || param=="commerArea" || param=="natureArea" || param=="indusArea"){
		 		 	var div0 = document.createElement("div");
		 		 	div0.setAttribute("id", "divTitle");
		 		 	div0.style.width="320px";
		 			div0.style.height="20px";
		 			if(param=="liveArea"){
		 				div0.innerHTML = "<b>주거지역</b>"+" (㎡)";
		 			}else if(param=="commerArea"){
		 				div0.innerHTML = "<b>상업지역</b>"+" (㎡)";
		 			}else if(param=="natureArea"){
		 				div0.innerHTML = "<b>자연녹지지역</b>"+" (㎡)";
		 			}else if(param=="indusArea"){
		 				div0.innerHTML = "<b>공업지역</b>"+" (㎡)";
		 			}
		 		  }
	 		 else if(param=="roadLen"){
		 		 	var div0 = document.createElement("div");
		 		 	div0.setAttribute("id", "divTitle");
		 		 	div0.style.width="320px";
		 			div0.style.height="20px";
		 			div0.innerHTML = "<b>도로연장</b>"+" (m)";
		 		  }
 		 
					var div5 = document.createElement("div");
					if(param=="popCnt" || param=="buildCnt"){
						div5.innerHTML = "<div style='width: 260px; height:25px; text-align:center; background-color:"+defaultColorArr[0]+"'>0</div>" +
								"<div style='text-align:right; font-size:12px; margin-right:12px;'>격자크기: 100×100m</div>";
					}else{
						div5.innerHTML = "<div style='width: 260px; height:25px; text-align:center; background-color:"+defaultColorArr[0]+"'>0</div>" +
								"<div style='text-align:right; font-size:12px; margin-right:12px;'>격자크기: 100×100m</div>";
					}
			
					var div4 = document.createElement("div");
					if(param=="popCnt" || param=="buildCnt"){
						div4.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultColorArr[1]+"'>0</div>"+
						"<div class='factorElement' style='width:50px; text-align:left; background-color:"+defaultColorArr[1]+"'>"+
						"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultColorArr[1]+"'>~</div>"+
						"<div id='factorElement' style='text-align:right; width:40px; background-color:"+defaultColorArr[1]+"'>"+arr[Math.floor(arr.length/4)].toFixed(0)+"</div>"+
						"<div class='factorElement' style='text-align:left;  width:80px;background-color:"+defaultColorArr[1]+"'>"+"&nbsp;이하</div>";
					}else{
						div4.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultColorArr[1]+"'>0</div>"+
						"<div class='factorElement' style='width:50px; text-align:left; background-color:"+defaultColorArr[1]+"'>"+
						"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultColorArr[1]+"'>~</div>"+
						"<div id='factorElement' style='text-align:right; width:70px; background-color:"+defaultColorArr[1]+"'>"+arr[Math.floor(arr.length/4)].toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</div>"+
						"<div class='factorElement' style='text-align:left;  width:50px;background-color:"+defaultColorArr[1]+"'>"+"&nbsp;이하</div>";
					}
					
					var div3 = document.createElement("div");
					if(param=="popCnt" || param=="buildCnt"){
						div3.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultColorArr[2]+"'>"+arr[Math.floor(arr.length/4)].toFixed(0)+"</div>"+
						"<div class='factorElement' style='width:50px; text-align:left; background-color:"+defaultColorArr[2]+"'>"+
						"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultColorArr[2]+"'>~</div>"+
						"<div id='factorElement' style='text-align:right; width:40px; background-color:"+defaultColorArr[2]+"'>"+arr[Math.floor(arr.length/4)*2].toFixed(0)+"</div>"+
						"<div class='factorElement' style='text-align:left;  width:80px;background-color:"+defaultColorArr[2]+"'>"+"&nbsp;이하</div>";
					}else{
						div3.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultColorArr[2]+"'>"+arr[Math.floor(arr.length/4)].toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</div>"+
						"<div class='factorElement' style='width:50px; text-align:left; background-color:"+defaultColorArr[2]+"'>"+
						"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultColorArr[2]+"'>~</div>"+
						"<div id='factorElement' style='text-align:right; width:70px; background-color:"+defaultColorArr[2]+"'>"+arr[Math.floor(arr.length/4)*2].toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</div>"+
						"<div class='factorElement' style='text-align:left;  width:50px;background-color:"+defaultColorArr[2]+"'>"+"&nbsp;이하</div>";
					}
					
					var div2 = document.createElement("div");
					if(param=="popCnt" || param=="buildCnt"){
						div2.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultColorArr[3]+"'>"+arr[Math.floor(arr.length/4)*2].toFixed(0)+"</div>"+
						"<div class='factorElement' style='width:50px; text-align:left; background-color:"+defaultColorArr[3]+"'>"+
						"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultColorArr[3]+"'>~</div>"+
						"<div id='factorElement' style='text-align:right; width:40px; background-color:"+defaultColorArr[3]+"'>"+arr[Math.floor(arr.length/4)*3].toFixed(0)+"</div>"+
						"<div class='factorElement' style='text-align:left;  width:80px;background-color:"+defaultColorArr[3]+"'>"+"&nbsp;이하</div>";
					}else{
						div2.innerHTML = "<div id='factorElement' style='width:80px; text-align:right; background-color:"+defaultColorArr[3]+"'>"+arr[Math.floor(arr.length/4)*2].toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</div>"+
						"<div class='factorElement' style='width:50px; text-align:left; background-color:"+defaultColorArr[3]+"'>"+
						"&nbsp;초과</div><div id='factorElement' style='width:10px; text-align:center; background-color:"+defaultColorArr[3]+"'>~</div>"+
						"<div id='factorElement' style='text-align:right; width:70px; background-color:"+defaultColorArr[3]+"'>"+arr[Math.floor(arr.length/4)*3].toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</div>"+
						"<div class='factorElement' style='text-align:left;  width:50px;background-color:"+defaultColorArr[3]+"'>"+"&nbsp;이하</div>";
					}
					
					var div1 = document.createElement("div");
					if(param=="popCnt" || param=="buildCnt"){
						div1.innerHTML = "<div id='factorElement'style='width:80px; text-align:right; background-color:"+defaultColorArr[4]+"'>"+arr[Math.floor(arr.length/4)*3].toFixed(0)+"</div>"+
						"<div class='factorElement' style='width:180px; text-align:left; background-color:"+defaultColorArr[4]+"'>"+"&nbsp;초과</div>";
					}else{
						div1.innerHTML = "<div id='factorElement' style= 'width:80px; text-align:right; background-color:"+defaultColorArr[4]+"'>"+arr[Math.floor(arr.length/4)*3].toFixed(1).replace(/\B(?=(\d{3})+(?!\d))/g, ",")+"</div>"+
						"<div class='factorElement' style='width:180px; text-align:left; background-color:"+defaultColorArr[4]+"'>"+"&nbsp;초과</div>";
					}
					
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
					}
					else{
						$("#factorLegendDiv").css("display","none");
					}
	
	 	   }
  			
  			function protectDivLegned(feat){
  				
			if(feat[0]!==undefined){
	 		  var cell = document.getElementById("factorLegendDiv");
	 		  while ( cell.hasChildNodes() ) { 
 			  cell.removeChild( cell.firstChild ); 
 			  }

 		  $("#legendDiv").css("display","none");
 		  $("#factorLegendDiv").css("display","block");
			
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
			
 		 	var div0 = document.createElement("div");
 		 	div0.setAttribute("id", "divTitle");
 		 	div0.style.width="320px";
 			div0.style.height="20px";
 			div0.innerHTML = "<b>취약건물</b>"+" (갯수)";
 		 
			
			var div1 = document.createElement("div");
			div1.innerHTML = "<div id='factorElement' style='width: 260px; height:25px; text-align:center; background-color:"+defaultColorArr[3]+"'>3</div>";
			
			var div2 = document.createElement("div");
			div2.innerHTML = "<div id='factorElement' style='width: 260px; height:25px; text-align:center; background-color:"+defaultColorArr[2]+"'>2</div>";
			
			var div3 = document.createElement("div");
			div3.innerHTML = "<div id='factorElement' style='width: 260px; height:25px; text-align:center; background-color:"+defaultColorArr[1]+"'>1</div>" +
					"<div style='text-align:right; font-size:12px; margin-right:12px; margin-top:50px;'>격자크기: 100×100m</div>";
			
			this.document.getElementById("factorLegendDiv").appendChild(div0);
			this.document.getElementById("factorLegendDiv").appendChild(document.createElement("hr"));
			this.document.getElementById("factorLegendDiv").appendChild(div1Legend);
			this.document.getElementById("factorLegendDiv").appendChild(div1);
			this.document.getElementById("factorLegendDiv").appendChild(div2Legend);
			this.document.getElementById("factorLegendDiv").appendChild(div2);
			this.document.getElementById("factorLegendDiv").appendChild(div3Legend);
			this.document.getElementById("factorLegendDiv").appendChild(div3);
				}
				else{
					$("#factorLegendDiv").css("display","none");
				}

 	   }
  			
  			