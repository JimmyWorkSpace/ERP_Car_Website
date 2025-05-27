package com.ruoyi.car.service.impl;

import java.util.UUID;

import javax.annotation.Resource;
import javax.persistence.Table;

import org.springframework.stereotype.Service;

import com.ruoyi.car.domain.CarSalesEntity;
import com.ruoyi.car.mapper.carcecloud.CarSalesMapper;
import com.ruoyi.car.service.CarSalesService;

import cn.hutool.core.util.StrUtil;
import lombok.extern.slf4j.Slf4j;
import tk.mybatis.mapper.entity.EntityTable;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.mapperhelper.EntityHelper;

@Service
@Slf4j
//@DataSource(DataSourceType.SLAVE)
public class CarSalesServiceImpl implements CarSalesService {

	@Resource
	private CarSalesMapper carSalesMapper;

	@Override
	public String getUidById(Long id) {
		CarSalesEntity cs = carSalesMapper.getById(id);
		if (cs != null) {
			if (StrUtil.isBlank(cs.getUid())) {
				cs.setUid(generateShortCode());
				carSalesMapper.updateUidById(cs.getUid(), cs.getId());
			}
			return cs.getUid();
		}
		return null;
	}

	private String generateShortCode() {
		UUID uuid = UUID.randomUUID();
		String shortId = "";
		do {
			shortId = uuid.toString().replace("-", "").substring(2, 6);
		}
		while (getByUid(shortId) != null);
		return shortId;
	}

	@Override
	public CarSalesEntity getByUid(String uid) {
		Example example = new Example(CarSalesEntity.class);
		example.createCriteria().andEqualTo("uid", uid);
		return carSalesMapper.selectOneByExample(example);
	}

	@Override
	public CarSalesEntity getById(Long carSaleId) {
		Example example = new Example(CarSalesEntity.class);
		example.createCriteria().andEqualTo("id", carSaleId);
		return carSalesMapper.selectOneByExample(example);
	}
}
