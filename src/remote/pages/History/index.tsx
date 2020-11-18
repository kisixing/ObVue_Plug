import React, { useState, useEffect, useCallback } from 'react';
import request from "@lianmed/request";
import { Table, Button, Modal } from 'antd';
import { remote } from "@lianmed/f_types";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';

import { List } from "../List";
import { event, formatTime } from '@lianmed/utils';
import { ANALYSE_SUCCESS_TYPE } from '@lianmed/pages';
type t = remote.serviceorders.get
const getColumns = (fn: (b: t) => void) => {
  return [
    {
      title: '订单号',
      dataIndex: 'sn',
    },
    // {
    //   title: '订单类型',
    //   dataIndex: 'type',
    // },
    {
      title: '用户名',
      dataIndex: 'type',
      render(b: any, a: t) {
        return <span>{a.pregnancy && a.pregnancy.name}</span>
      }
    },
    // {
    //   title: '联系方式',
    //   dataIndex: 'type',
    //   render(b: any, a: t) {
    //     return <span>{a.pregnancy && a.pregnancy.telephone}</span>
    //   }
    // },
    // {
    //   title: '支付价格',
    //   dataIndex: 'payment'
    // },
    {
      title: '诊断',
      dataIndex: 'diagnosis',
      render(b: any, a: t) {
        let text
        try {
          const { diagnosistxt } = JSON.parse(a.diagnosis)
          text = diagnosistxt
        } catch (error) {
          text = ''
        }
        return <span>{text}</span>
      },
      ellipsis: true,
      width: 600
    },


    {
      title: '支付状态',
      width: 120,

      dataIndex: 'paystate',
      render(a: any, b: t) {
        return a === 1 ? '已支付' : '未支付'
      }
    },
    {
      title: '订单发起时间',
      width: 180,
      dataIndex: 'type',
      render(b: any, a: t) {
        return <span>{a.prenatalvisit && a.prenatalvisit.visitDate}</span>
      }
    },
    // {
    //   title: '支付方式',
    //   dataIndex: 'paytype',
    // },

    // {
    //   title: '服务状态',
    //   dataIndex: 'state',
    // },
    {
      title: '诊断时间',
      width: 180,

      dataIndex: 'diagnosisTime',
      render(a: any, b: any) {
        return <span>{formatTime(a)}</span>
      }
    },
    {
      title: '档案详情',
      width: 100,
      render(a: any, b: t) {
        return <Button type="primary" onClick={e => fn(b)}>查看</Button>
      }
    }
  ];
}

export function History() {
  const [dat, setDat] = useState<t[]>([])
  const [item, setItem] = useState<IItemData>()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {

  }, [])
  const init = () => {
    setLoading(true)
    setVisible(false)
    request.get<t[]>('/serviceorders?type.equals=CTGAPPLY&diagnosis.specified=true&size=999').then((r) => {
      setDat(r)
    })
      .finally(() => setLoading(false))
  }
  const fn = useCallback(
    (_: t) => {
      setLoading(true)
      request.get<any>(`/ctg-exams-data/${_.prenatalvisit?.ctgexam?.note}`).then(d => {
        const note = _.prenatalvisit?.ctgexam?.note
        _.pregnancy.gestationalWeek = _.prenatalvisit.gestationalWeek
        _.pregnancy.GP = `${_.pregnancy.gravidity}/${_.pregnancy.parity}`

        const target: IItemData = {
          id: _.id,
          data: {
            ...d,
            pregnancy: _.pregnancy,
            docid: note,
            selectBarHidden: true

          },
          bedname: '',
          unitId: '',
          pregnancy: _.pregnancy,
          prenatalvisit: _.prenatalvisit,
        }
        setItem(target)
        setVisible(true)
      }).finally(() => setLoading(false))
    },
    [dat],
  )
  useEffect(() => {
    init()
    event.on(ANALYSE_SUCCESS_TYPE, init)
    return () => {
      event.off(ANALYSE_SUCCESS_TYPE, init)
    }
  }, [])
  const columns = getColumns(fn)
  return (
    <div style={{ height: '100%', padding: 12 }} accessKey="id">
      <Table rowKey="id" bordered loading={loading} dataSource={dat} columns={columns} />
      <Modal footer={null} bodyStyle={{ padding: 0 }} maskClosable={false} title={null && `${item && item.pregnancy && item.pregnancy.name}的档案详情`} width={1200} visible={visible} onCancel={() => setVisible(!visible)} destroyOnClose>
        <List heigth={680} listLayout={[1, 1]} data={item ? [item] : []} />
      </Modal>
    </div>
  );
}




