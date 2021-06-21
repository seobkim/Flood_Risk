
// 이미지 형식 Open Street Map
var raster = new ol.layer.Tile({
	name : "osm",
	source : new ol.source.OSM()
});

var map = new ol.Map({
	layers : [ raster ],
	target : document.getElementById('map'),
	view : new ol.View({
		extent : [14095599.157995611, 4519444.588550328, 14137611.823862176, 4546138.556754355],
		center : ol.proj.fromLonLat([ 126.833, 37.661]), // 맵이 로딩되었을 때 보여질 기본
		// 위치(좌표) 설정
		zoom : 15,// 줌 레벨은 말 그대로 확대 레벨 (숫자가 커질수록 확대 됨)

	})
})

//배수분구
var vectorSource2 = new ol.source.Vector(
		{
			loader : function(extent, resolution) {
				
				url ="./pipeView.do";
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
						
						makePipeLayer();

					} else {
						onError();
					}
				}
				xhr.send();
			},
		});



var vector2 = new ol.layer.Vector({
	name : "pipeLayer",
	source : vectorSource2,
});

map.addLayer(vector2);


function makePipeLayer() {
	var pipeLayer = getLayerByName("pipeLayer").getSource().getFeatures();
	
	var yValue = 0;
	for(var i=0; i<pipeLayer.length; i++) {
		yValue = 0;
		if(pipeLayer[i].get("ddr_nam") == "원능2배수분구") {
			yValue = -150;
		}
		pipeLayer[i].setStyle(new ol.style.Style({
			fill: new ol.style.Fill({
				color: 'rgba(255,255,255,0.5)',
			}),
			stroke : new ol.style.Stroke({
				color : '#3399CC',
				width : 2
			}),
			text: new ol.style.Text({
				scale : 1,
				text: pipeLayer[i].get("ddr_nam"),
				offsetY : yValue,			
				font: '12px Calibri,sans-serif',
				fill: new ol.style.Fill({
					color: '#000',
				}),
				stroke: new ol.style.Stroke({
					color: '#fff',
					width: 3,
				})
			})
		}))
	}
	
	var source = new ol.source.Vector({wrapX: false});
	
	var format = new ol.format.WKT();
	
	var geom = format.readGeometry("POINT(14119118 4532506)");

	//추출된 geom의 값으로 feature객체 생성
	var feature2 = new ol.Feature({
		geometry : geom,
	});
	//벡터레이어의 벡터소스에 feature추가
	source.addFeature(feature2);
	
	var style = new ol.style.Style({
		fill: new ol.style.Fill({
			color: 'rgba(255,255,255,0.5)',
		}),
		stroke : new ol.style.Stroke({
			color : '#3399CC',
			width : 2
		}),
		text: new ol.style.Text({
			scale : 2,
			text: "원능2배수분구",
			font: '12px Calibri,sans-serif',
			overflow: true,
			fill: new ol.style.Fill({
				color: '#000',
			}),
			stroke: new ol.style.Stroke({
				color: '#fff',
				width: 3,
			})
		})
    })
		
    var vector = new ol.layer.Vector({
    	name: "wonneung2",
    	source: source,
    	style: style,
    	visible: false,
    });

    /* 레이어 추가*/
	map.addLayer(vector);
}

// 줌 변화가 끝난 시점에 이벤트 발생
map.on("moveend", zoomChanged);

//var zoomReal = map.getView().getZoom();

function zoomChanged(obj){
	
	var zoom = map.getView().getZoom();
	var center = map.getView().getCenter();
	
	var labelWonneung = getLayerByName("wonneung2");	 
	
	if(zoom > 15) {
		labelWonneung.setVisible(true);
	}else {
		if(labelWonneung)
		labelWonneung.setVisible(false);
	}
}


// 축척추가
var scaleLine = new ol.control.ScaleLine();
map.addControl(scaleLine);

// 팝업창
var mapInnerDiv = document.getElementsByClassName('ol-overlaycontainer-stopevent');
var popDiv = document.createElement('div');
//var drainagePopDiv = document.createElement('div'); //배수분구 팝업
var factorPopDiv = document.createElement('div');
var infoDiv = document.createElement('div');
var finPopDiv = document.createElement('div');
var openBtn = document.createElement('div');
// var sideBar = document.createElement('div');
// var weightBar = document.createElement('div');
var weightList = document.getElementsByClassName("weight");
var weightListDf = [];

for (var i = 0; i < weightList.length; i++) {
	weightListDf[i] = parseFloat(weightList[i].defaultValue / 100);
}

var that = this;

popDiv.id = "legendDiv";
factorPopDiv.id = "factorLegendDiv";
//drainagePopDiv.id = "drainagePopDiv";
finPopDiv.id = "finalDiv";
infoDiv.id = "infoDiv";
// sideBar.id = "mysidenav";
openBtn.id = "openBtn";
// weightBar.id="weightnav";

//var sideMenuBar = document.getElementById("sideMenuBar");

//mapInnerDiv[0].appendChild(sideMenuBar);
mapInnerDiv[0].appendChild(infoDiv);
mapInnerDiv[0].appendChild(popDiv);
mapInnerDiv[0].appendChild(factorPopDiv);
//mapInnerDiv[0].appendChild(drainagePopDiv);
mapInnerDiv[0].appendChild(finPopDiv);
mapInnerDiv[0].appendChild(openBtn);


//배수분구 명칭 추가
//$("#drainagePopDiv").css("display","block");
//var div0 = document.createElement("div");
//div0.style.width="150px";
//div0.style.height="20px";
//div0.innerHTML = "<b>원능2배수분구</b>";
//
//this.document.getElementById("drainagePopDiv").appendChild(div0);


// mapInnerDiv[0].appendChild(sideBar);
// mapInnerDiv[0].appendChild(weightBar);

//		
//		
// openBtn.innerHTML="<button class='openbtn' onclick='openNav()'>☰ </button>";
// sideBar.innerHTML=sideBarBoot;
// "<div id='indexDiv'><a class='closebtn' onclick='closeNav()'>×</a>침수
// 리스크<br>서비스 솔루션</div>"+
//
// "<div class=simul><h4 class='btn btn-primary'><b>침수시뮬레이션 조회</b>&nbsp;<label
// class='switch'><input type='checkbox' id='tgBtn1' onclick ='simulLegendBtn()'
// checked=checked><span class='slider round'></span></label>&nbsp;<p
// class='legendText'>상대</p><p class='legendText'
// style='display:none;'>절대</p></h4><br>"+
// "<input type='radio' name = 'grp1' id ='lb1' value='10년집중'
// onclick='floodRadioBtn(this.value)'> <label
// for='lb1'>10년빈도(집중형)</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb2' value='10년분산'
// onclick='floodRadioBtn(this.value)'> <label
// for='lb2'>10년빈도(분산형)</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb3' value='30년집중'
// onclick='floodRadioBtn(this.value)'> <label
// for='lb3'>30년빈도(집중형)</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb4' value='30년분산'
// onclick='floodRadioBtn(this.value)'> <label
// for='lb4'>30년빈도(분산형)</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb5' value='50년집중'
// onclick='floodRadioBtn(this.value)'> <label
// for='lb5'>50년빈도(집중형)</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb6' value='50년분산'
// onclick='floodRadioBtn(this.value)'> <label
// for='lb6'>50년빈도(분산형)</label><br></div>"+
// "<div class= button id=button><h4 class='btn
// btn-primary'><b>인자조회</b></h4><br></div>"+
//
// "<div class='feature'>"+
// "<input type='radio' name = 'grp1' id ='lb7' value='거주인구'
// onclick='factorRadioBtn(this.value)'> <label for='lb7'>거주인구</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb8' value ='주거지역'
// onclick='factorRadioBtn(this.value)'> <label for='lb8'>주거지역 면적</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb9' value ='상업지역'
// onclick='factorRadioBtn(this.value)'> <label for='lb9'>상업지역 면적</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb10' value ='공업지역'
// onclick='factorRadioBtn(this.value)'> <label for='lb10'>공업지역 면적</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb11' value ='자연녹지'
// onclick='factorRadioBtn(this.value)'> <label for='lb11'>자연녹지지역
// 면적</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb14' value='취약건물'
// onclick='factorRadioBtn(this.value)'> <label for='lb14'>취약건물 수</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb12' value='보호대상'
// onclick='factorRadioBtn(this.value)'> <label for='lb12'>보호대상시설수</label><br>"+
// "<input type='radio' name = 'grp1' id ='lb13' value='도로연장'
// onclick='factorRadioBtn(this.value)'> <label
// for='lb13'>도로연장</label><br></div>"+
// "<div id='calcRisk'>"+
// "<div class=button>"+
// "<input type='button' value='최종점수 합산' onclick='riskCalc1()' class='btn
// btn-dark' style='font-family: 'Noto Serif KR', serif'><br><br>" +
//		
// "<p>"+
// "<a id='toggleBtn'class='btn btn-secondary' data-toggle='collapse'
// href='#multiCollapseExample1' role='button' aria-expanded='false'
// aria-controls='multiCollapseExample1'>레이어관리</a>"+
// "</p>"+
// "<div class='row'>"+
// "<div class='col'><br>"+
// "<div class='collapse multi-collapse' id='multiCollapseExample1'>"+
// "<div class='card card-body'>"+
// "<div id=toggle><label>레이어</label>"+
// "<label class='switch'><input type='checkbox' id='tgBtn' onclick
// ='visibleBtn()' checked='checked'><span class='slider
// round'></span></label>"+
// "<p class='onOff'>&nbsp<b>ON</b></p><p
// class='onOff'style='display:none;'>&nbsp<b>OFF</b></p></div>"+
// "<div id='colorPick' class='colorPick'><label>레이어 색 선택 :&nbsp</label><input
// type='color' id='colorPic' onChange='ee(this.value)'>&nbsp" +
// "<button onclick='resetColor()' type='button' class='btn
// btn-outline-secondary'>"+
// "<svg width='1em' height='2em' viewBox='0 0 20 45' class='bi
// bi-arrow-clockwise' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>"+
// "<path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1
// .908-.417A6 6 0 1 1 8 2v1z'></path>"+
// "<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0
// .384L8.41 4.658A.25.25 0 0 1 8 4.466z'></path>"+
// "</svg>"+
// "</button><br>"+
// "</div>"+
// "<div class=button><button class='btn' id='scShot' onclick=bodyShot()>캡처<i
// class='fas fa-camera'></i></button></div>"+
// "</div>"+
// "</div>"+
// "</div>";
//
//
//		
// $("#weightnav").css("display","none");
// weightBar.innerHTML="<div id='indexDiv'><a class='closebtn'
// onclick='back()'><b>←</b></a>침수 리스크<br>서비스 솔루션</div>"+
// "<div class=clac><form><div class='simul'><h4 class='btn btn-primary'><b>최종점수
// 합산</b></h4><br>" +
// "<select name='selectFlood' id='selectFlood'>" +
// "<option value=''>침수 시뮬레이션 선택</option>" +
// "<option value='10년집중'>10년 집중</option>" +
// "<option value='10년분산'>10년 분산</option>" +
// "<option value='30년집중'>30년 집중</option>" +
// "<option value='30년분산'>30년 분산</option>" +
// "<option value='50년집중'>50년 집중</option>" +
// "<option value='50년분산'>50년 분산</option></select>" +
// "<input type='text' class='weight' value=0.24 onchange='bg(this)'
// id='floodWeight'></div><br>" +
// "<div class='feature2'><div class=all><input class='check-all'
// type='checkbox' oncilck='chClick()' id='checkAll' checked='checked'><label
// for='checkAll'>전체선택 </label><br></div>" +
// "<input class='check' type='checkbox' id='lbl1'checked='checked'><label
// for='lbl1'>거주인구</label>" +
// "<input class='weight' type='text' value=0.18 onchange='bg(this)'
// id='popWeight'><br>" +
// "<input class='check' type='checkbox' id='lbl2'checked='checked'><label
// for='lbl2'>주거지역</label>" +
// "<input class='weight' type='text' value=0.08 onchange='bg(this)'
// id='liveWeight'><br>" +
// "<input class='check' type='checkbox' id='lbl3'checked='checked'><label
// for='lbl3'>상업지역</label>" +
// "<input class='weight' type='text' value=0.04 onchange='bg(this)'
// id='commerWeight'><br>" +
// "<input class='check' type='checkbox' id='lbl4'checked='checked'><label
// for='lbl4'>공업지역</label>" +
// "<input class='weight' type='text' value=0.02 onchange='bg(this)'
// id='indusWeight' ><br>" +
// "<input class='check' type='checkbox' id='lbl5'checked='checked'><label
// for='lbl5'>자연녹지지역</label>" +
// "<input class='weight' type='text' value=0.01 onchange='bg(this)'
// id='natureWeight'><br>" +
// "<input class='check' type='checkbox' id='lbl6'checked='checked'><label
// for='lbl6'>취약건물</label>" +
// "<input class='weight' type='text' value=0.20 onchange='bg(this)'
// id='buildWeight'><br>" +
// "<input class='check' type='checkbox' id='lbl7'checked='checked'><label
// for='lbl7'>보호대상시설</label>" +
// "<input class='weight' type='text' value=0.18 onchange='bg(this)'
// id='protectWeight'><br>" +
// "<input class='check' type='checkbox' id='lbl8'checked='checked'><label
// for='lbl8'>도로연장</label>" +
// "<input class='weight' type='text' value=0.05 onchange='bg(this)'
// id='roadWeight'><br></div>" +
// "<div class=button><input type='button'class='btn btn-dark'
// onclick='riskCalc()' value='합산'>" +
// "<input type='reset'class='btn btn-light' value='취소'></div></form></div>";

$(document).ready(function() {
	$('[data-toggle="popover"]').popover();
});
// 최종점수 인자 전체 선택

$('.check-all').click(function() {
	$('.check').prop('checked', this.checked);
});

$('.check').click(function() {
	$('.check-all').prop('checked', false);
});

// 조건별 분포 보기
$("#search").change(function() {
	if (search.value == "over") {
		$(".max").attr("disabled", true);
		$(".min").attr("disabled", false);
	} else if (search.value == "under") {
		$(".min").attr("disabled", true);
		$(".max").attr("disabled", false);
	} else {
		$(".min").attr("disabled", false);
		$(".max").attr("disabled", false);
	}
});

$("#search2").change(function() {
	if (search2.value == "over") {
		$(".max1").attr("disabled", true);
		$(".min1").attr("disabled", false);
	} else if (search2.value == "under") {
		$(".min1").attr("disabled", true);
		$(".max1").attr("disabled", false);
	} else {
		$(".min1").attr("disabled", false);
		$(".max1").attr("disabled", false);
	}
});

$("#search3").change(function() {
	if (search3.value == "over") {
		$(".max2").attr("disabled", true);
		$(".min2").attr("disabled", false);
	} else if (search3.value == "under") {
		$(".max2").attr("disabled", false);
		$(".min2").attr("disabled", true);
	} else {
		$(".max2").attr("disabled", false);
		$(".min2").attr("disabled", false);
	}
});

// 인자 변경 시 text box 비우기
 $("#factor").change(function(){
	 $('#factorRange1').val('');
	 $('#factorRange2').val('');
});

//			 
// //최종점수 합산 nav열림
// function riskCalc1(){
// $("#weightnav").css("display","block");
// $("#mysidenav").css("display","none");
// };
//				
// //최종점수 합산 nav 닫기
// function back(){
// $("#weightnav").css("display","none");
// $("#mysidenav").css("display","block");
//					
// };
//				
// //사이드 메뉴 열고 닫기
// function openNav() {
//					
// $(".openbtn").css("display" , "none");
// $("#mysidenav").css("display" , "block");
// }
// function closeNav(){
// $(".openbtn").css("display" , "block");
// $("#mysidenav").css("display" , "none");
// }

map.on('pointermove', function(e) {
			var selected = e;
			if (selected !== null) {
				// selected.setStyle();
				selected = null;
			}

				map.forEachFeatureAtPixel(e.pixel, function(f) {
					selected = f;
					return true;
				});
				if (selected) {
					
					var selectValue = $('select[name=selectFlood]').val();
//					var selectValue = $("input[name='grp1']:checked").val();
					var factorSelectValue = $('select[name=selectFactors]').val();
					
					 var mysidenav = $("#map").offset().left;
					 x = event.clientX;
				     y = event.clientY;
				     
				     if(getLayerByName("floodLayer")!==null && getLayerByName("floodLayer").getVisible()){
				     
					 if(selectValue == "10년집중"){
					     var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
						 if(selected.get("tenYrHuff")){			     
					     testDiv.innerHTML= (selected.get("tenYrHuff")).toFixed(1)+"cm";
						 testDiv.style.display="block";
					 	}else if(selected.get("tenYrHuff")==0){
					 		testDiv.innerHTML="0cm";
					 		testDiv.style.display="block";
					 	}
						 
					 else{
						 testDiv.style.display="none";
					 }
					 }
					 
					 else if(selectValue == "10년분산"){
					     var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
						 if(selected.get("tenYrMono")){			     
					     testDiv.innerHTML= (selected.get("tenYrMono")).toFixed(1)+"cm";
						 testDiv.style.display="block";
						 	}
						 else if(selected.get("tenYrMono")==0){
						 		testDiv.innerHTML="0cm";
						 		testDiv.style.display="block";
						 	}
						 else{
							 testDiv.style.display="none";
						 }
						 }
					 else if(selectValue == "30년집중"){
					     var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
						 if(selected.get("thrYrHuff")){			     
					     testDiv.innerHTML= (selected.get("thrYrHuff")).toFixed(1)+"cm";
						 testDiv.style.display="block";
					 	}
						 else if(selected.get("thrYrHuff")==0){
						 		testDiv.innerHTML="0cm";
						 		testDiv.style.display="block";
						 	}
					 else{
						 testDiv.style.display="none";
					 }
					 }
					 
					 else if(selectValue == "30년분산"){
					     var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
						 if(selected.get("thrYrMono")){			     
					     testDiv.innerHTML= (selected.get("thrYrMono")).toFixed(1)+"cm";
						 testDiv.style.display="block";
						 	}
						 else if(selected.get("thrYrMono")==0){
						 		testDiv.innerHTML="0cm";
						 		testDiv.style.display="block";
						 	}
						 else{
							 testDiv.style.display="none";
						 }
						 }
					 else if(selectValue == "50년집중"){
					     var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
						 if(selected.get("fiftYrHuff")){			     
					     testDiv.innerHTML= (selected.get("fiftYrHuff")).toFixed(1)+"cm";
						 testDiv.style.display="block";
					 	}
						 else if(selected.get("fiftYrHuff")==0){
						 		testDiv.innerHTML="0cm";
						 		testDiv.style.display="block";
						 	}
					 else{
						 testDiv.style.display="none";
					 }
					 }
					 
					 else if(selectValue == "50년분산"){
					     var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
						 if(selected.get("fiftYrMono")){			     
					     testDiv.innerHTML= (selected.get("fiftYrMono")).toFixed(1)+"cm";
						 testDiv.style.display="block";
						 	}
						 else if(selected.get("fiftYrMono")==0){
						 		testDiv.innerHTML="0cm";
						 		testDiv.style.display="block";
						 	}
						 else{
							 testDiv.style.display="none";
						 }
						 }
					 
				     }
				     
				     if(getLayerByName("factorLayer")!==null && getLayerByName("factorLayer").getVisible()){
					 
					 if(factorSelectValue == "거주인구"){
					     var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
						 if(selected.get("popCnt")){			     
					     testDiv.innerHTML= selected.get("popCnt")+"명";
					    
						 testDiv.style.display="block";
						 	}
						 else{
							 testDiv.style.display="none";
						 }
						 }
					 
					 else if(factorSelectValue == "주거지역"){
						 
						 var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
					   		if(selected.get("liveArea")){			     
					     testDiv.innerHTML= (selected.get("liveArea")).toFixed(1)+"㎡";
					    
						 testDiv.style.display="block";
						 	}
						 else{
							 testDiv.style.display="none";
						 }
						
						 }
					 else if(factorSelectValue == "상업지역"){
						 
						 var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
					   if(selected.get("commerArea")){			     
					     testDiv.innerHTML= (selected.get("commerArea")).toFixed(1)+"㎡";
					    
						 testDiv.style.display="block";
						 	}
						 else{
							 testDiv.style.display="none";
						 }
						
						 }
					 else if(factorSelectValue == "공업지역"){
							 
							 var testDiv = document.getElementById("infoDiv");
						     testDiv.style.left=x+15+"px";
						     testDiv.style.top=y+10+"px";
							 
						     
						     if(selected.get("indusArea")){			     
		  					     testDiv.innerHTML= (selected.get("indusArea")).toFixed(1)+"㎡";
		  					    
		  						 testDiv.style.display="block";
		  						 	}
		  						 else{
		  							 testDiv.style.display="none";
		  						 }
							
							 }
					 else if(factorSelectValue == "자연녹지지역"){
							 
							 var testDiv = document.getElementById("infoDiv");
						     testDiv.style.left=x+15+"px";
						     testDiv.style.top=y+10+"px";
							 
						   if(selected.get("natureArea")){			     
	  					     testDiv.innerHTML= (selected.get("natureArea")).toFixed(1)+"㎡";
	  					    
	  						 testDiv.style.display="block";
	  						 	}
	  						 else{
	  							 testDiv.style.display="none";
	  						 }
							
							 }
					 else if(factorSelectValue == "취약건물"){
							     var testDiv = document.getElementById("infoDiv");
							     testDiv.style.left=x+15+"px";
							     testDiv.style.top=y+10+"px";
								 
								 if(selected.get("buildCnt")){			     
							     testDiv.innerHTML= selected.get("buildCnt")+"개";
								 testDiv.style.display="block";
								 	}
								 else{
									 testDiv.style.display="none";
								 }
								 }
					 else if(factorSelectValue == "보호대상"){
							     var testDiv = document.getElementById("infoDiv");
							     testDiv.style.left=x+15+"px";
							     testDiv.style.top=y+10+"px";
								 
								 if(selected.get("protectFacilityCnt")){			     
							     testDiv.innerHTML= selected.get("protectFacilityCnt")+"개";
								 testDiv.style.display="block";
								 	}
								 else{
									 testDiv.style.display="none";
								 }
								 }
					 else if(factorSelectValue == "도로연장"){
							     var testDiv = document.getElementById("infoDiv");
							     testDiv.style.left=x+15+"px";
							     testDiv.style.top=y+10+"px";
								 
								 if(selected.get("roadLen")){			     
							     testDiv.innerHTML= selected.get("roadLen").toFixed(1)+"m";
								 testDiv.style.display="block";
								 	}
								 else{
									 testDiv.style.display="none";
								 }
								 }
				     }if(getLayerByName("totalLayer")!==null && getLayerByName("totalLayer").getVisible()){
				 
					     var testDiv = document.getElementById("infoDiv");
					     testDiv.style.left=x+15+"px";
					     testDiv.style.top=y+10+"px";
						 
						 if(selected.get("totalScore")){			     
					     testDiv.innerHTML= selected.get("totalScore").toFixed(1)+"점";
						 testDiv.style.display="block";
						 	}
						 else{
							 testDiv.style.display="none";
						 }
						 }
					
			} else {
				var testDiv = document.getElementById("infoDiv");
				testDiv.style.display = "none";

			}
		});

function getLayerByName(layerName) {
	var layer = null;

	map.getLayers().forEach(function(el) {

		if (el.get('name') === layerName) {
			layer = el;
		}
	});

	return layer
}

var bool = true;

// toggle에 따른 절대/상대 글씨 나타나게
var simulLegendCheck = $("#tgBtn1");
simulLegendCheck.click(function() {
	$(".legendText").toggle();
});

// toggle에 따른 on/off 글씨 나타나게
var check = $("#tgBtn");
check.click(function() {
	$(".onOff").toggle();
});

//배수분구 on/off
function visibleBtn() {

	var pipeLayer = getLayerByName("pipeLayer");
	
	if (!$("#tgBtn").is(':checked')) {
		bool = !bool;
		
		if (pipeLayer.getVisible() === true) {
			pipeLayer.setVisible(false);
		}
		
	} else {
		bool = !bool;
		if ($('input:radio[name=grp1]').is(':checked')) {
			$('input:radio[name=grp1]:checked').click();
		} else if (getLayerByName("pipeLayer")) {
			getLayerByName("pipeLayer").setVisible(true);
		}
	}
}

function changeFactor(obj) {

	// if(obj.defaultValue == obj.value) {
	// obj.style.backgroundColor = 'white';
	// obj.style.color = 'black';
	// }else if(obj.defaultValue < obj.value) {
	// obj.style.backgroundColor = 'red';
	// obj.style.color = 'white';
	// }else {
	// obj.style.backgroundColor = 'green';
	// obj.style.color = 'white';
	// }

	var checks = document.getElementsByClassName('check');
	var weightList = document.getElementsByClassName("weight");
	var weightListDefault = document.getElementsByClassName("weightDefault");
	var weightSums = document.getElementById("weightSums");
	var weightSum = 0;
	
	// 직접 숫자 변경시 자동가중치 변경 막음용
	if(obj) {
//		switch(obj.id.split('W')[0]) {
//			case "flood":
//				weightListDf[0] = Number(obj.value / 100);
//				break;
//			case "pop":
//				weightListDf[1] = Number(obj.value / 100);
//				break;
//			case "live":
//				weightListDf[2] = Number(obj.value / 100);
//				break;
//			case "commer":
//				weightListDf[3] = Number(obj.value / 100);
//				break;
//			case "indus":
//				weightListDf[4] = Number(obj.value / 100);
//				break;
//			case "nature":
//				weightListDf[5] = Number(obj.value / 100);
//				break;
//			case "build":
//				weightListDf[6] = Number(obj.value / 100);
//				break;
//			case "protect":
//				weightListDf[7] = Number(obj.value / 100);
//				break;
//			case "road":
//				weightListDf[8] = Number(obj.value / 100);
//				break;
//		};
		
		for(var i=0; i<weightListDf.length; i++) {
			if(obj.id.split('W')[0] == weightList[i].id.split('W')[0]) {
				weightListDf[i] = Number(obj.value / 100);
			}else {
				weightListDf[i] = Math.round(Number(weightList[i].value / 100) * 1000) / 1000;
			}
		}

		for (var i = 0; i < weightList.length; i++) {
			weightSum += Number(weightList[i].value);
		}
		
		weightSums.value = Math.floor(weightSum*10) / 10;
		
		return ;
	}
	
	var weightSumA = 0;
	var checks = document.getElementsByClassName('check');
	
	for (var i = 0; i < checks.length; i++) {
		if (checks[i].checked == true) {
			weightSum += Number(document.getElementById(checks[i].id.split('C')[0] + "Weight").defaultValue);
		}
	}
	
	if(weightSum != 0) {
		for (var i = 0; i < weightList.length; i++) {
			if (checks[i].checked == true) {
				weightListDf[i] = weightList[i].defaultValue / weightSum;
				weightList[i].value = Math.floor(weightListDf[i] * 1000) / 10;
			}else {
				weightListDf[i] = 0;
			}
		}
	}else {
		for (var i = 0; i < weightList.length; i++) {
			weightListDf[i] = 0;
			weightList[i].value = 0;
		}
	}

	for (var i = 0; i < weightListDf.length; i++) {
		weightSumA += Number(weightListDf[i]);
	}
	
	weightSums.value = Math.floor(weightSumA * 1000) / 10;
	
}

function resetFloodBtn() {

	var selectFlood = document.getElementById("selectFlood");
	
	var mandatory = document.getElementById("mandatoryInput");
	var suasionMin = document.getElementById("suasionInput1");
	var suasionMax = document.getElementById("suasionInput2");
	var refMin = document.getElementById("refInput1");
	var refMax = document.getElementById("refInput2");
	var safe = document.getElementById("safeInput1");

	mandatory.value = "";
	suasionMin.value = "";
	suasionMax.value = "";
	refMin.value = "";
	refMax.value = "";
	safe.value = "";
	selectFlood.value = "";
}

function resetBtn() {

	var weightList = document.getElementsByClassName("weight");
	var checks = document.getElementsByClassName('check');
	var selectFloodTotal = document.getElementById("selectFloodTotal");

	selectFloodTotal.value = "";

	for (var i = 0; i < checks.length; i++) {
		checks[i].checked = true;
	}

	for (var i = 0; i < weightList.length; i++) {
		weightList[i].value = weightList[i].defaultValue;
		weightListDf[i] = weightList[i].value;
		weightList[i].disabled = false;
	}
	changeFactor();
}

function checkFactor(obj) {

	var linkWeight = document.getElementById(obj.id.split('C')[0] + "Weight");

	console.log(obj)
	
	if (obj.checked == false) {
		linkWeight.value = 0;
		linkWeight.disabled = true;
	} else {
		linkWeight.value = linkWeight.defaultValue;
		linkWeight.disabled = false;
	}
	
	changeFactor();

}

// 최종점수 인자 전체 선택
function chAllClick(obj) {
	var checks = document.getElementsByClassName('check');
	var weightList = document.getElementsByClassName("weight");
	if (obj.checked == true) {
		for (var i = 0; i < checks.length; i++) {
			checks[i].checked = true;
		}
		for (var i = 0; i < weightList.length; i++) {
			weightList[i].disabled = false;
			weightList[i].value = weightList[i].defaultValue;
		}
	} else {
		for (var i = 0; i < checks.length; i++) {
			checks[i].checked = false;
		}
		for (var i = 1; i < weightList.length; i++) {
			weightList[i].disabled = true;
			weightList[i].value = 0;
		}
	}
	changeFactor();
}

function linkInputValue(obj) {
	
	var mandatory = document.getElementById("mandatoryInput");
	var suasion1 = document.getElementById("suasionInput1");
	var suasion2 = document.getElementById("suasionInput2");
	var ref1 = document.getElementById("refInput1");
	var ref2 = document.getElementById("refInput2");
	var safe = document.getElementById("safeInput1");
		
	switch(obj.id){
	case "mandatoryInput":
		suasion2.value = obj.value;			
		break;
	case "suasionInput2":
		mandatory.value = obj.value;			
		break;
	case "suasionInput1":
		ref2.value = obj.value;
		break;
	case "refInput2":
		suasion1.value = obj.value;
		break;
	case "refInput1":
		safe.value = obj.value;
		break;
	case "safeInput1":
		ref1.value = obj.value;
		break;
	}
}

/* 인자 마우스 인식 이벤트 */
function weightMouseOver(obj, over) {

	var bubble = document.getElementById("alt_div");
	var menubar = document.getElementById("sideMenuBar");
	var sidenavAccordion = document.getElementById("sidenavAccordion");
	var selectI = null;

	switch (obj.id) {
	case "floodWeight":
		selectI = 0;
		break;
	case "popWeight":
		selectI = 1;
		break;
	case "liveWeight":
		selectI = 2;
		break;
	case "commerWeight":
		selectI = 3;
		break;
	case "indusWeight":
		selectI = 4;
		break;
	case "natureWeight":
		selectI = 5;
		break;
	case "buildWeight":
		selectI = 6;
		break;
	case "protectWeight":
		selectI = 7;
		break;
	case "roadWeight":
		selectI = 8;
		break;
	}
	
	if (over != null) {
		if (weightListDf.length != 0) {
			bubble.innerHTML = weightListDf[selectI];
		} else {
			bubble.innerHTML = obj.value;
		}
		bubble.style.visibility = "visible";
		bubble.style.textalign = "center";
		bubble.style.lineHeight = obj.offsetHeight + "px";
		bubble.style.height = obj.offsetHeight + "px";
		bubble.style.left = obj.offsetLeft + obj.offsetWidth + "px";
		bubble.style.top = obj.offsetTop + menubar.offsetHeight - sidenavAccordion.scrollTop + "px";
	} else {
		bubble.style.visibility = "hidden";
	}
}

document.write("<div id=alt_div style=\"" + "border:1px solid #ff9900;" + // 말풍선 테두리, 컬러
"background-color: #ffffff; color: #330000;" + // 말풍선 테이블 백그라운드컬러 / 폰트컬러
"font-size: 13px;" + "position: absolute; " + "visibility: hidden; "
		+ "overflow: hidden;" + "z-index: 9999;" + "width: auto;"
		+ "filter:alpha(opacity=1);" + // 투명도
		"\"></div>");
