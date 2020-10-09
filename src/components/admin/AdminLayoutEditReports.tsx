import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons'
import { FunctionComponent, useEffect, useState } from 'react'
import { useDispatch } from 'reactn'
import { AdminButton } from 'src/components/common/buttons/AdminButton'
import { AdminInput } from 'src/components/common/inputs/AdminInput'
import { ModalConfirmDelete } from 'src/components/common/modals/ModalConfirmDelete'
import { ModalTextEditor } from 'src/components/common/modals/ModalTextEditor'
import { apiRequestClient } from 'src/scripts/api/apiRequestClient'
import { getHtmlContentLength } from 'src/scripts/helpers/getHtmlContentLength'
import { hotReplacerEn, hotReplacerRu } from 'src/scripts/helpers/hotReplacers'

interface Props {
  reports?: Reports
  purchaseId: Purchase['purchaseId']
  reload: () => void
  lang?: lang
}

export const AdminLayoutEditReports: FunctionComponent<Props> = ({ reports, purchaseId, reload, lang }) => {
  const STORE_SET_ALERT_POPUP = useDispatch('STORE_SET_ALERT_POPUP')

  const [doRerender, setDoRerender] = useState(false)
  const [localReports, setLocalReports] = useState(reports ?? [])

  useEffect(() => {
    setLocalReports(reports)
  }, [reports])

  const handleDelete = async (key) => {
    const { reportId } = localReports[key]
    if (reportId !== 0) {
      const { rowCount } = await apiRequestClient('/api/reports/delete', { reportId })
      if (rowCount) {
        await STORE_SET_ALERT_POPUP({ inner: 'Отчет удален' })
        const newReports = localReports.filter((report) => report.reportId !== reportId)
        setLocalReports(newReports)
        setDoRerender(!doRerender)
        reload()
      } else {
        await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Отчет не удален' })
      }
    } else {
      await STORE_SET_ALERT_POPUP({ inner: 'Отчет удален' })
      const newReports = localReports.filter((report) => report.reportId !== reportId)
      setLocalReports(newReports)
      setDoRerender(!doRerender)
    }
  }

  const handleSave = async (key: number, published: boolean) => {
    const newReport = { ...localReports[key] }
    newReport.published = published
    const { report } = await apiRequestClient('/api/reports/insertOrUpdate', { ...newReport })

    if (report) {
      await STORE_SET_ALERT_POPUP({ inner: 'Отчет сохранен' })
      const newReports = [...localReports]
      newReports[key] = report
      setLocalReports(newReports)
      setDoRerender(!doRerender)
      reload()
    } else {
      await STORE_SET_ALERT_POPUP({ type: 'error', inner: 'Отчет не сохранен' })
    }
  }

  const setTitle = (key, value) => {
    const newReports = [...localReports]
    newReports[key].title = lang === 'ru' ? hotReplacerRu(value) : hotReplacerEn(value)
    setLocalReports(newReports)
    setDoRerender(!doRerender)
  }

  const setContent = (key, value) => {
    const newReports = [...localReports]
    newReports[key].content = value
    newReports[key].contentLength = getHtmlContentLength(value)
    setLocalReports(newReports)
    setDoRerender(!doRerender)
  }

  const handleAdd = () => {
    setLocalReports([
      ...localReports,
      {
        reportId: 0,
        purchaseId,
        published: false,
        title: '',
        content: '',
        contentLength: 0,
      },
    ])
    setDoRerender(!doRerender)
  }

  return (
    <div className='column'>
      <h3>Отчеты выбранного заказа</h3>
      {localReports.map(({ published, content, title, contentLength }, key) => (
        <div className='column report' key={key}>
          <AdminInput
            label={lang === 'ru' ? 'Название на русском' : 'Название на английском'}
            value={title}
            setValue={(value) => setTitle(key, value)}
            disabled={published}
          />
          <ModalTextEditor
            titles={[lang === 'ru' ? 'Отчет на русском' : 'Отчет на английском', title]}
            content={content}
            contentLength={contentLength}
            setContent={(value) => setContent(key, value)}
          />
          {published ? null : (
            <>
              <div className='space30' />
              <AdminButton onClick={() => handleSave(key, false)} type='green' faIcon={faSave}>
                Сохранить как черновик
              </AdminButton>
              <div className='space20' />
              <AdminButton onClick={() => handleSave(key, true)} type='green' faIcon={faSave}>
                Сохранить и опубликовать для покупателя
              </AdminButton>
              <div className='space40' />
              <ModalConfirmDelete handleDelete={() => handleDelete(key)} />
            </>
          )}
        </div>
      ))}

      <div className='space40' />

      <AdminButton onClick={handleAdd} type='blue' faIcon={faPlus}>
        Добавить отчет
      </AdminButton>

      <style jsx>{
        /* language=CSS */ `
          .report {
            box-shadow: 0 0 3px 0 hsl(0, 0%, 25%);
            margin: 20px 0;
            border-radius: 6px;
            padding: 15px 10px;
            background: hsl(240, 20%, 95%);
          }
        `
      }</style>
    </div>
  )
}
