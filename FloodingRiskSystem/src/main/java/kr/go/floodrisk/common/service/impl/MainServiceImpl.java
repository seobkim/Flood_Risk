package kr.go.floodrisk.common.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import kr.go.floodrisk.common.service.FloodSimulVO;
import kr.go.floodrisk.common.service.MainService;

@Service("mainService")
public class MainServiceImpl implements MainService{

	@Resource(name = "testMapper")
	private TestMapper testMapper;

	@Override
	public List<FloodSimulVO> selectTenHuff() {
		return testMapper.selectTenHuff();
	}

	@Override
	public List<FloodSimulVO> selectTenMono() {
		return testMapper.selectTenMono();
	}

	@Override
	public List<FloodSimulVO> selectThrHuff() {
		return testMapper.selectThrHuff();
	}

	@Override
	public List<FloodSimulVO> selectThrMono() {
		return testMapper.selectThrMono();
	}

	@Override
	public List<FloodSimulVO> selectFiftHuff() {
		return testMapper.selectFiftHuff();
	}

	@Override
	public List<FloodSimulVO> selectFiftMono() {
		return testMapper.selectFiftMono();
	}

	@Override
	public List<FloodSimulVO> selectRoadLen() {
		return testMapper.selectRoadLen();
	}

	@Override
	public List<FloodSimulVO> selectprotectFacilityCnt() {
		return testMapper.selectProtectCnt();
	}

	@Override
	public List<FloodSimulVO> selectnatureArea() {
		return testMapper.selectNatureArea();
	}

	@Override
	public List<FloodSimulVO> selectcommerArea() {
		return testMapper.selectCommerArea();
	}

	@Override
	public List<FloodSimulVO> selectliveArea() {
		return testMapper.selectLiveArea();
	}

	@Override
	public List<FloodSimulVO> selectindusArea() {
		return testMapper.selectIndusArea();
	}

	@Override
	public List<FloodSimulVO> selectbuildCnt() {
		return testMapper.selectBuildCnt();
	}

	@Override
	public List<FloodSimulVO> selectpopCnt() {
		return testMapper.selectPopCnt();
	}

	@Override
	public List<FloodSimulVO> selectLocation() {
		return testMapper.selectLocation();
	}

	@Override
	public List<FloodSimulVO> selectTenHuffZero() {
		return testMapper.selectTenHuffZero();
	}

	@Override
	public List<FloodSimulVO> selectTenMonoZero() {
		return testMapper.selectTenMonoZero();
	}

	@Override
	public List<FloodSimulVO> selectThrHuffZero() {
		return testMapper.selectThrHuffZero();
	}

	@Override
	public List<FloodSimulVO> selectThrMonoZero() {
		return testMapper.selectThrMonoZero();
	}

	@Override
	public List<FloodSimulVO> selectFiftHuffZero() {
		return testMapper.selectFiftHuffZero();
	}

	@Override
	public List<FloodSimulVO> selectFiftMonoZero() {
		return testMapper.selectFiftMonoZero();
	}

	@Override
	public List<FloodSimulVO> selectRoadLenTotal() {
		return testMapper.selectRoadLenTotal();
	}

	@Override
	public List<FloodSimulVO> selectprotectFacilityCntTotal() {
		return testMapper.selectProtectCntTotal();
	}

	@Override
	public List<FloodSimulVO> selectnatureAreaTotal() {
		return testMapper.selectNatureAreaTotal();
	}

	@Override
	public List<FloodSimulVO> selectcommerAreaTotal() {
		return testMapper.selectCommerAreaTotal();
	}

	@Override
	public List<FloodSimulVO> selectliveAreaTotal() {
		return testMapper.selectLiveAreaTotal();
	}

	@Override
	public List<FloodSimulVO> selectindusAreaTotal() {
		return testMapper.selectIndusAreaTotal();
	}

	@Override
	public List<FloodSimulVO> selectbuildCntTotal() {
		return testMapper.selectBuildCntTotal();
	}

	@Override
	public List<FloodSimulVO> selectpopCntTotal() {
		return testMapper.selectPopCntTotal();
	}

	@Override
	public List<FloodSimulVO> selectPipeView() {
		return testMapper.selectPipeView();
	}

	@Override
	public List<FloodSimulVO> selectLocationTotal() {
		return testMapper.selectLocationTotal();
	}

	@Override
	public List<FloodSimulVO> selectBorderView() {
		return testMapper.selectBorderView();
	}
	
}
