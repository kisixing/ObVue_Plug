import React, { useState, useEffect, useCallback } from 'react';
import request from "@lianmed/request";
import { Table, Button, Modal } from 'antd';
import { remote } from "@lianmed/f_types";
import { IItemData } from '@lianmed/pages/lib/Ctg/Layout';

import { List } from "../List";
import { event } from '@lianmed/utils';
import { ANALYSE_SUCCESS_TYPE } from '@lianmed/pages';
type t = remote.serviceorders.get
const getColumns = (fn: (b: t) => void) => {
  return [
    {
      title: '订单号',
      dataIndex: 'sn',
    },
    {
      title: '订单类型',
      dataIndex: 'type',
    },
    {
      title: '用户名',
      dataIndex: 'type',
      render(b: any, a: t) {
        return <span>{a.pregnancy && a.pregnancy.name}</span>
      }
    },
    {
      title: '联系方式',
      dataIndex: 'type',
      render(b: any, a: t) {
        return <span>{a.pregnancy && a.pregnancy.telephone}</span>
      }
    },
    {
      title: '支付价格',
      dataIndex: 'payment'
    },
    {
      title: '订单发起时间',
      dataIndex: 'type',
      render(b: any, a: t) {
        return <span>{a.prenatalvisit && a.prenatalvisit.visitDate}</span>
      }
    },
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
      }
    },
    {
      title: '医嘱',
      dataIndex: 'prescription',
    },
    {
      title: '支付状态',
      dataIndex: 'paystate',
    },
    {
      title: '支付方式',
      dataIndex: 'paytype',
    },

    {
      title: '服务状态',
      dataIndex: 'state',
    },
    {
      title: '档案详情',
      render(a: any, b: t) {
        return <Button onClick={e => fn(b)}>查看</Button>
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
    request.get('/serviceorders?type.equals=CTGAPPLY&diagnosis.specified=false').then((r: t[]) => {
      setDat(r)
    })
    .finally(()=>setLoading(false))
  }
  const fn = useCallback(
    (_: t) => {
      setLoading(true)
      request.get(`/ctg-exams-data/${_.prenatalvisit.ctgexam.note}`).then(d => {
        const note = _.prenatalvisit.ctgexam.note

        const target: IItemData = {
          id: _.id,
          data: {
            ...d,
            pregnancy: _.pregnancy,
            docid: note
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
      <Table loading={loading} dataSource={dat} columns={columns} />
      <Modal maskClosable={false} title="档案详情" width={1200}  visible={visible} onCancel={() => setVisible(!visible)} destroyOnClose>
        <List heigth={700} listLayout={[1, 1]} data={item ? [item] : []} />
      </Modal>
    </div>
  );
}




