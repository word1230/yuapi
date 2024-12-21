import {
    ModalForm,

    ProColumns,

    ProFormInstance,

    ProFormText,
    ProFormTextArea,
    ProTable,

} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import { values } from 'lodash';
import React, { useEffect, useRef } from 'react';

export type Props = {
    columns: ProColumns<API.InterfaceInfo>[];
    onCancel: () => void;
    onSubmit: (value: API.InterfaceInfo) => Promise<void>;
    visiable: boolean;
    values: API.InterfaceInfo;
};
const UpdateModal: React.FC<Props> = (props) => {
    const { values, visiable, onSubmit, onCancel, columns } = props
    const  formRef = useRef<ProFormInstance>();
    useEffect(() => {
        if (formRef) {
            formRef.current?.setFieldsValue(values);
        }
        
    },[values])
    return (
        <Modal footer={null} visible={visiable} onCancel={() => onCancel?.()}
        >
            <ProTable
                type='form'
                columns={columns}
                onSubmit={async (value) => {
                    onSubmit?.(value);
                }}
                formRef={formRef}
                

            ></ProTable>
        </Modal>
    );
};
export default UpdateModal;
