package kr.go.floodrisk.common.service;

import java.util.List;

public class FloodSimulVO {

	public FloodSimulVO() {
	}
	
	private String __gid;
	private Integer gid;
	private String wkt;
	private Double tenYrHuff;
	private Double tenYrMono;
	private Double thrYrHuff;
	private Double thrYrMono;
	private Double fiftYrHuff;
	private Double fiftYrMono;
	private Integer popCnt;
	private String huff;
	private Integer buildCnt;
	private Integer protectFacilityCnt;
	private String landName;
	private Double landArea;
	private Double roadLen;
	private String natureAreaName;
	private String commerAreaName;
	private String indusAreaName;
	private String LiveAreaName;
	private Double natureArea;
	private Double commerArea;
	private Double indusArea;
	private Double liveArea;
	private Integer floodRank;
	private Integer popRank;
	private Integer buildRank;
	private Integer protectRank;
	private Integer roadRank;
	private Integer natureRank;
	private Integer commerRank;
	private Integer indusRank;
	private Integer LiveRank;
	private Double totalScore;
	private List<FloodSimulVO> floodSimulList;
	private String floodKinds;
	private String imageUrl;
	private String fileName;
	private String buildWeight;
	private String commerWeight;
	private String floodWeight;
	private String indusWeight;
	private String liveWeight;
	private String natureWeight;
	private String popWeight;
	private String protectWeight;
	private String roadWeight;
	private String ddr_nam;

	public String get__gid() {
		return __gid;
	}
	public Integer getGid() {
		return gid;
	}
	public String getWkt() {
		return wkt;
	}
	public Double getTenYrHuff() {
		return tenYrHuff;
	}
	public Double getTenYrMono() {
		return tenYrMono;
	}
	public Double getThrYrHuff() {
		return thrYrHuff;
	}
	public Double getThrYrMono() {
		return thrYrMono;
	}
	public Double getFiftYrHuff() {
		return fiftYrHuff;
	}
	public Double getFiftYrMono() {
		return fiftYrMono;
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
	public Double getRoadLen() {
		return roadLen;
	}
	public String getNatureAreaName() {
		return natureAreaName;
	}
	public String getCommerAreaName() {
		return commerAreaName;
	}
	public String getIndusAreaName() {
		return indusAreaName;
	}
	public String getLiveAreaName() {
		return LiveAreaName;
	}
	public Double getNatureArea() {
		return natureArea;
	}
	public Double getCommerArea() {
		return commerArea;
	}
	public Double getIndusArea() {
		return indusArea;
	}
	public Double getLiveArea() {
		return liveArea;
	}
	public void set__gid(String __gid) {
		this.__gid = __gid;
	}
	public void setGid(Integer gid) {
		this.gid = gid;
	}
	public void setWkt(String wkt) {
		this.wkt = wkt;
	}
	public void setTenYrHuff(Double tenYrHuff) {
		this.tenYrHuff = tenYrHuff;
	}
	public void setTenYrMono(Double tenYrMono) {
		this.tenYrMono = tenYrMono;
	}
	public void setThrYrHuff(Double thrYrHuff) {
		this.thrYrHuff = thrYrHuff;
	}
	public void setThrYrMono(Double thrYrMono) {
		this.thrYrMono = thrYrMono;
	}
	public void setFiftYrHuff(Double fiftYrHuff) {
		this.fiftYrHuff = fiftYrHuff;
	}
	public void setFiftYrMono(Double fiftYrMono) {
		this.fiftYrMono = fiftYrMono;
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
	public void setRoadLen(Double roadLen) {
		this.roadLen = roadLen;
	}
	public void setNatureAreaName(String natureAreaName) {
		this.natureAreaName = natureAreaName;
	}
	public void setCommerAreaName(String commerAreaName) {
		this.commerAreaName = commerAreaName;
	}
	public void setIndusAreaName(String indusAreaName) {
		this.indusAreaName = indusAreaName;
	}
	public void setLiveAreaName(String liveAreaName) {
		LiveAreaName = liveAreaName;
	}
	public void setNatureArea(Double natureArea) {
		this.natureArea = natureArea;
	}
	public void setCommerArea(Double commerArea) {
		this.commerArea = commerArea;
	}
	public void setIndusArea(Double indusArea) {
		this.indusArea = indusArea;
	}
	public void setLiveArea(Double liveArea) {
		this.liveArea = liveArea;
	}
	public Integer getFloodRank() {
		return floodRank;
	}
	public void setFloodRank(Integer floodRank) {
		this.floodRank = floodRank;
	}
	public Integer getPopRank() {
		return popRank;
	}
	public void setPopRank(Integer popRank) {
		this.popRank = popRank;
	}
	public Integer getBuildRank() {
		return buildRank;
	}
	public void setBuildRank(Integer buildRank) {
		this.buildRank = buildRank;
	}
	public Integer getProtectRank() {
		return protectRank;
	}
	public void setProtectRank(Integer protectRank) {
		this.protectRank = protectRank;
	}
	public Integer getRoadRank() {
		return roadRank;
	}
	public void setRoadRank(Integer roadRank) {
		this.roadRank = roadRank;
	}
	public Integer getNatureRank() {
		return natureRank;
	}
	public void setNatureRank(Integer natureRank) {
		this.natureRank = natureRank;
	}
	public Integer getCommerRank() {
		return commerRank;
	}
	public void setCommerRank(Integer commerRank) {
		this.commerRank = commerRank;
	}
	public Integer getIndusRank() {
		return indusRank;
	}
	public void setIndusRank(Integer indusRank) {
		this.indusRank = indusRank;
	}
	public Integer getLiveRank() {
		return LiveRank;
	}
	public void setLiveRank(Integer liveRank) {
		LiveRank = liveRank;
	}
	public Double getTotalScore() {
		return totalScore;
	}
	public void setTotalScore(Double totalScore) {
		this.totalScore = totalScore;
	}
	public List<FloodSimulVO> getFloodSimulList() {
		return floodSimulList;
	}
	public void setFloodSimulList(List<FloodSimulVO> floodSimulList) {
		this.floodSimulList = floodSimulList;
	}
	public String getFloodKinds() {
		return floodKinds;
	}
	public void setFloodKinds(String floodKinds) {
		this.floodKinds = floodKinds;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getBuildWeight() {
		return buildWeight;
	}
	public void setBuildWeight(String buildWeight) {
		this.buildWeight = buildWeight;
	}
	public String getCommerWeight() {
		return commerWeight;
	}
	public void setCommerWeight(String commerWeight) {
		this.commerWeight = commerWeight;
	}
	public String getFloodWeight() {
		return floodWeight;
	}
	public void setFloodWeight(String floodWeight) {
		this.floodWeight = floodWeight;
	}
	public String getIndusWeight() {
		return indusWeight;
	}
	public void setIndusWeight(String indusWeight) {
		this.indusWeight = indusWeight;
	}
	public String getLiveWeight() {
		return liveWeight;
	}
	public void setLiveWeight(String liveWeight) {
		this.liveWeight = liveWeight;
	}
	public String getNatureWeight() {
		return natureWeight;
	}
	public void setNatureWeight(String natureWeight) {
		this.natureWeight = natureWeight;
	}
	public String getPopWeight() {
		return popWeight;
	}
	public void setPopWeight(String popWeight) {
		this.popWeight = popWeight;
	}
	public String getProtectWeight() {
		return protectWeight;
	}
	public void setProtectWeight(String protectWeight) {
		this.protectWeight = protectWeight;
	}
	public String getRoadWeight() {
		return roadWeight;
	}
	public void setRoadWeight(String roadWeight) {
		this.roadWeight = roadWeight;
	}
	public String getDdr_nam() {
		return ddr_nam;
	}
	public void setDdr_nam(String ddr_nam) {
		this.ddr_nam = ddr_nam;
	}
		
}
