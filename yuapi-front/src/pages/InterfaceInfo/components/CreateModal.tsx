import {
    ModalForm,
 
  ProColumns,
 
  ProFormText,
  ProFormTextArea,
  ProTable,

} from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import { values } from 'lodash';
import React from 'react';

export type UpdateFormProps = {
    columns: ProColumns<API.InterfaceInfo>[];
  onCancel: () => void;
  onSubmit: (value:API.InterfaceInfo) => Promise<void>;
    // updateModalOpen: boolean;
    visiable: boolean;
//   values: Partial<API.RuleListItem>;
};
const CreateModal: React.FC<UpdateFormProps> = (props) => {
    const { visiable, onSubmit, onCancel ,columns}=props
  return (
      <Modal footer={null} visible={visiable} onCancel={()=>onCancel?.()}
      >
          <ProTable type='form'
              columns={columns}
              onSubmit={async (value) => {
                  onSubmit?.(value);
              }}

          ></ProTable>
      </Modal>
  );
};
export default CreateModal;
