package kr.go.floodrisk.common.service.impl;


import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.stereotype.Repository;

import egovframework.rte.psl.dataaccess.EgovAbstractMapper;

@Repository("mapper-pgsql")
public class PgsqlAbstractMapper extends EgovAbstractMapper{

    @Resource(name = "sqlSession-pgsql")
    public void setSqlSessionFactory(SqlSessionFactory sqlSession) {
    	super.setSqlSessionFactory(sqlSession);
    }
    
    
}

