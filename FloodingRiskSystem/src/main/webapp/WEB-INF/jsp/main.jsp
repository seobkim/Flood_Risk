<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/css/ol.css"
	type="text/css">
<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
<script
	src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

<script
	src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.2.1/build/ol.js"></script>

<!-- screenshot -->
<script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js"></script>

<script src="https://use.fontawesome.com/releases/v5.2.0/js/all.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>

<link
	href="https://fonts.googleapis.com/css2?family=Do+Hyeon&family=Nanum+Gothic:wght@400;800&family=Noto+Serif+KR:wght@500&display=swap"
	rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.js"></script>
<link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/spectrum-colorpicker2/dist/spectrum.min.css">
	<link rel="stylesheet" type="text/css" href="./css/mapCss.css">
	<link href="./css/styles.css" rel="stylesheet" />

<meta charset="UTF-8">
<title>침수 리스크 서비스 솔루션</title>

</head>

<body>
	<div id=mainDiv>
		<div id="map" class="map"></div>
	</div>
<div id="sideMenuBar">
<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a class="navbar-brand" href="#">침수 리스크 서비스</a>
            <button class="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i class="fas fa-bars"></i></button>
         	&nbsp;&nbsp;&nbsp;<div id=toggle><label>배수분구</label>
				 <label class='switch'><input type='checkbox' id='tgBtn' onclick ='visibleBtn()' checked='checked'>
				 <span class='slider round'></span></label><p class='onOff'>&nbsp;<b class='onOffText'>ON</b></p><p class='onOff'style='display:none;'>&nbsp;<b class='onOffText'>OFF</b></p>
			 </div>
         	<button class='btn btn-dark' id='scShot' onclick='bodyShot()'>캡처<i class='fas fa-camera'></i></button>
        </nav>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div class="sb-sidenav-menu">
                        <div class="nav">
                            
<!--                             <div class="sb-sidenav-menu-heading">침수 시뮬레이션</div> -->
                            <a class="nav-link collapsed" href="#"  data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                	<b>기본 침수 지도</b>
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i></div>
                            </a>
                            <div class="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav">
                                <div>
                                <br><label class="title">분석조건</label><button class='btn btn-dark' id='baseFRiskPrint' onclick='dataOutput(this)'>자료출력</button><br><hr style="width:90%; background-color:white; float:left;">
                                <label> - 강우 조건</label><br>
                                
                             <select name='selectFlood' id='selectFlood'>
									<option value=''>강우 조건을 선택하세요</option>
									<option value='10년집중'>재현기간: 10년, 분포형: Huff 방법</option>
									<option value='10년분산'>재현기간: 10년, 분포형: Mononobe 방법</option>
									<option value='30년집중'>재현기간: 30년, 분포형: Huff 방법</option>
									<option value='30년분산'>재현기간: 30년, 분포형: Mononobe 방법</option>
									<option value='50년집중'>재현기간: 50년, 분포형: Huff 방법</option>
									<option value='50년분산'>재현기간: 50년, 분포형: Mononobe 방법</option></select>
									<br><br>
									
									<label >- 침수심 분류</label><br>
									

									<label style="margin-left:3px;">의무화:&nbsp;  </label>
									<input id="mandatoryInput" type="text" style="width:60px; margin-left: -5px;" onchange="linkInputValue(this)"><p>초과</p>~<input type="text"style="width:60px" disabled><p>이하</p>
									<a id='colorPick' class='colorPick2'><input type='color' value ='#ff0000' id='mandatoryColPick' onChange='floodColSetting(this)'> 
											<button onclick='resetFloodCol(this)' type='button' id= 'resetmandatoryCol' class='btn btn-outline-secondary' style="margin-right:5px; margin-bottom:5px;">
										    <svg width='1em' height='2em' viewBox='0 0 20 45' class='bi bi-arrow-clockwise' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
											<path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'></path>
											<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z'></path>
											</svg>
								  			</button>
									      </a><br>

									<label style="margin-left:10px;">권  고:</label><input id='suasionInput1' type="text"style="width:60px; margin-left:8px;" onchange="linkInputValue(this)"><p>초과</p>~<input id="suasionInput2" type="text"style="width:60px" onchange="linkInputValue(this)"><p>이하</p>
									<a id='colorPick' class='colorPick2'><input type='color' value= '#ffbb00'id='suasionColPick' onChange='floodColSetting(this)'> 
											<button onclick='resetFloodCol(this)' id= 'resetSuasionCol' type='button' class='btn btn-outline-secondary' style="margin-right:5px;">

										    <svg width='1em' height='2em' viewBox='0 0 20 45' class='bi bi-arrow-clockwise' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
											<path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'></path>
											<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z'></path>
											</svg>
								  			</button>
									      </a><br>

									      <label style="margin-left:10px;">참  고:</label><input id='refInput1' type="text"style="width:60px; margin-left:8px;" onchange="linkInputValue(this)"><p>초과</p>~<input id='refInput2' type="text"style="width:60px" onchange="linkInputValue(this)"><p>이하</p>
									<a id='colorPick' class='colorPick2'><input type='color'  value = '#ffff36'id='refColPick' onChange='floodColSetting(this)'> 
											<button onclick='resetFloodCol(this)' id='resetRefCol' type='button' class='btn btn-outline-secondary' style="margin-right:5px;">

										    <svg width='1em' height='2em' viewBox='0 0 20 45' class='bi bi-arrow-clockwise' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
											<path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'></path>
											<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z'></path>
											</svg>
								  			</button>

									      </a><br>
									            <label style="margin-left:10px;">안  전:</label><input type="text"style="width:60px; margin-left:8px;" value="0" disabled><p>이상</p>~<input id='safeInput1' type="text"style="width:60px;" onchange="linkInputValue(this)"><p>이하</p>
									<a id='colorPick' class='colorPick2'><input type='color'  value = '#9fc93c'id='safeColPick' onChange='floodColSetting(this)'> 
											<button onclick='resetFloodCol(this)' id='resetSafeCol' type='button' class='btn btn-outline-secondary' style="margin-right:5px;">

										    <svg width='1em' height='2em' viewBox='0 0 20 45' class='bi bi-arrow-clockwise' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
											<path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'></path>
											<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z'></path>
											</svg>
								  			</button>

									      </a><br>
									   

									      <button class="btn btn-dark"onclick="floodRadioBtn($('select[name=selectFlood]').val())" style="margin-left:100px;">화면출력</button>
									      <input type='reset' class='btn btn-light' onclick='resetFloodBtn()' value='취소'><br><br>
									 <label>- 조건별 분포 보기</label><br>
							
									<select name="floodSearch" id="search">
                                	<option>범위지정</option>
									 <option value="over">초과</option>
									 <option value="under">이하</option>
									 </select>
									 <input type="text" id="filterLange1" style="width:50px" class="min">초과&nbsp;~
									 <input type="text" id="filterLange2" style="width:50px" class="max">이하&nbsp;
									 <button class="btn btn-dark" onclick="floodFilter($('select[name=selectFlood]').val())">검색</button>
                                    </div> 
                                </nav>
                            </div>
                            <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                                	<b>종합 침수 리스크 분석</b>
                      
                                <div class="sb-sidenav-collapse-arrow"><i class="fas fa-angle-down"></i>
                               
                                </div>
                            </a>
                            <div class="collapse" id="collapsePages" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav class="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">
                                <div>
                                <br><label class="title"> 인자선택 및 가중치 입력</label><button class='btn btn-dark' id='synthesisPrint' onclick='dataOutput(this)'>자료출력</button><hr style="width:90%; background-color:white; float:left;">
                                <br>   
                                    <div class='feature2'>
                                    <div>
                                    <select name='selectFloodTotal' id='selectFloodTotal'>
									<option value=''>강우 조건을 선택하세요</option>
									<option value='10년집중'>재현기간: 10년, 분포형: Huff 방법</option>
									<option value='10년분산'>재현기간: 10년, 분포형: Mononobe 방법</option>
									<option value='30년집중'>재현기간: 30년, 분포형: Huff 방법</option>
									<option value='30년분산'>재현기간: 30년, 분포형: Mononobe 방법</option>
									<option value='50년집중'>재현기간: 50년, 분포형: Huff 방법</option>
									<option value='50년분산'>재현기간: 50년, 분포형: Mononobe 방법</option></select><br>
									
									<label id="weightTitle">선택 인자<br>가중치</label><label id="weightDefaultTitle">전체 인자<br>가중치</label><br><br>
									<input class='check' type='checkbox' id='floodCheck' checked onclick='checkFactor(this)'>&nbsp<label for='floodCheck' style="margin-right:7px;">침 수 심</label><div class="linkLine"></div>
									<input type='text' class='weight' value=24 onchange='changeFactor(this)' id='floodWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=24 id='floodWeightDefault' readOnly></div>
									<input class='check' type='checkbox' id='popCheck' checked onclick='checkFactor(this)'>&nbsp<label for='popCheck'>거주인구</label><div class="linkLine"></div>
									<input class='weight' type='text' value=18 onchange='changeFactor(this)' id='popWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=18 id='popWeightDefault' readOnly><br>
									<input class='check' type='checkbox' id='liveCheck' checked onclick='checkFactor(this)'>&nbsp<label for='liveCheck'>주거지역</label><div class="linkLine"></div>
									<input class='weight' type='text' value=8 onchange='changeFactor(this)' id='liveWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=8 id='liveWeightDefault' readOnly><br>
									<input class='check' type='checkbox' id='commerCheck' checked onclick='checkFactor(this)'>&nbsp<label for='commerCheck'>상업지역 </label><div class="linkLine"></div>
									<input class='weight' type='text' value=4 onchange='changeFactor(this)' id='commerWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=4 id='commerWeightDefault' readOnly><br>
									<input class='check' type='checkbox' id='indusCheck' checked onclick='checkFactor(this)'>&nbsp<label for='indusCheck'>공업지역</label><div class="linkLine"></div>
									<input class='weight' type='text' value=2 onchange='changeFactor(this)' id='indusWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=2 id='indusWeightDefault' readOnly><br>
									<input class='check' type='checkbox' id='natureCheck' checked onclick='checkFactor(this)'>&nbsp<label for='natureCheck'>자연녹지지역</label><div class="linkLineLong"></div>
									<input class='weight' type='text' value=1 onchange='changeFactor(this)' id='natureWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=1 id='natureWeightDefault' readOnly><br>
									<input class='check' type='checkbox' id='buildCheck' checked onclick='checkFactor(this)'>&nbsp<label for='buildCheck'>취약건물</label><div class="linkLine"></div>
									<input class='weight' type='text' value=20 onchange='changeFactor(this)' id='buildWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=20 id='buildWeightDefault' readOnly><br>
									<input class='check' type='checkbox' id='protectCheck' checked onclick='checkFactor(this)'>&nbsp<label for='protectCheck'>보호대상시설</label><div class="linkLineLong"></div>
									<input class='weight' type='text' value=18 onchange='changeFactor(this)' id='protectWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=18 id='protectWeightDefault' readOnly><br>
									<input class='check' type='checkbox' id='roadCheck' checked onclick='checkFactor(this)'>&nbsp<label for='roadCheck'>도로연장 </label><div class="linkLine"></div>
									<input class='weight' type='text' value=5 onchange='changeFactor(this)' id='roadWeight' onmouseover='weightMouseOver(this, &#34in&#34)' onmouseout='weightMouseOver(this)'>
									<input class='weightDefault' type='text' value=5 id='roadWeightDefault' readOnly><br>
									<label style="margin-left: 17px">총 합</label>&nbsp;<div class="linkLineSum"></div>
									<input class='weightSums' type='text' value=100 id='weightSums' readOnly>
									<input class='weightSumDefault' type='text' value=100 id='weightSumDefault' readOnly><br>
									<label id="unit">가중치 단위: %</label>
                                	<br></div><br>
                                	
                                   	<input type='button'class='btn btn-dark' onclick='riskCalc()' value='합산' style="margin-left:100px;">
									<input type='reset' class='btn btn-light' onclick='resetBtn()' value='취소'>
										<a id='colorPickTotal' class='colorPick2'><input type='color' value='#ffecb3' id='colorPicTotal' onChange='totalColSetting(this.value)' > 
										<button onclick='resetColorTotal()' type='button' class='btn btn-outline-secondary'>
										<svg width='1em' height='2em' viewBox='0 0 20 45' class='bi bi-arrow-clockwise' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
										<path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'></path>
										<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z'></path>
										</svg>
								  		</button>
									</a><br><br>
									
									<label>조건별 분포 보기</label><br>
									<select name="totalSearch" id="search2">
                                   	<option>범위지정</option>
                           			<option value="over">초과</option>
                            		<option value="under">이하</option>
                            		</select>
                            		<input type="text" class="min1" style="width:50px" id="totalLange1">초과&nbsp~
                            		<input type="text" class="max1" style="width:50px" id="totalLange2">이하

                                    <button class='btn btn-dark' onclick="totalFilter($('select[name=selectFloodTotal]').val())">검색</button>
                                      </div><br>
                                      <div>
                                   	<label class="title">인자별 출력</label><br><hr style="width:90%; background-color:white; float:left;">
                                   
                                	<label>- 인자선택</label>


                                	<select id="factor" name="selectFactors" onchange="factorSelected(this.value)">
                                	<option value='선택없음' selected>선택없음</option>
                                	<option value='거주인구' >거주인구</option>
                                	<option value='주거지역' >주거지역</option>
                                	<option value='상업지역' >상업지역</option>
                                	<option value='공업지역' >공업지역</option>
                                	<option value='자연녹지지역' >자연녹지지역</option>
                                	<option value='취약건물' >취약건물</option>
                                	<option value='보호대상' >보호대상시설</option>
                                	<option value='도로연장' >도로연장</option>
                                	</select>

                                	<a id='colorPick' class='colorPick2'><input type='color' value='#ebecb3' id='colorPic2' onChange='factorColSetting(this.value)'> 
										<button onclick='resetFactorColor()' type='button' class='btn btn-outline-secondary' style="margin-right:5px; margin-bottom:5px;">
									    <svg width='1em' height='2em' viewBox='0 0 20 45' class='bi bi-arrow-clockwise' fill='currentColor' xmlns='http://www.w3.org/2000/svg'>
										<path fill-rule='evenodd' d='M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z'></path>
										<path d='M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z'></path>
										</svg>
							  			</button>
								     </a>                            
                                	<label>- 조건별 분포 보기</label><br>
                                	<select name="factorSearch" id="search3">
                                	 <option value="범위지정">범위지정</option>
									 <option value="over">초과</option>
									 <option value="under">이하</option>
									 </select>
									 <input type="text" class="min2" style="width:50px" id="factorRange1">초과&nbsp~
									 <input type="text" class="max2" style="width:50px" id="factorRange2">이하
									 <button class='btn btn-dark' id="searchBtn" value="search" onclick="factorSelectedFilter($('select[name=selectFactors]').val())" >검색</button>
                                   	</div>
                                </nav>
                            </div>
                             
                        </div>
                    </div>
                </nav>
            </div>
            
            <div id="layoutSidenav_content">
       
               
            </div>
        </div>
        </div>
		<iframe id="downloadFrame" style="display: none" ></iframe>
	<script src="./script/scripts.js"></script>
		<!-- 메인 -->
	<script src="./script/main.js"></script>
	<!-- 침수 시뮬레이션 -->
	<script type="text/javascript" src="./script/floodSimul.js"></script>
	<!-- 인자 -->
	<script src="./script/factor.js"></script>
	<!-- 최종점수 합산 -->
	<script src="./script/totalScore.js"></script>
	<!-- 스크린샷 -->
	<script src="./script/screenShot.js"></script>
	
		
</body>
</html>