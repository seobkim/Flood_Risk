package kr.go.floodrisk.common.web;


import java.io.File;
import java.io.FileOutputStream;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Properties;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.go.floodrisk.common.service.FloodSimulVO;
import kr.go.floodrisk.common.service.MainService;

@Controller
public class MainController {
	
	@Resource(name="mainService")
	private MainService mainService;
	
	/** PropertiesService */
	@Resource(name="fileProperties")
	private Properties fileProperties;
	
	
	@RequestMapping("/mPage.do")
	public String mainPage() throws Exception {
		return "main";
	}
	
	
	
	@RequestMapping(value="/tenYrHuff.do",method= RequestMethod.POST)
	public ModelAndView selectTenHuff(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		List<FloodSimulVO> resultVORes = mainService.selectTenHuffZero();
		
		ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/tenYrMono.do",method= RequestMethod.POST)
	public ModelAndView selectTenMono(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectTenMonoZero();
		
		ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/thrYrHuff.do",method= RequestMethod.POST)
	public ModelAndView selectThrHuff(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectThrHuffZero();
		
		ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/thrYrMono.do",method= RequestMethod.POST)
	public ModelAndView selectThrMono(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectThrMonoZero();
		
		ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/fiftYrHuff.do",method= RequestMethod.POST)
	public ModelAndView selectFiftHuff(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectFiftHuffZero();
		
		ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/fiftYrMono.do",method= RequestMethod.POST)
	public ModelAndView selectFiftMono(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectFiftMonoZero();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	
	@RequestMapping(value="/popCnt.do",method= RequestMethod.POST)
	public ModelAndView selectpopCnt(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectpopCnt();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/buildCnt.do",method= RequestMethod.POST)
	public ModelAndView selectbuildCnt(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectbuildCnt();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/indusArea.do",method= RequestMethod.POST)
	public ModelAndView selectindusArea(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectindusArea();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/liveArea.do",method= RequestMethod.POST)
	public ModelAndView selectliveArea(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectliveArea();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/commerArea.do",method= RequestMethod.POST)
	public ModelAndView selectcommerArea(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectcommerArea();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/natureArea.do",method= RequestMethod.POST)
	public ModelAndView selectnatureArea(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectnatureArea();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	
	@RequestMapping(value="/protectFacilityCnt.do",method= RequestMethod.POST)
	public ModelAndView selectprotectFacilityCnt(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectprotectFacilityCnt();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	@RequestMapping(value="/roadLen.do",method= RequestMethod.POST)
	public ModelAndView selectroadLen(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		
		List<FloodSimulVO> resultVORes = mainService.selectRoadLen();
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult",resultVORes);
		
		return model;
		
		}
	
	@RequestMapping(value="/totalScore.do",method= RequestMethod.POST)
	public ModelAndView totalScore(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		JSONParser js = new JSONParser();
		JSONObject jsonObj = (JSONObject)js.parse(data);
		
		List<FloodSimulVO> floodVORes = null;
		List<FloodSimulVO> resultVORes = mainService.selectLocationTotal();
		List<FloodSimulVO> popCntVORes = null;
		List<FloodSimulVO> buildCntVORes = null;
		List<FloodSimulVO> indusVORes = null;
		List<FloodSimulVO> liveVORes = null;
		List<FloodSimulVO> commerVORes = null;
		List<FloodSimulVO> natureVORes = null;
		List<FloodSimulVO> protectCntVORes = null;
		List<FloodSimulVO> roadVORes = null;
		
		double floodWeight = 0;
		double popWeight = 0;
		double buildWeight = 0;
		double indusWeight = 0;
		double liveWeight = 0;
		double commerWeight = 0;
		double natureWeight = 0;
		double protectWeight = 0;
		double roadWeight = 0;
		
		if(jsonObj.get("floodWeight") != null) {
			if(!(jsonObj.get("floodWeight").toString().equals("0"))) {
				
				switch(jsonObj.get("selectFlood").toString()){
				
				case "10년집중": floodVORes = mainService.selectTenHuff();
					break;
				case "10년분산": floodVORes = mainService.selectTenMono();
					break;
				case "30년집중": floodVORes = mainService.selectThrHuff();
					break;
				case "30년분산": floodVORes = mainService.selectThrMono();
					break;
				case "50년집중": floodVORes = mainService.selectFiftHuff();
					break;
				case "50년분산": floodVORes = mainService.selectFiftMono();
					break;
					
				}
				floodWeight = Double.parseDouble(jsonObj.get("floodWeight").toString());
			}
		}
		if(jsonObj.get("popWeight") != null) {
			if(!(jsonObj.get("popWeight").toString().equals("0"))) {
				popCntVORes = mainService.selectpopCntTotal();
				popWeight = Double.parseDouble(jsonObj.get("popWeight").toString());
			}
		}
		if(jsonObj.get("buildWeight") != null) {
			if(!(jsonObj.get("buildWeight").toString().equals("0"))) {
				buildCntVORes = mainService.selectbuildCntTotal();
				buildWeight = Double.parseDouble(jsonObj.get("buildWeight").toString());
			}
		}
		if(jsonObj.get("indusWeight") != null) {
			if(!(jsonObj.get("indusWeight").toString().equals("0"))) {
				indusVORes = mainService.selectindusAreaTotal();
				indusWeight = Double.parseDouble(jsonObj.get("indusWeight").toString());
			}
		}
		if(jsonObj.get("liveWeight") != null) {
			if(!(jsonObj.get("liveWeight").toString().equals("0"))) {
				liveVORes = mainService.selectliveAreaTotal();
				liveWeight = Double.parseDouble(jsonObj.get("liveWeight").toString());
			}
		}
		if(jsonObj.get("commerWeight") != null) {
			if(!(jsonObj.get("commerWeight").toString().equals("0"))) {
				commerVORes = mainService.selectcommerAreaTotal();
				commerWeight = Double.parseDouble(jsonObj.get("commerWeight").toString());
			}
		}
		if(jsonObj.get("natureWeight") != null) {
			if(!(jsonObj.get("natureWeight").toString().equals("0"))) {
				natureVORes = mainService.selectnatureAreaTotal();
				natureWeight = Double.parseDouble(jsonObj.get("natureWeight").toString());
			}
		}
		if(jsonObj.get("protectWeight") != null) {
			if(!(jsonObj.get("protectWeight").toString().equals("0"))) {
				protectCntVORes = mainService.selectprotectFacilityCntTotal();
				protectWeight = Double.parseDouble(jsonObj.get("protectWeight").toString());
			}
		}
		if(jsonObj.get("roadWeight") != null) {
			if(!(jsonObj.get("roadWeight").toString().equals("0"))) {
				roadVORes = mainService.selectRoadLenTotal();
				roadWeight = Double.parseDouble(jsonObj.get("roadWeight").toString());
			}
		}
		
		double weightSum = (floodWeight + popWeight + buildWeight + indusWeight + liveWeight +
		commerWeight + natureWeight + protectWeight + roadWeight);
		
		floodWeight /= weightSum;
		
		popWeight /= weightSum;
		
		buildWeight /= weightSum;
		
		indusWeight /= weightSum;
		
		liveWeight /= weightSum;
		
		commerWeight /= weightSum;
		
		natureWeight /= weightSum;
		
		protectWeight /= weightSum;
		
		roadWeight /= weightSum;

		HashMap<String, Object> weightList = new HashMap<>();
		weightList.put("floodWeight", floodWeight);
		weightList.put("popWeight", popWeight);
		weightList.put("buildWeight", buildWeight);
		weightList.put("indusWeight", indusWeight);
		weightList.put("liveWeight", liveWeight);
		weightList.put("commerWeight", commerWeight);
		weightList.put("natureWeight", natureWeight);
		weightList.put("protectWeight", protectWeight);
		weightList.put("roadWeight", roadWeight);

		for(int i=0; i<resultVORes.size(); i++) {
			if(popCntVORes != null) {
				for(int j=0; j<popCntVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(popCntVORes.get(j).getWkt())) {
						if(popCntVORes.size() / 4 > j) {
							resultVORes.get(i).setPopRank(1);
						}else if(popCntVORes.size() / 2 > j) {
							resultVORes.get(i).setPopRank(2);
						}else if(popCntVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setPopRank(3);
						}else {
							resultVORes.get(i).setPopRank(4);
						}
						resultVORes.get(i).setPopCnt(popCntVORes.get(j).getPopCnt());
					}
				}
			}
			if(floodVORes != null) {
				for(int j=0; j<floodVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(floodVORes.get(j).getWkt())) {
						if(floodVORes.size() / 4 > j) {
							resultVORes.get(i).setFloodRank(1);
						}else if(floodVORes.size() / 2 > j) {
							resultVORes.get(i).setFloodRank(2);
						}else if(floodVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setFloodRank(3);
						}else {
							resultVORes.get(i).setFloodRank(4);
						}
						resultVORes.get(i).setTenYrHuff(floodVORes.get(j).getTenYrHuff());
					}
				}
			}
			if(buildCntVORes != null) {
				for(int j=0; j<buildCntVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(buildCntVORes.get(j).getWkt())) {
						if(buildCntVORes.size() / 4 > j) {
							resultVORes.get(i).setBuildRank(1);
						}else if(buildCntVORes.size() / 2 > j) {
							resultVORes.get(i).setBuildRank(2);
						}else if(buildCntVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setBuildRank(3);
						}else {
							resultVORes.get(i).setBuildRank(4);
						}
						resultVORes.get(i).setBuildCnt(buildCntVORes.get(j).getBuildCnt());
					}
				}
			}
			if(indusVORes != null) {
				for(int j=0; j<indusVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(indusVORes.get(j).getWkt())) {
						if(indusVORes.size() / 4 > j) {
							resultVORes.get(i).setIndusRank(1);
						}else if(indusVORes.size() / 2 > j) {
							resultVORes.get(i).setIndusRank(2);
						}else if(indusVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setIndusRank(3);
						}else {
							resultVORes.get(i).setIndusRank(4);
						}
						resultVORes.get(i).setIndusArea(indusVORes.get(j).getIndusArea());
					}
				}
			}
			if(liveVORes != null) {
				for(int j=0; j<liveVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(liveVORes.get(j).getWkt())) {
						if(liveVORes.size() / 4 > j) {
							resultVORes.get(i).setLiveRank(1);
						}else if(liveVORes.size() / 2 > j) {
							resultVORes.get(i).setLiveRank(2);
						}else if(liveVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setLiveRank(3);
						}else {
							resultVORes.get(i).setLiveRank(4);
						}
						resultVORes.get(i).setLiveArea(liveVORes.get(j).getLiveArea());
					}
				}
			}
			if(commerVORes != null) {
				for(int j=0; j<commerVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(commerVORes.get(j).getWkt())) {
						if(commerVORes.size() / 4 > j) {
							resultVORes.get(i).setCommerRank(1);
						}else if(commerVORes.size() / 2 > j) {
							resultVORes.get(i).setCommerRank(2);
						}else if(commerVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setCommerRank(3);
						}else {
							resultVORes.get(i).setCommerRank(4);
						}
						resultVORes.get(i).setCommerArea(commerVORes.get(j).getCommerArea());
					}
				}
			}
			if(natureVORes != null) {
				for(int j=0; j<natureVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(natureVORes.get(j).getWkt())) {
						if(natureVORes.size() / 4 > j) {
							resultVORes.get(i).setNatureRank(1);
						}else if(natureVORes.size() / 2 > j) {
							resultVORes.get(i).setNatureRank(2);
						}else if(natureVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setNatureRank(3);
						}else {
							resultVORes.get(i).setNatureRank(4);
						}
						resultVORes.get(i).setNatureArea(natureVORes.get(j).getNatureArea());
					}
				}
			}
			if(protectCntVORes != null) {
				for(int j=0; j<protectCntVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(protectCntVORes.get(j).getWkt())) {
						if(protectCntVORes.get(j).getProtectFacilityCnt() == 1) {
							resultVORes.get(i).setProtectRank(1);
						}else if(protectCntVORes.get(j).getProtectFacilityCnt() == 2) {
							resultVORes.get(i).setProtectRank(2);
						}else if(protectCntVORes.get(j).getProtectFacilityCnt() == 3) {
							resultVORes.get(i).setProtectRank(3);
						}
						resultVORes.get(i).setProtectFacilityCnt(protectCntVORes.get(j).getProtectFacilityCnt());
					}
				}
			}
			if(roadVORes != null) {
				for(int j=0; j<roadVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(roadVORes.get(j).getWkt())) {
						if(roadVORes.size() / 4 > j) {
							resultVORes.get(i).setRoadRank(1);
						}else if(roadVORes.size() / 2 > j) {
							resultVORes.get(i).setRoadRank(2);
						}else if(roadVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setRoadRank(3);
						}else {
							resultVORes.get(i).setRoadRank(4);
						}
						resultVORes.get(i).setRoadLen(roadVORes.get(j).getRoadLen());
					}
				}
			}
		}
		
		for(int i=0; i<resultVORes.size(); i++) {
			double protectScore = 0, buildScore = 0, commerScore = 0, floodScore = 0
					, indusScore = 0, liveScore = 0, natureScore = 0, popScore = 0, roadScore = 0;
			
			if(resultVORes.get(i).getProtectRank() != null) {
				if(resultVORes.get(i).getProtectRank() == 1) {
					protectScore = 3.3;
				}else if(resultVORes.get(i).getProtectRank() == 2) {
					protectScore = 6.7;
				}else {
					protectScore = 10;
				}
				protectScore *= protectWeight;
			}
			if(resultVORes.get(i).getBuildRank() != null) {
				buildScore = (resultVORes.get(i).getBuildRank() + 1) * 2;
				buildScore *= buildWeight;
			}
			if(resultVORes.get(i).getCommerRank() != null) {
				commerScore = (resultVORes.get(i).getCommerRank() + 1) * 2;
				commerScore *= commerWeight;
			}
			if(resultVORes.get(i).getFloodRank() != null) {
				floodScore = (resultVORes.get(i).getFloodRank() + 1) * 2;
				floodScore *= floodWeight;
			}
			if(resultVORes.get(i).getIndusRank() != null) {
				indusScore = (resultVORes.get(i).getIndusRank() + 1) * 2;
				indusScore *= indusWeight;
			}
			if(resultVORes.get(i).getLiveRank() != null) {
				liveScore = (resultVORes.get(i).getLiveRank() + 1) * 2;
				liveScore *= liveWeight;
			}
			if(resultVORes.get(i).getNatureRank() != null) {
				natureScore = (resultVORes.get(i).getNatureRank() + 1) * 2;
				natureScore *= natureWeight;
			}
			if(resultVORes.get(i).getPopRank() != null) {
				popScore = (resultVORes.get(i).getPopRank() + 1) * 2;
				popScore *= popWeight;
			}
			if(resultVORes.get(i).getRoadRank() != null) {
				roadScore = (resultVORes.get(i).getRoadRank() + 1) * 2;
				roadScore *= roadWeight;
			}
				resultVORes.get(i).setTotalScore(
				(buildScore + commerScore + floodScore + indusScore + liveScore
				+ natureScore + popScore + protectScore + roadScore) * 10);
		}
		
		ModelAndView model = new ModelAndView("jsonView");
			
		model.addObject("testVOResult", resultVORes);
		
		model.addObject("weightList", weightList);
		
		model.addObject("selectFlood", jsonObj.get("selectFlood").toString());
		
		return model;
		
	}
	
	@RequestMapping(value = "/downloadExcelListBase.do")
	public ModelAndView downloadExcelListBase(@ModelAttribute("floodSimulVO") FloodSimulVO floodSimulVO, HttpServletRequest req, HttpServletResponse resp, RedirectAttributes redirect) throws Exception {

		@SuppressWarnings("unchecked")
		HashMap<String, Object> excelPram = new HashMap<String, Object>();
		
		List<FloodSimulVO> resultVORes = null;
		
		switch(floodSimulVO.getFloodKinds()) {
		case "tenYrHuff": 
			resultVORes = mainService.selectTenHuffZero();
			break;
		case "tenYrMono":
			resultVORes = mainService.selectTenMonoZero();
			break;
		case "thrYrHuff":
			resultVORes = mainService.selectThrHuffZero();
			break;
		case "thrYrMono":
			resultVORes = mainService.selectThrMonoZero();
			break;
		case "fiftYrHuff":
			resultVORes = mainService.selectFiftHuffZero();
			break;
		case "fiftYrMono":
			resultVORes = mainService.selectFiftMonoZero();
			break;
		}
		
		Collections.sort(resultVORes, new ListComparator());
		
		String excelDir = fileProperties.getProperty("file.excel.template");
		String dir = req.getSession().getServletContext().getRealPath("images");
		
//		String dir = fileProperties.getProperty("file.image.path");
//		
//		String imageFileName=  UUID.randomUUID().toString();
//		
//		String binaryData = req.getParameter("imageUrl");
//		FileOutputStream stream = null;
//		try{
//			System.out.println("binary file   "  + binaryData);
//			if(binaryData == null || binaryData.trim().equals("")) {
//			    throw new Exception();
//			}
//			binaryData = binaryData.replaceAll("data:image/png;base64,", "");
//			byte[] file = Base64.decodeBase64(binaryData);
//			
//			stream = new FileOutputStream("D:/images/"+imageFileName+".png");
//			stream.write(file);
//			stream.close();
//			
//			System.out.println("캡처 저장");
//			excelPram.put("imageFileName", imageFileName);
//		    
//		}catch(Exception e){
//			e.printStackTrace();
//			System.out.println("에러 발생");
//		}finally{
//			if(stream != null) {
//				stream.close();
//			}
//		}
//		
//		excelPram.put("imgFileName", imageFileName);
		excelPram.put("type", "listExcel");
		excelPram.put("fileName", "기본_침수_지도_결과");
		excelPram.put("floodKinds", floodSimulVO.getFloodKinds());
		excelPram.put("excelDir", excelDir);
		excelPram.put("dir", dir);
		excelPram.put("imageFileName", floodSimulVO.getFileName());
		excelPram.put("resultList", resultVORes);
		return new ModelAndView("downLoadExcel", excelPram);
		
	}
	
	@RequestMapping(value = "/downloadExcelListTotal.do")
	public ModelAndView downloadExcelListTotal(@ModelAttribute("floodSimulVO") FloodSimulVO floodSimulVO, HttpServletRequest req, HttpServletResponse resp, RedirectAttributes redirect) throws Exception {

		@SuppressWarnings("unchecked")
		HashMap<String, Object> excelPram = new HashMap<String, Object>();
		
		List<FloodSimulVO> floodVORes = null;
		List<FloodSimulVO> resultVORes = mainService.selectLocationTotal();
		List<FloodSimulVO> popCntVORes = null;
		List<FloodSimulVO> buildCntVORes = null;
		List<FloodSimulVO> indusVORes = null;
		List<FloodSimulVO> liveVORes = null;
		List<FloodSimulVO> commerVORes = null;
		List<FloodSimulVO> natureVORes = null;
		List<FloodSimulVO> protectCntVORes = null;
		List<FloodSimulVO> roadVORes = null;
		
		double floodWeight = 0;
		double popWeight = 0;
		double buildWeight = 0;
		double indusWeight = 0;
		double liveWeight = 0;
		double commerWeight = 0;
		double natureWeight = 0;
		double protectWeight = 0;
		double roadWeight = 0;
		
		if(!(floodSimulVO.getFloodWeight().toString().equals("0"))) {
			switch(floodSimulVO.getFloodKinds()){
			
			case "10년집중": floodVORes = mainService.selectTenHuff();
			break;
			case "10년분산": floodVORes = mainService.selectTenMono();
			break;
			case "30년집중": floodVORes = mainService.selectThrHuff();
			break;
			case "30년분산": floodVORes = mainService.selectThrMono();
			break;
			case "50년집중": floodVORes = mainService.selectFiftHuff();
			break;
			case "50년분산": floodVORes = mainService.selectFiftMono();
			break;
			
			}
			floodWeight = Double.parseDouble(floodSimulVO.getFloodWeight());
		}
		if(!(floodSimulVO.getPopWeight().toString().equals("0"))) {
			popCntVORes = mainService.selectpopCntTotal();
			popWeight = Double.parseDouble(floodSimulVO.getPopWeight());
		}
		if(!(floodSimulVO.getBuildWeight().toString().equals("0"))) {
			buildCntVORes = mainService.selectbuildCntTotal();
			buildWeight = Double.parseDouble(floodSimulVO.getBuildWeight());
		}
		if(!(floodSimulVO.getIndusWeight().toString().equals("0"))) {
			indusVORes = mainService.selectindusAreaTotal();
			indusWeight = Double.parseDouble(floodSimulVO.getIndusWeight());
		}
		if(!(floodSimulVO.getLiveWeight().toString().equals("0"))) {
			liveVORes = mainService.selectliveAreaTotal();
			liveWeight = Double.parseDouble(floodSimulVO.getLiveWeight());
		}
		if(!(floodSimulVO.getCommerWeight().toString().equals("0"))) {
			commerVORes = mainService.selectcommerAreaTotal();
			commerWeight = Double.parseDouble(floodSimulVO.getCommerWeight());
		}
		if(!(floodSimulVO.getNatureWeight().toString().equals("0"))) {
			natureVORes = mainService.selectnatureAreaTotal();
			natureWeight = Double.parseDouble(floodSimulVO.getNatureWeight());
		}
		if(!(floodSimulVO.getProtectWeight().toString().equals("0"))) {
			protectCntVORes = mainService.selectprotectFacilityCntTotal();
			protectWeight = Double.parseDouble(floodSimulVO.getProtectWeight());
		}
		if(!(floodSimulVO.getRoadWeight().toString().equals("0"))) {
			roadVORes = mainService.selectRoadLenTotal();
			roadWeight = Double.parseDouble(floodSimulVO.getRoadWeight());
		}
		
		double weightSum = (floodWeight + popWeight + buildWeight + indusWeight + liveWeight +
		commerWeight + natureWeight + protectWeight + roadWeight);
		
		floodWeight /= weightSum;
		
		popWeight /= weightSum;
		
		buildWeight /= weightSum;
		
		indusWeight /= weightSum;
		
		liveWeight /= weightSum;
		
		commerWeight /= weightSum;
		
		natureWeight /= weightSum;
		
		protectWeight /= weightSum;
		
		roadWeight /= weightSum;

		HashMap<String, Object> weightList = new HashMap<>();
		weightList.put("floodWeight", floodWeight);
		weightList.put("popWeight", popWeight);
		weightList.put("buildWeight", buildWeight);
		weightList.put("indusWeight", indusWeight);
		weightList.put("liveWeight", liveWeight);
		weightList.put("commerWeight", commerWeight);
		weightList.put("natureWeight", natureWeight);
		weightList.put("protectWeight", protectWeight);
		weightList.put("roadWeight", roadWeight);

		for(int i=0; i<resultVORes.size(); i++) {
			if(popCntVORes != null) {
				for(int j=0; j<popCntVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(popCntVORes.get(j).getWkt())) {
						if(popCntVORes.size() / 4 > j) {
							resultVORes.get(i).setPopRank(1);
						}else if(popCntVORes.size() / 2 > j) {
							resultVORes.get(i).setPopRank(2);
						}else if(popCntVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setPopRank(3);
						}else {
							resultVORes.get(i).setPopRank(4);
						}
						resultVORes.get(i).setPopCnt(popCntVORes.get(j).getPopCnt());
					}
				}
			}
			if(floodVORes != null) {
				for(int j=0; j<floodVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(floodVORes.get(j).getWkt())) {
						if(floodVORes.size() / 4 > j) {
							resultVORes.get(i).setFloodRank(1);
						}else if(floodVORes.size() / 2 > j) {
							resultVORes.get(i).setFloodRank(2);
						}else if(floodVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setFloodRank(3);
						}else {
							resultVORes.get(i).setFloodRank(4);
						}
						resultVORes.get(i).setTenYrHuff(floodVORes.get(j).getTenYrHuff());
					}
				}
			}
			if(buildCntVORes != null) {
				for(int j=0; j<buildCntVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(buildCntVORes.get(j).getWkt())) {
						if(buildCntVORes.size() / 4 > j) {
							resultVORes.get(i).setBuildRank(1);
						}else if(buildCntVORes.size() / 2 > j) {
							resultVORes.get(i).setBuildRank(2);
						}else if(buildCntVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setBuildRank(3);
						}else {
							resultVORes.get(i).setBuildRank(4);
						}
						resultVORes.get(i).setBuildCnt(buildCntVORes.get(j).getBuildCnt());
					}
				}
			}
			if(indusVORes != null) {
				for(int j=0; j<indusVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(indusVORes.get(j).getWkt())) {
						if(indusVORes.size() / 4 > j) {
							resultVORes.get(i).setIndusRank(1);
						}else if(indusVORes.size() / 2 > j) {
							resultVORes.get(i).setIndusRank(2);
						}else if(indusVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setIndusRank(3);
						}else {
							resultVORes.get(i).setIndusRank(4);
						}
						resultVORes.get(i).setIndusArea(indusVORes.get(j).getIndusArea());
					}
				}
			}
			if(liveVORes != null) {
				for(int j=0; j<liveVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(liveVORes.get(j).getWkt())) {
						if(liveVORes.size() / 4 > j) {
							resultVORes.get(i).setLiveRank(1);
						}else if(liveVORes.size() / 2 > j) {
							resultVORes.get(i).setLiveRank(2);
						}else if(liveVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setLiveRank(3);
						}else {
							resultVORes.get(i).setLiveRank(4);
						}
						resultVORes.get(i).setLiveArea(liveVORes.get(j).getLiveArea());
					}
				}
			}
			if(commerVORes != null) {
				for(int j=0; j<commerVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(commerVORes.get(j).getWkt())) {
						if(commerVORes.size() / 4 > j) {
							resultVORes.get(i).setCommerRank(1);
						}else if(commerVORes.size() / 2 > j) {
							resultVORes.get(i).setCommerRank(2);
						}else if(commerVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setCommerRank(3);
						}else {
							resultVORes.get(i).setCommerRank(4);
						}
						resultVORes.get(i).setCommerArea(commerVORes.get(j).getCommerArea());
					}
				}
			}
			if(natureVORes != null) {
				for(int j=0; j<natureVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(natureVORes.get(j).getWkt())) {
						if(natureVORes.size() / 4 > j) {
							resultVORes.get(i).setNatureRank(1);
						}else if(natureVORes.size() / 2 > j) {
							resultVORes.get(i).setNatureRank(2);
						}else if(natureVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setNatureRank(3);
						}else {
							resultVORes.get(i).setNatureRank(4);
						}
						resultVORes.get(i).setNatureArea(natureVORes.get(j).getNatureArea());
					}
				}
			}
			if(protectCntVORes != null) {
				for(int j=0; j<protectCntVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(protectCntVORes.get(j).getWkt())) {
						if(protectCntVORes.get(j).getProtectFacilityCnt() == 1) {
							resultVORes.get(i).setProtectRank(1);
						}else if(protectCntVORes.get(j).getProtectFacilityCnt() == 2) {
							resultVORes.get(i).setProtectRank(2);
						}else if(protectCntVORes.get(j).getProtectFacilityCnt() == 3) {
							resultVORes.get(i).setProtectRank(3);
						}
						resultVORes.get(i).setProtectFacilityCnt(protectCntVORes.get(j).getProtectFacilityCnt());
					}
				}
			}
			if(roadVORes != null) {
				for(int j=0; j<roadVORes.size(); j++) {
					if(resultVORes.get(i).getWkt().equals(roadVORes.get(j).getWkt())) {
						if(roadVORes.size() / 4 > j) {
							resultVORes.get(i).setRoadRank(1);
						}else if(roadVORes.size() / 2 > j) {
							resultVORes.get(i).setRoadRank(2);
						}else if(roadVORes.size() / 4 * 3 > j) {
							resultVORes.get(i).setRoadRank(3);
						}else {
							resultVORes.get(i).setRoadRank(4);
						}
						resultVORes.get(i).setRoadLen(roadVORes.get(j).getRoadLen());
					}
				}
			}
		}
		
		for(int i=0; i<resultVORes.size(); i++) {
			double protectScore = 0, buildScore = 0, commerScore = 0, floodScore = 0
					, indusScore = 0, liveScore = 0, natureScore = 0, popScore = 0, roadScore = 0;
			
			if(resultVORes.get(i).getProtectRank() != null) {
				if(resultVORes.get(i).getProtectRank() == 1) {
					protectScore = 3.3;
				}else if(resultVORes.get(i).getProtectRank() == 2) {
					protectScore = 6.7;
				}else {
					protectScore = 10;
				}
				protectScore *= protectWeight;
			}
			if(resultVORes.get(i).getBuildRank() != null) {
				buildScore = (resultVORes.get(i).getBuildRank() + 1) * 2;
				buildScore *= buildWeight;
			}
			if(resultVORes.get(i).getCommerRank() != null) {
				commerScore = (resultVORes.get(i).getCommerRank() + 1) * 2;
				commerScore *= commerWeight;
			}
			if(resultVORes.get(i).getFloodRank() != null) {
				floodScore = (resultVORes.get(i).getFloodRank() + 1) * 2;
				floodScore *= floodWeight;
			}
			if(resultVORes.get(i).getIndusRank() != null) {
				indusScore = (resultVORes.get(i).getIndusRank() + 1) * 2;
				indusScore *= indusWeight;
			}
			if(resultVORes.get(i).getLiveRank() != null) {
				liveScore = (resultVORes.get(i).getLiveRank() + 1) * 2;
				liveScore *= liveWeight;
			}
			if(resultVORes.get(i).getNatureRank() != null) {
				natureScore = (resultVORes.get(i).getNatureRank() + 1) * 2;
				natureScore *= natureWeight;
			}
			if(resultVORes.get(i).getPopRank() != null) {
				popScore = (resultVORes.get(i).getPopRank() + 1) * 2;
				popScore *= popWeight;
			}
			if(resultVORes.get(i).getRoadRank() != null) {
				roadScore = (resultVORes.get(i).getRoadRank() + 1) * 2;
				roadScore *= roadWeight;
			}
				resultVORes.get(i).setTotalScore(
				(buildScore + commerScore + floodScore + indusScore + liveScore
				+ natureScore + popScore + protectScore + roadScore) * 10);
		}
		
		Collections.sort(resultVORes, new ListComparator());
		
		String excelDir = fileProperties.getProperty("file.excel.template");
		String dir = req.getSession().getServletContext().getRealPath("images");
		
		excelPram.put("type", "listExcel");
		excelPram.put("fileName", "종합_침수_리스크_분석_결과");
		excelPram.put("floodKinds", floodSimulVO.getFloodKinds());
		excelPram.put("excelDir", excelDir);
		excelPram.put("dir", dir);
		excelPram.put("imageFileName", floodSimulVO.getFileName());
		excelPram.put("resultList", resultVORes);
		excelPram.put("weightList", weightList);
		return new ModelAndView("downLoadExcel", excelPram);
		
	}
	
	@RequestMapping(value = "/fileImageUpload.do")
	public ModelAndView fileImageUpload(@ModelAttribute("floodSimulVO") FloodSimulVO floodSimulVO, HttpServletRequest req, HttpServletResponse resp, RedirectAttributes redirect) throws Exception {
	
		String dir = req.getSession().getServletContext().getRealPath("images");
		
		File folder = new File(dir);
		
		File[] deleteFolderList = folder.listFiles();
		
		if(folder.exists()) {
			for(int i=0; i<deleteFolderList.length; i++) {
				if(!deleteFolderList[i].isDirectory()) {
					deleteFolderList[i].delete();
				}
			}
		}else {
			System.out.println("폴더가 존재하지 않습니다.");
		}
		
		String imageFileName = UUID.randomUUID().toString();

		String binaryData = floodSimulVO.getImageUrl();
	    FileOutputStream stream = null;
	    try{
	       if(binaryData == null || binaryData.trim().equals("")) {
	           throw new Exception();
	       }
	       binaryData = binaryData.replaceAll("data:image/png;base64,", "");
	       byte[] file = Base64.decodeBase64(binaryData);
	       
	       stream = new FileOutputStream(dir + "/" + imageFileName+".png");
	       stream.write(file);
	       stream.close();

	    }catch(Exception e){
	       e.printStackTrace();
	       System.out.println("에러 발생");
	    }finally{
	       if(stream != null) {
	          stream.close();
	       }
	    }
	    
	    ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("imageFileName", imageFileName);
		
		return model;
	}
	
	@RequestMapping(value="/pipeView.do",method= RequestMethod.POST)
	public ModelAndView pipeView(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		List<FloodSimulVO> pipeVORes = mainService.selectPipeView();	
		
		ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("pipeVOResult",pipeVORes);
		
		return model;
		
		}
	
	@RequestMapping(value="/nullView.do",method= RequestMethod.POST)
	public ModelAndView nullView(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		List<FloodSimulVO> nullVORes = mainService.selectLocation();	
		
		ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("nullVOResult", nullVORes);
		
		return model;
		
		}
	
	@RequestMapping(value="/borderView.do",method= RequestMethod.POST)
	public ModelAndView borderView(@RequestBody String data,HttpServletResponse response)  throws Exception{
		
		List<FloodSimulVO> borderVORes = mainService.selectBorderView();	
		
		ModelAndView model = new ModelAndView("jsonView");
		
		model.addObject("borderVOResult", borderVORes);
		
		return model;
		
		}
	
	public class ListComparator implements Comparator {

	    @Override
	    public int compare(Object o1, Object o2) {
	        Integer test1 = ((FloodSimulVO)o1).getGid();
	        Integer test2 = ((FloodSimulVO)o2).getGid();
	        
	        if(test1 > test2){
	            return 1;
	        }else if(test1 < test2){
	            return -1;
	        }else{
	            return 0;
	        }
	        
	    }
	}
}
