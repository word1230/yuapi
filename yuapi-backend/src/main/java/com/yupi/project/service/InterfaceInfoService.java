package com.yupi.project.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.yupi.project.model.entity.InterfaceInfo;
import com.yupi.project.model.entity.Post;

/**
* @author cheems
* @description 针对表【interface_info(接口信息)】的数据库操作Service
* @createDate 2024-12-17 10:39:35
*/
public interface InterfaceInfoService extends IService<InterfaceInfo> {
    void validInterfaceInfo(InterfaceInfo interfaceInfo, boolean add);
}
