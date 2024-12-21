# api开放系统

## 项目介绍

api接口是指一系列预设好的函数和方法,允许第三方通过网络进行调用数据

api开发系统是: 提供一系列api接口的平台

## 项目概述

管理员可以1. 发布和撤销接口 2. 可视化查看接口情况 3. 修改接口信息

用户可以:1.浏览接口 2. 查看接口文档 3. 调用接口 4.

调用前需要进行计费,统计数据,鉴权等操作 使用api 网关来做, aop不足以完成这么大的项目



## 项目结构图

![image-20241212162147907](D:\projects\yuapi\assets\image-20241212162147907.png)



## 技术选型

### 前端:

ant design pro

react

umi



### 后端:

springboot

springboot starter



## 项目计划

### 一

- 完成框架的搭建
  - 前端
    - ant design pro
  - 后端
    - 后端万能模板
- 后端发布接口功能
- 前端查看接口的功能

### 二

import { addRule, removeRule, rule, updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns, ProDescriptionsItemProps } from '@ant-design/pro-components';
import {
  FooterToolbar,
  ModalForm,
  PageContainer,
  ProDescriptions,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Drawer, Input, message } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
 const handleAdd = async (fields: API.RuleListItem) => {
    const hide = message.loading('正在添加');
    try {
    await addRule({
      ...fields,
    });
    hide();
    message.success('Added successfully');
    return true;
    } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
    }
 };

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
 const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('Configuring');
    try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();
    message.success('Configuration is successful');
    return true;
    } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
    }
 };

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
  const handleRemove = async (selectedRows: API.RuleListItem[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
    } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
    }
  };
  const TableList: React.FC = () => {
    /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
    const [createModalOpen, handleModalOpen] = useState<boolean>(false);
    /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
    const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
    const [showDetail, setShowDetail] = useState<boolean>(false);
    const actionRef = useRef<ActionType>();
    const [currentRow, setCurrentRow] = useState<API.RuleListItem>();
    const [selectedRowsState, setSelectedRows] = useState<API.RuleListItem[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
    // 首先把变量的类型改成我们接口的类型
    const columns: ProColumns<API.InterfaceInfo>[] = [

    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
    },
    {
      title: '接口名称',
      //name对应后端的字段名
      dataIndex: 'name',
      // tip不用管，一个规则
      // tip: 'The rule name is the unique key',
    
      // render不用管，它是说渲染类型，默认我们渲染类型就是text
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrentRow(entity);
      //         setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    
      // 展示文本
      valueType: 'text'
    },
    {
      title: '描述',
       //description对应后端的字段名
      dataIndex: 'description',
      // 展示的文本为富文本编辑器
      valueType: 'textarea',
    },
    {
      title: '请求方法',
      dataIndex: 'method',
      // 展示的文本为富文本编辑器
      valueType: 'text',
    },
    {
      title: 'url',
      dataIndex: 'url',
      valueType: 'text',
    },
    {
      title: '请求头',
      dataIndex: 'requestHeader',
      valueType: 'textarea',
    },
    {
      title: '响应头',
      dataIndex: 'responseHeader',
      valueType: 'textarea',
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInForm: true,
      valueEnum: {
        0: {
          text: '关闭',
          status: 'Default',
        },
        1: {
          text: '开启',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalOpen(true);
            setCurrentRow(record);
          }}
        >
          配置
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          订阅警报
        </a>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'查询表格'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={rule}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项 &nbsp;&nbsp;
              <span>
                服务调用次数总计 {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)} 万
              </span>
            </div>
          }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
          <Button type="primary">批量审批</Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={'新建规则'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.RuleListItem);
          if (success) {
            handleModalOpen(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '规则名称为必填项',
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalOpen(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalOpen(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalOpen={updateModalOpen}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.RuleListItem>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.RuleListItem>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};
export default TableList;











## 需求分析

1. 后端发布接口功能
2. 前端查看接口的功能



前端

## 开发流程



### 前端项目初始化

官方文档创建项目 ,安装依赖

项目瘦身



### 后端项目初始化

使用后端万能模板

### 数据库设计



使用sqlfather

#### 接口信息表;(==**不知道有哪些,看看别人的**== ,看看接口文档里有啥)

id   name  url 接口地址 type 

isDelete createTime updateTime(通用)



id
name接口名称
description描述
url接口地址
type请求类型
requestHeader请求头
responseHeader响应头
status接口状态0-关闭1-开启
isDelete
createTime
updateTime



### mybatisx 自动生成



修改代码 增删改查



