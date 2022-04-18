import React, { useState } from 'react';
import { Step } from '@alifd/next';
import './index.scss';

const StepItem = Step.Item;
function StepperEditBlock(props) {
  const data = [
    ['step-1', '正在处理中'],
    ['step-2', '未完成'],
    ['step-3', '未完成'],
    ['step-4', '未完成'],
  ];
  const [dataSource, setDataSource] = useState(data);
  const [currentStep, setCurrentStep] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const editData = [
    ['step-1', '正在处理中', 'finish'],
    ['step-2', '已完成', 'finish'],
    ['step-3', '已完成', 'finish'],
    ['step-4', '已完成', 'finish'],
  ];

  const [dataEdit, setDataEdit] = useState(editData);
  const [current, setCurrent] = useState(0);
  return (
    <div>
      <div style={{ marginTop: 100 }}>
        <Step current={currentStep} labelPlacement="ver" shape="dot">
          {dataSource.map((item, index) => {
            return (
              <StepItem
                className={`demolist ${
                  index === currentStep ? 'clicknode' : ''
                }`}
                title={item[0]}
                key={index}
                content={item[1]}
                onClick={() => {
                  if (index === data.length - 1 && !isEdit) {
                    const newData = dataSource.map((e, indexItem) => {
                      if (indexItem < index) {
                        e[1] = '已完成';
                      }
                      if (index === indexItem) {
                        e[1] = '正在处理中';
                      }

                      return [...e, 'finish'];
                    });
                    setIsEdit(true);
                    setDataSource(newData);
                  }
                  if (index < data.length - 1 && !isEdit) {
                    const newData = dataSource.map((e, indexItem) => {
                      if (indexItem < index) {
                        e[1] = '已完成';
                      }
                      if (index === indexItem) {
                        e[1] = '正在处理中';
                      }
                      if (indexItem > index) {
                        e[1] = '未完成';
                      }
                      return e;
                    });
                    setDataSource(newData);
                  }
                  if (isEdit) {
                    const newData = dataSource.map((e, indexItem) => {
                      if (index !== indexItem) {
                        e[1] = '已完成';
                      }
                      if (index === indexItem) {
                        e[1] = '正在处理中';
                      }
                      return e;
                    });
                    setDataSource(newData);
                  }
                  setCurrentStep(index);
                }}
                status={item[2]}
              />
            );
          })}
        </Step>
      </div>

      <div style={{ marginTop: 100 }}>
        <Step current={current} labelPlacement="ver" shape="dot">
          {dataEdit.map((item, index) => {
            return (
              <StepItem
                className={`demolist ${index === current ? 'clicknode' : ''}`}
                title={item[0]}
                key={index}
                content={item[1]}
                onClick={() => {
                  const newData = dataEdit.map((e, indexItem) => {
                    if (index !== indexItem) {
                      e[1] = '已完成';
                    }
                    if (index === indexItem) {
                      e[1] = '正在处理中';
                    }
                    return e;
                  });
                  setDataEdit(newData);
                  setCurrent(index);
                }}
                status={item[2]}
              />
            );
          })}
        </Step>
      </div>
    </div>
  );
}

export default StepperEditBlock;
