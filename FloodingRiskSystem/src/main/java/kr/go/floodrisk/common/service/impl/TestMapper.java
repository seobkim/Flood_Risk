package kr.go.floodrisk.common.service.impl;

import java.util.List;

import javax.annotation.Resource;


import egovframework.rte.psl.dataaccess.mapper.Mapper;
import kr.go.floodrisk.common.service.FloodSimulVO;

@Mapper("testMapper")
public class TestMapper{

	@Resource(name="mapper-pgsql")
	private PgsqlAbstractMapper mapper;
	
	public List<FloodSimulVO> selectTenHuff() {
		
		return mapper.selectList("selectTenHuffRes");
	}
	
	public List<FloodSimulVO> selectTenMono() {
		
		return mapper.selectList("selectTenMonoRes");
	}
	
	public List<FloodSimulVO> selectThrHuff() {
			
			return mapper.selectList("selectThrHuffRes");
		}
	
	public List<FloodSimulVO> selectThrMono() {
		
		return mapper.selectList("selectThrMonoRes");
	}
	
	public List<FloodSimulVO> selectFiftHuff() {
		
		return mapper.selectList("selectFiftHuffRes");
	}
	
	public List<FloodSimulVO> selectFiftMono() {
		
		return mapper.selectList("selectFiftMonoRes");
	}
	
	public List<FloodSimulVO> selectBuildCnt() {
		
		return mapper.selectList("selectBuildCntRes");
	}
	
	public List<FloodSimulVO> selectProtectCnt() {
			
		return mapper.selectList("selectProtectFacilCntRes");
	}
	
	public List<FloodSimulVO> selectRoadLen() {
		
		return mapper.selectList("selectRoadRes");
	}
	
	public List<FloodSimulVO> selectPopCnt() {
		
		return mapper.selectList("selectPopCntRes");
	}
	
	public List<FloodSimulVO> selectLiveArea() {
			
		return mapper.selectList("selectLiveAreaRes");
	}
	
	public List<FloodSimulVO> selectCommerArea() {
		
		return mapper.selectList("selectCommerAreaRes");
	}
	
	public List<FloodSimulVO> selectIndusArea() {
		
		return mapper.selectList("selectIndusAreaRes");
	}
	
	public List<FloodSimulVO> selectNatureArea() {
			
		return mapper.selectList("selectNatureAreaRes");
	}

	public List<FloodSimulVO> selectLocation() {
		
		return mapper.selectList("selectLocationRes");
	}
	
	public List<FloodSimulVO> selectLocationTotal() {
		
		return mapper.selectList("selectLocationResTotal");
	}

	public List<FloodSimulVO> selectTenHuffZero() {
		return mapper.selectList("selectTenHuffResZero");
	}

	public List<FloodSimulVO> selectTenMonoZero() {
		return mapper.selectList("selectTenMonoResZero");
	}

	public List<FloodSimulVO> selectThrHuffZero() {
		return mapper.selectList("selectThrHuffResZero");
	}

	public List<FloodSimulVO> selectThrMonoZero() {
		return mapper.selectList("selectThrMonoResZero");
	}

	public List<FloodSimulVO> selectFiftHuffZero() {
		return mapper.selectList("selectFiftHuffResZero");
	}

	public List<FloodSimulVO> selectFiftMonoZero() {
		return mapper.selectList("selectFiftMonoResZero");
	}

	public List<FloodSimulVO> selectBuildCntTotal() {
		return mapper.selectList("selectBuildCntResTotal");
	}
	
	public List<FloodSimulVO> selectProtectCntTotal() {
		return mapper.selectList("selectProtectFacilCntResTotal");
	}
	
	public List<FloodSimulVO> selectRoadLenTotal() {
		return mapper.selectList("selectRoadResTotal");
	}
	
	public List<FloodSimulVO> selectPopCntTotal() {
		return mapper.selectList("selectPopCntResTotal");
	}
	
	public List<FloodSimulVO> selectLiveAreaTotal() {
		return mapper.selectList("selectLiveAreaResTotal");
	}
	
	public List<FloodSimulVO> selectCommerAreaTotal() {
		return mapper.selectList("selectCommerAreaResTotal");
	}
	
	public List<FloodSimulVO> selectIndusAreaTotal() {
		return mapper.selectList("selectIndusAreaResTotal");
	}
	
	public List<FloodSimulVO> selectNatureAreaTotal() {
		return mapper.selectList("selectNatureAreaResTotal");
	}

	public List<FloodSimulVO> selectPipeView() {
		return mapper.selectList("selectPipeView");
	}

	public List<FloodSimulVO> selectBorderView() {
		return mapper.selectList("selectBorderView");
	}
}
