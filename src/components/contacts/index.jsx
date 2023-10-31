import React, {useEffect, useState} from 'react';
import {get, range,isEqual,find} from "lodash";
import Field from "../../containers/form/field";
import orgIcon from "../../assets/icons/org.svg";
import {Minus, Plus} from "react-feather";
import {useTranslation} from "react-i18next";
import FormConsumer from "../../context/form/FormConsumer";
import Input from "../../containers/form/components/Input";

const Index = ({data}) => {
    const {t} = useTranslation();
    let [increment, setIncrement] = useState(0);
    useEffect(() => {
        if (get(data, 'contacts', []).length) {
            setIncrement(get(data, 'contacts', []).length-1);
        }
    }, [data]);
    return (
        <>
            <FormConsumer>{({attrs, getValueFromField}) =><>
                <h3 className={'mb-6 col-span-12 font-semibold'}>Контактная информация</h3>
                {
                    get(attrs,'fieldArrayAttrs.fields',[]).map((item,index) => <>
                        <Field type={'phone-number'}
                               defaultValue={get(find(get(data, `contacts[${index}].telecoms`,[]),item=>isEqual(get(item,'system.id'),1)),'value')}
                               classNames={'col-span-4'} name={`contacts[${index}].telecoms[0].value`}
                               params={{
                                   valueAsString: true,
                                   required: true,
                                   pattern: {
                                       value: /^(33|36|55|61|62|65|66|67|69|70|71|72|73|74|75|76|77|78|79|88|90|91|93|94|95|97|98|99)\d{7}$/,
                                       message: 'Invalid format'
                                   }
                               }}
                               placeholder={t('Телефон')}
                               label={<div className={'flex'}><span>{t('Телефон')}</span><img
                                   className={'ml-1'} src={orgIcon} alt="org"/></div>}
                        />


                        <Field type={'input'}
                               defaultValue={get(find(get(data, `contacts[${index}].telecoms`,[]),item=>isEqual(get(item,'system.id'),2)),'value')}
                               classNames={'col-span-4'} name={`contacts[${index}].telecoms[1].value`}
                               placeholder={t('E-mail')}
                               params={{
                                   pattern: {
                                       value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                       message: 'Invalid format'
                                   }
                               }}
                               label={t('E-mail')}
                        />


                        <Field type={'input'} params={{
                            pattern: {
                                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/,
                                message: "Invalid format"
                            }
                        }} defaultValue={get(find(get(data, `contacts[${index}].telecoms`,[]),item=>isEqual(get(item,'system.id'),3)),'value')}
                               classNames={'col-span-4'} name={`contacts[${index}].telecoms[2].value`}
                               placeholder={t('URL адрес')}
                               label={t('URL адрес')}
                        />
                        <Field type={'input'} params={{valueAsNumber: true}} defaultValue={1}
                               classNames={'col-span-4'}
                               name={`contacts[${index}].telecoms[0].system.id`}
                               property={{type: 'hidden'}}
                        />
                        <Field type={'input'} params={{valueAsNumber: true}} defaultValue={2}
                               classNames={'col-span-4'}
                               name={`contacts[${index}].telecoms[1].system.id`}
                               property={{type: 'hidden'}}
                        />
                        <Field type={'input'} params={{valueAsNumber: true}} defaultValue={3}
                               classNames={'col-span-4'}
                               name={`contacts[${index}].telecoms[2].system.id`}
                               property={{type: 'hidden'}}
                        />

                    </>)
                }
                <div className={'col-span-12'}>
                    <button
                        type={"button"}
                        onClick={() => get(attrs,'fieldArrayAttrs.append',()=>{})({ 'telecoms[0].value': "", 'telecoms[1].value': "" })}
                        className={'mr-6 p-2.5 !pr-6 text-[#006D85] rounded-lg inline-flex  border border-[#006D85] font-bold text-center  mt-3  items-center '}>
                        <Plus className={'mr-1'}/> <span>Добавить
                                    поле</span>
                    </button>


                </div>
            </>}</FormConsumer>

            <div className={'col-span-12'}>
                <hr className={'my-4'}/>
            </div>
        </>
    );
};

export default Index;