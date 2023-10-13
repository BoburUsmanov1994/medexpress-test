import React, {useState} from 'react';
import Title from "../../../components/title";
import GridView from "../../../containers/grid-view";
import {KEYS} from "../../../constants/keys";
import {URLS} from "../../../constants/urls";
import Form from "../../../containers/form";
import {get} from "lodash";
import {Input} from "../../../containers/form/components";
import {useTranslation} from "react-i18next";


const columns = [
    {
        title: 'Key',
        key: 'key',
    },
    {
        title: 'Uz',
        key: 'uz',
        classnames:'!whitespace-normal'
    },
    {
        title: 'Ru',
        key: 'ru',
    },
    {
        title: 'En',
        key: 'en',
    },
]
const TranslationsContainer = () => {
    const {t} = useTranslation()
    const [open, setOpen] = useState(false)
    return (
        <div>
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-8">
                    <Title>{t("Translations")}</Title>
                </div>
                <div className="col-span-12 mt-8">
                    <GridView
                        ModalBody={(onSubmit, defaultValues = {}) => <Form onSubmit={(data) => onSubmit(data)}
                                                                           defaultValues={{
                                                                               ...get(defaultValues, 'data', {}),
                                                                           }}>

                            <Input property={{disabled:true}} name={'key'}
                                   placeholder={t('Key')}
                                   label={t('Key')}
                            />

                            <Input name={'uz'}
                                   placeholder={t('uz')}
                                   label={t('uz')}
                            />
                            <Input name={'ru'}
                                   placeholder={t('ru')}
                                   label={t('ru')}
                            />
                            <Input name={'en'}
                                   placeholder={t('en')}
                                   label={t('en')}
                            />
                            <button type={'submit'}
                                    className={'w-full p-3.5 rounded-lg bg-primary block w-full text-white font-bold text-center h-12 mt-6'}>
                                {t('Save')}
                            </button>
                        </Form>}
                        openCreateModal={open}
                        setOpenCreateModal={setOpen}
                        hasActionColumn
                        listKey={KEYS.translations}
                        url={URLS.translations}
                        columns={columns}
                        dataKey={'data.data'}
                        rowKey={'key'}
                        viewUrl={URLS.translationsKey}
                    />
                </div>
            </div>
        </div>
    );
};

export default TranslationsContainer;