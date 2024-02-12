import React, {useState} from 'react';
import Title from "../../../components/title";
import GridView from "../../../containers/grid-view";
import {KEYS} from "../../../constants/keys";
import {URLS} from "../../../constants/urls";
import {get} from "lodash"
import {useNavigate, useSearchParams} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {Plus} from "react-feather";
import Search from "../../../components/search"
import SelectComponent from "../../../components/select";
import {usePostQuery} from "../../../hooks/api";


const PatientsContainer = () => {
    const navigate = useNavigate();
    const [_, setSearchParams] = useSearchParams();
    const [filter, setFilter] = useState({name: ''})
    const [open, setOpen] = useState(false);
    const [personData, setPersonData] = useState(null)
    const {t} = useTranslation();
    const {
        mutate: getPersonInfo, isLoading: isLoadingPersonInfo
    } = usePostQuery({listKeyId: KEYS.persons})
    const {
        mutate: addRequest, isLoading: isLoadingPost
    } = usePostQuery({listKeyId: KEYS.practitioners})

    const columns = [
        {
            title: t('ПИНФЛ'),
            key: 'pin',
        },
        {
            title: t('Ф.И.О'),
            key: 'parent.display',
            render: ({row}) => `${get(row, 'display_last_name')} ${get(row, 'display_first_name')} ${get(row, 'display_middle_name')}`
        },
        {
            title: t('Дата рождения'),
            key: 'birth_date',
        },
    ]

    const closeModal = () => {
        setOpen(false)
        setPersonData({})
        setSearchParams(``)
    }

    const onSubmit = ({data}, tab) => {
        if (tab === 'person') {
            const {contacts, ...rest} = data;
            getPersonInfo({
                url: URLS.persons,
                attributes: {
                    ...rest
                }
            }, {
                onSuccess: (response) => {
                    setPersonData(prev => ({...prev, ...get(response, 'data.payload.person')}))
                }
            })
        } else {
            setPersonData(prev => ({...prev, ...data}))
        }
        setSearchParams(`tab=${tab}`)
    }

    const add = () => {
        const {...rest} = personData;
        addRequest({
            url: URLS.organizations,
            attributes: {
                ...rest,
            }
        }, {
            onSuccess: () => {
                closeModal();
            }
        })
    }
    const addPatient = () => {
        const {id, ...rest} = personData;
        addRequest({
            url: URLS.practitioners,
            attributes: {
                ...rest,
                person_id: id
            }
        }, {
            onSuccess: () => {
                closeModal();
            }
        })
    }
    return (
        <div>
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-6">
                    <Title>{t("Пациенты")}</Title>
                </div>
                <div className="col-span-6 flex items-center justify-end">
                    <button
                        onClick={() => navigate('/patient/create')}
                        className={'inline-flex py-2.5 pl-2.5 pr-5 rounded-lg bg-primary items-center text-white font-semibold text-center'}>
                        <Plus className={'mr-1.5'}/>
                        {t('Добавить пациента')}
                    </button>
                </div>
                <div className="col-span-6 mt-5">
                    <Search handleSearch={(val) => setFilter(prev => ({...prev, name: val}))}/>
                </div>
                <div className="col-span-6 mt-5 flex justify-end">
                    <div>
                        <SelectComponent
                            // setValue={(val) => setFilter(prev => ({...prev, city_id: val}))}
                            // value={get(filter, 'city_id')}
                            options={[]}
                            label={t('Район')}/>
                    </div>
                </div>
                <div className="col-span-12 mt-6">
                    <GridView
                        updateUrl={'/patient/update'}
                        dataKey={'data.payload.patients'}
                        metaDataKey={'data.payload.meta'}
                        params={{}}
                        hasActionColumn
                        listKey={KEYS.patients}
                        url={URLS.patients}
                        columns={columns}/>
                </div>
            </div>
        </div>
    );
};

export default PatientsContainer;