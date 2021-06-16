//침수 시뮬레이션
			var defaultFloodColorArr = ['rgba(159, 201, 60, 0.8)','rgba(255, 255, 54,0.8)','rgba(255, 187, 0,0.8)','rgba(255, 0, 0,0.8)'];
			var defaultFloodValueArr = [0,50,100];
			var userFloodValue=[];
			
			
			//침수심 범례 나누기위해 범례조건 확인
			function valiVal(){
				
				userFloodValue=[];
				
				var vali1;
				var vali2;
				var vali3;
				
				if($("#safeInput1").val()!="" && $("#refInput1").val()!="" && $("#refInput2").val()!="" && $("#suasionInput1").val()!="" && $("#suasionInput2").val()!="" && $("#mandatoryInput").val()!=""){
					if(parseInt($("#safeInput1").val())<=parseInt($("#refInput1").val())&&(parseInt($("#refInput1").val()) < parseInt($("#refInput2").val()))){
						userFloodValue[5]=parseInt($("#safeInput1").val());
						userFloodValue[0]=parseInt($("#refInput1").val());
						userFloodValue[1]=parseInt($("#refInput2").val());
						vali1 = true;
					}
					
					if(parseInt($("#suasionInput1").val()) < parseInt($("#suasionInput2").val()) && ( parseInt($("#suasionInput1").val()) >= parseInt($("#refInput2").val()))){
						vali2 = true;
						userFloodValue[2]=parseInt($("#suasionInput1").val());
						userFloodValue[3]=parseInt($("#suasionInput2").val());
					}
					if(parseInt($("#mandatoryInput").val()) >= parseInt($("#suasionInput2").val())){
						vali3 =true;
						userFloodValue[4]= parseInt($("#mandatoryInput").val());
					}
				
				}
				else if($("#safeInput1").val()=="" && $("#refInput1").val()=="" && $("#refInput2").val()=="" && $("#suasionInput1").val()=="" && $("#suasionInput2").val()=="" && $("#mandatoryInput").val()==""){
					vali1 =true;
					vali2 =true;
					vali3 =true;
				}
				if(vali1&&vali2&&vali3){
					return true;
					
				}
				
			}
			
			
			function resetFloodCol(val){
				
				switch(val.id){
				 case "resetSafeCol" :
					 defaultFloodColorArr[0]='rgb(159, 201, 60, 0.8)';
					 $('#safeColPick').val("#9fc93c");
					 break;
				 case "resetRefCol" :
					 defaultFloodColorArr[1]='rgb(255, 255, 54,0.8)';
					 $('#refColPick').val("#ffff36");
					 break;
				 case "resetSuasionCol" :
					 defaultFloodColorArr[2]='rgb(255, 187, 0,0.8)';
					 $('#suasionColPick').val("#ffbb00");
					 break;
				 case "resetmandatoryCol" :
					 defaultFloodColorArr[3]='rgb(255, 0, 0,0.8)';
					 $('#mandatoryColPick').val("#ff0000");
					 break;
				}
			}
			
			function floodColSetting(val){
				
				var hex = val.value;
				value = hex.replace('#','');
			    r = parseInt(value.substring(0,2), 16);
			    g = parseInt(value.substring(2,4), 16);
			    b = parseInt(value.substring(4,6), 16);

			    result = 'rgb('+r+','+g+','+b+','+0.8+')';
			    
				switch(val.id){
				 case "safeColPick" :
					 defaultFloodColorArr[0]=result;
					 break;
				 case "refColPick" :
					 defaultFloodColorArr[1]=result;
					 break;
				 case "suasionColPick" :
					 defaultFloodColorArr[2]=result;
					 break;
				 case "mandatoryColPick" :
					 defaultFloodColorArr[3]=result;
					 break;
				}
			}
			
			
			

			function createFloodLayer(param){
				
				if(getLayerByName("factorLayer")){
		    		getLayerByName("factorLayer").setVisible(false)
		    	}
				
				if(getLayerByName("totalLayer")){
		    		getLayerByName("totalLayer").setVisible(false)
		    	}
				
				map.removeLayer(getLayerByName("floodLayer"));

//				map.removeLayer(getLayerByName("pipeLayer"));
				
				map.removeLayer(getLayerByName("nullLayer"));
				
				map.removeLayer(getLayerByName("borderLayer"));
				
				if(getLayerByName("floodLayer")){
					getLayerByName("floodLayer").getSource().clear();
				}
				
//				if(getLayerByName("pipeLayer")){
//					getLayerByName("pipeLayer").getSource().clear();
//				}
				
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
										getLayerByName("floodLayer").setVisible(bool);
										getLayerByName("floodLayer").getSource().clear();
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
											
											if(simulBool == true){
												floodSimulCacl(param);
											}else if(floodFilterArr.length ==2){
												floodSimulFilter(param);
												floodFilterArr=[];
											}
											
											else{
												floodSimulCaclRelative(param);
											}
											
											

									} else {
										onError();
									}
								}
//								xhr.setRequestHeader("Content-Type", "application/json");
//								var mbr = "POLYGON((";
//		    					
//		    					mbr +=extent[0] + " " + extent[1] + ", "; 
//		    					mbr +=extent[2] + " " + extent[1] + ", "; 
//		    					mbr +=extent[2] + " " + extent[3] + ", "; 
//		    					mbr +=extent[0] + " " + extent[3] + ", "; 
//		    					mbr +=extent[0] + " " + extent[1];
//		    					
//		    					mbr += "))";
//								
//		    					var data = new Object();
//				                data.mbr = mbr;
//								xhr.send(mbr);
								

								xhr.send();
							},
//							strategy : ol.loadingstrategy.bbox
							
						});

				var vector = new ol.layer.Vector({
					name : "floodLayer",
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
			
			
			var floodFilterArr=[];
				
			function floodFilter(val){
				
				
				floodFilterArr=[];
				switch($('select[name="floodSearch"]').val()){
				case "범위지정":
					if($('#filterLange1').val()!="" && $('#filterLange2').val() != ""){
					if(parseFloat($('#filterLange1').val()) < parseFloat($('#filterLange2').val())){
							floodFilterArr[0]= parseFloat($('#filterLange1').val());
							floodFilterArr[1]= parseFloat($('#filterLange2').val());
							
							floodRadioBtn(val);
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
					if($('#filterLange1').val()!= ""){
							floodFilterArr[0]= parseFloat($('#filterLange1').val());
							floodFilterArr[1]= 0;
							
							floodRadioBtn(val);
						}
					else{
						alert("범위를 입력하세요");
					}
					break;
				case "under": 
					if($('#filterLange2').val() !=""){
							floodFilterArr[0]= 0;
							floodFilterArr[1]= parseFloat($('#filterLange2').val());
							floodRadioBtn(val);
						}
					else{
						alert("범위를 입력하세요");
					}
					break;
					
				
				}
			}	
	
		
		
			function floodRadioBtn(val){
				
				
				if(valiVal()){
					
	
//			if ($("#tgBtn1").is(':checked') == false) {
//				simulBool = false;
//				$("#tgBtn1").prop("checked", false);
//				val = $("input[name='grp1']:checked").val();
//				
//			} else {
//				$("#tgBtn1").prop("checked", true);
//				val = $("input[name='grp1']:checked").val();
//			}
			
			

			

			var param;
			switch(val){
			
			case "10년집중": param ="tenYrHuff"
				createFloodLayer(param);

				break;
			case "10년분산": param ="tenYrMono"
				createFloodLayer(param);

				break;
			case "30년집중": param ="thrYrHuff"
				createFloodLayer(param);


				break;
			case "30년분산": param ="thrYrMono"
				createFloodLayer(param);


				break;
			case "50년집중": param ="fiftYrHuff"
				createFloodLayer(param);


				break;
			case "50년분산": param ="fiftYrMono"
				createFloodLayer(param);

				break;
			default : alert("강우조건을 선택하세요");
			}
		
			
				}
//				else{
//					alert("값의 범위가 잘못되었거나, 입력되지 않는 부분이 있습니다.")
//				}
 		}
		
//	   function floodSimulCacl(param){ //상대
//		   
//		   
//	    	var layerSize=getLayerByName("floodLayer").getSource().getFeatures().length;
//			var feat = getLayerByName("floodLayer").getSource().getFeatures();
//	    	//인구수 0 초과인 값 추출해서 정렬하기 위해 배열에 삽입
//			var arr = new Array();
//	    	
//			for(var i=0 ; i<layerSize; i++){
//				feat[i].setStyle("");
//				if(feat[i].get(param)>0){
//					arr.push(feat[i].get(param));
//					};
//
//				
//			}
//			
//			//정렬
//			arr.sort(function(a, b) { // 오름차순
//		    return a - b;
//		});
//			
//			for(var i=0 ; i<layerSize; i++){
//				
//				
//				if(feat[i].get(param)>=arr[0] && feat[i].get(param)<arr[Math.floor(arr.length/4)]){
//					feat[i].setStyle(new ol.style.Style({
//						fill : new ol.style.Fill({
//							color : 'rgb(159, 201, 60, 0.8)',
//							
//						}),
//						    	    	  stroke: new ol.style.Stroke({
//						    	    	    color: '#3399CC',
//						    	    	    width: 1,
//						    	    	  }),
//						
//					}))
//			            
//				}
//				else if(feat[i].get(param)>=arr[Math.floor(arr.length/4)] && feat[i].get(param)<arr[Math.floor(arr.length/4)*2])
//					{
//						feat[i].setStyle(new ol.style.Style({
//							fill : new ol.style.Fill({
//								color : 'rgb(255, 255, 54,0.8)',
//							}),
//							    	    	  stroke: new ol.style.Stroke({
//							    	    	    color: '#3399CC',
//							    	    	    width: 1,
//							    	    	  }),
//							
//						}))
//	 	    }
//				
//				else if(feat[i].get(param)>=arr[Math.floor(arr.length/4)*2] && feat[i].get(param)<arr[Math.floor(arr.length/4)*3])
//				{
//					feat[i].setStyle(new ol.style.Style({
//						fill : new ol.style.Fill({
//							color : 'rgb(255, 187, 0,0.8)',
//						}),
//						    	    	  stroke: new ol.style.Stroke({
//						    	    	    color: '#3399CC',
//						    	    	    width: 1,
//						    	    	  }),
//						
//					}))
//		    }
//				else if(feat[i].get(param)>=arr[Math.floor(arr.length/5)*3])
//				{
//					feat[i].setStyle(new ol.style.Style({
//						fill : new ol.style.Fill({
//							color : 'rgb(255, 0, 0,0.8)',
//						}),
//						    	    	  stroke: new ol.style.Stroke({
//						    	    	    color: '#3399CC',
//						    	    	    width: 1,
//						    	    	  }),
//						
//					}))
//		    }
//				
//			}
//			
//			divFloodLegned(arr);
//	    }

	   
		function floodSimulCaclRelative(param) { //절대
			
			var layerSize = getLayerByName("floodLayer").getSource().getFeatures().length;
			var feat = getLayerByName("floodLayer").getSource().getFeatures();
			// 인구수 0 초과인 값 추출해서 정렬하기 위해 배열에 삽입
			var arr = new Array();
		
			for (var i = 0; i < layerSize; i++) {
				feat[i].setStyle("");
				if (feat[i].get(param) > 0) {
					arr.push(feat[i].get(param));
				}
				;
			}
		
		
			// 정렬
			arr.sort(function(a, b) { // 오름차순
				return a - b;
			});
		
			
			//사용자 지정 범례가 있을 시
			if(userFloodValue.length==6){
			
				for (var i = 0; i < layerSize; i++) {
					// 절대
//					console.log(userFloodValue);
					if (feat[i].get(param) == userFloodValue[5] || feat[i].get(param) < userFloodValue[5]) {
						console.log(11);
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color :defaultFloodColorArr[0],
		
							}),
							stroke : new ol.style.Stroke({
								color : '#3399CC',
								width : 1,
							}),
						}))
					}else if (feat[i].get(param) > userFloodValue[0] && userFloodValue[1] >= feat[i].get(param)) {
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color : defaultFloodColorArr[1],
							}),
							stroke : new ol.style.Stroke({
								color : '#3399CC',
								width : 1,
							}),
						}))
					} else if (feat[i].get(param) >= userFloodValue[2] && userFloodValue[3] > feat[i].get(param)) {
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color : defaultFloodColorArr[2],
							}),
							stroke : new ol.style.Stroke({
								color : '#3399CC',
								width : 1,
							}),
						}))
					} else if ( userFloodValue[4] <= feat[i].get(param)) {
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color : defaultFloodColorArr[3],
							}),
							stroke : new ol.style.Stroke({
								color : '#3399CC',
								width : 1,
							}),
						}))
					}
					else{
						feat[i].setStyle(new ol.style.Style({
							
							   stroke: new ol.style.Stroke({
							   color: 'rgba(150,150,150,0.5)',
							   width: 1,
							  }),
							
						}))
						
					}
				}
			divFloodLegned(arr);
			}
			
			//사용자 지정 범례가 없을 시
			else{
				for (var i = 0; i < layerSize; i++) {
					// 절대
					if (feat[i].get(param) == 0) {
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color :defaultFloodColorArr[0],
		
							}),
							stroke : new ol.style.Stroke({
								color : '#3399CC',
								width : 1,
							}),
//							text : new ol.style.Text({
//								scale : 2,
//								text : String(feat[i].get("gid")),
//							})
						}))
					}else if (feat[i].get(param) > defaultFloodValueArr[0] && defaultFloodValueArr[1] >= feat[i].get(param)) {
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color : defaultFloodColorArr[1],
							}),
							stroke : new ol.style.Stroke({
								color : '#3399CC',
								width : 1,
							}),
//							text : new ol.style.Text({
//								scale : 2,
//								text : String(feat[i].get("gid")),
//							})
						}))
					} else if (feat[i].get(param) > defaultFloodValueArr[1] && defaultFloodValueArr[2] >= feat[i].get(param)) {
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color : defaultFloodColorArr[2],
							}),
							stroke : new ol.style.Stroke({
								color : '#3399CC',
								width : 1,
							}),
//							text : new ol.style.Text({
//								scale : 2,
//								text : String(feat[i].get("gid")),
//							})
						}))
					} else if (defaultFloodValueArr[2] < feat[i].get(param)) {
						feat[i].setStyle(new ol.style.Style({
							fill : new ol.style.Fill({
								color : defaultFloodColorArr[3],
							}),
							stroke : new ol.style.Stroke({
								color : '#3399CC',
								width : 1,
							}),
//							text : new ol.style.Text({
//								scale : 2,
//								text : String(feat[i].get("gid")),
//							})
						}))
					}
				}
			divFloodLegned(arr);
			}
		}
		
		
		// -조건별 분포 보기
		 function floodSimulFilter(param){
			   
			   
		    	var layerSize=getLayerByName("floodLayer").getSource().getFeatures().length;
				var feat = getLayerByName("floodLayer").getSource().getFeatures();
		    	//인구수 0 초과인 값 추출해서 정렬하기 위해 배열에 삽입
				
				if($('select[name="floodSearch"]').val()=="범위지정"){
				for(var i=0 ; i<layerSize; i++){
					
					
					if(Math.round(feat[i].get(param)*10)/10>floodFilterArr[0] && Math.round(feat[i].get(param)*10)/10<=floodFilterArr[1]){
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
				else if($('select[name="floodSearch"]').val()=="over"){
					for(var i=0 ; i<layerSize; i++){
						
						
						if(Math.round(feat[i].get(param)*10)/10>floodFilterArr[0]){
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
				if($('select[name="floodSearch"]').val()=="under"){
					for(var i=0 ; i<layerSize; i++){
						
						
						if(Math.round(feat[i].get(param)*10)/10<=floodFilterArr[1]){
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
				$("#legendDiv").css("display","none");
		    }
		
		var simulBool = false; // 절대 false, 상대 true
		// 상대/절대 작동시키는 버튼
		function simulLegendBtn(param) {
		
			if (!$("#tgBtn1").is(':checked')) {
				simulBool = false;
				floodRadioBtn();
			} else {
				simulBool = true;
				floodRadioBtn();
			}
		}
		
	   function divFloodLegned(arr){

			if(arr.length!=0){
		 		  var cell = document.getElementById("legendDiv");
		 		  while ( cell.hasChildNodes() ) { 
		 			  cell.removeChild( cell.firstChild ); 
		 			  }
		 		  
		 	  $("#factorLegendDiv").css("display","none");
			  $("#legendDiv").css("display","block");
			  
			    
			 	var div0 = document.createElement("div");
			 	div0.style.width="275px";
				div0.style.height="20px";
				div0.setAttribute("id", "divTitle");
				div0.innerHTML = "<b>침수심</b>"+"(cm)";

				if (simulBool == true) {
					
					var div1 = document.createElement("div");
					div1.style.width = "215px"
					div1.style.height = "25px"
					div1.innerHTML = (arr[Math.floor(arr.length / 4) * 3]).toFixed(0)
							+ " ~ ";
					div1.style.backgroundColor = "#FF0000";
			
					var div2 = document.createElement("div");
					div2.style.width = "215px"
					div2.style.height = "25px"
					div2.innerHTML = (arr[Math.floor(arr.length / 4) * 2]).toFixed(0)
							+ " ~ " + (arr[Math.floor(arr.length / 4) * 3]).toFixed(0);
					div2.style.backgroundColor = "#FFBB00";
					
					var div3 = document.createElement("div");
					div3.style.width = "215px"
					div3.style.height = "25px"
					div3.innerHTML = (arr[Math.floor(arr.length / 4)]).toFixed(0) + " ~ "
							+ (arr[Math.floor(arr.length / 4) * 2]).toFixed(0);
					div3.style.backgroundColor = "#FFFF36";
			
					var div4 = document.createElement("div");
					div4.style.width = "215px";
					div4.style.height = "25px";
					div4.innerHTML = Math.floor(arr[0]).toFixed(0) + " ~ "
					+ (arr[Math.floor(arr.length / 4)]).toFixed(0);
					div4.style.backgroundColor = "#9FC93C";
					
					this.document.getElementById("legendDiv").appendChild(div0);
					this.document.getElementById("legendDiv").appendChild(document.createElement("hr"));
					this.document.getElementById("legendDiv").appendChild(div1);
					this.document.getElementById("legendDiv").appendChild(div2);
					this.document.getElementById("legendDiv").appendChild(div3);
					this.document.getElementById("legendDiv").appendChild(div4);
					
				} else { // 절대
					
					if(userFloodValue.length!=6){

					var div1Legend = document.createElement("div");
					div1Legend.setAttribute("id", "legendTitle");
					div1Legend.style.width = "50px";
					div1Legend.style.height = "25px";
					div1Legend.innerHTML = "의무화";
					
					var div2Legend = document.createElement("div");
					div2Legend.setAttribute("id", "legendTitle");
					div2Legend.style.width = "50px";
					div2Legend.style.height = "25px";
					div2Legend.innerHTML = "권&nbsp;&nbsp;&nbsp;고";
					
					var div3Legend = document.createElement("div");
					div3Legend.setAttribute("id", "legendTitle");
					div3Legend.style.width = "50px";
					div3Legend.style.height = "25px";
					div3Legend.innerHTML = "참&nbsp;&nbsp;&nbsp;고";
					
					var div4Legend = document.createElement("div");
					div4Legend.setAttribute("id", "legendTitle");
					div4Legend.style.width = "50px";
					div4Legend.style.height = "25px";
					div4Legend.innerHTML = "안&nbsp;&nbsp;&nbsp;전";
					
						
					var div1= document.createElement("div");
					div1.innerHTML = "<div id='element' style='text-align:right; background-color:"+defaultFloodColorArr[3]+"'>"+defaultFloodValueArr[2].toFixed(1)+"</div>"+
					"<div class='factorElement' id='element' style='width:150px; text-align:left; background-color:"+defaultFloodColorArr[3]+"'>"+"초과</div>";
					
					var div2 = document.createElement("div");
					div2.innerHTML = "<div id='element' style='text-align:right; background-color:"+defaultFloodColorArr[2]+"'>"+defaultFloodValueArr[1].toFixed(1)+"</div>"+
					"<div class='factorElement'  id='element' style='text-align:center; background-color:"+defaultFloodColorArr[2]+"'>"+"초과 ~</div>"+
					"<div id='element' style='text-align:right; width:40px; background-color:"+defaultFloodColorArr[2]+"'>"+defaultFloodValueArr[2].toFixed(1)+"</div>"+
					"<div class='factorElement'  id='element' style='text-align:left; width:60px; background-color:"+defaultFloodColorArr[2]+"'>"+"이하</div>";
					
					var div3 = document.createElement("div");
					div3.innerHTML = "<div id='element' style='text-align:right; background-color:"+defaultFloodColorArr[1]+"'>"+defaultFloodValueArr[0]+"</div>"+
					"<div class='factorElement' id='element' style='text-align:center; background-color:"+defaultFloodColorArr[1]+"'>"+"초과 ~</div>"+
					"<div id='element' style='text-align:right; width:40px; background-color:"+defaultFloodColorArr[1]+"'>"+defaultFloodValueArr[1].toFixed(1)+"</div>"+
					"<div class='factorElement' id='element' style='text-align:left;  width:60px;background-color:"+defaultFloodColorArr[1]+"'>"+"이하</div>";
					
					var div4 = document.createElement("div");
					div4.innerHTML = "<div id='element' style='width: 200px; height:25px; text-align:center; background-color:"+defaultFloodColorArr[0]+"'>침수없음</div>" +
							"<div style='text-align:right; font-size:12px; margin-right:12px;'>격자크기: 100×100m</div>";
					
					this.document.getElementById("legendDiv").appendChild(div0);
					this.document.getElementById("legendDiv").appendChild(document.createElement("hr"));
					this.document.getElementById("legendDiv").appendChild(div1Legend);
					this.document.getElementById("legendDiv").appendChild(div1);
					this.document.getElementById("legendDiv").appendChild(div2Legend);
					this.document.getElementById("legendDiv").appendChild(div2);
					this.document.getElementById("legendDiv").appendChild(div3Legend);
					this.document.getElementById("legendDiv").appendChild(div3);
					this.document.getElementById("legendDiv").appendChild(div4Legend);
					this.document.getElementById("legendDiv").appendChild(div4);
	
					}
					else{
						
						var div1Legend = document.createElement("sapn");
						div1Legend.setAttribute("id", "legendTitle");
						div1Legend.style.width = "50px";
						div1Legend.style.height = "25px";
						div1Legend.innerHTML = "의무화";
						
						var div2Legend = document.createElement("div");
						div2Legend.setAttribute("id", "legendTitle");
						div2Legend.style.width = "50px";
						div2Legend.style.height = "25px";
						div2Legend.innerHTML = "권&nbsp;&nbsp;&nbsp;고";
						
						var div3Legend = document.createElement("div");
						div3Legend.setAttribute("id", "legendTitle");
						div3Legend.style.width = "50px";
						div3Legend.style.height = "25px";
						div3Legend.innerHTML = "참&nbsp;&nbsp;&nbsp;고";
						
						var div4Legend = document.createElement("div");
						div4Legend.setAttribute("id", "legendTitle");
						div4Legend.style.width = "50px";
						div4Legend.style.height = "25px";
						div4Legend.innerHTML = "안&nbsp;&nbsp;&nbsp;전";
						
						var div1= document.createElement("div");
						div1.innerHTML = "<div id='element'  style='text-align:right; background-color:"+defaultFloodColorArr[3]+"'>"+userFloodValue[4].toFixed(1)+"</div>"+
						"<div id='element' class='factorElement' style='width:150px; text-align:left; background-color:"+defaultFloodColorArr[3]+"'>"+"&nbsp;초과</div>";

						var div2 = document.createElement("div");
						div2.innerHTML = "<div id='element' style='text-align:right; background-color:"+defaultFloodColorArr[2]+"'>"+userFloodValue[2].toFixed(1)+"</div>"+
						"<div id='element' class='factorElement' style='text-align:center; background-color:"+defaultFloodColorArr[2]+"'>"+"초과 ~</div>"+
						"<div id='element' style='text-align:right; width:40px; background-color:"+defaultFloodColorArr[2]+"'>"+userFloodValue[3].toFixed(1)+"</div>"+
						"<div id='element' class='factorElement' style='text-align:left; width:60px; background-color:"+defaultFloodColorArr[2]+"'>"+"이하</div>";
						
						var div3 = document.createElement("div");
						div3.innerHTML = "<div id='element' style='text-align:right; background-color:"+defaultFloodColorArr[1]+"'>"+userFloodValue[0].toFixed(1)+"</div>"+
						"<div id='element' class='factorElement' style='text-align:center; background-color:"+defaultFloodColorArr[1]+"'>"+"초과 ~</div>"+
						"<div id='element' style='text-align:right; width:40px; background-color:"+defaultFloodColorArr[1]+"'>"+userFloodValue[1].toFixed(1)+"</div>"+
						"<div id='element' class='factorElement' style='text-align:left;  width:60px;background-color:"+defaultFloodColorArr[1]+"'>"+"이하</div>";
						
						if(userFloodValue[5] == 0 ){
							var div4 = document.createElement("div");
							div4.innerHTML = "<div id='element' style='width: 200px; height:25px; text-align:center; background-color:"+defaultFloodColorArr[0]+"'>침수없음</div>" +
											 "<div style='text-align:right; font-size:12px; margin-right:12px;'>격자크기: 100×100m</div>";
							
						}else if(userFloodValue[0]==userFloodValue[5]){
							var div4 = document.createElement("div");
							div4.innerHTML = "<div id='element' style='text-align:right; background-color:"+defaultFloodColorArr[0]+"'>"+0+"</div>"+
							"<div id='element' class='factorElement' style='text-align:center; background-color:"+defaultFloodColorArr[0]+"'>"+"이상 ~</div>"+
							"<div id='element'  style='text-align:right; width:40px; background-color:"+defaultFloodColorArr[0]+"'>"+userFloodValue[5].toFixed(1)+"</div>"+
							"<div id='element' class='factorElement' style='text-align:left;  width:60px;background-color:"+defaultFloodColorArr[0]+"'>"+"이하</div>" +
							"<div style='text-align:right; font-size:12px; margin-right:12px;'>격자크기: 100×100m</div>";
						}
						
						this.document.getElementById("legendDiv").appendChild(div0);
						this.document.getElementById("legendDiv").appendChild(document.createElement("hr"));
						this.document.getElementById("legendDiv").appendChild(div1Legend);
						this.document.getElementById("legendDiv").appendChild(div1);
						this.document.getElementById("legendDiv").appendChild(div2Legend);
						this.document.getElementById("legendDiv").appendChild(div2);
						this.document.getElementById("legendDiv").appendChild(div3Legend);
						this.document.getElementById("legendDiv").appendChild(div3);
						this.document.getElementById("legendDiv").appendChild(div4Legend);
						this.document.getElementById("legendDiv").appendChild(div4);
					}
				}
			}
			else{
				$("#legendDiv").css("display","none");
			}
	   }