import React, {useState} from 'react';
import {useDeleteQuery, useGetAllQuery, useGetOneQuery, usePostQuery} from "../../hooks/api";
import {ContentLoader, OverlayLoader} from "../../components/loader";
import clsx from "clsx";
import {get, ceil, forEach, head, omit} from "lodash"
import Select from "../../components/select";
import {PER_PAGES} from "../../constants";
import ReactPaginate from 'react-paginate';
import prevImg from "../../assets/icons/prev.svg"
import nextImg from "../../assets/icons/next.svg"
import Nodata from "../../components/no-data";
import Modal from "../../components/modal";
import {Edit2, Trash2} from "react-feather";
import usePutQuery from "../../hooks/api/usePutQuery";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";

const GridView = ({
                      url = '/',
                      viewUrl = null,
                      listKey = '',
                      params = {},
                      filters = null,
                      columns = [],
                      onRowClick = () => {
                      },
                      doubleRow = false,
                      modalClassNames = '',
                      hasActionColumn = false,
                      ModalBody = null,
                      openCreateModal = false,
                      setOpenCreateModal = () => {
                      },
                      dataKey = 'data.data',
                      rowKey = 'id',
                      deleteModalTitle = 'Удаление организации',
                      deleteModalText = 'Вы действительно хотите удалить организацию?',
                      getRowId = () => {
                      },
                  }) => {
        const navigate = useNavigate();
        const [page, setPage] = useState(1);
        const [rowId, setRowId] = useState(null);
        const [pageSize, setPageSize] = useState({value: 15, label: '15'});
        const {t} = useTranslation()
        const {data, isLoading, isError, error} = useGetAllQuery({
            key: listKey, url, params: {
                params: {
                    ...params, page,
                    per_page: get(pageSize, 'value')
                }
            }
        })
        console.log('error', get(error, 'response.data'))

        const {data: defaultValues = {}, isLoading: isLoadingOne} = useGetOneQuery({
            id: rowId, key: [listKey, rowId], url: viewUrl ?? url, enabled: !!(rowId)
        })
        const {mutate: createRequest, isLoading: isLoadingPost} = usePostQuery({listKeyId: listKey})
        const {mutate: updateRequest, isLoading: isLoadingPut} = usePutQuery({listKeyId: listKey})
        const {mutate: deleteRequest, isLoading: deleteLoading} = useDeleteQuery({listKeyId: listKey})
        const onSubmit = ({data: attrs, setError, reset}) => {
            if (!openCreateModal && rowId) {
                updateRequest({
                    url: `${viewUrl ?? url}/${get(attrs, rowKey)}`,
                    attributes: omit(attrs, rowKey)
                }, {
                    onSuccess: () => {
                        setRowId(null);
                        reset()
                    },
                    onError: (error) => {
                        forEach(get(error, 'response.data.errors', {}), (value, field) => {
                            setError(field, {type: 'validation', message: head(value)})
                        })
                    }
                })


            } else {
                createRequest({
                    url: url, attributes: attrs
                }, {
                    onSuccess: () => {
                        setOpenCreateModal(false);
                        reset()
                    }, onError: (error) => {
                        forEach(get(error, 'response.data.errors', {}), (value, field) => {
                            setError(field, {type: 'validation', message: head(value)})
                        })
                    }
                })
            }
        }

        const remove = (id) => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: deleteModalTitle,
                text: deleteModalText,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonColor: '#EB5757',
                cancelButtonColor: '#006D85',
                confirmButtonText: t('Удалить'),
                cancelButtonText: t('Отмена'),
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteRequest({url: `${viewUrl ?? url}/${id}`})
                }
            });
        }

        if (isError) {
            navigate('/error', {
                state: {data: get(error, 'response.data'), isError: isError}
            });
        }

        if (isLoading) {
            return <OverlayLoader/>
        }
        return (<div className={'bg-white rounded-lg'}>
            {filters}
            <div className="overflow-x-auto max-h-[75vh] overflow-y-auto border border-[#E6E6E6] rounded-lg">

                <table className="table">
                    <thead className={'thead'}>
                    <tr className={'tr'}>
                        {columns && columns.map(th => <th
                            className={clsx(`th`, get(th, "classnames", ""))}
                            key={get(th, 'title')}>
                            {get(th, 'title')}
                        </th>)}
                        {hasActionColumn && <th className={'th  pr-10'}>
                            {t("Actions")}
                        </th>}
                    </tr>
                    </thead>
                    <tbody className="tbody">
                    {get(data, dataKey, []).length > 0 ? get(data, dataKey, []).map((tr, index) => {
                        return (<>
                            <tr
                                onClick={() => onRowClick(tr)}
                                className={"tr"}
                                key={get(tr, get(columns, '[0].key', index))}
                            >
                                {columns.map((th, j) => <td key={get(th, 'key', j)}
                                                            className={clsx(`td`, get(th, "classnames", ""), {'!px-0': doubleRow})}>
                                    {get(th, 'render') ? get(th, 'render')({
                                        value: get(tr, get(th, 'key')),
                                        row: tr,
                                        index: index + (page - 1) * pageSize + 1
                                    }) : get(tr, get(th, 'key'))}
                                </td>)}
                                {hasActionColumn && <td className={'td  !max-w-full pr-10 '}>
                                    <Edit2 className={'mx-3.5 inline'} color={'#2F68FC'} size={22}
                                           onClick={(e) => {
                                               e.stopPropagation()
                                               getRowId(get(tr, 'id'))
                                           }}/>
                                    <Trash2 className={'inline'} onClick={(e) => {
                                        e.stopPropagation()
                                        remove(get(tr, 'id'))
                                    }} color={'#F25886'} size={22}/>
                                </td>}
                            </tr>
                        </>);
                    }) : <tr>
                        <td colSpan={hasActionColumn ? columns?.length + 1 : columns?.length || 12}>
                            <Nodata/>
                        </td>
                    </tr>}
                    </tbody>
                </table>
            </div>
            {get(data, 'data.meta.total') > 0 && <div className="flex justify-between items-center p-3">
                <div className="flex items-center ">
                    <Select isClearable={false} sm value={pageSize} setValue={setPageSize} options={PER_PAGES}/>
                    <span
                        className={'ml-3 text-secondary-300 text-sm font-semibold'}>{t("Show")} 1-{get(pageSize, 'value', 0)} {t("from")} {get(data, 'data.meta.total', 0)}</span>
                </div>
                <ReactPaginate forcePage={page - 1} onPageChange={({selected}) => setPage(selected + 1)}
                               pageCount={ceil(get(data, 'data.meta.total_pages', 0))}
                               nextLabel={<img src={nextImg} alt="next"/>}
                               previousLabel={<img src={prevImg} alt="prev"/>} className={'pagination'}/>
            </div>}
            <Modal onClose={() => {
                setOpenCreateModal(false);
                setRowId(null)
            }}
                   classNames={modalClassNames}
                   title={openCreateModal ? t('Create') : t('Update')}
                   open={!!(openCreateModal || rowId)}>
                {isLoadingPost && <ContentLoader/>}
                {isLoadingPut && <ContentLoader/>}
                {deleteLoading && <ContentLoader/>}
                {!openCreateModal ? (isLoadingOne ?
                    <ContentLoader/> : ModalBody(onSubmit, defaultValues)) : ModalBody(onSubmit, defaultValues)}
            </Modal>
        </div>);
    }
;

export default GridView;