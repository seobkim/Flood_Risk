package kr.go.floodrisk.excel;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFClientAnchor;
import org.apache.poi.hssf.usermodel.HSSFPatriarch;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.util.IOUtils;
import org.apache.poi.xssf.usermodel.XSSFClientAnchor;
import org.apache.poi.xssf.usermodel.XSSFDrawing;
import org.apache.poi.xssf.usermodel.XSSFPicture;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.servlet.view.document.AbstractExcelView;

import kr.go.floodrisk.common.service.FloodSimulVO;

public class DownLoadExcel extends AbstractExcelView {

	@Override
	protected void buildExcelDocument(Map<String, Object> model, HSSFWorkbook wb, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		response.setContentType("application/octet-stream");

		String type = (String) model.get("type");

		if (type == null) {
			return;
		}

		// 리스트출력
		if (type.equals("listExcel")) {
			String fileName = (String) model.get("fileName");

			if (fileName.equals("기본_침수_지도_결과")) {
				baseFRiskPrint(model, wb, request, response);
			} else if (fileName.equals("종합_침수_리스크_분석_결과")) {
				synthesisPrint(model, wb, request, response);
			}

		}
	}

	/**
	 * 기본 침수 리스크 엑셀 리스트
	 * 
	 * @param model
	 * @param wb
	 * @param request
	 * @param response
	 */

	private void baseFRiskPrint(Map<String, Object> model, HSSFWorkbook wb, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// 파일이름
		String fileName = (String) model.get("fileName");
		// 경로
		String excelDir = (String) model.get("excelDir");

		String fileName2 = "기본_침수_지도_결과.xls";

		String dir = (String) model.get("dir");

		String imageFileName = (String) model.get("imageFileName");

		wb = getTemplateSource(excelDir + "listExcel", request);

		// 리스트
		@SuppressWarnings("unchecked")
		List<FloodSimulVO> resultList = (List<FloodSimulVO>) model.get("resultList");

		String userAgent = request.getHeader("User-Agent");

		if (userAgent.indexOf("MSIE") > -1) {
			fileName2 = URLEncoder.encode(fileName2, "utf-8");
		} else {
			fileName2 = URLEncoder.encode(fileName2, "utf-8");
		}

		response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName2 + "\";");
		response.setHeader("Content-Transfer-Encoding", "binary");

		HSSFCellStyle nCS = wb.createCellStyle();// 제목
		HSSFCellStyle sCS = wb.createCellStyle();// 타이틀
		HSSFCellStyle sCS2 = wb.createCellStyle();// 데이타

		HSSFSheet sheet = wb.getSheetAt(0);

		// 스타일 설정 시작
		HSSFRow r = null;
		HSSFCell c = null;
		nCS.setAlignment((short) 3);

		wb.setSheetName(0, "sheet1");
		r = sheet.getRow(2);
		c = r.getCell(1);
		nCS = c.getCellStyle();

		r = sheet.getRow(6);
		c = r.getCell(0);
		sCS = c.getCellStyle();

		r = sheet.getRow(7);
		c = r.getCell(0);
		sCS2 = c.getCellStyle();

		c = getCell(sheet, 2, 0);
		c.setCellStyle(nCS);
		// 스타일 설정 끝

		String floodKinds = null;
		
		switch ((String) model.get("floodKinds")) {
		case "tenYrHuff":
			floodKinds = "10년 / Huff 방법";
			break;
		case "tenYrMono":
			floodKinds = "10년 / Mononobe 방법";
			break;
		case "thrYrHuff":
			floodKinds = "30년 / Huff 방법";
			break;
		case "thrYrMono":
			floodKinds = "30년 / Mononobe 방법";
			break;
		case "fiftYrHuff":
			floodKinds = "50년 / Huff 방법";
			break;
		case "fiftYrMono":
			floodKinds = "50년 / Mononobe 방법";
			break;
		}
		
		// 타이틀
		setText(c, fileName + "(" + floodKinds + ")");

		int row = 7;

		FloodSimulVO resultMap;
		String value = null;

		File file = new File(dir + "/" + imageFileName + ".png");
		long length = file.length();
		byte[] picData = new byte[(int) file.length()];
		byte[] bytes = new byte[(int) file.length()];
		InputStream input = new BufferedInputStream(new FileInputStream(file));
		FileInputStream picIn = new FileInputStream(file);
		picIn.read(picData);
		try {
			int offset = 0;
			int read = -1;
			while ((read = input.read()) != -1)
				bytes[offset++] = (byte) read;
		} finally {
			input.close();
		}

		int indx = wb.addPicture(picData, HSSFWorkbook.PICTURE_TYPE_PNG);
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		HSSFClientAnchor anchor;

		anchor=new HSSFClientAnchor(0,0,0,0,(short)3,6,(short)11,40); //이미지 크기 조절


		anchor.setAnchorType(2);
		patriarch.createPicture(anchor, indx);

		// 리스트
		// 격자번호
		c = getCell(sheet, 6, 0);
		c.setCellStyle(sCS);
		setText(c, "격자번호");

		// 침수인자
		c = getCell(sheet, 6, 1);
		c.setCellStyle(sCS);
		setText(c, "강우량");

		// 검색결과 셋팅
		for (int i = 0; i < resultList.size(); i++) {

			// 3만줄 넘으면 멈춤.
			if (i > 30000) {
				break;
			}

			resultMap = resultList.get(i);

			// 격자번호
			c = getCell(sheet, row + i, 0);
			c.setCellStyle(sCS2);
			value = String.valueOf(resultMap.getGid());
			if (value != null && !value.equals("null")) {
				setText(c, value);
			}
			// tenYrHuff
			c = getCell(sheet, row + i, 1);
			c.setCellStyle(sCS2);
			switch ((String) model.get("floodKinds")) {
			case "tenYrHuff":
				value = String.valueOf(Math.round((double)resultMap.getTenYrHuff()*10)/10.0);
				break;
			case "tenYrMono":
				value = String.valueOf(Math.round((double)resultMap.getTenYrMono()*10)/10.0);
				break;
			case "thrYrHuff":
				value = String.valueOf(Math.round((double)resultMap.getThrYrHuff()*10)/10.0);
				break;
			case "thrYrMono":
				value = String.valueOf(Math.round((double)resultMap.getThrYrMono()*10)/10.0);
				break;
			case "fiftYrHuff":
				value = String.valueOf(Math.round((double)resultMap.getFiftYrHuff()*10)/10.0);
				break;
			case "fiftYrMono":
				value = String.valueOf(Math.round((double)resultMap.getFiftYrMono()*10)/10.0);
				break;
			}
			if (value != null && !value.equals("null")) {
				setText(c, value);
			}
		}
		OutputStream out = response.getOutputStream();
		wb.write(out);
		out.close();
	}

	private void synthesisPrint(Map<String, Object> model, HSSFWorkbook wb, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// 파일이름
		String fileName = (String) model.get("fileName");
		// 경로
		String excelDir = (String) model.get("excelDir");

		String fileName2 = "종합_침수_리스크_분석_결과.xls";

		String dir = (String) model.get("dir");

		String imageFileName = (String) model.get("imageFileName");

		wb = getTemplateSource(excelDir + "listExcel", request);

		// 리스트
		@SuppressWarnings("unchecked")
		List<FloodSimulVO> resultList = (List<FloodSimulVO>) model.get("resultList");

		// 인자리스트
		@SuppressWarnings("unchecked")
		HashMap<String, Object> weightList = (HashMap<String, Object>) model.get("weightList");

		String userAgent = request.getHeader("User-Agent");

		if (userAgent.indexOf("MSIE") > -1) {
			fileName2 = URLEncoder.encode(fileName2, "utf-8");
		} else {
			fileName2 = URLEncoder.encode(fileName2, "utf-8");
		}

		response.setHeader("Content-Disposition", "attachment; filename=\"" + fileName2 + "\";");
		response.setHeader("Content-Transfer-Encoding", "binary");

		HSSFCellStyle nCS = wb.createCellStyle();// 제목
		HSSFCellStyle sCS = wb.createCellStyle();// 타이틀
		HSSFCellStyle sCS2 = wb.createCellStyle();// 데이타

		HSSFSheet sheet = wb.getSheetAt(0);

		// 스타일 설정 시작
		HSSFRow r = null;
		HSSFCell c = null;
		nCS.setAlignment((short) 3);

		wb.setSheetName(0, "sheet1");
		r = sheet.getRow(2);
		c = r.getCell(1);
		nCS = c.getCellStyle();

		r = sheet.getRow(6);
		c = r.getCell(0);
		sCS = c.getCellStyle();

		r = sheet.getRow(7);
		c = r.getCell(0);
		
		sCS2 = c.getCellStyle();

		c = getCell(sheet, 2, 0);
		c.setCellStyle(nCS);
		// 스타일 설정 끝

		String floodKinds = null;
		
		switch ((String) model.get("floodKinds")) {
		case "10년집중":
			floodKinds = "10년 / Huff 방법";
			break;
		case "10년분산":
			floodKinds = "10년 / Mononobe 방법";
			break;
		case "30년집중":
			floodKinds = "30년 / Huff 방법";
			break;
		case "30년분산":
			floodKinds = "30년 / Mononobe 방법";
			break;
		case "50년집중":
			floodKinds = "50년 / Huff 방법";
			break;
		case "50년분산":
			floodKinds = "50년 / Mononobe 방법";
			break;
		}
		
		// 타이틀
		setText(c, fileName + "("+ floodKinds +")");

		int row = 7;

		FloodSimulVO resultMap;
		String value = null;

		File file = new File(dir + "/" + imageFileName + ".png");
		long length = file.length();
		byte[] picData = new byte[(int) file.length()];
		byte[] bytes = new byte[(int) file.length()];
		InputStream input = new BufferedInputStream(new FileInputStream(file));
		FileInputStream picIn = new FileInputStream(file);
		picIn.read(picData);
		try {
			int offset = 0;
			int read = -1;
			while ((read = input.read()) != -1)
				bytes[offset++] = (byte) read;
		} finally {
			input.close();
		}

		int indx = wb.addPicture(picData, HSSFWorkbook.PICTURE_TYPE_PNG);
		HSSFPatriarch patriarch = sheet.createDrawingPatriarch();
		HSSFClientAnchor anchor;
		anchor = new HSSFClientAnchor(0, 0, 0, 0, (short) 4, 6, (short) 12, 40); // 이미지 크기 조절
		anchor.setAnchorType(2);
		patriarch.createPicture(anchor, indx);

		// 리스트
		// 격자번호
		c = getCell(sheet, 6, 0);
		c.setCellStyle(sCS);
		setText(c, "격자번호");

		// 점수
		c = getCell(sheet, 6, 1);
		c.setCellStyle(sCS);
		setText(c, "점수");

		// 100점 환산 점수
		c = getCell(sheet, 6, 2);
		c.setCellStyle(sCS);
		setText(c, "100점 환산 점수");

		// 인자
		c = getCell(sheet, 6, 12);
		c.setCellStyle(sCS);
		setText(c, "인자");

		// 가중치
		c = getCell(sheet, 6, 13);
		c.setCellStyle(sCS);
		setText(c, "가중치");

		Iterator<String> keys = weightList.keySet().iterator();
		
		while (keys.hasNext()) {
			String key = keys.next();
			switch(key) {
			case "floodWeight":
				c = getCell(sheet, row, 12);
				c.setCellStyle(sCS2);
				setText(c, "강우조건");
				c = getCell(sheet, row, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			case "popWeight":
				c = getCell(sheet, row+1, 12);
				c.setCellStyle(sCS2);
				setText(c, "거주인구");
				c = getCell(sheet, row+1, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			case "liveWeight":
				c = getCell(sheet, row+2, 12);
				c.setCellStyle(sCS2);
				setText(c, "주거지역");
				c = getCell(sheet, row+2, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			case "commerWeight":
				c = getCell(sheet, row+3, 12);
				c.setCellStyle(sCS2);
				setText(c, "상업지역");
				c = getCell(sheet, row+3, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			case "indusWeight":
				c = getCell(sheet, row+4, 12);
				c.setCellStyle(sCS2);
				setText(c, "공업지역");
				c = getCell(sheet, row+4, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			case "natureWeight":
				c = getCell(sheet, row+5, 12);
				c.setCellStyle(sCS2);
				setText(c, "자연녹지지역");
				c = getCell(sheet, row+5, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			case "buildWeight":
				c = getCell(sheet, row+6, 12);
				c.setCellStyle(sCS2);
				setText(c, "취약건물");
				c = getCell(sheet, row+6, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			case "protectWeight":
				c = getCell(sheet, row+7, 12);
				c.setCellStyle(sCS2);
				setText(c, "보호대상시설");
				c = getCell(sheet, row+7, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			case "roadWeight":
				c = getCell(sheet, row+8, 12);
				c.setCellStyle(sCS2);
				setText(c, "도로연장");
				c = getCell(sheet, row+8, 13);
				c.setCellStyle(sCS2);
				setText(c, String.valueOf(Math.floor((double)weightList.get(key) * 1000) / 1000.0));
				break;
			}
		}
		


		// 검색결과 셋팅
		for (int i = 0; i < resultList.size(); i++) {

			// 3만줄 넘으면 멈춤.
			if (i > 30000) {
				break;
			}

			resultMap = resultList.get(i);

			// 격자번호
			c = getCell(sheet, row + i, 0);
			c.setCellStyle(sCS2);
			value = String.valueOf(resultMap.getGid());
			if (value != null && !value.equals("null")) {
				setText(c, value);
			}

			// 점수
			c = getCell(sheet, row + i, 1);
			c.setCellStyle(sCS2);
			value = String.valueOf(Math.round(resultMap.getTotalScore() * 10 ) / 1000.0);
			if (value != null && !value.equals("null")) {
				setText(c, value);
			}

			// 100점 환산 점수
			c = getCell(sheet, row + i, 2);
			c.setCellStyle(sCS2);
			value = String.valueOf(Math.round(resultMap.getTotalScore() * 10 ) / 10.0);
			if (value != null && !value.equals("null")) {
				setText(c, value);
			}
		}
		OutputStream out = response.getOutputStream();
		wb.write(out);
		out.close();
		
	}
}