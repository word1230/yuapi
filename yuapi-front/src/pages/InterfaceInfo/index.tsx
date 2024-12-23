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
import { addInterfaceInfoUsingPost, deleteInterfaceInfoUsingPost, listInterfaceInfoByPageUsingGet, updateInterfaceInfoUsingPost } from '@/services/yuapi-backend/interfaceInfoController';
import CreateModal from './components/CreateModal';
import { values } from 'lodash';
import UpdateModal from './components/UpdateModal';





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
    const [currentRow, setCurrentRow] = useState<API.InterfaceInfo>();
    const [selectedRowsState, setSelectedRows] = useState<API.InterfaceInfo[]>([]);

    /**
     * @en-US International configuration
     * @zh-CN 国际化配置
     * */

    const columns: ProColumns<API.RuleListItem>[] = [
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
            hideInForm: true
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            valueType: 'dateTime',
            hideInForm: true
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
                    修改
                </a>,
                <a
                    key="config"
                    onClick={() => {
                        handleRemove(record);
                    
                    }}
                >
                    删除
                </a>,
            ],
        },
    ];
    /**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
    const handleAdd = async (fields: API.InterfaceInfo) => {
        const hide = message.loading('正在新建');
        try {
            await addInterfaceInfoUsingPost({
                ...fields,
            });
            hide();
            message.success('新建成功');
            handleModalOpen(false)
            actionRef.current?.reload
            return true;
        } catch (error) {
            hide();
            message.error('新建失败');
            return false;
        }
    };
    /**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
    const handleUpdate = async (fields: API.InterfaceInfo) => {
        if (!currentRow) {
            return;
        }
        const hide = message.loading('正在修改');
        try {
            await updateInterfaceInfoUsingPost({
                id:currentRow.id,
                ...fields
            });
            hide();
            message.success('修改成功');
            actionRef.current?.reload
            return true;
        } catch (error:any) {
            hide();
            message.error('修改失败'+error.message);
            return false;
        }
    };

    /**
     *  Delete node
     * @zh-CN 删除节点
     *
     * @param selectedRows
     */
    const handleRemove = async (record: API.InterfaceInfo) => {
        const hide = message.loading('正在删除');
        if (!record) return true;
        try {
            await deleteInterfaceInfoUsingPost({
                id:record.id
            });
            hide();
            message.success('删除成功');
            actionRef.current?.reload
            return true;
        } catch (error:any) {
            hide();
            message.error('删除失败'+error.message);
            return false;
        }
    };
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

                request={async (params, sort: Record<string, SortOrder>, filter: Record<string, (string | number)[] | null>) => {
                    //这里要请求数据
                    const res = await listInterfaceInfoByPageUsingGet({
                        ...params
                    })
                    if (res.data) {
                        return {
                            data: res.data.records || [],
                            success: true,
                            total: res.data.total || 0
                        }
                    } else {
                        return {
                            data: [],
                            success: false,
                            total: 0
                        }
                    }
                }}


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
            <UpdateModal
                columns={columns}
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
                values={currentRow || {}}
                visiable={updateModalOpen}
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

            <CreateModal columns={columns} visiable={createModalOpen} onCancel={() => { handleModalOpen(false) }} onSubmit={(values) => { handleAdd(values) }} >
            </CreateModal>
        </PageContainer>
    );
};
export default TableList;
