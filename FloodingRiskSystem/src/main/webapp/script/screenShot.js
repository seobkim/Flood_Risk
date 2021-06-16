function bodyShot() { //전체 스크린 샷하기
	
	var iframe = document.querySelector("#downloadFrame");
	iframe.src = "";
	
	html2canvas(document.body )
	
	//document에서 body 부분을 스크린샷을 함. 
	.then( function (canvas) { 
		
		saveAs(canvas.toDataURL(), 'floodRisk.png'); 
		}).catch(function (err) {
			console.log(err); 
			}); 
}

function saveAs(uri, filename) {
	var link = document.createElement('a'); 
	if (typeof link.download === 'string') { 
		link.href = uri; link.download = filename;
		document.body.appendChild(link); link.click();
		document.body.removeChild(link); 
		} else {
			window.open(uri);
			} 
	}

function dataOutput(obj) {
	
	var iframe = document.querySelector("#downloadFrame");
	iframe.src = "";
	
	if (obj.id == "baseFRiskPrint") {
		if (getLayerByName("floodLayer")) {
			if(getLayerByName("floodLayer").getVisible() == true) {
				
				var floodLayer = getLayerByName("floodLayer").getSource().getFeatures();
				
				var floodKinds = floodLayer[0].getKeys()[3];
				
//				var excelList = {};
				
//				for(var i=0; i<floodLayer.length; i++) {
//					excelList[i] = {
//							"gid" : floodLayer[i].get("gid"),
//							"tenYrHuff" : floodLayer[i].get("tenYrHuff"),
//					}
//				}
				
				for (var i = 0; i < floodLayer.length; i++) {
					floodLayer[i].style_.setText(new ol.style.Text({
						scale : 2, 
						text : String((floodLayer[i].get("gid"))),
						stroke : new ol.style.Stroke({
							color : "#000000",
							width : 4
						}),
						fill : new ol.style.Fill({
							color : "#FFFFFF"
						})
					}))
				}
				
				var center = [14118297.379015084, 4531592.493742782];
				map.getView().setCenter([center[0] + 0.000000001, center[1] + 0.000000001]);
				map.getView().setZoom(16);
				
				setTimeout(function(){

					var widthVal = 0;
		            var heightVal = 0;
		            
		            var maxWidth = window.innerWidth;
		            var maxHeight = window.innerHeight;
		            
		            
//		            if (width > height) {
//		                if (width > MAX_WIDTH) {
//		                    height *= MAX_WIDTH / width;
//		                    width = MAX_WIDTH;
//		                }
//		            } else {
//		                if (height > MAX_HEIGHT) {
//		                    width *= MAX_HEIGHT / height;
//		                    height = MAX_HEIGHT;
//		                }
//		            }
		            
		            widthVal = maxWidth;
		            heightVal = maxHeight;
		            	            
					html2canvas(document.getElementById("map"), {
						width: widthVal / 3 * 2,
						height: heightVal,
						x : widthVal / 3,
					})
					
					.then( function (canvas) {
						
						var image = document.createElement("canvas"); 
			              
						image.setAttribute('width', document.body.clientWidth); 
		                image.setAttribute('height', document.body.clientHeight); 
		                 
		                var context = image.getContext("2d"); 
		                context.drawImage(canvas, 0, 0, 1800, 1000); 
		                 
		                var dataURL = image.toDataURL(); 
			
//						imageUrl = dataURItoBlob(canvas.toDataURL("image/png"));
						var imageUrl = canvas.toDataURL("image/png")
						imageUrl = imageUrl.replace("data:image/png;base64,", "");
	//
			    		var url = "./downloadExcelListBase.do";
			        	
			    		var form = document.createElement("form");
			            form.setAttribute("method", "POST");
			            form.setAttribute("action", url);
			            
		        		var hiddenField = document.createElement("input");
			            hiddenField.setAttribute("type", "hidden");
			            hiddenField.setAttribute("name", "floodKinds");
			            hiddenField.setAttribute("value", floodKinds);
			            form.appendChild(hiddenField);
			            
//			            var hiddenField2 = document.createElement("textarea");
//			            hiddenField2.setAttribute("type", "hidden");
//			            hiddenField2.setAttribute("name", "imageUrl");
////			            hiddenField2.setAttribute("value", "test");
//			            hiddenField2.innerHTML = imageUrl;
////			            form.appendChild(hiddenField2);
			            
						
						
//						var queryString = $(form).serialize();
//			            iframe.src = url + "?" + queryString//;
						
//						$.ajax({
//							url : "./downloadExcelList.do",
//							enctype: 'multipart/form-data',
//							type : "POST",
//							data : data,
//							dataType : "json",
//							async : true,
//							success : function(response) {
//							},
//							error : function(request, status, error) {
//								console.log("code:" + request.status + "\n"
//										+ "message:" + request.responseText + "\n"
//										+ "error:" + error);
//							}
//						});
//						
		            data = {
			            "imageUrl" : imageUrl,
		            }
			            
					$.ajax({
				
						url : "./fileImageUpload.do",
						type : "POST",
						data : data,
						dataType : "json",
						async : true,
						success : function(response) {
							
			        		var hiddenField2 = document.createElement("input");
				            hiddenField2.setAttribute("type", "hidden");
				            hiddenField2.setAttribute("name", "fileName");
				            hiddenField2.setAttribute("value", response.imageFileName);
				            form.appendChild(hiddenField2);
				            
				            var queryString = $(form).serialize();
				            iframe.src = url + "?" + queryString;
				            
				            for (var i = 0; i < floodLayer.length; i++) {
								floodLayer[i].style_.setText(new ol.style.Text())
							}
				            
				            map.getView().setCenter([center[0] - 0.000000001, center[1] - 0.000000001]);
						},
						error : function(request, status, error) {
							console.log("code:" + request.status + "\n"
									+ "message:" + request.responseText + "\n"
									+ "error:" + error);
						},
					})
					}).catch(function (err) {
						console.log(err); 
					});
				}, 1000)
				
			}
		}
	}else if(obj.id == "synthesisPrint") {
		  
		if (getLayerByName("totalLayer")) {
			if(getLayerByName("totalLayer").getVisible() == true) {
				
				var totalLayer = getLayerByName("totalLayer").getSource().getFeatures();
				

				for (var i = 0; i < totalLayer.length; i++) {
					totalLayer[i].style_.setText(new ol.style.Text({
						scale : 2, 
						text : String((totalLayer[i].get("gid"))),
						stroke : new ol.style.Stroke({
							color : "#000000",
							width : 4
						}),
						fill : new ol.style.Fill({
							color : "#FFFFFF"
						})
					}))
				}
				
				var center = [14118297.379015084, 4531592.493742782];
				map.getView().setCenter([center[0] + 0.000000001, center[1] + 0.000000001]);
				map.getView().setZoom(16);
				
				setTimeout(function(){

	            var widthVal = 0;
	            var heightVal = 0;
	            
	            var maxWidth = window.innerWidth;
	            var maxHeight = window.innerHeight;
	            
	            
//	            if (width > height) {
//	                if (width > MAX_WIDTH) {
//	                    height *= MAX_WIDTH / width;
//	                    width = MAX_WIDTH;
//	                }
//	            } else {
//	                if (height > MAX_HEIGHT) {
//	                    width *= MAX_HEIGHT / height;
//	                    height = MAX_HEIGHT;
//	                }
//	            }
	            
	            widthVal = maxWidth;
	            heightVal = maxHeight;
	            	            
				html2canvas(document.getElementById("map"), {
					width: widthVal / 3 * 2,
					height: heightVal,
					x : widthVal / 3,
					})
				
				//document에서 body 부분을 스크린샷을 함. 
				.then( function (canvas) {
										
//					imageUrl = dataURItoBlob(canvas.toDataURL("image/png"));
					var imageUrl = canvas.toDataURL("image/png")
					imageUrl = imageUrl.replace("data:image/png;base64,", "");
					
					var floodKinds = totalFlood;
					
		    		var url = "./downloadExcelListTotal.do";
		        	
		    		var form = document.createElement("form");
		            form.setAttribute("method", "POST");
		            form.setAttribute("action", url);
		            
	        		var hiddenField = document.createElement("input");
		            hiddenField.setAttribute("type", "hidden");
		            hiddenField.setAttribute("name", "floodKinds");
		            hiddenField.setAttribute("value", floodKinds);
		            form.appendChild(hiddenField);
		            
		            var hiddenField2 = document.createElement("input");
		            hiddenField2.setAttribute("type", "hidden");
		            hiddenField2.setAttribute("name", "buildWeight");
		            hiddenField2.setAttribute("value", weightList.buildWeight);
		            form.appendChild(hiddenField2);
		            
		            var hiddenField3 = document.createElement("input");
		            hiddenField3.setAttribute("type", "hidden");
		            hiddenField3.setAttribute("name", "commerWeight");
		            hiddenField3.setAttribute("value", weightList.commerWeight);
		            form.appendChild(hiddenField3);
		            
		            var hiddenField4 = document.createElement("input");
		            hiddenField4.setAttribute("type", "hidden");
		            hiddenField4.setAttribute("name", "floodWeight");
		            hiddenField4.setAttribute("value", weightList.floodWeight);
		            form.appendChild(hiddenField4);
		            
		            var hiddenField5 = document.createElement("input");
		            hiddenField5.setAttribute("type", "hidden");
		            hiddenField5.setAttribute("name", "indusWeight");
		            hiddenField5.setAttribute("value", weightList.indusWeight);
		            form.appendChild(hiddenField5);
		            
		            var hiddenField6 = document.createElement("input");
		            hiddenField6.setAttribute("type", "hidden");
		            hiddenField6.setAttribute("name", "liveWeight");
		            hiddenField6.setAttribute("value", weightList.liveWeight);
		            form.appendChild(hiddenField6);
		            
		            var hiddenField7 = document.createElement("input");
		            hiddenField7.setAttribute("type", "hidden");
		            hiddenField7.setAttribute("name", "natureWeight");
		            hiddenField7.setAttribute("value", weightList.natureWeight);
		            form.appendChild(hiddenField7);
		            
		            var hiddenField8 = document.createElement("input");
		            hiddenField8.setAttribute("type", "hidden");
		            hiddenField8.setAttribute("name", "popWeight");
		            hiddenField8.setAttribute("value", weightList.popWeight);
		            form.appendChild(hiddenField8);

		            var hiddenField9 = document.createElement("input");
		            hiddenField9.setAttribute("type", "hidden");
		            hiddenField9.setAttribute("name", "protectWeight");
		            hiddenField9.setAttribute("value", weightList.protectWeight);
		            form.appendChild(hiddenField9);
		            
		            var hiddenField10 = document.createElement("input");
		            hiddenField10.setAttribute("type", "hidden");
		            hiddenField10.setAttribute("name", "roadWeight");
		            hiddenField10.setAttribute("value", weightList.roadWeight);
		            form.appendChild(hiddenField10);
		            
//		            var hiddenField2 = document.createElement("textarea");
//		            hiddenField2.setAttribute("type", "hidden");
//		            hiddenField2.setAttribute("name", "imageUrl");
////		            hiddenField2.setAttribute("value", "test");
//		            hiddenField2.innerHTML = imageUrl;
////		            form.appendChild(hiddenField2);
		            
					
					
//					var queryString = $(form).serialize();
//		            iframe.src = url + "?" + queryString//;
					
//					$.ajax({
//						url : "./downloadExcelList.do",
//						enctype: 'multipart/form-data',
//						type : "POST",
//						data : data,
//						dataType : "json",
//						async : true,
//						success : function(response) {
//							console.log("완료")
//						},
//						error : function(request, status, error) {
//							console.log("code:" + request.status + "\n"
//									+ "message:" + request.responseText + "\n"
//									+ "error:" + error);
//						}
//					});
//					
	            data = {
	            	"imageUrl" : imageUrl,
	            }
		            
				$.ajax({
			
					url : "./fileImageUpload.do",
					type : "POST",
					data : data,
					dataType : "json",
					async : true,
					success : function(response) {
						
		        		var hiddenField11 = document.createElement("input");
			            hiddenField11.setAttribute("type", "hidden");
			            hiddenField11.setAttribute("name", "fileName");
			            hiddenField11.setAttribute("value", response.imageFileName);
			            form.appendChild(hiddenField11);
			            
			            var queryString = $(form).serialize();
			            iframe.src = url + "?" + queryString;
			            
			            for (var i = 0; i < totalLayer.length; i++) {
							totalLayer[i].style_.setText(new ol.style.Text())
						}
			            
			            map.getView().setCenter([center[0] - 0.000000001, center[1] - 0.000000001]);
					},
					error : function(request, status, error) {
						console.log("code:" + request.status + "\n"
								+ "message:" + request.responseText + "\n"
								+ "error:" + error);
					},
				})
				}).catch(function (err) {
					console.log(err); 
				});
				}, 1000);
			}
		}
	}
}