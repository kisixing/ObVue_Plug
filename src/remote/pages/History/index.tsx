import { remote } from "@lianmed/f_types";
import { ANALYSE_SUCCESS_TYPE } from '@lianmed/pages';
import { ICtgLayoutItem } from '@lianmed/pages/lib/Ctg/Layout';
import request from "@lianmed/request";
import { event, formatTime, usePage } from '@lianmed/utils';
import { Button, Modal, Table, Tag } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { List } from "../List";

type t = remote.serviceorders.get
const size = 8
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
      },
      width: 130,

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
        return a === 1 ? <Tag color="green">已支付</Tag> : <Tag color="yellow" >未支付</Tag>
      },
      align:"center" as any
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
        return <Button size="small" type="primary" onClick={e => fn(b)}>查看</Button>
      }
    }
  ];
}

export function History() {
  const [dat, setDat] = useState<t[]>([])
  const [item, setItem] = useState<ICtgLayoutItem>()
  const [visible, setVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(0)
  const params = {
    'type.equals': 'CTGAPPLY',
    'diagnosis.specified': true,
    size,
    page: page
  }
  useEffect(() => {
    request.get<number>('/serviceorders/count', { params }).then(t => setTotal(t))
  }, [])




  const init = () => {
    setLoading(true)
    setVisible(false)
    request.get<t[]>(`/serviceorders`, {
      params
    }).then((r) => {
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

        const target: ICtgLayoutItem = {
          id: _.id,
          data: {
            ...d,
            pregnancy: _.pregnancy,
            docid: note,
            selectBarHidden: true

          },
          bedname: '',
          unitId: 'xx',
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
  }, [page])
  const columns = getColumns(fn)
  return (
    <div style={{ height: '100%', padding: 12 }} accessKey="id">
      <Table rowKey="id" bordered loading={loading} dataSource={dat} columns={columns} pagination={{ total, pageSize: size, current: page + 1, onChange: p => setPage(p - 1) }} />
      <Modal footer={null} bodyStyle={{ padding: 0, height: '70vh' }} maskClosable={false} title={null && `${item && item.pregnancy && item.pregnancy.name}的档案详情`} width={1200} visible={visible} onCancel={() => setVisible(!visible)} destroyOnClose>
        {
          visible ? (
            <List heigth={680} listLayout={[1, 1]} data={item ? [item] : []} />
          ) : null
        }
      </Modal>
    </div>
  );
}




