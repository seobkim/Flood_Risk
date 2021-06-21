package kr.go.floodrisk.common.service;

import java.util.HashMap;

public class FactorVO {
	
	private Integer gid;
	private String __gid;
	private String lbl;
	private Integer val;
	private String geom;
	private String geom2;
	private String x;
	private String y;
	private Integer popCnt;
	private String huff;
	private Integer buildCnt;
	private Integer protectFacilityCnt;
	private String landName;
	private Double landArea;
	private String wkt;
	private HashMap<String, Double> landUse ;
	private Integer roadLen;
	
	public FactorVO(){
		
	}

	public Integer getGid() {
		return gid;
	}

	public String get__gid() {
		return __gid;
	}

	public String getLbl() {
		return lbl;
	}

	public Integer getVal() {
		return val;
	}

	public String getGeom() {
		return geom;
	}

	public String getGeom2() {
		return geom2;
	}

	public String getX() {
		return x;
	}

	public String getY() {
		return y;
	}

	public Integer getPopCnt() {
		return popCnt;
	}

	public String getHuff() {
		return huff;
	}

	public Integer getBuildCnt() {
		return buildCnt;
	}

	public Integer getProtectFacilityCnt() {
		return protectFacilityCnt;
	}

	public String getLandName() {
		return landName;
	}

	public Double getLandArea() {
		return landArea;
	}

	public String getWkt() {
		return wkt;
	}

	public HashMap<String, Double> getLandUse() {
		return landUse;
	}

	public Integer getroadLen() {
		return roadLen;
	}

	public void setGid(Integer gid) {
		this.gid = gid;
	}

	public void set__gid(String __gid) {
		this.__gid = __gid;
	}

	public void setLbl(String lbl) {
		this.lbl = lbl;
	}

	public void setVal(Integer val) {
		this.val = val;
	}

	public void setGeom(String geom) {
		this.geom = geom;
	}

	public void setGeom2(String geom2) {
		this.geom2 = geom2;
	}

	public void setX(String x) {
		this.x = x;
	}

	public void setY(String y) {
		this.y = y;
	}

	public void setPopCnt(Integer popCnt) {
		this.popCnt = popCnt;
	}

	public void setHuff(String huff) {
		this.huff = huff;
	}

	public void setBuildCnt(Integer buildCnt) {
		this.buildCnt = buildCnt;
	}

	public void setProtectFacilityCnt(Integer protectFacilityCnt) {
		this.protectFacilityCnt = protectFacilityCnt;
	}

	public void setLandName(String landName) {
		this.landName = landName;
	}

	public void setLandArea(Double landArea) {
		this.landArea = landArea;
	}

	public void setWkt(String wkt) {
		this.wkt = wkt;
	}

	public void setLandUse(HashMap<String, Double> landUse) {
		this.landUse = landUse;
	}

	public void setroadLen(Integer roadLen) {
		this.roadLen = roadLen;
	}
	


	
}
