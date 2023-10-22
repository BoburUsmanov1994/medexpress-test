import React, {useState} from 'react';
import RDropzone from 'react-dropzone'
import photoIcon from "../../../assets/icons/image.png";
import {isNil} from "lodash";
const Dropzone = ({upload = () => {}}) => {
    const [file,setFile] = useState(null)
    return (
        <div>
            <RDropzone onDrop={acceptedFiles => setFile(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div  className={'w-72 h-60 relative border border-[#A7A7A7] border-dashed p-6 flex items-center justify-center relative rounded-lg cursor-pointer '} {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                                isNil(file) ? <div>
                                    <img src={photoIcon} className={'mx-auto mb-3'} alt=""/>
                                    <p className={'text-center'}>Перетащите изображение, <br/> или <span className={'text-[#006D85]'}>выберите с компьютера</span></p>
                                </div>: <img className={'object-cover top-0 left-0 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute'} src={URL.createObjectURL(file[0] || null)} alt="" />
                            }
                        </div>
                    </section>
                )}
            </RDropzone>
        </div>
    );
};

export default Dropzone;